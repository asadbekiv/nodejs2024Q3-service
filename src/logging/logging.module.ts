import { Module } from '@nestjs/common';
import {LoggingService} from './logging.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [LoggingService],
  exports:[LoggingService]
})
export class LoggingModule {}
