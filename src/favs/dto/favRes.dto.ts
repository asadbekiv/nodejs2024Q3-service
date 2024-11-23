import  {Artist} from '../../artists/artist.entity';
import  {Track} from '../../tracks/track.entity';
import {Album} from '../../albums/album.entity';


export  class FavsResponseDto {
  artists: Artist[];
  albums: Track[];
  tracks: Album[];
}