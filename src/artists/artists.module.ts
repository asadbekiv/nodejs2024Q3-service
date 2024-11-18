import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { CleanupModule } from 'src/helper/cleanup.module';
import { Artist } from './artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => CleanupModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
