import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Product } from './entities/product.entity';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/users/enum/role.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seeder')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Seeds products if not given by app'
  })
  async productsSeeder() {
    return await this.productsService.seedProducts();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Updates product by given id',
  })
  @ApiBody({
    description: 'Product data to update',
    examples: {
      Product: {
        value: {
          name: '',
          description: '',
          price: '',
          stock: '',
          imgUrl: '',
          categoryId: ''
        },
      },
    },
  })
  async putProducts(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.updateProducts(id, updateProduct);
    return `El producto con este ID ${updatedProduct.id} fue actualizado`
  }

  @Post('create')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
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

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Gets products',
  })
  async getProducts(
    @Query('page')
    page: string,
    @Query('limit')
    limit: string
  ): Promise<Product[]> {
    return await this.productsService.getAllProducts(page, limit);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Deletes product by given id',
  })
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id:string
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
    @Param('id', ParseUUIDPipe) id: string
  ){
    const product = await this.productsService.getOneProduct(id)
    return product
  }
}
