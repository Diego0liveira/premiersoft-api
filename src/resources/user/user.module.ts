import { CacheModule } from '@nestjs/cache-manager';
import { forwardRef, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';
import { UserKafkaConsumerController } from './user-kafka-consumer.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController, UserKafkaConsumerController],
  imports: [
    forwardRef(() => LoggingModule),
    
    CacheModule.register({
      store: redisStore, 
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      ttl: parseInt(process.env.CACHE_TTL, 10) || 300,
    }),
  ],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
