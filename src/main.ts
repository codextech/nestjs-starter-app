import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/exceptions/global-exception.handler';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors()

  const configService = app.get('ConfigService');
  await app.listen(configService.get('PORT'), () => {
    console.log(`App running on ${configService.get('PORT')}`);
    console.log(`Attatched with Database : ${configService.get('DATABASE_URI')}`);
    // console.log("AppModule -> constructor -> mongoose ",(mongoose) )
  });

}
bootstrap();
