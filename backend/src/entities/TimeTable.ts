import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";

import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class TimeTable {
    @PrimaryColumn()
    @CreateDateColumn()
    createdAt: Date;

    @PrimaryColumn()
    groupId: number;

    @ManyToOne(() => Group, { nullable: false })
    @JoinColumn({ name: "groupId" })
    group: Group;

    @ManyToOne(() => User, { nullable: false })
    author: User;

    @Column({ length: 80 })
    text: string;
}
