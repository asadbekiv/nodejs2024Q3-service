import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { FavsTrackEntity } from '../favs/entities/fav.entity';
import { LoggingModule } from '../logging/logging.module';

@Module({
  providers: [TracksService],
  imports: [
    TypeOrmModule.forFeature([Track,FavsTrackEntity]),LoggingModule
  ],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
