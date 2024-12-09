import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
export class SignUpAuthDto {
  @ApiProperty({
    type: String,
    description: 'Name of user',
    required: true,
    example: 'Martin'
  })
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: true,
    example: 'newuser@gmail.com'
  })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    required: true,
    example: "aPassword1!"
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  )
  @IsString()
  @Length(8, 15)
  password: string;

  @ApiProperty({
    type: String,
    description: 'Confirm password of user',
    required: true,
    example: "aPassword1!"
  })
  @IsString()
  @Length(8, 15)
  passwordConfirm: string;

  @ApiProperty({
    type: String,
    description: 'Address of user',
    required: false,
    example: 'My adress 123'
  })
  @IsString()
  @Length(3, 80)
  address: string;

  @ApiProperty({
    type: Number,
    description: 'Phone number of user',
    required: true,
    example: 505043
  })
  @IsNumber()
  phone: number;

  @ApiProperty({
    type: String,
    description: 'Country of user',
    required: false,
    example: 'Argentina'
  })
  @IsString()
  @IsOptional()
  @Length(5, 20)
  country: string;

  @ApiProperty({
    type: String,
    description: 'City of user',
    required: false,
    example: 'Morteros'
  })
  @IsString()
  @IsOptional()
  @Length(5, 20)
  city: string;

  constructor(partial: Partial<SignUpAuthDto>) {
    Object.assign(this, partial);
  }
}
