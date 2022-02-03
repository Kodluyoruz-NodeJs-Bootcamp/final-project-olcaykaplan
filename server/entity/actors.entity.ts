import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "actors" })
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  actorName: string;

  @Column({ nullable: false })
  actorSurname: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createDate: string;


  @ManyToOne(() => User)
  user: User;
}
