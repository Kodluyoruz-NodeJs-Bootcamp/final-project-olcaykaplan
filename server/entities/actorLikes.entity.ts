import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actors.entity";
import { User } from "./user.entity";

@Entity({name: "actorLikes"})
export class ActorLikes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Actor,  { onDelete: "CASCADE" })
    actor: Actor;

    @ManyToOne(() => User)
    user: User;
}