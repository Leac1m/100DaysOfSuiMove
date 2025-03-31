import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LotteryClient } from '../lotttery-client'
import type { SuiClient } from '@mysten/sui/client'
import { LotteryClientConfig, LotteryGameList, Network } from '../type'

// Mock the fetch function
vi.stubGlobal('fetch', vi.fn())

// Mock the SuiClient
const mockSuiClient = {
  // Add any required methods you need to mock
} as unknown as SuiClient

// Mock environment variables
vi.mock('dotenv', () => ({
  default: {
    config: vi.fn()
  }
}))

describe('LotteryClient', () => {
  let client: LotteryClient
  let mockConfig: LotteryClientConfig
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env }
    
    // Setup test environment variables
    process.env.API_URL = 'https://test-api.example.com/games'
    
    // Create the client with mock configuration
    mockConfig = {
      client: mockSuiClient,
      network: 'testnet'
    }
    client = new LotteryClient(mockConfig)
    
    // Reset mocks between tests
    vi.resetAllMocks()
  })

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv
  })

  it('should initialize with the provided configuration', () => {
    expect(client.client).toBe(mockSuiClient)
    expect(client.network).toBe('testnet')
    expect(client.apiUrl).toBe('https://test-api.example.com/games')
  })

  it('should use default network if not provided', () => {
    const clientWithoutNetwork = new LotteryClient({
      client: mockSuiClient
    })
    expect(clientWithoutNetwork.network).toBe('mainnet')
  })

  it('should use default API URL if not provided in environment', () => {
    // Remove the API_URL from environment
    delete process.env.API_URL
    
    const clientWithDefaultUrl = new LotteryClient({
      client: mockSuiClient
    })
    expect(clientWithDefaultUrl.apiUrl).toBe('http://localhost/games')
  })

  describe('getGames', () => {
    it('should fetch games successfully', async () => {
      // Mock data
      const mockGames: LotteryGameList = {
        games: [
            { game_id: '1', name: 'Game 1', cost_in_sui: "1000", pool: '', end_time: "1735689600000", winner: "", reward_claimed: false },
            { game_id: '2', name: 'Game 2', cost_in_sui: "2000", pool: '', end_time: "1735689700000", winner: "3", reward_claimed: true },
        ]
      }

      // Mock the fetch response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
        statusText: 'OK'
      } as unknown as Response)

      // Call the method
      const result = await client.getGames()

      // Assertions
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('https://test-api.example.com/games', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(result).toEqual(mockGames)
    })

    it('should throw an error when the fetch fails', async () => {
      // Mock the fetch response to fail
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      } as unknown as Response)

      // Expect the method to throw an error
      await expect(client.getGames()).rejects.toThrow('Failed to fetch games: Not Found')
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should catch and rethrow network errors', async () => {
      // Mock the fetch to throw a network error
      const networkError = new Error('Network Error')
      vi.mocked(fetch).mockRejectedValueOnce(networkError)

      // Spy on console.error
      const consoleSpy = vi.spyOn(console, 'error')

      // Expect the method to throw the same error
      await expect(client.getGames()).rejects.toThrow(networkError)
      
      // Check if console.error was called
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching games:', networkError)
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
})