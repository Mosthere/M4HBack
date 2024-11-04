import { Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService){}
  signIn(credentials: SignInAuthDto) {
    const user = this.userService.findByEmail(credentials.email)
    if (user && user.password === credentials.password ){
      return 'Logged In'
    }
    return 'Invalid Credentials'
  }
}
