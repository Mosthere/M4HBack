import { Injectable } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class OrderRepository{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ){}

    async getOrder(orderId: string){
        return await this.orderRepository.findOne({
            where: { OrderDetails: { id: orderId}}
        }
        )
    }

    async addOrder(order){
        return this.orderRepository.save(this.orderRepository.create(order))
    }
}