import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs/promises';
import * as YAML from 'js-yaml';

import 'dotenv/config';

const PORT = process.env.PORT;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Home library service API Documentation')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Artists')
    .addTag('Albums')
    .addTag('Tracks')
    .addTag('Favorites')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  try {
    const yamlDocument = YAML.dump(document);
    await fs.mkdir('../doc', { recursive: true }); // Ensure doc directory exists
    await fs.writeFile('../doc/api.yaml', yamlDocument); // Write YAML file asynchronously
    console.log('API documentation saved to doc/api.yaml');
  } catch (error) {
    console.error('Error saving API documentation:', error);
  }

  await app.listen(PORT, () => {
    console.log(`Server is runing on PORT ${PORT}`);
  });
}
bootstrap();
