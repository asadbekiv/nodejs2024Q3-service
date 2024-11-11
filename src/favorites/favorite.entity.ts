// import { Track } from 'src/tracks/track.entity';
// import { Artist } from 'src/artists/artist.entity';
// import { Album } from 'src/albums/album.entity';

// export interface FavoritesResponse {
//   artists: Artist[];
//   albums: Album[];
//   tracks: Track[];
// }

import { ApiProperty } from '@nestjs/swagger';
import { Track } from 'src/tracks/track.entity';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';

export class FavoritesResponse {
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  artists: Artist[];

  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  albums: Album[];

  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  tracks: Track[];
}
