import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { Album } from './album.entity';
import { Artist } from 'src/artists/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsAlbumEntity } from '../favs/entities/fav.entity';
import { Track } from '../tracks/track.entity';
import { LoggingModule } from '../logging/logging.module';

@Module({
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Album,Track,FavsAlbumEntity]),LoggingModule
  ],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
