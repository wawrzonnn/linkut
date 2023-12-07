/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}