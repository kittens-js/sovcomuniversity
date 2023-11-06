import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
} from "typeorm";

import { ApplicationAcceptance } from "./Application";
import { Group } from "./Group";

@Entity()
export class CourseEnrollment {
    @PrimaryColumn()
    acceptanceId: number;

    @OneToOne(() => ApplicationAcceptance)
    @JoinColumn({ name: "acceptanceId" })
    acceptance: ApplicationAcceptance;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Group, { nullable: false })
    group: Group;
}
