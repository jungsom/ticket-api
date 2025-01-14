import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../database/ticket.entity';
import { UserTicket } from 'src/database/user-ticket.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';

// queue 등록
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, UserTicket]),
    BullModule.registerQueue({ name: 'ticket-update-queue' }), // 티켓 예매 큐
    AuthModule,
  ],
  providers: [EventResolver, EventService, Logger],
  exports: [],
})
export class EventModule {}
