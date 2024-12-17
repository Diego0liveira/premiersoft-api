import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';

@Module({
  controllers: [LoggingController],
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE') || 'http://elasticsearch:9200', 
        auth: {
          username: configService.get('ELASTICSEARCH_USER') || 'elastic',
          password: configService.get('ELASTICSEARCH_PASSWORD') || 'elastic_password_123',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
