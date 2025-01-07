import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @Field((type) => Date, { nullable: true, description: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field((type) => Date, { nullable: true, description: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Field((type) => Date, { nullable: true, description: '삭제일' })
  deletedAt?: Date | null;
}
