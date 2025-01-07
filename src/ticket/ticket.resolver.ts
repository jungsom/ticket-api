import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { QueryBuilder } from 'typeorm';
import { Ticket } from '../database/ticket.entity';
import {
  UserTicketInput,
  UserTicketOutput,
} from 'src/user/dtos/user-ticket.dto';

@Resolver(() => TicketOutPut)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Query(() => TicketOutPut)
  async ticket(@Args('input') input: TicketInput) {
    return await this.ticketService.getTicket(input.id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketOutPut])
  async availableTicket(@Args('input') input: TicketInput) {
    return await this.ticketService.getTickets(input.name);
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketCountOutPut])
  async ticketCounts() {
    return await this.ticketService.getTicketCount();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async buyTicket(
    @Args('input') input: TicketInput,
    @Context() context,
  ) {
    const user = context.req.user;
    const updatedTicketState = await this.ticketService.updateTicketState(input.id);
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
  @Mutation(() => TicketOutPut)
  async cancelledTicket(
    @Args('input') input: TicketInput,
    @Context() context,
  ) {
    try {
      const deletedTicket =
        await this.ticketService.deleteReservedTicket(input.id);

      return deletedTicket;
    } catch (e) {
      return {
        error: {
          code: e.extensions?.code,
          message: e.message,
        },
      };
    }
  }
}
