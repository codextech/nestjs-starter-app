import { Controller, Request , Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
      return this.authService.login(req.user);
    }
    
}
