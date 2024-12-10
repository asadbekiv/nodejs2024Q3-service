import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  HttpCode, ParseUUIDPipe,
} from '@nestjs/common';
import { UpdateTrackDto } from './dtos/update.track.dto';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dtos/ceate.track.dto';
import { Track } from './track.entity';
import { LoggingService } from '../logging/logging.service';




@Controller('track')
export class TracksController {
  constructor(
    private readonly trackService: TracksService,
    private readonly loggingService: LoggingService
  ) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    this.loggingService.log('Getting all tracks','Tracks');
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id',ParseUUIDPipe) id: string): Promise<Track> {
    this.loggingService.log(`Getting track by ${id}`,'Tracks');
    return await this.trackService.getTrackById(id);
  }
  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<Track> {
    this.loggingService.log(`Creating track ${body.name}`,'Tracks');
    return this.trackService.create(body);
  }

  @Put(':id')
  async updateTrack(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    this.loggingService.log(`Updating track ${id}`,'Tracks');
    return await this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting Track ${id}`,'Tracks');
    await this.trackService.deleteTrack(id);
  }
}
