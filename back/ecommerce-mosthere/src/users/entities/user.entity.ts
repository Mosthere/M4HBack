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
        required: true,
        example: 'Martin'
    })
    @Column({type: "varchar", length: 50, nullable: false})
    name: string
    
    @ApiProperty({
        type: String,
        description: 'Email of user entity',
        required: true,
        example: 'martinmail@gmail.com'
    })
    @Column({type: "varchar", length: 50, nullable: false})
    email: string

    @ApiProperty({
        type: String,
        description: 'Password of user entity',
        required: true,
        example: "aSecurePassword1!"
    })
    @Column({type: "varchar", nullable: false})
    password: string

    @ApiProperty({
        type: Number,
        description: 'Phone number of user entity',
        required: true,
        example: 505043
    })
    @Column("int")
    phone: number

    @ApiProperty({
        type: String,
        description: 'Country of user entity',
        example: 'Argentina'
    })
    @Column("varchar", { length: 50})
    country: string

    @ApiProperty({
        type: String,
        description: 'Address of user entity',
        example: 'My adress 123'
    })
    @Column("text")
    address: string

    @ApiProperty({
        type: String,
        description: 'City of user entity',
        example: 'Morteros'
    })
    @Column("varchar", { length: 50})
    city: string

    @ApiProperty({
        type: [Order],
        description: 'Orders array of user entity',
        required: true,
        default: Role.User
    })
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @ApiProperty({
        enum: Role,
        description: 'User role in entity'
    })
    @Column({default: Role.User})
    administrador: Role
}