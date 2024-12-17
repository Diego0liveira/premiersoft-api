import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { LoggingIndex } from 'src/resources/logging/entities/logging-index.enum';
import { LoggingService } from 'src/resources/logging/logging.service';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(
    private readonly i18nService: I18nService,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      (exception?.getStatus && exception?.getStatus()) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string = this.i18nService.translate(exception.message, {
      lang: request.headers['accept-language'],
    }) as unknown as string;

    Logger.error(exception.stack);

    const erroDetail = {
      detail: JSON.parse(JSON.stringify(exception)),
      stack: exception.stack,
      cause: exception.cause ? (exception.cause as Error).message : null,
      url: request.url,
      query: request.query,
      baseUrl: request.baseUrl,
      method: request.method,
      path: request.path,
    };

    this.logger.error('recording error: ', erroDetail);

    this.loggingService.logMessage(LoggingIndex.ERROR, exception.name, erroDetail);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
