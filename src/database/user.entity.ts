import { Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @Field((type) => String, { nullable: false })
  email: string;

  @Column({ nullable: false })
  @Field((type) => String, { nullable: false })
  name: string;

  @Column({ nullable: false })
  @Field((type) => String, { nullable: false })
  password: string;
}
