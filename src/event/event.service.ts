import { InjectQueue } from '@nestjs/bull';
import { Injectable, UseGuards } from '@nestjs/common';
import { Queue } from 'bull';
import { TicketInput, TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/database/user.entity';
import { PayLoad } from 'src/auth/dto/auth.dto';

// Producer
@Injectable()
export class EventService {
  constructor(
    @InjectQueue('ticket-update-queue')
    private readonly ticketUpdateQueue: Queue,
  ) {}

  async enqueueUpdateTicket(
    transaction_id: string,
    input: TicketInput,
    user: PayLoad,
  ): Promise<TicketOutPut> {
    const job = await this.ticketUpdateQueue.add(
      {
        transaction_id,
        input,
        user,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
        jobId: transaction_id,
      },
    );

    const result = await job.finished();
    return result;
  }
}
