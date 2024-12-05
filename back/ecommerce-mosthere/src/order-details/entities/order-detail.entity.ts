import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'order_detail'
}
)
export class OrderDetail {
    @ApiProperty({
        type: String,
        description: 'Id of order-detail entity',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: Number,
        description: 'Price of order-detail entity',
        required: true
    })
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    price: number

    @OneToOne(() => Order, (order) => order.OrderDetails)
    @JoinColumn()
    order: Order

    @ManyToMany(() => Product, (product) => product.orderDetails)
    products: Product[]
}
