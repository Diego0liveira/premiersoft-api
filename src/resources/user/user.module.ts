import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';
import { UserKafkaConsumerController } from './user-kafka-consumer.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController, UserKafkaConsumerController],
	imports: [forwardRef(() => LoggingModule)],
	providers: [UserService, PrismaService],
	exports: [UserService],
})
export class UserModule {}
