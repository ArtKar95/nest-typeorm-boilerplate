import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageArrayResponseDto {
  @ApiProperty({ description: 'Error status' })
  @IsNumber()
  readonly status: number;

  @ApiProperty({
    description: 'Error message',
    example: ['Error message'],
    type: () => String,
    isArray: true,
  })
  readonly message: string[];
}
