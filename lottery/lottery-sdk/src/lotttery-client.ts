import type { SuiClient } from '@mysten/sui/client';
import { LotteryClientConfig, LotteryGameList, Network } from './type';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class LotteryClient {
    client: SuiClient;
    network: Network;
    apiUrl: string;

    constructor(config: LotteryClientConfig) {
        this.client = config.client;
        this.network = config.network || 'mainnet';
        this.apiUrl = process.env.API_URL || 'http://localhost/games';
    }

    async getGames(): Promise<LotteryGameList> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch games: ${response.statusText}`);
            }

            const result: LotteryGameList = await response.json();

            return result;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }
}