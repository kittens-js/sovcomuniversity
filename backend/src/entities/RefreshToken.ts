import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RefreshToken {
    @PrimaryColumn({ type: "uuid" })
    id: string;

    @CreateDateColumn()
    createdAt: Date;
}
