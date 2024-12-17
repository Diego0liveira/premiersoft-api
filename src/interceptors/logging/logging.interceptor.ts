import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingIndex } from 'src/resources/logging/entities/logging-index.enum';
import { LoggingService } from 'src/resources/logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.loggingService.logMessage(LoggingIndex.API_REQUEST, 'API Request', {
          method,
          url,
          body,
          responseTime: `${duration}ms`,
        });
      }),
    );
  }
}
