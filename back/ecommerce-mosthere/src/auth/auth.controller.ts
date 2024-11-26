import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param } from '@nestjs/common';
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
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpUser: SignUpAuthDto){
    const user = await this.authService.signUp(signUpUser)
    return new UserResponseDto(user)
  }

  @Put('admin/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async putAdminRole(@Param('id') id: string){
    const user = await this.authService.putAdminRole(id)
    return "Role changed to admin"
  }
}
