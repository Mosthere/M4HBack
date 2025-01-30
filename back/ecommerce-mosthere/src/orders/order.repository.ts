import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { ProductsRepository } from "src/products/products.repository";


@Injectable()
export class OrderRepository{
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private readonly repositoryOfProduct: ProductsRepository
    ){}
    
    async getOrder(id: string): Promise<Order>{
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: { OrderDetails: { products: true}}
        })
        if (!order) throw new Error('No order was found for that ID')
            return order
    }
    
    async addOrder(userId: string, products: Partial<Product>[]){
        console.log("Products id: ", products)
        let totalPrice = 0
        const user = await this.usersRepository.findOne({where: {id: userId}})

        if (!user) {
            throw new Error('User not found')
        }
        console.log("Total price: ", totalPrice)
        const order = new Order()
        order.date = new Date()
        order.user = user

        const newOrder = await this.orderRepository.save(order)

        const productArray = await Promise.all(
            products.map(async(product)=> {
                const existingProduct = await this.repositoryOfProduct.findOneProduct(product.id)
                    console.log('Existing product ID and Price:', existingProduct.id, existingProduct.price)
                    if (!existingProduct){
                        throw new Error(`Product ${product.id} not found`)
                    }
                    if (existingProduct.stock <= 0){
                        throw new BadRequestException(`Product ${product.id} is out of stock`)
                    }
                    console.log("New total price: ", totalPrice)
                    totalPrice += Number(existingProduct.price)
                    const stock = existingProduct.stock - 1
                    console.log("New new total price:", totalPrice)
                    await this.productsRepository.update(
                        {id: product.id}, 
                        {stock: stock}
                )
                return existingProduct
            })
        )
        
        const orderDetail = new OrderDetail()
        
        orderDetail.price = Number(totalPrice.toFixed(2))
        orderDetail.products = productArray
        orderDetail.order = newOrder
        console.log("O.Detail price: ",orderDetail.price)
        await this.orderDetailRepository.save(orderDetail)
        
        return await this.orderRepository.findOne({
            where: {id: newOrder.id},
            relations: {
                OrderDetails: true
            }
        })
    }
    async findAllOrders(){
        return await this.orderRepository.find({
            relations: ['user', 'OrderDetails']
        })
    }
    async removeOrder(id){
        return await this.orderRepository.delete(id)
    }
}