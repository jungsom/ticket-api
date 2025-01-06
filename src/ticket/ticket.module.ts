import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';

import { UserModule } from 'src/user/user.module';
import { UserTicket } from 'src/user/user-ticket.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, UserTicket]),
    UserModule,
    AuthModule
  ],
  providers: [TicketResolver, TicketService],
  exports: [],
})
export class TicketModule {}
