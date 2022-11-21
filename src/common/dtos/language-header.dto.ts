import { IsEnum } from 'class-validator';
import { LanguageEnum } from '@app/common/enums/language.enum';

export class LangHeaderDto {
  @IsEnum(LanguageEnum, {
    message: `Wrong language. Available languages: ${Object.values(LanguageEnum).join(
      ', ',
    )}.`,
  })
  readonly language: string;
}
