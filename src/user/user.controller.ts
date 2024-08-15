import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    return this.userService.signin(loginUserDto);
  }
}
