import { IsNumberString } from 'class-validator';
export class SearchClassDto {
  @IsNumberString()
  classID: number;
}
