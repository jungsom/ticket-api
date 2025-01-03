import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketState } from 'src/enum/ticket-state.enum';
import { TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { Repository } from 'typeorm';
import { TicketCountOutPut } from './dtos/ticket-count.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly tickerRepository: Repository<Ticket>,
  ) {}

  async getTicket(ticketId: number): Promise<TicketOutPut> {
    const ticket = await this.tickerRepository.findOne({
      where: { id: ticketId },
    });
    const result: TicketOutPut = {
      id: ticket.id,
      code: ticket.code,
      name: ticket.name,
      state: ticket.state,
    };
    return result;
  }

  async getTickets(name: string): Promise<TicketOutPut[]> {
    const tickets = await this.tickerRepository.find({
      where: {
        name,
        state: TicketState.AVAILABLE,
      },
    });
    const result: TicketOutPut[] = tickets.map((ticket) => ({
      id: ticket.id,
      code: ticket.code,
      name: ticket.name,
      state: ticket.state,
    }));
    return result;
  }

  async getTicketCount(): Promise<TicketCountOutPut[]> {
    const tickets = await this.tickerRepository
      .createQueryBuilder('ticket')
      .select('ticket.name')
      .addSelect('COUNT(*) AS count')
      .groupBy('ticket.name')
      .getRawMany();

    const result: TicketCountOutPut[] = tickets.map((ticket) => ({
      name: ticket.ticket_name,
      count: parseInt(ticket.count, 10),
    }));

    return result;
  }
}
