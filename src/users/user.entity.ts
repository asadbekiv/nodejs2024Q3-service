import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  

  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '98ab7e33-32c9-45bd-b4db-13430443c67f',
    description: 'Unique identifier of the user',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Magnus Carelsen',
    description: 'User login or username',
  })
  login: string;

  @Column({
    type: 'integer',
    default: 1,
  })
  @ApiProperty({
    example: 1,
    description: 'Version number of the user record, increments on update',
  })
  version: number;

  @Column({ type: 'bigint' })
  @ApiProperty({
    example: 1617187200000,
    description: 'Timestamp of user creation in milliseconds',
  })
  createdAt: number;
  @Column({ type: 'bigint' })
  @ApiProperty({
    example: 1617187300000,
    description: 'Timestamp of the last user update in milliseconds',
  })
  updatedAt: number;

  @Column()
  @Exclude()
  @ApiProperty({
    example: 'test1234',
    description: 'User password',
    writeOnly: true,
  })
  password: string;
}
