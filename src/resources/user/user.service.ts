import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingIndex } from '../logging/entities/logging-index.enum';
import { LoggingService } from '../logging/logging.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(forwardRef(() => LoggingService))
		private readonly loggingService: LoggingService,
	) {}

	async create(data: CreateUserDto) {
		const user = await this.prisma.user.create({ data: { ...data } });
		this.loggingService.logMessage(LoggingIndex.USER_CREATED, 'User created', user);
		return user;
	}

	async findAll() {
		const users = await this.prisma.user.findMany();
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, 'All users fetched', users);
		return users;
	}

	async findById(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with id ${id} fetched`, user);
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with email ${email} fetched`, user);
		return user;
	}

	async update(id: number, data: UpdateUserDto) {
		const user = await this.prisma.user.update({ where: { id }, data });
		this.loggingService.logMessage(LoggingIndex.USER_UPDATED, `User with id ${id} updated`, user);
		return user;
	}

	async filterByField(field: string, value: string) {
		const users = await this.prisma.user.findMany({ where: { [field]: value } });
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `Users filtered by ${field}=${value}`, users);
		return users;
	}

	async delete(id: number) {
		const user = await this.prisma.user.delete({ where: { id } });

		if (!user) {
			throw new Error('error.user.NOT_FOUND');
		}

		this.loggingService.logMessage(LoggingIndex.USER_DELETED, `User with id ${id} deleted`, user);
		return user;
	}
}
