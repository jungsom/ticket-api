import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutPut {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;
}
