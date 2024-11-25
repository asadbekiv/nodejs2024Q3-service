
import {Get,Request, Body, Controller, Post, HttpCode,UseGuards, HttpStatus,UnauthorizedException } from '@nestjs/common';
import {AuthService} from './auth.service';
import {SigninDto} from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import {AuthGuard} from './auth.guard';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: SigninDto) {
    return this.authService.signIn(body);
  }


  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() body: SignupDto) {
    return this.authService.signUp(body);
  }


  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string){
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.authService.refresh(refreshToken);
  }


}
