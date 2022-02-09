import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActorComment } from "./actorComments.entity";
import { ActorLikes } from "./actorLikes.entity";
import { User } from "./user.entity";

@Entity({ name: "actors" })
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createDate: string;

  // (Actor Comments, Actor Likes)
  @OneToMany(() => ActorComment, comment => comment.actor, {onDelete: 'CASCADE'})
  comments: Array<ActorComment>;

  @OneToMany(() => ActorLikes, likes => likes.actor, {onDelete: 'CASCADE'})
  likes: Array<ActorLikes>

  @ManyToOne(() => User)
  user: User;
}
