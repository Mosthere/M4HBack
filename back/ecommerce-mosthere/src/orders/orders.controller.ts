import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Creates order',
  })
  @ApiBody({
    description: 'Creates order by given ids',
    examples: {
      Order:{
        value: {
          userId: "3bbc6ad6-f1bd-4e6b-93d4-1504c4e5efaa",
          products: [
            { "id": "9b9e4df3-55d7-432c-bd22-1debcbc212ae" }
          ]
        }
      }
    }
  })
  async create(@Body() order) {
    const { userId, products } = order
    return await this.ordersService.addOrder(userId, products);
  }
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all orders',
  })
  async getAll(){
    return await this.ordersService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets user by given id',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete orders',
  })
  async removeOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.removeOrder(id)
  }
}
