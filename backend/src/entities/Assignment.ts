import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { File } from "./File";
import { Group } from "./Group";
import { Teacher } from "./Teacher";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Teacher, { nullable: false })
    teacher: Teacher;

    @ManyToOne(() => Group, { nullable: false })
    group: Group;

    @Column({ length: 500 })
    text: string;

    @ManyToMany(() => File)
    @JoinTable()
    attachments: File[];
}
