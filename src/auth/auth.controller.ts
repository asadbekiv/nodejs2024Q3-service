
import {Get,Request, Body, Controller, Post, HttpCode,UseGuards, HttpStatus,UnauthorizedException } from '@nestjs/common';
import {AuthService} from './auth.service';
import {SigninDto} from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import {AuthGuard} from './auth.guard';
import { Public } from './public.decorator';
import { LoggingService } from '../logging/logging.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private readonly loggingService: LoggingService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: SigninDto) {
    this.loggingService.log(`Log in ${body.login}`,'Auth');
    return this.authService.signIn(body);
  }


  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() body: SignupDto) {
    this.loggingService.log(`Sign up ${body.login}`,'Auth');
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string){
    this.loggingService.log(`Refresh Token`,'Auth');
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.authService.refresh(refreshToken);
  }


}
