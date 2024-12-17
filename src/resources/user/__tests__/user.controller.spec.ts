import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from '../entities/user-role.enum';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';


describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						findById: jest.fn(),
						update: jest.fn(),
						filterByField: jest.fn(),
						delete: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a new user', async () => {
			const createUserDto = new CreateUserDto({ name: 'John Doe', email: 'john@example.com', role: UserRole.CLIENT });
			const result = { id: 1, ...createUserDto, createdAt: new Date(), updatedAt: new Date() };
			jest.spyOn(service, 'create').mockResolvedValue(result);

			expect(await controller.create(createUserDto)).toBe(result);
			expect(service.create).toHaveBeenCalledWith(createUserDto);
		});

		it('should throw an error if user creation fails', async () => {
			const createUserDto = new CreateUserDto({ name: 'John Doe', email: 'john@example.com', role: UserRole.CLIENT });
			jest.spyOn(service, 'create').mockRejectedValue(new Error('User creation failed'));

			await expect(controller.create(createUserDto)).rejects.toThrow('User creation failed');
			expect(service.create).toHaveBeenCalledWith(createUserDto);
		});
	});

	describe('findAll', () => {
		it('should return an array of users', async () => {
			const result = [{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'client', createdAt: new Date(), updatedAt: new Date() }];
			jest.spyOn(service, 'findAll').mockResolvedValue(result);

			expect(await controller.findAll()).toBe(result);
			expect(service.findAll).toHaveBeenCalled();
		});

		it('should throw an error if fetching users fails', async () => {
			jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Fetching users failed'));

			await expect(controller.findAll()).rejects.toThrow('Fetching users failed');
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should return a single user by ID', async () => {
			const result = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'client', createdAt: new Date(), updatedAt: new Date() };
			jest.spyOn(service, 'findById').mockResolvedValue(result);

			expect(await controller.findOne('1')).toBe(result);
			expect(service.findById).toHaveBeenCalledWith(1);
		});

		it('should throw an error if user is not found', async () => {
			jest.spyOn(service, 'findById').mockRejectedValue(new Error('User not found'));

			await expect(controller.findOne('1')).rejects.toThrow('User not found');
			expect(service.findById).toHaveBeenCalledWith(1);
		});
	});

	describe('update', () => {
		it('should update a user', async () => {
			const createUserDto = new CreateUserDto({ name: 'John Doe', email: 'john@example.com', role: UserRole.CLIENT });
			const updateUserDto: UpdateUserDto = { name: 'Jane Doe', email: 'jane@example.com' };
			const result = { id: 1, ...createUserDto, createdAt: new Date(), updatedAt: new Date() };
			jest.spyOn(service, 'update').mockResolvedValue(result);

			expect(await controller.update('1', updateUserDto)).toBe(result);
			expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
		});

		it('should throw an error if user update fails', async () => {
			const updateUserDto: UpdateUserDto = { name: 'Jane Doe', email: 'jane@example.com' };
			jest.spyOn(service, 'update').mockRejectedValue(new Error('User update failed'));

			await expect(controller.update('1', updateUserDto)).rejects.toThrow('User update failed');
			expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
		});
	});

	describe('filter', () => {
		it('should filter users by a field', async () => {
			const result = [{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'client', createdAt: new Date(), updatedAt: new Date() }];
			jest.spyOn(service, 'filterByField').mockResolvedValue(result);

			expect(await controller.filter('name', 'John Doe')).toBe(result);
			expect(service.filterByField).toHaveBeenCalledWith('name', 'John Doe');
		});

		it('should throw an error if filtering users fails', async () => {
			jest.spyOn(service, 'filterByField').mockRejectedValue(new Error('Filtering users failed'));

			await expect(controller.filter('name', 'John Doe')).rejects.toThrow('Filtering users failed');
			expect(service.filterByField).toHaveBeenCalledWith('name', 'John Doe');
		});
	});

	describe('delete', () => {
		it('should delete a user by ID', async () => {
			const result = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'client', createdAt: new Date(), updatedAt: new Date() };
			jest.spyOn(service, 'delete').mockResolvedValue(result);

			expect(await controller.delete('1')).toBe(result);
			expect(service.delete).toHaveBeenCalledWith(1);
		});

		it('should throw an error if user deletion fails', async () => {
			jest.spyOn(service, 'delete').mockRejectedValue(new Error('User deletion failed'));

			await expect(controller.delete('1')).rejects.toThrow('User deletion failed');
			expect(service.delete).toHaveBeenCalledWith(1);
		});
	});
});
