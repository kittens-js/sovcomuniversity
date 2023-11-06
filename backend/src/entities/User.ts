import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 30 })
    surname: string;

    @Column({ length: 30 })
    middleName: string;

    @Column({ length: 256, unique: true })
    email: string;

    @Column()
    isAdmin: boolean;

    @Column({ length: 128 })
    passwordHash: string;
}
