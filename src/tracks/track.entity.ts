
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';




@Entity({ name: 'tracks' })
export  class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'artistId', nullable: true })
  artistId: string | null;
  @Column({ name: 'albumId', nullable: true})
  albumId: string | null;
  @Column({ name: 'duration' })
  duration: number;


  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
