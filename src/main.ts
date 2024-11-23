import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const PORT = process.env.PORT;




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


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
}
bootstrap();
