import {
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';


export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  year: number;
  @IsOptional()
  artistId?: string;
}
