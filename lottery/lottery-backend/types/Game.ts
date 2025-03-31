export interface Game {
    game_id: string;
    name: string;
    cost_in_sui: string;
    pool: string;
    end_time: string;
    winner: string;
    reward_claimed: boolean;
}