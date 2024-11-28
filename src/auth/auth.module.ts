import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { LoggingModule } from '../logging/logging.module';


@Module({
  controllers: [AuthController],
  imports:[UsersModule,JwtModule.register(
    {
      global: true,
      secret:process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME}
    }),LoggingModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
