import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Actor } from "./actors.entity";
import { Movie } from "./movies.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false})
  surname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  //One To Manies here (Movie, MovieStars)
  @OneToMany(() => Movie, movie => movie.user, {onDelete: 'CASCADE'})
  movies: Array<Movie>;

  @OneToMany(() => Actor, actor => actor.user, {onDelete: 'CASCADE'})
  actors: Array<Actor>;
}
