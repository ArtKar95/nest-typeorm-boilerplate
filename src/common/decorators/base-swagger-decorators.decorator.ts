import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '@app/common/dtos/error.dto';
import { LanguageEnum } from '@app/common/enums/language.enum';

export function BaseSwaggerDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({ enum: LanguageEnum, name: 'Accept-Language' }),
    ApiInternalServerErrorResponse({
      description: 'Server error',
      type: ErrorResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ErrorResponseDto,
    }),
  );
}
