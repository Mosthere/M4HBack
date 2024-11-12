import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

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
}
