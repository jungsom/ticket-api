import { TicketState } from "src/enum/ticket-state.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() 
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    code: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: TicketState, default: TicketState.AVAILABLE, comment: '예약 상태'})
    state: TicketState;

    @CreateDateColumn({ name: 'created_at', comment: '생성일'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일'})
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일'})
    deletedAt?: Date | null;
}