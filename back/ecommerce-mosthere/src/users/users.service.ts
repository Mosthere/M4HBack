import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(private readonly userRepository: UsersRepository) {}
  
  async findAll(): Promise<User[]> {
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
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto)
  }
  
  async findByEmail(email: string){
    return await this.userRepository.findOneByMail(email)
  }
  
  async updateUser(id: string, updateUser: UpdateUserDto) {
    const getUser = await this.userRepository.getUserAndUpdate(id, updateUser)
    return getUser
  }
  async removeUser(id: string) {
    const removedUserId = await this.userRepository.findOne(id)
    await this.userRepository.removeUserById(id)
    return removedUserId
  }
  async pag(page: number, limit:number){
    return { page, limit }
  }
}
