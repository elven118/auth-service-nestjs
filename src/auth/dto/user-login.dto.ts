import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum PlatformType {
  WEB = '0',
  MOBILE = '1',
}

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: PlatformType, default: '0' })
  @IsEnum(PlatformType)
  platform: '0' | '1';
}
