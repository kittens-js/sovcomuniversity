import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 40, unique: true })
    name: string;

    @Column("time")
    studyDuration: Date;
}
