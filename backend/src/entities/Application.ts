import {
    Check,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Specialty } from "./Specialty";
import { User } from "./User";

@Entity()
export class ApplicationAcceptance {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity()
export class ApplicationRejection {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity()
@Check(
    "CHK_acceptReject",
    `("acceptanceId" IS NULL AND "rejectionId" IS NULL) OR
    ("acceptanceId" IS NOT NULL AND "rejectionId" IS NULL) OR
    ("acceptanceId" IS NULL AND "rejectionId" IS NOT NULL)`
)
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ length: 500 })
    motivationalLetter: string;

    @Column()
    experienceInYears: number;

    @Column({ length: 256 })
    achievements: string;

    @Column({ length: 30 })
    currentPosition: string;

    @ManyToOne(() => Specialty, { nullable: false })
    specialty: Specialty;

    @OneToOne(() => ApplicationAcceptance)
    @JoinColumn()
    acceptance: ApplicationAcceptance;

    @OneToOne(() => ApplicationRejection)
    @JoinColumn()
    rejection: ApplicationRejection;
}
