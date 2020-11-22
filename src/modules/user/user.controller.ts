import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(@Query() query): Promise<any> {
     return await this.userService.findAll(query);
    }

}
