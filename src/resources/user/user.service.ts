import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingIndex } from '../../common/enum/logging-index.enum';
import { LoggingService } from '../logging/logging.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(forwardRef(() => LoggingService))
		private readonly loggingService: LoggingService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	async create(data: CreateUserDto) {
		const user = await this.prisma.user.create({ data: { ...data } });
		await this.cacheManager.del('users:all');
		this.loggingService.logMessage(LoggingIndex.USER_CREATED, 'User created', user);
		return user;
	}

	async findAll() {

		const cacheKey = 'users:all';
		const cachedData = await this.cacheManager.get(cacheKey);

		if (cachedData) {
			this.loggingService.logMessage(LoggingIndex.USER_FETCHED, 'All users fetched from cache', cachedData);
			return cachedData;
		}

		const users = await this.prisma.user.findMany();
		await this.cacheManager.set(cacheKey, users);
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, 'All users fetched', users);
		return users;
	}

	async findById(id: number) {

		const cacheKey = `users:${id}`;
		const cachedData = await this.cacheManager.get(cacheKey);

		if (cachedData) {
			this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with id ${id} fetched from cache`, cachedData);
			return cachedData;
		}

		const user = await this.prisma.user.findUnique({ where: { id } });
		await this.cacheManager.set(cacheKey, user);
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with id ${id} fetched`, user);
		return user;
	}

	async findByEmail(email: string) {

		const cacheKey = `users:filter:email:${email}`;
		const cachedData = await this.cacheManager.get(cacheKey);

		if (cachedData) {
			this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with email ${email} fetched from cache`, cachedData);
			return cachedData;
		}

		const user = await this.prisma.user.findUnique({ where: { email } });
		await this.cacheManager.set(cacheKey, user);
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `User with email ${email} fetched`, user);
		return user;
	}

	async update(id: number, data: UpdateUserDto) {
		const user = await this.prisma.user.update({ where: { id }, data });

		await this.cacheManager.del(`users:${user.id}`);
		await this.cacheManager.del('users:all');
		await this.cacheManager.del(`users:filter:id:${user.id}`);
		await this.cacheManager.del(`users:filter:email:${user.email}`);

		this.loggingService.logMessage(LoggingIndex.USER_UPDATED, `User with id ${id} updated`, user);
		return user;
	}

	async filterByField(field: string, value: string) {

		const cacheKey = `users:filter:${field}:${value}`;
		const cachedData = await this.cacheManager.get(cacheKey);

		if (cachedData) {
			this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `Users filtered by ${field}=${value} fetched from cache`, cachedData);
			return cachedData;
		}

		const users = await this.prisma.user.findMany({ where: { [field]: value } });
		await this.cacheManager.set(cacheKey, users);
		this.loggingService.logMessage(LoggingIndex.USER_FETCHED, `Users filtered by ${field}=${value}`, users);
		return users;
	}

	async delete(id: number) {
		const user = await this.prisma.user.delete({ where: { id } });

		if (!user) {
			throw new Error('error.user.NOT_FOUND');
		}

		await this.cacheManager.del(`users:${id}`);
		await this.cacheManager.del('users:all');
		await this.cacheManager.del(`users:filter:id:${id}`);
		await this.cacheManager.del(`users:filter:email:${user.email}`);

		this.loggingService.logMessage(LoggingIndex.USER_DELETED, `User with id ${id} deleted`, user);
		return user;
	}
}
