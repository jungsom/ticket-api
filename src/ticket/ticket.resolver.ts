import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTicketOutput } from 'src/user/dtos/user-ticket.dto';
import { User } from 'src/auth/auth.decorator';
import { PayLoad } from 'src/auth/dto/auth.dto';
import { uuid } from 'src/common/uuid';

@Resolver(() => TicketOutPut)
export class TicketResolver {
  constructor(
    private readonly ticketService: TicketService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => TicketOutPut)
  async getTicketById(@Args('input') input: TicketInput) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} getTicketById `,
      });
      return await this.ticketService.getTicket(input.id);
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} getTicketById `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} getTicketById `,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketOutPut])
  async getAvailableTickets(@Args('input') input: TicketInput) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} getAvailableTickets `,
      });
      return await this.ticketService.getTickets(input.name);
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} getAvailableTickets `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} getAvailableTickets `,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [TicketCountOutPut])
  async getTicketCounts() {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} getTicketCounts `,
      });
      return await this.ticketService.getTicketCount();
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} getTicketCounts `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} getTicketCounts `,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async buyTicketByUser(
    @Args('input') input: TicketInput,
    @User() user: PayLoad,
  ) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} buyTicketByUser `,
      });
      const updatedTicketState = await this.ticketService.updateTicketState(
        input.id,
      );
      const reservedTicket = await this.ticketService.reservedTicket(
        user,
        updatedTicketState,
      );

      return updatedTicketState;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} buyTicketByUser `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} buyTicketByUser `,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserTicketOutput])
  async getReservedTicketByUser(@User() user: PayLoad) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} getReservedTicketByUser `,
      });
      const reservedTicket = await this.ticketService.getReservedTicket(user);
      return reservedTicket;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} getReservedTicketByUser `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} getReservedTicketByUser `,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async cancelReservedTicketByUser(@Args('input') input: TicketInput) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start `,
        context: `${TicketResolver.name} cancelReservedTicketByUser `,
      });
      const deletedTicket = await this.ticketService.deleteReservedTicket(
        input.id,
      );

      return deletedTicket;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail `,
        context: `${TicketResolver.name} cancelReservedTicketByUser `,
        error: e,
      });
      return {
        error: {
          code: e.status,
          message: e.message,
        },
      };
    } finally {
      this.logger.log({
        message: `[${transaction_id}] end `,
        context: `${TicketResolver.name} cancelReservedTicketByUser `,
      });
    }
  }
}
