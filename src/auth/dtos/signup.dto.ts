import { IsString,IsNotEmpty, } from 'class-validator';

export class SignupDto {

  @IsNotEmpty()
  login: string;

  @IsString()
  password: string;
}