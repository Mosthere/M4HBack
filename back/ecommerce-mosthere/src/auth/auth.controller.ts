import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Sign in your user account',
  })
  async signIn(@Body() credentials: SignInAuthDto) {
    const signedInUser = await this.authService.signIn(credentials);
    return signedInUser
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Sign up your new account',
  })
  async signUp(@Body() signUpUser: SignUpAuthDto){
    const user = await this.authService.signUp(signUpUser)
    return new UserResponseDto(user)
  }

  @Put('admin/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Puts admin role if not given',
  })
  async putAdminRole(@Param('id') id: string){
    const user = await this.authService.putAdminRole(id)
    return `User id:${user.id}, changed role to ${user.administrador}` 
  }
}
