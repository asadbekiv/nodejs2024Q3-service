import { ApiProperty } from '@nestjs/swagger';
import { Track } from 'src/tracks/track.entity';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoritesResponse {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Primary database ID (auto-incremented)',
  })
  orderId: number;

  @ManyToMany(() => Artist)
  @JoinTable()
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  artists: Artist[];
  @ManyToMany(() => Album)
  @JoinTable()
  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  albums: Album[];
  @ManyToMany(() => Track)
  @JoinTable()
  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  tracks: Track[];
}
