import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Todo } from './todo.entity'; 

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ type: 'varchar', unique: true })
    username!: string; 

    @Column({ type: 'varchar' })
    password!: string; 

    @OneToMany(() => Todo, todo => todo.user)
    todos?: Todo[]; 
}