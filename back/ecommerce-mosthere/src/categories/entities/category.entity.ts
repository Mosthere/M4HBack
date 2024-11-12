import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity({
    name: 'category'
}
)
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: "varchar", length: 50, nullable: false})
    name: string

    @OneToMany(() => Product, (product) => product.id)
    products: Product
}
