import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  
  //     password: 'contraseña000',
  //     address: 'Plaza Mayor 101',
  //     phone: '777-888-9999',
  //   },
  // ];
  
  constructor
  (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>     
  ){}
  //   private users = [
  //       {
  //     id: '1',
  //     email: 'usuario1@example.com',
  //     name: 'Usuario Uno',
  //     password: 'contraseña123',
  //     address: 'Calle Falsa 123',
  //     phone: '123-456-7890',
  //   },
  //   {
  //       id: '2',
  //     email: 'usuario2@example.com',
  //     name: 'Usuario Dos',
  //     password: 'contraseña456',
  //     address: 'Avenida Siempre Viva 456',
  //     phone: '098-765-4321',
  
  //   },
  //   {
  //     id: '3',
  //     email: 'usuario3@example.com',
  //     name: 'Usuario Tres',
  //     password: 'contraseña789',
  //     address: 'Boulevard de los Sueños Rotos 789',
  //     phone: '555-555-5555',
  //   },
  //   {
  //       id: '4',
  //       email: 'usuario4@example.com',
  //     name: 'Usuario Cuatro',
  //     password: 'contraseña000',
  //     address: 'Plaza Mayor 101',
  //     phone: '777-888-9999',
  //   },
  // ];
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  
  async findOne(id: string) {
    const foundUser = await this.usersRepository.findOne({where: {id}})
    return foundUser;
  }

  async findOneByMail(email: string){
    const foundEmail = await this.usersRepository.findOne({where: {email}})
    return foundEmail
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...createUserDto
    }
    const dbUser = await this.usersRepository.save(newUser)
    return dbUser
  }
  async getUserAndUpdate(id: string, updateUser: UpdateUserDto) {
    const getUser = await this.usersRepository.findOne({where: {id}})
    Object.assign(getUser, updateUser)
    return await this.usersRepository.save(getUser)
  }
  async removeUserById(id: string){
    await this.usersRepository.delete(id)
  }
  async updateUserAdminRole(user: User) {
    await this.usersRepository.save(user)
  }
}
