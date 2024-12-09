import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Product } from './entities/product.entity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/users/enum/role.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seeder')
  async productsSeeder() {
    return await this.productsService.seedProducts();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Updates product by given id',
  })
  @ApiBody({
    description: 'Product data to update',
    examples: {
      Product: {
        value: {
          name: 'Updated Logitech g310 mouse',
          description: 'Updated mouse logitech type g310',
          price: 20,
          stock: 40,
          imgUrl: 'https://example.com/updated_image.png',
          categoryId: 2,
        },
      },
    },
  })
  async putProducts(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    const product = await this.productsService.updateProducts(id, updateProduct);
    return product.id
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Creates product',
  })
  async createProducts(
    @Body() createProductDto: CreateProductDto
  ){
    const product = await this.productsService.createProduct(createProductDto)
    return product.id
  }

  @Post('files/uploadImage/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Uploads file image',
  })
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    return this.productsService.uploadFile(file, id);
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gets products',
  })
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Deletes product by given id',
  })
  async deleteProduct(
    @Param('id') id:string
  ){
    const deletedProduct = await this.productsService.deleteProducts(id)
    return `Deleted product with id ${deletedProduct}`
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gets product by given id',
  })
  async getProductById(
    @Param('id') id: string
  ){
    const product = await this.productsService.getOneProduct(id)
    return product
  }
}
