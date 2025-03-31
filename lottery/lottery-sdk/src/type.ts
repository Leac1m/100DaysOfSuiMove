import type { SuiClient } from '@mysten/sui/client';
export type Network = 'mainnet' | 'testnet' | 'custom';

export type LotteryClientConfig = {
    client: SuiClient;
    network?: Network;
}

export type LotteryGame = {
    game_id: string;
    name: string;
    cost_in_sui: string;
    pool: string;
    end_time: string;
    winner: string;
    reward_claimed: boolean;
}

export type LotteryGameList = {
    games: LotteryGame[];
};