import { ApiProperty } from '@nestjs/swagger';

export class User {
	@ApiProperty({ description: 'User ID', example: 1 })
	id: number;

	@ApiProperty({ description: 'User name', example: 'John Doe' })
	name: string;

	@ApiProperty({ description: 'User email', example: 'johndoe@teste.com' })
	email: string;

	@ApiProperty({ description: 'User role in the system', example: 'client' })
	role: string;

	@ApiProperty({ description: 'User creation date', example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: 'Date of the last user update', example: new Date() })
	updatedAt: Date;
}
