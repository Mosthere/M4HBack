import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

    @ManyToOne(() => Product, (product) => product.id)
    products: Product
}
