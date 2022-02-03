import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actors.entity";
import { User } from "./user.entity";

@Entity({name: "actorComments"})
export class ActorComment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    comment: string;

    @ManyToOne(() => Actor)
    actor: Actor;

    @ManyToOne(() => User)
    user: User;

}