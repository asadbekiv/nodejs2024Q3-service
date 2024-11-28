
import { Injectable, UnauthorizedException,ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { User } from '../users/user.entity';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(private usersService:UsersService,private jwtService: JwtService) {
  }

  async signIn(body:SigninDto): Promise<any> {
    const user:User=await this.usersService.findByLoginAndPassword(body.login,body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, login: user.login };
    const accessToken:string = this.jwtService.sign(payload);
    const refreshToken:string = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };

  }

  async signUp(body:SignupDto): Promise<any> {
    return this.usersService.create(body)
  }

  async refresh(refreshToken:string): Promise<any> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    console.log('Payload', payload);
    const newPayload = { userId: payload.userId, login: payload.login };

    const accessToken = this.jwtService.sign(newPayload,{
      secret:process.env.JWT_SECRET_KEY,
      expiresIn:process.env.TOKEN_EXPIRE_TIME
    });
    const newRefreshToken = this.jwtService.sign(newPayload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken: newRefreshToken };

    }catch{
      throw new ForbiddenException('Invalid or expired refresh token');;
    }

  }




}
