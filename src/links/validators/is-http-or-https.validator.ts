/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsHttpOrHttps implements ValidatorConstraintInterface {
  validate(url: string, args: ValidationArguments) {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  defaultMessage(args: ValidationArguments) {
    return 'URL must start with http:// or https://';
  }
}