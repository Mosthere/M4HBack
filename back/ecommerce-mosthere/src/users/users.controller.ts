import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from './enum/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get all users',
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get user by given id',
  })
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Updates user by given id',
  })
  @ApiBody({
    description: 'Updates user by given id and body. Remove unusable boxes',
    examples: {
      User: {
        value: {
          name: '',
          email: '',
          password: '',
          address: '',
          phone: '',
          country: '',
          city: '',
        },
      },
    },
  })
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUser);
    return updatedUser.id
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Deletes user by given id',
  })
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.usersService.removeUser(id);
    return removedUser.id
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
