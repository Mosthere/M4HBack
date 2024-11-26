import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor
  (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>     
  ){}
    // private users = [
      //   {
  //     id: '1',
  //     email: 'usuario1@example.com',
  //     name: 'Usuario Uno',
  //     password: 'contraseña123',
  //     address: 'Calle Falsa 123',
  //     phone: '123-456-7890',
  //   },
  //   {
    //     id: '2',
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
    //     id: '4',
    //     email: 'usuario4@example.com',
  //     name: 'Usuario Cuatro',
  //     password: 'contraseña000',
  //     address: 'Plaza Mayor 101',
  //     phone: '777-888-9999',
  //   },
  // ];
  async getUsers() {
    return await this.usersRepository.find();
  }
  
  async findOne(id: string) {
    // const foundUser = await this.users.find((user) => user.id === id);
    const foundUser = await this.usersRepository.findOne({where: {id}})
    return foundUser;
  }

  async findOneByMail(email: string){
    const foundEmail = await this.usersRepository.findOne({where: {email}})
    return foundEmail
  }

  async createUser(createUserDto: CreateUserDto) {
  //   const newUser = {
  //     id: this.users.length + 1,
  //     ...createUserDto,
  //   };
  //   this.users.push(newUser);
  //   return newUser
  // }
  const newUser = {
    ...createUserDto
  }
  await this.usersRepository.save(newUser)
  return newUser
  }
  updateUserAdminRole(user: User) {
    this.usersRepository.save(user)
  }
}
