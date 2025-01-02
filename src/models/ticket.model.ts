import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TicketState } from "src/enum/ticket-state.enum";

@ObjectType()
export class TicketModel {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    code: string;

    @Field(type => String)
    name: string;

    @Field(type => TicketState)
    state: TicketState;
}