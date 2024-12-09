import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation } from '@nestjs/swagger';

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
