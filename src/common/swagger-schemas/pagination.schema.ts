import { getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '@app/common/dtos/page.dto';

export const PaginationSchema = (dto: any) => {
  return {
    schema: {
      allOf: [
        { $ref: getSchemaPath(PageDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(dto) },
            },
          },
        },
      ],
    },
  };
};
