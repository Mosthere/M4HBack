import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
    @ApiProperty({
        type: String,
        description: 'Email of user',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        description: 'Password of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string

    constructor(partial: Partial<SignInAuthDto>){
        Object.assign(this, partial)

    }
}
