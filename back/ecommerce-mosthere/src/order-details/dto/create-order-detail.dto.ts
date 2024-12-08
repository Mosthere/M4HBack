import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty({
        type: Number,
        description: 'Price of order',
        required: true,
        example: 100
    })
    price: number;

    @ApiProperty({
        type: Object,
        description: 'Order of products',
        required: true,
    })
    order: object;

    @ApiProperty({
        type: Array,
        description: 'Products of order',
        required: true
    })
    products: Array<object>;
}
