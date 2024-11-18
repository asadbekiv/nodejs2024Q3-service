import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';
import { FavoritesResponse } from './favorite.entity';

@Module({
  providers: [FavoritesService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),

    TypeOrmModule.forFeature([Artist, Album, Track, FavoritesResponse]),
  ],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
