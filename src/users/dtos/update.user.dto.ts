import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
