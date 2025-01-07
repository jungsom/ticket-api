import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { QueryBuilder } from 'typeorm';
import { Ticket } from './ticket.entity';
import {
  UserTicketInput,
  UserTicketOutput,
} from 'src/user/dtos/user-ticket.dto';

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

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async buyTicket(
    @Args('id', { type: () => Number }) id: number,
    @Context() context,
  ) {
    const user = context.req.user;
    const updatedTicketState = await this.ticketService.updateTicketState(id);
    const reservedTicket = await this.ticketService.reservedTicket(
      user,
      updatedTicketState,
    );

    return updatedTicketState;
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserTicketOutput])
  async reservedTicket(@Context() context) {
    const user = context.req.user;
    const reservedTicket = await this.ticketService.getReservedTicket(user);
    return reservedTicket;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async cancelledTicket(
    @Args('id', { type: () => Number }) ticketId: number,
    @Context() context,
  ) {
    await this.ticketService.deleteReservedTicket(ticketId);

    return '해당 티켓에 대한 예약이 취소되었습니다.';
  }
}
