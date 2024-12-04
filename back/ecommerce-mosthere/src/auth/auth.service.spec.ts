import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Role } from 'src/users/enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {

    const mockUserRepository: Partial<UsersRepository> = {}
    const mockUserService: Partial<UsersService> = {
      findByEmail: () => Promise.resolve(undefined),
      createUser: (entityLike?: Partial<User>) => 
        Promise.resolve({
          ...entityLike,
          administrador: Role.User,
          id: '1234fs-1234fs-1234fs-1234fs'
        } as User)
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        { provide: getRepositoryToken(User), useValue: {}},
        { provide: JwtService, useValue: {}},
        { provide: UsersService, useValue: mockUserService},
        { provide: UsersRepository, useValue: mockUserRepository }]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new SignUpAuthDto({
    name: 'Most',
    password: '123456',
    passwordConfirm: '123456',
    email: 'example@gmail.com',
    address: 'adress 1234',
    phone: 12345667
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signup creates a new user with encrypted password', async () => {
    const user = await service.signUp(mockUser)
    console.log(user)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('administrador', Role.User)
    expect(user).toHaveProperty('password')
  })
});
