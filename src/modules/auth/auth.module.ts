import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule,
    SharedModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService ,  LocalStrategy , JwtStrategy , GoogleStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
