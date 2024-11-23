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




@Controller('track')
export class TracksController {
  constructor(
    private readonly trackService: TracksService,
    
  ) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id',ParseUUIDPipe) id: string): Promise<Track> {
    return await this.trackService.getTrackById(id);
  }
  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<Track> {
    return this.trackService.create(body);
  }

  @Put(':id')
  async updateTrack(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id',ParseUUIDPipe) id: string): Promise<void> {
    await this.trackService.deleteTrack(id);
  }
}
