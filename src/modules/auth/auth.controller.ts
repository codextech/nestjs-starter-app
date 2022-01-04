import { Controller, Request , Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/UserRegisterDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // login
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
      return this.authService.login(req.user);
    }


  // local register
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<any> {
  console.log("AuthController -> constructor -> createUserDto", userRegisterDto)
    return this.authService.register(userRegisterDto);
  }


  /* facebook login */
  @UseGuards(AuthGuard('facebook-token'))  
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Req() req) {
    return await this.authService.login(req.user);
  }



  /* google login */

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    console.log("🚀 ~ file: auth.controller.ts ~ line 46 ~ AuthController ~ googleAuthRedirect ~ req", req)
    return this.authService.findOrCreateGoogleAuth(req.user)
  }

    
}
