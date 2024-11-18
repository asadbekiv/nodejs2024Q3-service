import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn } from 'typeorm';
import { Artist } from 'src/artists/artist.entity';
import { ValidateIf } from 'class-validator';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
    description: 'Unique identifier for the album (UUID v4)',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'A Night at the Opera',
    description: 'Name of the album',
  })
  name: string;

  @Column()
  @ApiProperty({ example: 1975, description: 'Release year of the album' })
  year: number;


  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string | null;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'b1c8d2e3-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    description: 'Unique identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
