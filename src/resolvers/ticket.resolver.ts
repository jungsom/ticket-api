import { Args, Query, Resolver } from '@nestjs/graphql';
import { TicketModel } from 'src/models/ticket.model';
import { TicketService } from 'src/services/ticket.service';

@Resolver(() => TicketModel)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @Query(() => TicketModel)
  async ticket(@Args('id', { type: () => Number }) id: number) {
    return await this.ticketService.getTicket(id);
  }
}
