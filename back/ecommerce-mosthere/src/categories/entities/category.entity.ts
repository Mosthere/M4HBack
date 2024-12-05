import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'category'
}
)
export class Category {
    @ApiProperty({
        type: String,
        description: 'Id of category entity',
        required: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: String,
        description: 'String name of category entity',
        required: true
    })
    @Column({type: "varchar", length: 50, nullable: false})
    name: string

    @OneToMany(() => Product, (product) => product.id)
    products: Product
}
