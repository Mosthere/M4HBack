import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository)
  {}
  async seedCategories() {
    await this.categoriesRepository.addCategories()
  }
  
  async findCategories() {
    return await this.categoriesRepository.getCategories()
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.createCategory(createCategoryDto)
    return newCategory
  }
}
