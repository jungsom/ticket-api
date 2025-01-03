import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TicketCountOutPut {
    @Field(type => String)
    name: string;

    @Field(type => Int)
    count: number;
}