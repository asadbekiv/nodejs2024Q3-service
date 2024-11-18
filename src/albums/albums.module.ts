import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { Album } from './album.entity';
import { Artist } from 'src/artists/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AlbumsService],
  imports: [
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Album, Artist]),
  ],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
