import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateStudentDto {
  @IsString()
  readonly name: string;

  @IsDate()
  @Type(() => Date)
  readonly dob: Date;

  @IsEnum({
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other',
  } as const)
  readonly gender: 'Male' | 'Female' | 'Other';

  @IsEmail()
  readonly email: string;

  @Expose({ name: 'classId' })
  @IsPositive()
  @IsInt()
  @Type(() => String)
  readonly class: string;
}
