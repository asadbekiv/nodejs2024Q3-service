import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksService } from './tracks.service';

@Module({
  providers: [TracksService],
  imports: [ArtistsModule, AlbumsModule],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
