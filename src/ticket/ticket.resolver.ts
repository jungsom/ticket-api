import { Args, Query, Resolver } from '@nestjs/graphql';
import { TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';

@Resolver(() => TicketOutPut)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Query(() => TicketOutPut)
  async ticket(@Args('id', { type: () => Number }) id: number) {
    return await this.ticketService.getTicket(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketOutPut])
  async availableTicket(@Args('name', { type: () => String }) name: string) {
    return await this.ticketService.getTickets(name);
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketCountOutPut])
  async ticketCounts() {
    return await this.ticketService.getTicketCount();
  }
}
