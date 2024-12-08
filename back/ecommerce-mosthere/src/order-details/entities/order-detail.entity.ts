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
        required: true,
        example: 10.50
    })
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    price: number

    @ApiProperty({
        type: [Order],
        description: 'Orders array of order-detail entity',
    })
    @OneToOne(() => Order, (order) => order.OrderDetails)
    @JoinColumn()
    order: Order

    @ApiProperty({
        type: [Product],
        description: 'Product array of order-detail entity',
    })
    @ManyToMany(() => Product, (product) => product.orderDetails)
    products: Product[]
}
