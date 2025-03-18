import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GameCreated,
  TicketDestroyed,
  TicketPurchase,
  WinnerDetermined,
} from './events.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(GameCreated)
    private readonly gameCreatedRepository: Repository<GameCreated>,

    @InjectRepository(TicketPurchase)
    private readonly ticketPurchaseRepository: Repository<TicketPurchase>,

    @InjectRepository(WinnerDetermined)
    private readonly winnerDeterminedRepository: Repository<WinnerDetermined>,

    @InjectRepository(TicketDestroyed)
    private readonly ticketDestroyedRepository: Repository<TicketDestroyed>,
  ) {}

  // Handle GameCreated Events
  async getGame(): Promise<GameCreated[]> {
    return this.gameCreatedRepository.find();
  }

  async getOneGame(id: string): Promise<GameCreated | null> {
    return this.gameCreatedRepository.findOneBy({ id });
  }

  async createGame(event: GameCreated): Promise<void> {
    await this.gameCreatedRepository.save(event);
  }

  async removeGame(id: string): Promise<void> {
    await this.gameCreatedRepository.delete(id);
  }

  // Handle TicketPurchase Events
  async getTicketPurchase(): Promise<TicketPurchase[]> {
    return this.ticketPurchaseRepository.find();
  }

  async getOneTicketPurchase(id: string): Promise<TicketPurchase | null> {
    return this.ticketPurchaseRepository.findOneBy({ id });
  }

  async createTicketPurchase(event: TicketPurchase): Promise<void> {
    await this.ticketPurchaseRepository.save(event);
  }

  async removeTicketPurchase(id: string): Promise<void> {
    await this.ticketPurchaseRepository.delete({ id });
  }

  // Handle Winner Determined
  async getWinnerDetermined(): Promise<WinnerDetermined[]> {
    return this.winnerDeterminedRepository.find();
  }

  async createWinnerDetermined(event: WinnerDetermined): Promise<void> {
    await this.winnerDeterminedRepository.save(event);
  }

  async removeWinnerDetermined(id: string): Promise<void> {
    await this.winnerDeterminedRepository.delete({ id });
  }

  // Handle Ticket Destroyed
  async getTicketDestroyed(): Promise<TicketDestroyed[]> {
    return await this.ticketDestroyedRepository.find();
  }

  async createTicketDestroyed(event: TicketDestroyed): Promise<void> {
    await this.ticketDestroyedRepository.save(event);
  }

  async removeTicketDestroyed(id: string): Promise<void> {
    await this.ticketDestroyedRepository.delete({ id });
  }
}
