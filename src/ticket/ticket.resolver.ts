import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTicketOutput } from 'src/user/dtos/user-ticket.dto';
import { User } from 'src/auth/auth.decorator';
import { PayLoad } from 'src/auth/dto/auth.dto';

@Resolver(() => TicketOutPut)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Query(() => TicketOutPut)
  async ticket(@Args('input') input: TicketInput) {
    try {
      return await this.ticketService.getTicket(input.id);
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketOutPut])
  async availableTicket(@Args('input') input: TicketInput) {
    try {
      return await this.ticketService.getTickets(input.name);
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketCountOutPut])
  async ticketCounts() {
    try {
      return await this.ticketService.getTicketCount();
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async buyTicket(@Args('input') input: TicketInput, @User() user: PayLoad) {
    try {
      const updatedTicketState = await this.ticketService.updateTicketState(
        input.id,
      );
      const reservedTicket = await this.ticketService.reservedTicket(
        user,
        updatedTicketState,
      );

      return updatedTicketState;
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserTicketOutput])
  async reservedTicket(@User() user: PayLoad) {
    try {
      const reservedTicket = await this.ticketService.getReservedTicket(user);
      return reservedTicket;
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async cancelledTicket(@Args('input') input: TicketInput) {
    try {
      const deletedTicket = await this.ticketService.deleteReservedTicket(
        input.id,
      );

      return deletedTicket;
    } catch (e) {
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    }
  }
}
