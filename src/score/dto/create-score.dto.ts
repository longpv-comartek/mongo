import { Type } from 'class-transformer';
import { IsString, Max, Min } from 'class-validator';
export class CreateScoreDto {

  @IsString()
  readonly students: string;

  @IsString()
  readonly subject: string;

  @Min(1)
  @Max(10)
  @Type(() => Number)
  readonly score?: number;
}
