import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn, Relation
} from 'typeorm';
import "reflect-metadata";

import { User } from './User.js';

@Entity()
export class UserToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({ default: true })
    isValid: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.tokens)
    user:  Relation<User>;
}
