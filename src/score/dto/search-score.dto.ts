import { IsOptional } from 'class-validator';

export class SearchScoreDto {
  @IsOptional()
  readonly score?: number;
}
