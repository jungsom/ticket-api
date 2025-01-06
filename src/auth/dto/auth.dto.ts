import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PayLoad {
  @Field((type) => Int)
  sub: number;

  @Field((type) => String)
  user_email: string;
}
