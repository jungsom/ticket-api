import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../database/ticket.entity';
import { UserTicket } from 'src/database/user-ticket.entity';
import { BullModule } from '@nestjs/bull';
import { TicketService } from 'src/ticket/ticket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, UserTicket]),
    BullModule.registerQueue(
      {
        name: 'ticket-update-queue'
      }
    )
  ],
  providers: [Logger, TicketService],
  exports: [BullModule],
})
export class ConsumerModule {}
