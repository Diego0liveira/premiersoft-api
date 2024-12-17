import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	imports: [forwardRef(() => LoggingModule)],
	providers: [UserService, PrismaService],
	exports: [UserService],
})
export class UserModule {}
