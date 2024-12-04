import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "src/categories/entities/category.entity";
import { productsMock } from "src/seeds/products/products-mock";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}
    
    async findAndUpdate(id, updateProduct) {
        const getProduct = await this.findOneById(id)
        Object.assign(getProduct, updateProduct)
        await this.categoryRepository.save(getProduct)
    }

    async findCategoryByName(category: string){
        const foundCategory = await this.categoryRepository.findOne({
            where: {name: category}
        })
        if (!foundCategory){
            throw new Error(`Category ${category} not found`)
        }
        return foundCategory
    }

    async addProductsSeed(){
        const existingProducts = (await this.productRepository.find()).map(
            (product) => product.name
        )

        for (const productData of productsMock)
            if(!existingProducts.includes(productData.name)){
                const product = new Product()
                product.name = productData.name
                product.description = productData.description
                product.price = productData.price
                product.stock = productData.stock
                product.category = await this.findCategoryByName(productData.category)
                await this.productRepository.save(product)
            }
    }

    async findOneById(id){
        const foundProduct = await this.productRepository.findOne(id)
        return foundProduct
    }

    async update(id, stock){
        const product = await this.findOneById(id)

        product.stock = stock
        return this.productRepository.save(product)
    }
}