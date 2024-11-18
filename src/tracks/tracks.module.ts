import { Module, forwardRef } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksService } from './tracks.service';
import { CleanupModule } from 'src/helper/cleanup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';

@Module({
  providers: [TracksService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => CleanupModule),
    TypeOrmModule.forFeature([Album, Artist, Track]),
  ],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
