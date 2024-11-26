import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async findAll() {
    return await this.userRepository.getUsers()
  }
  
  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id)
    if(!user){
      return null
    }
    return new UserResponseDto(user as Partial<UserResponseDto>)
    // return this.userRepository.findOne(id)
  }

  async getUserForAdmin(id: string){
    const user = await this.userRepository.findOne(id)
    return user
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto)
  }
                  
  async findByEmail(email: string){
    return await this.userRepository.findOneByMail(email)
  }

  pag(page: number, limit:number){
    return { page, limit }
  }
}
