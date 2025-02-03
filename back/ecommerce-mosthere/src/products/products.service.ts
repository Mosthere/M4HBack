import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
  ){}
  async seedProducts(){
    await this.productRepository.addProductsSeed()
    console.log("Done")
  }
  
  async buyProducts(id: string){
    const product = await this.productRepository.findOneProduct(id)
    product.stock = Number(product.stock)
    if (product.stock === 0){
      throw new Error("Sin stock")
    }
    const stock = product.stock -1
    await this.productRepository.update(id, stock)
    return product.price
  }

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.createProduct(createProductDto)
    return newProduct
  }
  async updateProducts(id: string, updateProduct: UpdateProductDto) {
    const updatedProduct = await this.productRepository.findAndUpdate(id, updateProduct);
    return updatedProduct
  }
  async getAllProducts(page, limit) {
    return await this.productRepository.findAll(page, limit) ;
  }
  async deleteProducts(id: string) {
    const returnedId = this.productRepository.findOneProduct(id)
    await this.productRepository.deleteProducts(id)
    return returnedId
  }
  async getOneProduct(id: string) {
    return await this.productRepository.getOneProductById(id)
  }
}
