import { SuiEvent } from '@mysten/sui/client';
import { prisma, Prisma } from '../db';

export const handleLotteryEvents = async (events: SuiEvent[], type: string) => {
  const eventsByType = new Map<string, any[]>();
  
  for (const event of events) {
    if (!event.type.startsWith(type)) throw new Error('Invalid event module origin');
    const eventData = eventsByType.get(event.type) || [];
    eventData.push(event.parsedJson);
    eventsByType.set(event.type, eventData);
  }

  await Promise.all(
    Array.from(eventsByType.entries()).map(async ([eventType, events]) => {
      const eventName = eventType.split('::').pop() || eventType;
      switch (eventName) {
        case 'GameCreated':
          // TODO: handle GameCreated
          await prisma.game.createMany({
            data: events.map(d => ({
              ...d,
              pool: '0',
              winner: '0',
              reward_claimed: false,
            })) as Prisma.GameCreateManyInput[], // Explicitly cast to the correct type
          });
          console.log('Created New Game fromw GameCreated');
          break;
        case 'TicketPurchase':
          for (const event of events) {
            // Fetch the game by game_id from the database
            const game = await prisma.game.findUnique({
              where: { game_id: event.game_id },
            });

            if (!game) {
              console.error(`Game with ID ${event.game_id} not found`);
              continue;
            }

            // Increment the `pool` by `cost_in_sui`
            const updatedPool = (parseFloat(game.pool) + parseFloat(event.cost_in_sui)).toString();

            // Update the game in the database
            await prisma.game.update({
              where: { game_id: event.game_id },
              data: { pool: updatedPool },
            });
          }

          console.log('Processed TicketPurchase events');
          break;
        case 'WinnerDetermined':
          for (const event of events) {
            // Fetch game by `game_id` from the database
            const game = await prisma.game.findUnique({
              where: { game_id: event.game_id },
            });

            if (!game) {
              console.error(`Game with game_id ${event.game_id} not found.`);
              continue;
            }

            // set `winner` to event.participant_index
            await prisma.game.update({
              where: { game_id: event.game_id },
              data: { winner: event.participant_index.toString() },
            });

            console.log(`Updated game ${event.game_id} with winner ${event.participant_index}`);
          }            
          console.log('Created WinnerDetermined events');
          break;
        case 'RewardChaimed':
          // TODO: handle RewardChaimed
          await prisma.rewardChaimed.createMany({
            data: events as Prisma.RewardChaimedCreateManyInput[],
          });
          console.log('Created RewardChaimed events');
          break;
        case 'TicketDestroyed':
          // TODO: handle TicketDestroyed
          await prisma.ticketDestroyed.createMany({
            data: events as Prisma.TicketDestroyedCreateManyInput[],
          });
          console.log('Created TicketDestroyed events');
          break;
        default:
          console.log('Unknown event type:', eventName);
      }
    }),
  );
};
