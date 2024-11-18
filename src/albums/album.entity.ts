import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Primary database ID (auto-incremented)',
  })
  orderId: number;

  @Column()
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
    description: 'Unique identifier for the album (UUID v4)',
  })
  albumId: string;

  @Column()
  @ApiProperty({
    example: 'A Night at the Opera',
    description: 'Name of the album',
  })
  name: string;

  @Column()
  @ApiProperty({ example: 1975, description: 'Release year of the album' })
  year: number;

  @Column()
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Unique identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  artistId: string | null;
}
