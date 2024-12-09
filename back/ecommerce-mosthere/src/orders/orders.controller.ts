import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Creates order',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets user by given id',
  })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }
}
