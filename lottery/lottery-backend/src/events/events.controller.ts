import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { GameCreated, TicketPurchase } from './events.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  // Games
  @Get('/games')
  findAllGames(): Promise<GameCreated[]> {
    return this.eventService.getGame();
  }

  @Get('/games/:id')
  findOneGame(@Param('id') id: string): Promise<GameCreated | null> {
    return this.eventService.getOneGame(id);
  }

  // Tickets
  @Get('/tickets')
  findAllTickets(): Promise<TicketPurchase[]> {
    return this.eventService.getTicketPurchase();
  }

  @Get('/ticket/:id')
  findOneTicket(@Param('id') id: string): Promise<TicketPurchase | null> {
    return this.eventService.getOneTicketPurchase(id);
  }

  // @Get('/')
}
