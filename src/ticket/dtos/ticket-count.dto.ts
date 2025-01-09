import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/common/dto/base.dto';

@ObjectType()
export class TicketCountOutPut extends BaseOutput {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => Int, { nullable: true })
  count?: number;
}
