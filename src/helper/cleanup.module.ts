import { Module, forwardRef } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [CleanupService],
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(
      () => FavoritesModule,
    ) /*AlbumsModule, TracksModule, FavoritesModule*/,
  ],
  exports: [CleanupService],
})
export class CleanupModule {}
