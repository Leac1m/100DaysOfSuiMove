import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GameCreated,
  TicketDestroyed,
  TicketPurchase,
  WinnerDetermined,
} from './events.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameCreated]),
    TypeOrmModule.forFeature([TicketDestroyed]),
    TypeOrmModule.forFeature([TicketPurchase]),
    TypeOrmModule.forFeature([WinnerDetermined]),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
