import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    Relation
} from 'typeorm';
import "reflect-metadata";

import { UserToken } from './UserToken.js';

@Entity('users')
export class User {
    @PrimaryColumn()
    id!: string;

    @Column()
    password!: string;

    @OneToMany(() => UserToken, (token) => token.user)
    tokens: Relation<UserToken[]>;
}
