import { Injectable, NotFoundException } from "@nestjs/common";
import { FileUploadRepository } from "./file-upload.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class FileUploadService{
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ){}

    async uploadProductImage(file: Express.Multer.File, productId: string){
        const product = await this.productsRepository.findOneBy({id: productId})
        if (!Product){
            throw new NotFoundException('Product not found')
        }

        const uploadImage = await this.fileUploadRepository.uploadImage(file)

        await this.productsRepository.update(product.id, {
            imgUrl: uploadImage.secure_url
        })

        const updatedProduct = await this.productsRepository.findOneBy({
            id: productId
        })

        return updatedProduct
    }
}