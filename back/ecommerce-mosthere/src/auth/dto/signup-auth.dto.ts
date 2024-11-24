import { IsOptional, IsString, Length, Matches } from "class-validator"
export class SignUpAuthDto {
    
    @IsString()
    @Length(3, 80)
    name: string

    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    @IsString()
    email: string;
    

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    @IsString()
    @Length(8, 15)
    password: string

    @IsString()
    @Length(8, 15)
    passwordConfirm: string

    @IsString()
    @Length(3, 80)
    address: string

    @IsString()
    phone: number
    
    @IsString()
    @IsOptional()
    @Length(5, 20)
    country: string

    @IsString()
    @IsOptional()
    @Length(5, 20)
    city: string
}
