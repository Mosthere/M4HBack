import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  findAll() {
    return this.userRepository.getUsers()
  }
  
  getUserById(id: number) {
    return this.userRepository.findOne(id)
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
  }

  removeUser(id: number) {
    return this.userRepository.removeUser(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }
                  
  findByEmail(email: string){
    return this.userRepository.findOneByMail(email)
  }

  pag(page: number, limit:number){
    return { page, limit }
  }
}
