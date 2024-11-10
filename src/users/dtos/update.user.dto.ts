import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
