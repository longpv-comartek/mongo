import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Length, IsNumber } from 'class-validator';
import { students } from '../../students/schema/student.schema'

export class UpdateClassDto {
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  readonly id: number;

  @Length(3, 60)
  readonly name: string;

  @Length(3, 60)
  readonly teacherName: string;

  @IsNumber()
  totalMember: number

  @IsOptional()
  readonly students?: students[];
}
