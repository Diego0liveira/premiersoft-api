import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { RequestInterceptor } from './common/interceptors/request/request.interceptor';
import { LoggingService } from './resources/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API to manage users')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const loggingService = app.get(LoggingService);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));
  app.useGlobalInterceptors(new RequestInterceptor());
  app.useLogger(['log', 'debug', 'error', 'warn']);

  const PORT = process.env.PORT || 3000;

  console.log(`API REST is running  on port ${PORT}...`);

  await app.listen(PORT);
}
bootstrap();
