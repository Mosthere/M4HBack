import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>
  ){}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto)
    return await this.orderDetailRepository.save(orderDetail)
  }
  async findOneByOrderId(orderId: string, relations: string[] = []){
    return await this.orderDetailRepository.find({
      where: { order: {id: orderId}},
      relations: relations,
    })
  }

  // findAll() {
  //   return `This action returns all orderDetails`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} orderDetail`;
  // }

  // update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
  //   return `This action updates a #${id} orderDetail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orderDetail`;
  // }
}
