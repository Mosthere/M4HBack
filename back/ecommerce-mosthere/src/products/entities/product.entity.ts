import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'products'
})

export class Product {
    @ApiProperty({
        type: String,
        description: 'Id of product entity',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: String,
        description: 'Name in product entity',
        example: 'Mouse logitech g310',
        required: true
    })
    @Column({type: "varchar", length: 50, nullable: false})
    name: string

    @ApiProperty({
        type: String,
        description: 'Description of product in product entity',
        example: 'A logitech type mouse'
    })
    @Column({type: "text", nullable: false})
    description: string

    @ApiProperty({
        type: Number,
        description: 'Price of product entity',
        example: 15.55
    })
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    price: number

    @ApiProperty({
        type: Number,
        description: 'Stock of product entity',
        example: 40
    })
    @Column({nullable: false})
    stock: number

    @ApiProperty({
        type: String,
        description: 'imgUrl of product entity',
        example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png'
    })
    @Column({type: "varchar", nullable: true})
    imgUrl: string = 'default.png'

    @ApiProperty({
        type: [Category],
        description: 'Category array in product entity',
    })
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ApiProperty({
        type: [OrderDetail],
        description: 'OrderDetail array in product entity'
    })
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[]

}
