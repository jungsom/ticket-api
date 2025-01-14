import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/common/dto/base.dto';
import { User } from 'src/database/user.entity';
import { Ticket } from 'src/database/ticket.entity';

@InputType()
export class UserTicketInput {
  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => Ticket, { nullable: true })
  ticket?: Ticket;
}

@ObjectType()
export class UserTicketOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => Ticket, { nullable: true })
  ticket?: Ticket;
}
