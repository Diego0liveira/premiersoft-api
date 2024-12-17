import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class MonitoringController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly http: HttpHealthIndicator,
	) {}

	@Get()
	async check() {
		return this.health.check([() => this.http.pingCheck('google', 'https://www.google.com')]);
	}

	@Get('db')
	async checkDb() {
		return this.health.check([() => this.http.pingCheck('database', 'http://localhost:5432')]);
	}
}
