import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './artist.entity';
import {Track} from '../tracks/track.entity';
import {Album} from '../albums/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsArtistEntity } from '../favs/entities/fav.entity';
import { LoggingModule } from '../logging/logging.module';

@Module({
  controllers: [ArtistsController],
  imports: [
    TypeOrmModule.forFeature([Artist,Track,Album,FavsArtistEntity]),LoggingModule
  ],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
