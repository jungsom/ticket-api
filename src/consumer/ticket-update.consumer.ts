import { Process, Processor } from '@nestjs/bull';
import { Logger, LoggerService } from '@nestjs/common';
import { Job } from 'bull';
import { EventService } from 'src/event/event.service';
import { TicketService } from 'src/ticket/ticket.service';

@Processor('ticket-update-queue')
export class UpdateTicketConsumer {
  constructor(
    private readonly logger: Logger,
    private readonly ticketService: TicketService,
  ) {}

  @Process()
  async handleTicket(job: Job) {
    try {
      const { input, user } = job.data;
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
}
