import { Logger, Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../database/ticket.entity';

import { UserModule } from 'src/user/user.module';
import { UserTicket } from 'src/database/user-ticket.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, UserTicket]),
    UserModule,
    AuthModule,
  ],
  providers: [TicketResolver, TicketService, Logger],
  exports: [],
})
export class TicketModule {}
