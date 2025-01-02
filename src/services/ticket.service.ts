import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/entities/Ticket.entity";
import { TicketModel } from "src/models/ticket.model";
import { Repository } from "typeorm";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly tickerRepository: Repository<Ticket>,
    ) {}

    async getTicket(ticketId: number): Promise<TicketModel> {
        const ticket = await this.tickerRepository.findOne({ where: {id: ticketId}})
        const result: TicketModel = {
            id: ticket.id,
            code: ticket.code,
            name: ticket.name,
            state: ticket.state
        }
        return result;
    } 
}