import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {AllExceptionsFilter} from './filter/all-exceptions.filter';
import {HttpAdapterHost} from '@nestjs/core';
import { LoggingService } from './logging/logging.service';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';


const PORT:number = Number(process.env.PORT);




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);


  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));



  // Setup swagger
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(
      'Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document)




  await app.listen(PORT, () => {
    console.log(`Server is runing on PORT ${PORT}`);
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      loggingService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(
          body,
        )} - ${statusCode}`,
      );
    });
    next();
  });

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      `Unhandled Rejection at: ${promise} reason: ${reason}`,
    );
  });
}
bootstrap();
