import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LanguageEnum } from '@app/common/enums/language.enum';

export const Language = createParamDecorator(
  (_property: string, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(0);

    return {
      language: ctx.headers['accept-language'] || LanguageEnum.EN,
    };
  },
);
