import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";

export class OrderResponseDto {
    @ApiProperty({
        description: 'Id of order response',
    })
    id: string;

    @ApiProperty({
        description: 'Price of order response',
    })
    price: number;

    @ApiProperty({
        description: 'Products of order response',
    })
    products: object[];

    @ApiProperty({
        description: 'Full order of order response',
    })
    order: {
        id: string;
        date: Date;
        user: {
            id: string
        }
    }

    constructor(orderDetail: OrderDetail){
        this.id = orderDetail.id
        this.price = orderDetail.price
        this.products = orderDetail.products
        this.order = { 
            id: orderDetail.order.id,
            date: orderDetail.order.date,
            user: {
               id: orderDetail.order.user.id
             }
        }
    }
}