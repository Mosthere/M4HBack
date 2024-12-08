import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, Matches } from "class-validator"
export class CreateUserDto {
    
    @IsString()
    @Length(3, 80)
    @ApiProperty({example: 'Martin'})
    name: string

    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    @IsString()
    @ApiProperty({example: 'martinmail@gmail.com'})
    email: string;
    

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    @IsString()
    @Length(8, 15)
    @ApiProperty({example: "aSecurePassword1!"})
    password: string

    @IsString()
    @Length(8, 15)
    @ApiProperty({example: "aSecurePassword1!"})
    passwordConfirm: string

    @IsString()
    @Length(3, 80)
    @ApiProperty({example: 'My adress 123'})
    address: string

    @IsNumber()
    @ApiProperty({example: 505043})
    phone: number
    
    @IsString()
    @IsOptional()
    @Length(5, 20)
    @ApiProperty({example: 'Argentina'})
    country: string

    @IsString()
    @IsOptional()
    @Length(5, 20)
    @ApiProperty({example: 'Morteros'})
    city: string
}
