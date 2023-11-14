import {
    Entity,
    Column,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    JoinTable,
    Index
  } from "typeorm";
  import { NewsPostEntity } from "./newspost.ts";
  
  @Entity()
  class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @Index()
    email!: string;
  
    @Column()
    password!: string;

    @Column({ default: false })
    deleted!: boolean;
  
    @OneToMany(() => NewsPostEntity, (newPosts) => newPosts.author)
    @JoinTable()
    newPosts!: NewsPostEntity[];
  }
  
  export { User as UserEntity };
