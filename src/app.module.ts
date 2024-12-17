import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { RequestInterceptor } from './interceptors/request/request.interceptor';
import { InspectRequestMiddleware } from './middleware/inspect-request/inspect-request.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggingModule } from './resources/logging/logging.module';
import { MonitoringModule } from './resources/monitoring/monitoring.module';
import { UserModule } from './resources/user/user.module';

export const IS_PROD = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en_US',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      loader: I18nJsonLoader,
      resolvers: [
        {
          use: HeaderResolver,
          options: ['lang', 'x-custom-lang', 'accept-language'],
        },
        AcceptLanguageResolver,
      ],
    }),
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
    DevtoolsModule.register({
      http: !IS_PROD,
    }),
    UserModule,
    LoggingModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InspectRequestMiddleware).forRoutes('*');
  }
}
