import {
	Controller,
	Get,
	Query
} from '@nestjs/common';
import { LoggingService } from './logging.service';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  search(@Query() index: any, @Query() query: any) {
    return this.loggingService.search(index, query);
  }
}
