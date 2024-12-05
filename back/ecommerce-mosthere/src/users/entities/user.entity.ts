import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'
import { Role } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: 'users'
}
)
export class User {
    @ApiProperty({
        type: String,
        description: 'Id of user entity',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: String,
        description: 'Name of user entity',
        required: true
    })
    @Column({type: "varchar", length: 50, nullable: false})
    name: string
    
    @ApiProperty({
        type: String,
        description: 'Email of user entity',
        required: true
    })
    @Column({type: "varchar", length: 50, nullable: false})
    email: string

    @ApiProperty({
        type: String,
        description: 'Password of user entity',
        required: true
    })
    @Column({type: "varchar", nullable: false})
    password: string

    @ApiProperty({
        type: Number,
        description: 'Phone number of user entity',
        required: true
    })
    @Column("int")
    phone: number

    @ApiProperty({
        type: String,
        description: 'Country of user entity',
    })
    @Column("varchar", { length: 50})
    country: string

    @ApiProperty({
        type: String,
        description: 'Address of user entity',
    })
    @Column("text")
    address: string

    @ApiProperty({
        type: String,
        description: 'City of user entity',
    })
    @Column("varchar", { length: 50})
    city: string

    @ApiProperty({
        type: Array,
        description: 'Orders array of user entity',
        required: true
    })
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @Column({default: Role.User})
    administrador: Role
}