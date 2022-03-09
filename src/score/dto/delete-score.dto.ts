import { Expose, Type } from 'class-transformer';
import { IsInt, IsPositive, ValidateIf } from 'class-validator';

export class DeleteScoreDto {
  @ValidateIf((o) => o.id || !o.subject || !o.student)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  readonly id?: string;
}
