import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

export enum TeacherStatus {
    Hired,
    Fired,
}

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: "enum", enum: TeacherStatus })
    status: TeacherStatus;
}
