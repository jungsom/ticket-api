import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}

@ObjectType()
export class UserOutPut {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;
}
