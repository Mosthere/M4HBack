import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'users'
}
)
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: "varchar", length: 50, nullable: false})
    name: string
    
    @Column({type: "varchar", length: 50, nullable: false})
    email: string

    @Column({type: "varchar", length: 20, nullable: false})
    password: string

    @Column("int")
    phone: number

    @Column("varchar", { length: 50})
    country: string

    @Column("text")
    address: string

    @Column("varchar", { length: 50})
    city: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}