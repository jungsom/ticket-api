import { Process, Processor } from '@nestjs/bull';
import { LoggerService } from '@nestjs/common';
import { Job } from 'bull';
import { EventService } from 'src/event/event.service';
import { TicketService } from 'src/ticket/ticket.service';

@Processor('ticket-update-queue')
export class UpdateTicketConsumer {
  constructor(
    private readonly logger: LoggerService,
    private readonly ticketService: TicketService,
  ) {}

  @Process()
  async updateTicket(job: Job) {
    const { transaction_id, input } = job.data;
    const user = job.data.user; 

    try {
      this.logger.log({
        message: `[${transaction_id}] start`,
        context: `${UpdateTicketConsumer.name} updateTicket`,
      });

      const updatedTicketState = await this.ticketService.updateTicketState(
        input.id,
      );
      const reservedTicket = await this.ticketService.reservedTicket(
        user,
        updatedTicketState,
      );

      this.logger.log({
        message: `[${transaction_id}] success`,
        context: `${UpdateTicketConsumer.name} updateTicket`,
      });

      return updatedTicketState;
    } catch (e) {
      this.logger.error({
        message: `[${transaction_id}] fail`,
        context: `${UpdateTicketConsumer.name} updateTicket`,
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
        context: `${UpdateTicketConsumer.name} updateTicket`,
      });
    }
  }
}
