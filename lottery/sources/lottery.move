
/// Module: lottery
module lottery::lottery;

use sui::{
    balance::{Self, Balance},
    clock::Clock,
    coin::{Self, Coin},
    random::{Random, new_generator},
    sui::SUI,
    event,
};

use std::string::String;

// === Errors ===
const EGameInProgress: u64 = 0;
const EGameAlreadyCompleted: u64 = 1;
const EInvalidAmount: u64 = 2;
const EGameMismatch: u64 = 3;
const ENotWinner: u64 = 4;
const ENoParticipants: u64 = 5;

// === structs ===
public struct Game has key {
    id: UID,
    name: String,
    cost_in_sui: u64,
    participants: u32,
    end_time: u64,
    winner: Option<u32>,
    balance: Balance<SUI>,
}

/// Ticket represents a participant in a single game.
public struct Ticket has key {
    id: UID,
    game_id: ID,
    game_name: String,
    participant_index: u32,
    end_time: u64,
    reward: Option<u64>,
}

// === Events Structs ===
// Game Created
public struct GameCreated has copy, drop {
    game_id: ID,
    name: String,
    cost_in_sui: u64,
    end_time: u64,
}

// Ticket Purchase
public struct TicketPurchase has copy, drop {
    game_id: ID,
    game_name: String,
    participant_index: u32,
    end_time: u64
}

// Winner Determined
public struct WinnerDetermined has copy, drop {
    game_id: ID,
    participant_index: u32
}

// RewardChaimed
public struct RewardChaimed has copy, drop {
    game_id: ID,
    participant_index: u32,
    reward: u64
}

// Ticket Destroyed
public struct TicketDestroyed has copy, drop {
    game_id: ID,
    participant_index: u32
}

// === Public Functions ===
public fun create(name: String, end_time: u64, cost_in_sui: u64, ctx: &mut TxContext) {
    let game = Game {
        id: object::new(ctx),
        name,
        cost_in_sui,
        participants: 0,
        end_time,
        winner: option::none(),
        balance: balance::zero(),
    };

    event::emit(
        GameCreated {
            game_id: object::id(&game),
            name,
            cost_in_sui,
            end_time,
        }
    );
    transfer::share_object(game);
}


public fun buy_ticket(
    game: &mut Game,
    coin: Coin<SUI>,
    clock: &Clock,
    ctx: &mut TxContext,
): Ticket {
    assert!(game.end_time > clock.timestamp_ms(), EGameAlreadyCompleted);
    assert!(coin.value() == game.cost_in_sui, EInvalidAmount);

    game.participants = game.participants + 1;
    coin::put(&mut game.balance, coin);

    let ticket = Ticket {
        id: object::new(ctx),
        game_id: object::id(game),
        game_name: game.name,
        participant_index: game.participants,
        end_time: game.end_time,
        reward: option::none()
    };

    event::emit(
        TicketPurchase {
            game_id: object::id(game),
            game_name: game.name,
            participant_index: ticket.participant_index,
            end_time: game.end_time
        }
    );

    ticket
}


entry fun determine_winner(game: &mut Game, r: &Random, clock: &Clock, ctx: &mut TxContext) {
    assert!(game.end_time <= clock.timestamp_ms(), EGameInProgress);
    assert!(game.winner.is_none(), EGameAlreadyCompleted);
    assert!(game.participants > 0, ENoParticipants);
    let mut generator = r.new_generator(ctx);
    let winner = generator.generate_u32_in_range(1, game.participants);
    game.winner = option::some(winner);

    event::emit(
        WinnerDetermined {
            game_id: object::id(game),
            participant_index: winner
        }
    );
}

public fun redeem(ticket: &mut Ticket, game: &mut Game, ctx: &mut TxContext): Coin<SUI> {
    assert!(object::id(game) == ticket.game_id, EGameMismatch);
    assert!(game.winner.contains(&ticket.participant_index), ENotWinner);

    let reward = coin::from_balance(game.balance.withdraw_all(), ctx);
    option::fill(&mut ticket.reward, reward.value());

    event::emit(
        RewardChaimed {
            game_id: object::id(game),
            participant_index: ticket.participant_index,
            reward: reward.value()
        }
    );

    reward
}

public use fun destroy_ticket as Ticket.destroy;

public fun destroy_ticket(ticket: Ticket) {
    let Ticket { id, game_id, participant_index, game_name: _, end_time: _, reward: _ } = ticket;

    event::emit(
        TicketDestroyed {
            game_id,
            participant_index,
        }
    );

    object::delete(id);
}

#[test_only]
public fun cost_in_sui(game: &Game): u64 {
    game.cost_in_sui
}

#[test_only]
public fun end_time(game: &Game): u64 {
    game.end_time
}

#[test_only]
public fun participants(game: &Game): u32 {
    game.participants
}

#[test_only]
public fun winner(game: &Game): Option<u32> {
    game.winner
}

#[test_only]
public fun balance(game: &Game): u64 {
    game.balance.value()
}

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions


