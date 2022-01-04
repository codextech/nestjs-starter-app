import { ApiProperty } from "@nestjs/swagger";


export class PageMetaDto {
    @ApiProperty()
    readonly page: number;
  
    @ApiProperty()
    readonly take: number;
  
    @ApiProperty()
    readonly itemCount: number;
  
    @ApiProperty()
    readonly pageCount: number;
  
    @ApiProperty()
    readonly hasPreviousPage: boolean;
  
    @ApiProperty()
    readonly hasNextPage: boolean;
  
   
  constructor(partial: Partial<PageMetaDto>) {
    Object.assign(this, partial);
  }
  }