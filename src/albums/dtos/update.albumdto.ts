import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  year: number;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
