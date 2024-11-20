import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface ProductId {
    id: string
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID('4')
    userId: string

    @IsArray()
    products: Array<ProductId>
}