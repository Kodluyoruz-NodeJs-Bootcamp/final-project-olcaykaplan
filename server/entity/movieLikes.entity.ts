import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movies.entity";
import { User } from "./user.entity";

@Entity({name: "movieLikes"})
export class MovieLikes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Movie)
    movie: Movie;

    @ManyToOne(() => User)
    user: User;
}
