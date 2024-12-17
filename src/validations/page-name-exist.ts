import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from 'src/resources/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable() 
export class EmailExistValidator implements ValidatorConstraintInterface {
	constructor(protected readonly userService: UserService) {}

    async validate(value: any, validationArguments?: ValidationArguments) {
		const user = await this.userService.findByEmail(value);
		if (!user) return true;
		return false;
	}
	
	defaultMessage?(validationArguments?: ValidationArguments): string {
		return 'error.USER.EMAIL_EXISTS';
	}
}

export function EmailExist(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: EmailExistValidator,
		});
	};
}
