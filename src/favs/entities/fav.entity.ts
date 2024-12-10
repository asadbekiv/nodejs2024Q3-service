

import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favs-albums' })
export class FavsAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}


@Entity({ name: 'favs-artists' })
export class FavsArtistEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity({ name: 'favs-tracks' })
export class FavsTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
