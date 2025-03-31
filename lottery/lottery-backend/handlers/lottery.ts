import { SuiEvent } from '@mysten/sui/client';
import { prisma, Prisma } from '../db';

export const handleLotteryEvents = async (events: SuiEvent[], type: string) => {
  const eventsByType = new Map<string, any[]>();

  // Group events by type
  for (const event of events) {
    if (!event.type.startsWith(type)) throw new Error('Invalid event module origin');
    const eventData = eventsByType.get(event.type) || [];
    eventData.push(event.parsedJson);
    eventsByType.set(event.type, eventData);
  }

  // Process events by type
  await Promise.all(
    Array.from(eventsByType.entries()).map(async ([eventType, events]) => {
      const eventName = eventType.split('::').pop() || eventType;

      switch (eventName) {
        case 'GameCreated':
          await prisma.game.createMany({
            data: events.map(d => ({
              ...d,
              pool: '0',
              winner: '0',
              reward_claimed: false,
            })) as Prisma.GameCreateManyInput[],
          });
          console.log('Created New Game from GameCreated events');
          break;

        case 'TicketPurchase':
          for (const event of events) {
            const game = await prisma.game.findUnique({
              where: { game_id: event.game_id },
            });

            if (!game) {
              console.error(`Game with ID ${event.game_id} not found`);
              continue;
            }

            const updatedPool = (parseFloat(game.pool) + parseFloat(event.cost_in_sui)).toString();

            await prisma.game.update({
              where: { game_id: event.game_id },
              data: { pool: updatedPool },
            });
          }
          console.log('Processed TicketPurchase events');
          break;

        case 'WinnerDetermined':
          for (const event of events) {
            const game = await prisma.game.findUnique({
              where: { game_id: event.game_id },
            });

            if (!game) {
              console.error(`Game with game_id ${event.game_id} not found.`);
              continue;
            }

            await prisma.game.update({
              where: { game_id: event.game_id },
              data: { winner: event.participant_index.toString() },
            });

            console.log(`Updated game ${event.game_id} with winner ${event.participant_index}`);
          }
          console.log('Processed WinnerDetermined events');
          break;

        case 'RewardChaimed':
          for (const event of events) {
            const ticket = await prisma.ticket.findFirst({
              where: { 
                game_id: event.game_id,
                participant_index: event.participant_index },
            });

            if (!ticket) {
              console.error(`Game with game_id ${event.game_id} not found.`);
              continue;
            }

            await prisma.game.update({
              where: { game_id: event.game_id },
              data: { reward_claimed: true },
            });
            
            await prisma.ticket.update({
              where: { dbId: ticket.dbId },
              data: { destroyed: true },
            });
            console.log(`${event.reward} was claimed in ${event.game_id} by participant ${event.participant_index}`);
          }
          console.log('Processed RewardChaimed events');
          break;

        case 'TicketDestroyed':
          for (const event of events) {
            const ticket = await prisma.ticket.findFirst({
              where: {
                game_id: event.game_id,
                participant_index: event.participant_index,
              },
            });

            if (!ticket) {
              console.error(`Ticket to destroy (game_id: ${event.game_id}, index: ${event.participant_index}) not found`);
              continue;
            }

            await prisma.ticket.update({
              where: { dbId: ticket.dbId },
              data: { destroyed: true },
            });
          }
          console.log('Processed TicketDestroyed events');
          break;

        default:
          console.log('Unknown event type:', eventName);
      }
    }),
  );
};
