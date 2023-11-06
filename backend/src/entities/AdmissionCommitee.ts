import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AdmissionCommiteeStatus {
    Hired,
    Fired,
}

@Entity()
export class AdmissionCommitee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: AdmissionCommiteeStatus })
    status: AdmissionCommiteeStatus;
}
