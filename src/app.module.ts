import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Album } from './albums/album.entity';
import { Artist } from './artists/artist.entity';
import { Track } from './tracks/track.entity';
import { User } from './users/user.entity';

import 'dotenv/config';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User,Album,Track,Artist],
      migrations: [`${__dirname}/migrations/*.ts`],

    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    
  ],
  providers: [AppService],

  
})
export class AppModule {}