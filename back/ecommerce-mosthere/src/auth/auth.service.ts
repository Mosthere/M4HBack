import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/enum/role.enum';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
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
  }

  async signUp(signUpUser: SignUpAuthDto): Promise<User> {
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
      administrador: user.administrador,
    }

    return this.jwtService.signAsync(payload)
  }

  async putAdminRole(id: string){
    const user = await this.userService.getUserForAdmin(id)
    user.administrador = Role.Admin
    await this.usersRepository.updateUserAdminRole(user)
    return user
  }
}
