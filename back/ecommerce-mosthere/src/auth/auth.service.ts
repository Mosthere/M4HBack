import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);
    if (!user) {
      throw new HttpException('User not exist', 404);
    }
    const isPasswordMatching = await compare(
      signInUser.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.createToken(user)
    return { token }
    // const user = this.userService.findByEmail(credentials.email)
    // if (user && user.password === credentials.password ){
    //   return 'Logged In'
    // }
    // return 'Invalid Credentials'
  }

  async signUp(signUpUser: SignUpAuthDto) {
    if (signUpUser.password != signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', 400);
    }
    signUpUser.password = await hash(signUpUser.password, 10);
    return await this.userService.createUser(signUpUser);
  }

  private async createToken(user: User){
    const payload = {
      id: user.id,
      email: user.email,
    }

    return this.jwtService.signAsync(payload)
  }
}
