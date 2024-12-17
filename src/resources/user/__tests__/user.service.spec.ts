
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from '../entities/user-role.enum';
import { UserService } from '../user.service';

describe('UserService', () => {
	let service: UserService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, PrismaService],
		}).compile();

		service = module.get<UserService>(UserService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a user', async () => {
		const createUserDto = new CreateUserDto({ name: 'John Doe', email: 'john@example.com', role: UserRole.CLIENT });
		jest.spyOn(prismaService.user, 'create').mockResolvedValue(createUserDto as any);

		expect(await service.create(createUserDto)).toEqual(createUserDto);
	});

	it('should throw an error if user creation fails', async () => {
		const createUserDto = new CreateUserDto({ name: 'John Doe', email: 'john@example.com', role: UserRole.CLIENT });
		jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error('User creation failed'));

		await expect(service.create(createUserDto)).rejects.toThrow('User creation failed');
	});

	it('should find all users', async () => {
		const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
		jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users as any);

		expect(await service.findAll()).toEqual(users);
	});

	it('should throw an error if find all users fails', async () => {
		jest.spyOn(prismaService.user, 'findMany').mockRejectedValue(new Error('Find all users failed'));

		await expect(service.findAll()).rejects.toThrow('Find all users failed');
	});

	it('should find a user by id', async () => {
		const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
		jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user as any);

		expect(await service.findById(1)).toEqual(user);
	});

	it('should return null if user not found by id', async () => {
		jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

		expect(await service.findById(999)).toBeNull();
	});

	it('should throw an error if find user by id fails', async () => {
		jest.spyOn(prismaService.user, 'findUnique').mockRejectedValue(new Error('Find user by id failed'));

		await expect(service.findById(1)).rejects.toThrow('Find user by id failed');
	});

	it('should update a user', async () => {
		const updateUserDto: UpdateUserDto = { name: 'Jane Doe' };
		const updatedUser = { id: 1, name: 'Jane Doe', email: 'john@example.com' };
		jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser as any);

		expect(await service.update(1, updateUserDto)).toEqual(updatedUser);
	});

	it('should throw an error if user update fails', async () => {
		const updateUserDto: UpdateUserDto = { name: 'Jane Doe' };
		jest.spyOn(prismaService.user, 'update').mockRejectedValue(new Error('User update failed'));

		await expect(service.update(1, updateUserDto)).rejects.toThrow('User update failed');
	});

	it('should filter users by field', async () => {
		const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
		jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users as any);

		expect(await service.filterByField('name', 'John Doe')).toEqual(users);
	});

	it('should throw an error if filter users by field fails', async () => {
		jest.spyOn(prismaService.user, 'findMany').mockRejectedValue(new Error('Filter users by field failed'));

		await expect(service.filterByField('name', 'John Doe')).rejects.toThrow('Filter users by field failed');
	});

	it('should delete a user', async () => {
		const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
		jest.spyOn(prismaService.user, 'delete').mockResolvedValue(user as any);

		expect(await service.delete(1)).toEqual(user);
	});

	it('should throw an error if user deletion fails', async () => {
		jest.spyOn(prismaService.user, 'delete').mockRejectedValue(new Error('User deletion failed'));

		await expect(service.delete(1)).rejects.toThrow('User deletion failed');
	});
});
