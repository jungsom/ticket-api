import { registerEnumType } from "@nestjs/graphql";

export enum TicketState {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED"
}

registerEnumType(TicketState, {
    name: 'TicketState',
    description: '예약 상태'
})