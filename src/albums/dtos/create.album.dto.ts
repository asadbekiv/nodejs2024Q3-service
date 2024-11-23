import {
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';


export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  artistId?: string | null;
}
