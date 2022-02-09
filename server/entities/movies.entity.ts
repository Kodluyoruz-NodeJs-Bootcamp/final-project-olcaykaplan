import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { MovieComment } from "./movieComments.entity";
import { MovieLikes } from "./movieLikes.entity";
import { User } from "./user.entity";

@Entity({ name: "movies" })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "text" })
  content: string;

  @Column({ nullable: false, type: 'year' })
  releasedYear: number;

  @Column({ nullable: false })
  originalLanguage: string;

  @Column({ nullable: false, default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createDate: string;

  // (Movie Comments, Movie Likes)
  @OneToMany(() => MovieComment, comment => comment.movie, {onDelete: 'CASCADE'})
  comments: Array<MovieComment>;

  @OneToMany(() => MovieLikes, likes => likes.movie, {onDelete: 'CASCADE'})
  likes: Array<MovieLikes>

  // Many to One user
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
