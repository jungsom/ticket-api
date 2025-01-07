import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../database/user.entity';
import { Ticket } from 'src/database/ticket.entity';
import { TicketOutPut } from 'src/ticket/dtos/ticket.dto';
import { UserOutPut } from './user.dto';
import { BaseOutput } from 'src/common/dto/base.dto';

@InputType()
export class UserTicketInput {
  @Field((type) => UserOutPut, { nullable: true })
  user?: UserOutPut;

  @Field((type) => TicketOutPut, { nullable: true })
  ticket?: TicketOutPut;
}

@ObjectType()
export class UserTicketOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => UserOutPut, { nullable: true })
  user?: UserOutPut;

  @Field((type) => TicketOutPut, { nullable: true })
  ticket?: TicketOutPut;
}
