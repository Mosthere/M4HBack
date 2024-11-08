import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'order'
}
)
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne((User) => (users) => users.orders_id)
    user: User

    @Column()
    date: Date

    @OneToOne(() => OrderDetail, (order_detail) => order_detail.order)
    OrderDetails: OrderDetail
}
