import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly fileUploadService: FileUploadService
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
  
  async uploadFile(file: UploadFileDto, id: string){
    const url = await this.fileUploadService.uploadFile({
      fieldname: file.fieldname,
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    })
    await this.productRepository.update(id, {imgUrl: url})
    return {imgUrl: url}
  }
  
  async updateProducts(id, updateProduct) {
    await this.productRepository.findAndUpdate(id, updateProduct);
    
  }
  async getAllProducts() {
    return await this.productRepository.findAll() ;
  }
}
