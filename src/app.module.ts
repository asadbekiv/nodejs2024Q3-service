import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Album } from './albums/album.entity';
import { Artist } from './artists/artist.entity';
import { Track } from './tracks/track.entity';
import { User } from './users/user.entity';
import { DataSource } from 'typeorm'
import { FavsModule } from './favs/favs.module';
import { FavsAlbumEntity, FavsArtistEntity, FavsTrackEntity } from './favs/entities/fav.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import {AuthGuard} from './auth/auth.guard';


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
      entities: [User,Artist,Album,Track,FavsArtistEntity,FavsAlbumEntity,FavsTrackEntity],
      migrations: ["src/migration/**/*.ts"],
      synchronize:true
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
    AuthModule,

  ],

  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],

  
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
