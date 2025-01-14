import { LoggerService } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { uuid } from 'src/common/uuid';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { User } from 'src/auth/auth.decorator';
import { PayLoad } from 'src/auth/dto/auth.dto';

@Resolver()
export class EventResolver {
  constructor(
    // private readonly logger: LoggerService,
    private readonly eventService: EventService,
  ) {}

  @Mutation(() => String)
  async updateTicket(
    @User() user: PayLoad,
    @Args('input') input: TicketInput,
  ) {
    const transaction_id = uuid();
    const result = await this.eventService.enqueueUpdateTicket(
      transaction_id,
      input,
      user
    );
    return result;
  }
}
