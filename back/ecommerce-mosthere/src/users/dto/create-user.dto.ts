import { IsOptional, IsString, Length, Matches } from "class-validator"
export class CreateUserDto {
    
    @IsString()
    @Length(20, 25)
    name: string

    @IsString()
    email: string

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    @IsString()
    password: string

    @IsString()
    address: string

    @IsString()
    phone: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    city: string
}
