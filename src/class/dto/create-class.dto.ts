import { IsOptional, Length } from 'class-validator';
export class CreateClassDto {
  @IsOptional()
  readonly name: string;

  @Length(3, 60)
  readonly teacherName: string;

  @Length(3, 60)
  readonly totalMember: string;
}
