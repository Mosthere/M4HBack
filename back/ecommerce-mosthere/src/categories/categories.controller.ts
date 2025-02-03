import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Role } from 'src/users/enum/role.enum';
import { Roles } from 'src/decorators/role.decorators';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  async createSeeder() {
    return await this.categoriesService.seedCategories()
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gets categories',
  })
  async findAll() {
    return await this.categoriesService.findCategories()
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Creates category',
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ){
    const newCategory = await this.categoriesService.createCategory(createCategoryDto)
    return newCategory
  }
}
