import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
