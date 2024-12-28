import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import "reflect-metadata";

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    extension!: string;

    @Column()
    mimeType!: string;

    @Column()
    size!: number;

    @CreateDateColumn()
    uploadDate!: Date;

    @Column()
    path!: string; // Local file path
}