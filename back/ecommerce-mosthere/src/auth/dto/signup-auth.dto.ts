import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, Matches } from "class-validator"
export class SignUpAuthDto {
    
    @ApiProperty({
        type: String,
        description: 'Name of user',
        required: true
    })
    @IsString()
    @Length(3, 80)
    name: string

    @ApiProperty({
        type: String,
        description: 'Email of user',
        required: true
    })
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    @IsString()
    email: string;
    
    @ApiProperty({
        type: String,
        description: 'Password of user',
        required: true
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    @IsString()
    @Length(8, 15)
    password: string

    @ApiProperty({
        type: String,
        description: 'Confirm password of user',
        required: true
    })
    @IsString()
    @Length(8, 15)
    passwordConfirm: string

    @ApiProperty({
        type: String,
        description: 'Address of user',
        required: false
    })
    @IsString()
    @Length(3, 80)
    address: string

    @ApiProperty({
        type: Number,
        description: 'Phone number of user',
        required: true
    })
    @IsNumber()
    phone: number

    @ApiProperty({
        type: String,
        description: 'Country of user',
        required: false
    })
    @IsString()
    @IsOptional()
    @Length(5, 20)
    country: string

    @ApiProperty({
        type: String,
        description: 'City of user',
        required: false
    })
    @IsString()
    @IsOptional()
    @Length(5, 20)
    city: string

    constructor(partial: Partial<SignUpAuthDto>){
        Object.assign(this, partial)
    }
}
