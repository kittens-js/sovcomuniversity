import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Assignment } from "./Assignment";
import { CourseEnrollment } from "./CourseEnrollment";
import { File } from "./File";

@Entity()
export class Homework {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => CourseEnrollment, { nullable: false })
    student: CourseEnrollment;

    @ManyToOne(() => Assignment, { nullable: false })
    assignment: Assignment;

    @Column({ length: 500 })
    text: string;

    @Column({ nullable: true })
    grade: number;

    @ManyToMany(() => File)
    attachments: File[];
}
