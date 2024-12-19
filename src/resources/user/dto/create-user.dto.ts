import { OmitType } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { EmailExist } from 'src/validations/page-name-exist';
import { UserRole } from '../../../common/enum/user-role.enum';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, [] as const) {
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('error.USER.NAME_REQUIRED') })
  name: string;

  @IsNotEmpty({ message: i18nValidationMessage('error.USER.EMAIL_REQUIRED') })
  @ValidateIf((o) => !!o.email)
  @IsEmail({}, { message: i18nValidationMessage('error.USER.INVALID_EMAIL') })
  @EmailExist({ message: i18nValidationMessage('error.USER.EMAIL_EXISTS') })
  email: string;

  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('error.USER.ROLE_REQUIRED') })
  @ValidateIf((o) => !!o.role)
  @IsEnum(UserRole, {
    message: i18nValidationMessage('error.USER.INVALID_ROLE', {
      enum_values: Object.values(UserRole),
    }),
  })
  role: string;

  constructor(partial: Partial<CreateUserDto>) {
    super();
    Object.assign(this, partial);
  }
}
