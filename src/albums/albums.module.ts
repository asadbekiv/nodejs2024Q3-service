import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  providers: [AlbumsService],
  imports: [ArtistsModule],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
