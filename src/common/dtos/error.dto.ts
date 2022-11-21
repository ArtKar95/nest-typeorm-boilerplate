import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ description: 'Error status' })
  @IsNumber()
  readonly status: number;

  @ApiProperty({ description: 'Error message', example: 'Error message' })
  @IsString()
  readonly message: string;
}
