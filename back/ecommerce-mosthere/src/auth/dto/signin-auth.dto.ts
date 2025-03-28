import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
    @ApiProperty({
        type: String,
        description: 'Email of user',
        required: true,
        example: 'adminmail@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        description: 'Password of user',
        required: true,
        example: 'aPassword1!'
    })
    @IsString()
    @IsNotEmpty()
    password: string

    constructor(partial: Partial<SignInAuthDto>){
        Object.assign(this, partial)

    }
}
