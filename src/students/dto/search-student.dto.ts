import { IsOptional } from 'class-validator';

export class SearchStudentDto {
  @IsOptional()
  readonly name?: string;
}
