import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movies.entity";
import { User } from "./user.entity";

@Entity({name: "movieComments"})
export class MovieComment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    comment: string

    @ManyToOne(() => Movie)
    movie: Movie;

    @ManyToOne(() => User)
    user: User;
}