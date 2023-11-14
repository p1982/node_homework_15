import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinTable,
  Index
} from 'typeorm';
import { UserEntity } from './user.ts';
import { User } from '@sentry/node';
@Entity()
class NewsPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // @Index()
  // header!: string;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @Column()
  genre!: "Politic" | "Business" | "Sport" | "Other";

  @Column({ default: false })
  isPrivate!: boolean;

  // @Column({ default: false })
  // deleted!: boolean;

  @ManyToOne(type => UserEntity, (user: User) => user.newsPosts)
  @JoinTable()
  author!: UserEntity;

}
export { NewsPost as NewsPostEntity };
