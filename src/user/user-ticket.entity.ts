import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Entity()
export class UserTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
