import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/users/enum/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';

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
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Puts admin role if not given',
  })
  async putAdminRole(@Param('id') id: string){
    const user = await this.authService.putAdminRole(id)
    return `User id:${user.id}, changed role to ${user.administrador}` 
  }
}
