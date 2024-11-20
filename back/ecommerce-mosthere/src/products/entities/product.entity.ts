import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'products'
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: "varchar", length: 50, nullable: false})
    name: string

    @Column({type: "text", nullable: false})
    description: string

    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    price: number

    @Column({nullable: false})
    stock: number

    @Column({type: "varchar", nullable: true})
    imgUrl: string = 'default.png'

    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[]

}
