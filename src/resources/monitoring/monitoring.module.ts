import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MonitoringController } from './monitoring.controller';

@Module({
	controllers: [MonitoringController],
	imports: [TerminusModule],
	providers: [],
})
export class MonitoringModule {}
