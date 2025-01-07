import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorOutput {
  @Field((type) => String, { nullable: true })
  code?: string;

  @Field((type) => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class BaseOutput {
  @Field((type) => ErrorOutput, { nullable: true })
  error?: ErrorOutput;
}
