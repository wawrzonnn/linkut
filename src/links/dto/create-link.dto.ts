/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUrl, Validate } from 'class-validator';
import { IsHttpOrHttps } from '../validators/is-http-or-https.validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Validate(IsHttpOrHttps)
  originalUrl: string;
}
