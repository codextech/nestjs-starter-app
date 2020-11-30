import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { RoleType } from 'src/core/common/constants/role-type';
import { RegisterMethod } from 'src/core/common/constants/register-method';
import { UserDocument } from '../user/interface/UserDocument';

@Injectable()
export class AuthService {

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
    ) {}

    // async createToken(user): Promise<TokenPayloadDto> {
    //     return new TokenPayloadDto({
    //         expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    //         accessToken: await this.jwtService.signAsync({ id: user._id }),
    //     });
    // }

    async validateUser(email: string, plainPassword: string): Promise<any> {
        let user = await this.userService.findOne({ email });
        if (!user) throw new BadRequestException('Inavlid Passsword or Email');
        user = user.toJSON(); //plain mongoose object
        const isPasswordMatching = await bcrypt.compare(
          plainPassword,
          user.password,
        );
        if (!isPasswordMatching)
          throw new BadRequestException('Inavlid Passsword or Email');
        if (!user.isVerified)
          throw new BadRequestException('email not verified');
    
        const { password, verifyShortToken, verifyExpires, ...result } = user;
        return result;
      }


    
      async login(user: any) {
        const payload = {
          email: user.email,
          _id: user._id,
          isVerified: user.isVerified,
          userType: user.userType
        };
        return {
          user,
          access_token: this.jwtService.sign(payload),
        };
      }


      async register(userRegisterDto: UserRegisterDto) {
        // logic here
        let createUserDto : UserRegisterDto = {
          ...userRegisterDto,
          isVerified: true , // temporary 
          password: await bcrypt.hash(userRegisterDto.password, 10),
          roles: [RoleType.COMPANY]
        };
        let user = await this.userService.create(createUserDto);
        user = user.toJSON()
        const { password, verifyShortToken, verifyExpires, ...safeUser } = user;
        return safeUser;
      }
    
      /* Facebook */


      async findOrCreateFacebookAuth(profile , accessToken , refreshToken): Promise<UserDocument> {
        console.log("UserService -> profile", profile)
          const user = await this.userService
            .findOne({ 
              $or: [
                { 'facebook.id': profile.id },
                { 'email': profile.emails[0].value }
            ]
             })
          if (user) {
            return user;
          }
          const createdUser = this.userService.create({
            isVerified: true,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage : profile.photos[0].value,
            method : RegisterMethod.FACEBOOK,
            roles : [RoleType.COMPANY],
            facebook: {
              id: profile.id,
              token : accessToken,
              email: profile.emails[0].value,
            },
          });
          return createdUser
      }

      /* >> Facebook end << */



      /* Google */

      async findOrCreateGoogleAuth(profile): Promise<UserDocument> {
        console.log("UserService -> profile", profile)
        
        return profile
      }

}
