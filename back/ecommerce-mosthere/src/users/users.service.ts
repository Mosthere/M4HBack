import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  findAll() {
    return this.userRepository.getUsers()
  }
  
  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id)
    if(!user){
      return null
    }
    return new UserResponseDto(user as Partial<UserResponseDto>)
    // return this.userRepository.findOne(id)
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
  }
                  
  findByEmail(email: string){
    return this.userRepository.findOneByMail(email)
  }

  pag(page: number, limit:number){
    return { page, limit }
  }
}
