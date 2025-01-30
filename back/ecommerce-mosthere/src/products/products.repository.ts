import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "src/categories/entities/category.entity";
import { productsMock } from "src/seeds/products/products-mock";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async findAndUpdate(id, updateProduct) {
        const getProduct = await this.findOneProduct(id)
        Object.assign(getProduct, updateProduct)
        const updatedProduct = await this.categoryRepository.save(getProduct)
        return updatedProduct
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
        
        async findOneProduct(id: string){
            const foundProduct = await this.productRepository.findOne({where: {id}})
            return foundProduct
        }
        
        async createProduct(createProductDto: CreateProductDto) {
            const newProduct = {
                ...createProductDto
              }
            const newDbProduct = await this.productRepository.save(newProduct)
            return newDbProduct
        }
        async updateImage(id, imgUrl){
            return this.productRepository.update(id, {imgUrl})
        }
        async update(id: string, stock: number){
            const product = await this.findOneProduct(id)
            
            product.stock = stock
            return this.productRepository.save(product)
        }
        async findAll() {
          return await this.productRepository.find();
        }
        async deleteProducts(id: string) {
            await this.productRepository.delete(id)
        }
        async getOneProductById(id: string) {
          const product = await this.productRepository.findOne({where: {id}})
          if(!product){
            throw new Error(`Product with id ${id} not found`)
          }
          return product
        }
}