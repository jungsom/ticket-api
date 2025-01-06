import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../user.entity";
import { Ticket } from "src/ticket/ticket.entity";
import { TicketOutPut } from "src/ticket/dtos/ticket.dto";
import { UserOutPut } from "./user.dto";

@InputType()
export class UserTicketInput {
  @Field((type) => UserOutPut)
  user: UserOutPut;

  @Field((type) => TicketOutPut)
  ticket: TicketOutPut;
}

@ObjectType()
export class UserTicketOutput {
  @Field((type) => Int)
  id: number

  @Field((type) => UserOutPut)
  user: UserOutPut;

  @Field((type) => TicketOutPut)
  ticket: TicketOutPut;
}