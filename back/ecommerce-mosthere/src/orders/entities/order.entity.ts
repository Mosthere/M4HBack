import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'order'
}
)
export class Order {
    @ApiProperty({
        type: String,
        description: 'Id of order-entity',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @ApiProperty({
        type: [User],
        description: 'User orders in order-entity',
    })
    @ManyToOne(() => User, (users) => users.orders)
    user: User

    @ApiProperty({
        type: Date,
        description: 'Date of order in order-entity'
    })
    @Column()
    date: Date

    @ApiProperty({
        type: [OrderDetail],
        description: 'Order-details in order-entity '
    })
    @OneToOne(() => OrderDetail, (order_detail) => order_detail.order)
    OrderDetails: OrderDetail
}
