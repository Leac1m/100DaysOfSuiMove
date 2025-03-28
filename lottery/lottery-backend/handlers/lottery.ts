
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
          await prisma.gameCreated.createMany({
            data: events as Prisma.GameCreatedCreateManyInput[],
          });
          console.log('Created GameCreated events');
          break;
        case 'TicketPurchase':
          // TODO: handle TicketPurchase
          await prisma.ticketPurchase.createMany({
            data: events as Prisma.TicketPurchaseCreateManyInput[],
          });
          console.log('Created TicketPurchase events');
          break;
        case 'WinnerDetermined':
          // TODO: handle WinnerDetermined
          await prisma.winnerDetermined.createMany({
            data: events as Prisma.WinnerDeterminedCreateManyInput[],
          });
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
