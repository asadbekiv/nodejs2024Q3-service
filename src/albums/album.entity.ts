
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';
import { Artist } from 'src/artists/artist.entity';


@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'year' })
  year:number
  @Column({ name: 'artistId', nullable: true })
  artistId: string | null;


  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
