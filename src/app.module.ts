import { LoggerModule } from './shared/logger/logger.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import LogsMiddleware from './core/middlewares/logs.middleware';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: `./env/.${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    // database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // mongoose.set('debug' , true)
        return {
          uri: configService.get<string>('DATABASE_URI'),
        };
      },
      inject: [ConfigService],
    }),

    SharedModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }

}
