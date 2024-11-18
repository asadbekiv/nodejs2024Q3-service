import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Primary database ID (auto-incremented)',
  })
  orderId: number;

  @Column()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Unique identifier for the artist (UUID v4)',
  })
  artistId: string;

  @Column()
  @ApiProperty({
    example: 'Freddie Mercury',
    description: 'Name of the artist',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: true,
    description: 'Indicates if the artist has won a Grammy award',
  })
  grammy: boolean;
}
