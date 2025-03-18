import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GameCreated {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cost_in_sui: number;

  @Column()
  end_time: number;
}

@Entity()
export class TicketPurchase {
  @PrimaryColumn()
  id: string;

  @Column()
  game_name: string;

  @Column()
  participant_index: string;

  @Column()
  end_time: number;
}

@Entity()
export class WinnerDetermined {
  @PrimaryColumn()
  id: string;

  @Column()
  participant_index: string;
}

@Entity()
export class TicketDestroyed {
  @PrimaryColumn()
  id: string;

  @Column()
  participant_index: string;
}

@Entity()
export class RewardChaimed {
  @PrimaryColumn()
  id: string;

  @Column()
  participant_index: string;

  @Column()
  reward: number;
}
