import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Controller } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enum/role.enum';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { UsersRepository } from 'src/users/users.repository';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('123456', 10);
    const mockUserRepository: Partial<UsersRepository> = {
    }
    const mockUserService: Partial<UsersService> = {
      findByEmail: (email: string) => {
        if (email === 'martin@mail.com') {
          return Promise.resolve({
            email: 'marin@mail.com',
            password: hashedPassword,
            administrador: 'user',
          } as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      createUser: (entityLike?: Partial<User>) =>
        Promise.resolve({
          ...entityLike,
          administrador: Role.User,
          id: '1234fs-1234fs-1234fs-1234fs',
        } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: {} },
        {
          provide: JwtService,
          useValue: { signAsync: () => Promise.resolve('mockJwtToken') },
        },
        { provide: UsersService, useValue: mockUserService },
        { provide: UsersRepository, useValue: mockUserRepository },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

  });
  const mockSignUpUser = new SignUpAuthDto({
    name: 'Most',
    password: '123456',
    passwordConfirm: '123456',
    email: 'example@gmail.com',
    address: 'adress 1234',
    phone: 12345667
  })

  const mockSignInUser = new SignInAuthDto({
    email: 'martin@mail.com',
    password: '123456',
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('signUp() should return a new userResponseDto and create User', async () => {
    const user = await controller.signUp(mockSignUpUser)
    expect(user).toBeDefined(),
    expect(user).toBeInstanceOf(UserResponseDto),
    expect(user).toHaveProperty('id')
  })
  it('signIn() should retorn a token', async () => {
    const token = await controller.signIn(mockSignInUser)
    expect(token).toBeDefined()
    expect(token).toHaveProperty('token')
  })
});

