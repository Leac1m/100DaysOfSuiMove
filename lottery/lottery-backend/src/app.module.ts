import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';
import { EventsModule } from './events/events.module';
import {
  GameCreated,
  TicketDestroyed,
  TicketPurchase,
  WinnerDetermined,
} from './events/events.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'todo_user',
      password: 'password',
      database: 'todo_db',
      entities: [
        GameCreated,
        WinnerDetermined,
        TicketDestroyed,
        TicketPurchase,
        Todo,
      ],
      synchronize: true,
    }),
    TodoModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
