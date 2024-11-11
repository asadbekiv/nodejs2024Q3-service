import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { UpdateTrackDto } from './dtos/update.track.dto';
import { TracksService } from './tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateTrackDto } from './dtos/ceate.track.dto';
import { TrackIdDto } from './dtos/trackId.track.dto';
import { Track } from './track.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Tracks list',
    type: [Track],
  })
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by Id.' })
  @ApiParam({ name: 'id', description: 'track Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Track list',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getTrackById(@Param() params: TrackIdDto): Track {
    return this.trackService.getTrackById(params.id);
  }
  @Post()
  @ApiOperation({ summary: 'Create a new track.' })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Req Body does not contains required fields !',
  })
  @ApiBody({ type: CreateTrackDto })
  createTrack(@Body() body: CreateTrackDto): Track {
    return this.trackService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', description: 'Track Id' })
  @ApiResponse({
    status: 200,
    description: 'Track update successfully',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid uuid',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found.',
  })
  @ApiBody({ type: UpdateTrackDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateTrack(
    @Param() params: TrackIdDto,
    @Body() body: UpdateTrackDto,
  ): Track {
    return this.trackService.updateTrack(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', description: 'Track Id' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invail uuid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(204)
  deleteTrack(@Param() params: TrackIdDto): void {
    this.trackService.deleteTrack(params.id);
  }
}
