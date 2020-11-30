import { Injectable } from "@nestjs/common";
import { use } from "passport";
import { UserService } from "src/modules/user/user.service";
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class FacebookStrategy {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.configService.get('FACEBOOK_APP_ID'),
          clientSecret: this.configService.get('FACEBOOK_APP_SECRET'),
          fbGraphVersion: 'v3.0',
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.authService.findOrCreateFacebookAuth(
            profile , accessToken , refreshToken
          );
          return done(null, user);
        },
      ),
    );
  }
}