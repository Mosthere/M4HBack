import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  async createSeeder() {
    return await this.categoriesService.seedCategories()
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findCategories()
  }
}
