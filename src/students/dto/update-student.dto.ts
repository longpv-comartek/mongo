import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Length,
} from 'class-validator';
import { score } from 'src/score/schema/score.schema';
export class UpdateStudentDto {

  @Length(3, 60)
  @IsOptional()
  readonly name?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly dob?: Date;

  @IsEnum({
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other',
  } as const)
  @IsOptional()
  readonly gender?: 'Male' | 'Female' | 'Other';

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @Expose({ name: 'class' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly class?: string;


  @IsOptional()
  readonly score?: score[]
}
