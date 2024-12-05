import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface ProductId {
    id: string
}

export class CreateOrderDto {
    @ApiProperty({
        type: String,
        description: 'userId',
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID('4')
    userId: string

    @ApiProperty({
        type: Array,
        description: 'Array of products id',
    })
    @IsArray()
    products: Array<ProductId>
}