import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { BaseOutput } from 'src/common/dto/base.dto';
import { TicketState } from 'src/enum/ticket-state.enum';

@InputType()
export class TicketInput {
    @IsInt()
    @Field((type) => Int, { nullable: true })
    id?: number;

    @IsString()
    @Field((type) => String, { nullable: true })
    name?: string;  
}

@ObjectType()
export class TicketOutPut extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  code?: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => TicketState, { nullable: true })
  state?: TicketState;
}
