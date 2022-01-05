import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/exceptions/global-exception.handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule , {
    logger : ['error', 'warn', 'log', 'verbose', 'debug']
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  const { httpAdapter } = app.get(HttpAdapterHost);

  /* global exception handler class */
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors()


  
  /* api docs config */
  const config = new DocumentBuilder()
    .setTitle('Starter')
    .setDescription('The Starter NestJs APP')
    .setVersion('1.0')
    .addTag('starter')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });



  const configService = app.get('ConfigService');
  await app.listen(configService.get('PORT'), () => {
    console.log(`App running on ${configService.get('PORT')}`);
    console.log(`Attatched with Database : ${configService.get('DATABASE_URI')}`);
  });

}
bootstrap();
