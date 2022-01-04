import { Expose, Transform } from 'class-transformer';

export class BaseResponseDto {
  @Expose()
  @Transform(v => String(v).toString())
  _id: string;

  @Expose()
  updatedAt?: Date;

  @Expose()
  createdAt?: Date;

  constructor(partial: Partial<BaseResponseDto>) {
    Object.assign(this, partial);
  }
}