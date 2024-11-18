import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn } from 'typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { ValidateIf } from 'class-validator';


@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 'a3e1b9c3-2f2a-4d9c-8c3b-8a3b1c3d2f2a',
    description: 'Unique identifier for the track (UUID v4)',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Bohemian Rhapsody',
    description: 'Name of the track',
  })
  name: string;
  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string | null;
  @Column({ nullable: true })
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    example: 'd7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8a',
    description:
      'Unique 476a0a6d-0861-496d-8692-2df1b4216269identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  artistId: string | null;

  @OneToOne(() => Album, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album!: string | null;

  @Column({ nullable: true })
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    example: 'e7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8c',
    description: 'Unique identifier of the album, refers to Album entity',
    nullable: true,
  })
  albumId: string | null;

  @Column()
  @ApiProperty({
    example: 354,
    description: 'Duration of the track in seconds',
  })
  duration: number;
}
