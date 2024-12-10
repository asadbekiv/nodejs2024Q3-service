import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  providers: [FavoritesService],
  imports: [ArtistsModule, TracksModule, AlbumsModule],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
