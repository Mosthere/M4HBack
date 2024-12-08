import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class CreateProductDto {

    @ApiProperty({
        type: String,
        description: 'Name of product',
        example: 'Logitech g310 mouse'
    })
    @IsString()
    name: string

    @ApiProperty({
        type: String,
        description: 'product description',
        example: 'Mouse logitech type g310'
    })
    @IsString()
    description: string

    @ApiProperty({
        type: Number,
        description: 'Price of products',
        example: 15
    })
    @IsNumber()
    price: number

    @ApiProperty({
        type: Number,
        description: 'Stock of product',
        example: 50,
    })
    @IsNumber()
    stock: number 

    @ApiProperty({
        type: String,
        description: 'igmUrl of product',
        example: 'https://acdn.mitiendanube.com/stores/001/474/949/products/yt-006-111-cd66bbf1c3d088714216287839744679-1024-1024.png'
    })
    @IsString()
    imgUrl: string

    @ApiProperty({
        type: String,
        description: 'Category id from product',
    })
    @IsNumber()
    categoryId: string

}
