import { Logger, LoggerService, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { uuid } from 'src/common/uuid';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { User } from 'src/auth/auth.decorator';
import { PayLoad } from 'src/auth/dto/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class EventResolver {
  constructor(
    // private readonly logger: LoggerService,
    private readonly eventService: EventService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => TicketOutPut)
  async handleTicket(@User() user: PayLoad, @Args('input') input: TicketInput) {
    const transaction_id = uuid();
    try {
      this.logger.log({
        message: `[${transaction_id}] start`,
        context: `${EventResolver.name} handleTicket`,
      });
      const result = await this.eventService.enqueueUpdateTicket(
        transaction_id,
        input,
        user,
      );
      return result;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail`,
        context: `${EventResolver.name} handleTicket`,
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
        message: `[${transaction_id}] end`,
        context: `${EventResolver.name} handleTicket`,
      });
    }
  }
}
