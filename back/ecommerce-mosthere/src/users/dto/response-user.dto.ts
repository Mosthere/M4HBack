import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Id response',
  })
  id: string;

  @ApiProperty({
    description: 'Name response',
  })
  name: string;

  @ApiProperty({
    description: 'Email response',
  })
  email: string;

  @ApiProperty({
    description: 'Address response',
  })
  address: string;

  @ApiProperty({
    description: 'Phone number response',
  })
  phone: number;

  @ApiProperty({
    description: 'Country response',
  })
  country?: string;

  @ApiProperty({
    description: 'City response',
  })
  city?: string;

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, address, phone, country, city } = partial;
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.address = address),
      (this.phone = phone),
      (this.country = country),
      (this.city = city);
  }
}
