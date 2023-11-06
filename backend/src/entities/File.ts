import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    uploader: User;

    @CreateDateColumn()
    uploadedAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;

    @Column({ length: 64 })
    hash: string;

    @Column({ length: 256 })
    fileName: string;

    @Column({ length: 255 })
    mimeType: string;

    @Column()
    size: number;
}
