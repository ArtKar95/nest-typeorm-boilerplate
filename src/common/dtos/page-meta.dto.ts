import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '@app/common/interfaces/page-meta-parameters.interface';

export class PageMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  constructor({ pageOptions, itemsCount }: PageMetaDtoParameters) {
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.itemCount = itemsCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
