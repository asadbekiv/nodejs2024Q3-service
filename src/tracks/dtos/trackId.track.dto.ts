import { IsUUID } from 'class-validator';
export class TrackIdDto {
  @IsUUID('4', { message: 'Invalid track ID format' })
  id: string;
}
