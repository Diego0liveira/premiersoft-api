import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest();
		const method = req.method;
		const url = req.url;
		const body = req.body;
		const headers = req.headers;

		Logger.log('--------------------------------------');
		Logger.log(`Method: ${method}, URL: ${url}`);
		Logger.log('--------------------------------------');
		Logger.log(`Headers: ${JSON.stringify(headers)}`);
		Logger.log(`Body: ${JSON.stringify(body)}`);
		Logger.log('--------------------------------------');

		const now = Date.now();

		return next.handle().pipe(
			map((data) => {
				Logger.log(`Execution Time (${method}/${url}) ${Date.now() - now} ms`, context.getClass().name);
				Logger.log('end.');
				return data;
			}),
		);
	}
}
