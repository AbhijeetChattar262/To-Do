import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity'; 

@Entity('todos')
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number = 0; 

    @Column({ type: 'varchar' })
    task: string = ''; 

    @Column({ type: 'boolean' })
    completed: boolean = false; 

    @ManyToOne(() => User, user => user.todos)
    user: User | undefined; 
    @Column({ type: 'integer', nullable: true })
    userId: number=1;
}