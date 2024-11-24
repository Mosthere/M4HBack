import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Get('pag')
  // findWithPagination(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 5,
  // ){
  //   return this.usersService.pag(page, limit)
  // }
}
