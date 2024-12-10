import { IsUUID } from 'class-validator';
export class AlbumIdDto {
  @IsUUID('4', { message: 'Invalid album ID format' })
  id: string;
}
