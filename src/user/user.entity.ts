import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() 
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at', comment: '생성일'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일'})
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일'})
    deletedAt?: Date | null;
}