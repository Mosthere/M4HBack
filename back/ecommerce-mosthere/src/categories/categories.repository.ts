import { Injectable } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { categories } from "src/seeds/categories/categories-mock";
import { CreateCategoryDto } from "./dto/create-category.dto";


@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ){}
    async getCategories(){
        return await this.categoriesRepository.find()
    }
    async addCategories(){
        const existingCategories = await this.categoriesRepository.find({
            where: {name: In(categories)}
        })
        for (const categoryName of categories){
            if(
                !existingCategories.some((cat) => cat.name === categoryName)
            ){
                const category = new Category()
                category.name = categoryName
                await this.categoriesRepository.save(category)
            }
        }
    }
    async createCategory(createCategoryDto: CreateCategoryDto) {
      const newCategory = {
        ...createCategoryDto
      } 
      const newDbCategory = await this.categoriesRepository.save(newCategory)
      return newDbCategory
    }
}

