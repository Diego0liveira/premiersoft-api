import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    constructor(partial: Partial<UpdateUserDto>) {
        super();
        Object.assign(this, partial);
    }
}
