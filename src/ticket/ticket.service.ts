import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/database/ticket.entity';
import { TicketState } from 'src/enum/ticket-state.enum';
import { TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { DataSource, Repository } from 'typeorm';
import { TicketCountOutPut } from './dtos/ticket-count.dto';
import { UserTicket } from 'src/database/user-ticket.entity';
import { UserService } from 'src/user/user.service';
import { UserTicketOutput } from 'src/user/dtos/user-ticket.dto';
import { PayLoad } from 'src/auth/dto/auth.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(UserTicket)
    private readonly userTicketRepository: Repository<UserTicket>,
    private readonly userService: UserService,
    private dataSource: DataSource,
  ) {}

  /** 특정 티켓 상세 조회 */
  async getTicket(ticketId: number): Promise<TicketOutPut> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    return ticket;
  }

  /** 예약 가능한 모든 티켓 조회 */
  async getTickets(name: string): Promise<TicketOutPut[]> {
    const tickets = await this.ticketRepository.find({
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

  /** 전체 공연 목록, 남은 티켓 수 조회 */
  async getTicketCount(): Promise<TicketCountOutPut[]> {
    const tickets = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.name')
      .addSelect('COUNT(*) AS count')
      .where('ticket.state = :state', { state: TicketState.AVAILABLE })
      .groupBy('ticket.name')
      .getRawMany();

    const result: TicketCountOutPut[] = tickets.map((ticket) => ({
      name: ticket.ticket_name,
      count: parseInt(ticket.count, 10),
    }));

    return result;
  }

  /** 티켓 예약 상태 변경 */
  async updateTicketState(id: number): Promise<Ticket> {
    const availableTicket = await this.ticketRepository.findOne({
      where: { id: id, state: TicketState.AVAILABLE },
    });

    if (!availableTicket) {
      throw new HttpException(
        '이미 예약이 완료된 티켓입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    availableTicket.state = TicketState.RESERVED;
    await this.ticketRepository.save(availableTicket);
    return availableTicket;
  }

  /** 사용자 예약 구매 */
  async reservedTicket(userInfo: PayLoad, ticket: Ticket) {
    const user = await this.userService.selectUser(userInfo.sub);
    const newUserTicket = this.userTicketRepository.create({
      user: user,
      ticket: ticket,
    });
    return await this.userTicketRepository.save(newUserTicket);
  }

  /** 사용자 예약 현황 */
  async getReservedTicket(userInfo: PayLoad): Promise<UserTicketOutput[]> {
    const user = await this.userService.selectUser(userInfo.sub);
    const reservedTickets = await this.userTicketRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'ticket'],
    });

    const result: UserTicketOutput[] = reservedTickets.map((ticket) => ({
      id: ticket.id,
      user: ticket.user,
      ticket: ticket.ticket,
    }));
    return result;
  }

  /** 사용자 에약 취소 */
  async deleteReservedTicket(ticketId: number) {
    const userTicket = await this.userTicketRepository.findOne({
      where: {
        ticket: { id: ticketId },
      },
    });
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    if (!userTicket || !ticket) {
      throw new HttpException(
        '해당 티켓을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    ticket.state = TicketState.AVAILABLE;

    const deletedTicket = await this.userTicketRepository.delete(userTicket.id);
    const updatedTicketState = await this.ticketRepository.save(ticket);

    return updatedTicketState;
  }
}
