import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository
  ){}
  async seedProducts(){
    await this.productRepository.addProductsSeed()
    console.log("Done")
  }

  async buyProducts(id: string){
    const product = await this.productRepository.findOneById(id)
    if (product.stock === 0){
      throw new Error("Sin stock")
    }
    await this.productRepository.update(id, {
      stock: product.stock -1,
    })
    return product.price
  }
}
