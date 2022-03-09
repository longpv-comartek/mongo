import { Expose, Type } from 'class-transformer';
import { IsInt, IsPositive, Max, Min } from 'class-validator';
export class CreateScoreDto {
  @Expose({ name: 'studentId' })
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  readonly student: string;

  @Expose({ name: 'subjectId' })
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  readonly subject: string;

  @Min(1)
  @Max(10)
  @Type(() => Number)
  readonly score: number;
}
