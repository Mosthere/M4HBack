import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    
  ) {}

  @Post('signin')
  async signIn(@Body() credentials: SignInAuthDto) {
    return await this.authService.signIn(credentials);
  }
  @Post('singup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpUser: SignUpAuthDto){
    const user = await this.authService.signUp(signUpUser)
    return new UserResponseDto(user)
  }
}
