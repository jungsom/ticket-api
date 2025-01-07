import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/database/user.entity';
import { Ticket } from 'src/database/ticket.entity';
import { Field } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';

@Entity()
export class UserTicket extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => String, { nullable: false })
  user: User;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  @Field((type) => String, { nullable: false })
  ticket: Ticket;
}
