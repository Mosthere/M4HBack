// import { Injectable } from '@nestjs/common';
// import { CreateOrderDto, ProductId } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { OrderRepository } from './order.repository';
// import { UsersService } from 'src/users/users.service';
// import { ProductsService } from 'src/products/products.service';
// import { OrderDetailsService } from 'src/order-details/order-details.service';
// import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
// import { OrderResponseDto } from './dto/response-order.dto';

import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Product } from "src/products/entities/product.entity";

// @Injectable()
// export class OrdersService {
//   constructor(
//     private readonly orderRepository: OrderRepository,
//     private readonly usersService: UsersService,
//     private readonly productsService: ProductsService,
//     private readonly orderDetails: OrderDetailsService
//   ){}
//   async create(createOrderDto: CreateOrderDto) {
//     const { userId, products } = createOrderDto
//     const user = await this.usersService.getUserById(userId)
    
//     const order = {
//       user: user,
//       date: new Date()
//     }
//     const orderEntity = await this.orderRepository.addOrder(order)

//     let pivot = 0
//     for (const product of products){
//       const existProduct = await this.productsService.getOneProduct(product[pivot])
//       if(!existProduct){
//         throw new Error('No product provided')
//       }
//       pivot+= 1
//     }
//     const total = await this.calcularTotal(products)

//     const orderDetail = new CreateOrderDetailDto()
//     orderDetail.order = orderEntity
//     orderDetail.price = total
//     orderDetail.products = products

//     const orderDetailEntity = await this.orderDetails.create(orderDetail)

//     return new OrderResponseDto(orderDetailEntity)
//   }

//   async calcularTotal(products: Array<ProductId>){
//     let total = 0
//     for (const product of products){
//       total += await this.productsService.buyProducts(product.id)
//     }
//     return total
//   }


//   async findOne(id: string) {
  //     const order = await this.orderRepository.getOrder(id)
  //     const orderDetail = await this.orderDetails.findOneByOrderId(
    //       order.id, 
    //       ['products', 'order']
    //     )
    //     return orderDetail
    //   }
    
    
// }

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository){}
  
  async addOrder(userId: string, products: Partial<Product>[]){
    return await this.ordersRepository.addOrder(userId, products)
  }
  
  async getOrder(id){
    return await this.ordersRepository.getOrder(id)
  }
  async findAll(){
    return await this.ordersRepository.findAllOrders()
  }
  async removeOrder(id){
    return await this.ordersRepository.removeOrder(id)
  }
}
