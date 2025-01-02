import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Ticket } from "src/entities/Ticket.entity";
import { UserModel } from "./user.model";

@ObjectType()
export class UserTicketModel {
    @Field(type => Int)
    id: number;

    @Field(type => [UserModel])
    user_id: UserModel;

    @Field(type => [Ticket])
    ticket_id: Ticket;
}