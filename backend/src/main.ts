import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeedService } from './database/seeds/user.seed';
import { SeedModule } from './database/seeds/seed.module';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Your NextJS frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Jop portal app')
    .setDescription('API documentation for NestJs real job protal application.')
    .setVersion('1.0')
    .addTag('job protal')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  // const seedService = app.get(SeedService);
  // await seedService.run(); 

  await app.listen(3001);
}
bootstrap();
