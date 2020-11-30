import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { RoleType } from 'src/core/common/constants/role-type';

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
}
