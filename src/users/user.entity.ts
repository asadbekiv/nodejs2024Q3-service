import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';



@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  login: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  version: number;
  @Column({ type: 'bigint', transformer: {
      to: (value: number) => value, // Store as is
      from: (value: string) => Number(value), // Convert string to number when reading
    }, })
  createdAt: number;
  @Column({ type: 'bigint' , transformer: {
      to: (value: number) => value, // Store as is
      from: (value: string) => Number(value), // Convert string to number when reading
    },} )
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
