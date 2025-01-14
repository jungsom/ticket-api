import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../database/ticket.entity';
import { UserTicket } from 'src/database/user-ticket.entity';
import { BullModule } from '@nestjs/bull';
import { TicketService } from 'src/ticket/ticket.service';
import { UpdateTicketConsumer } from './ticket-update.consumer';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, UserTicket]),
    BullModule.registerQueue(
      {
        name: 'ticket-update-queue'
      }
    ),
    TicketModule,
    UserModule
  ],
  providers: [Logger, UpdateTicketConsumer, Logger, TicketService],
  exports: [BullModule],
})
export class ConsumerModule {}
