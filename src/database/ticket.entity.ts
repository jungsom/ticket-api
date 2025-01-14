import { Field, ObjectType } from '@nestjs/graphql';
import { TicketState } from 'src/enum/ticket-state.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @Field((type) => String, { nullable: false, description: '티켓 코드' })
  code: string;

  @Column({ nullable: false })
  @Field((type) => String, { nullable: false, description: '티켓 이름' })
  name: string;

  @Column({
    type: 'enum',
    enum: TicketState,
    nullable: false,
    default: TicketState.AVAILABLE,
  })
  @Field((type) => TicketState, {
    nullable: false,
    description: '티켓 예약 상태',
  })
  state: TicketState;
}
