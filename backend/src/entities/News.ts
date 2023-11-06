import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { File } from "./File";
import { User } from "./User";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ length: 256 })
    text: string;

    @ManyToOne(() => User)
    author: User;

    @ManyToMany(() => File)
    @JoinTable()
    files: File[];
}
