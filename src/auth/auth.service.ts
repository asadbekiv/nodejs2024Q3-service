
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { User } from '../users/user.entity';

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
    try {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const newPayload = { userId: payload.userId, login: payload.login };
    const accessToken = this.jwtService.sign(newPayload);
    const newRefreshToken = this.jwtService.sign(newPayload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken: newRefreshToken };

    }catch{
      throw new UnauthorizedException('Invalid refresh token');
    }

  }








}
