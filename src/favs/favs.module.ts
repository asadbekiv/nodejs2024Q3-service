import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FavsAlbumEntity,FavsArtistEntity,FavsTrackEntity} from './entities/fav.entity';
import {Artist} from '../artists/artist.entity';
import {Track} from '../tracks/track.entity';
import {Album} from '../albums/album.entity';
import { LoggingModule } from '../logging/logging.module';


@Module({
  controllers: [FavsController],
  imports:[TypeOrmModule.forFeature([FavsArtistEntity,FavsTrackEntity,FavsAlbumEntity,Album,Track,Artist]),LoggingModule],
  providers: [FavsService],
})
export class FavsModule {}
