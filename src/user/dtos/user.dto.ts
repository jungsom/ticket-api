import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field((type) => String, { nullable: true })
  email?: string;

  @Field((type) => String, { nullable: true })
  password?: string;
}

@ObjectType()
export class UserOutPut {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  email?: string;

  @Field((type) => String, { nullable: true })
  name?: string;
}
