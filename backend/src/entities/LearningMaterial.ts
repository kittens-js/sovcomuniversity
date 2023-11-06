import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { File } from "./File";
import { Group } from "./Group";
import { Teacher } from "./Teacher";

@Entity()
export class LearningMaterial {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Teacher, { nullable: false })
    teacher: Teacher;

    @ManyToOne(() => Group, { nullable: false })
    group: Group;

    @Column("text")
    text: string;

    @ManyToMany(() => File)
    attachments: File[];
}
