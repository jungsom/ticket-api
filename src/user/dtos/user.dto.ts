import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseOutput } from 'src/common/dto/base.dto';

@InputType()
export class UserInput {
  @IsNotEmpty()
  @IsEmail()
  @Field((type) => String, { nullable: true })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Field((type) => String, { nullable: true })
  password?: string;

  @Field((type) => String, { nullable: true })
  name?: string;
}

@ObjectType()
export class UserOutPut extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  email?: string;

  @Field((type) => String, { nullable: true })
  name?: string;
}
