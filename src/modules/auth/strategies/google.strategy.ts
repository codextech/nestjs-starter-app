import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly authService: AuthService,
    configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get('APPURL')}/api/auth/google/redirect`,
      scope: 'openid profile email',
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name={}, emails=[], photos=[] } = profile
    const user = {
      email: emails & emails[0].value,
      firstName: name & name.givenName,
      lastName: name & name.familyName,
      picture: photos &photos[0].value,
      accessToken
    }
    done(null, user);
  }
}