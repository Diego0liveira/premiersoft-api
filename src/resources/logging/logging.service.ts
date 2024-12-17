import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  constructor(
    @Inject(forwardRef(() => ElasticsearchService))
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async logMessage(index: string, message: string, data: any) {
    this.logger.log(message);
    await this.elasticsearchService.index({
      index,
      document: { message, ...data, timestamp: new Date() },
    });
  }

  async search(index: string, query: any) {
    return await this.elasticsearchService.search({ index, body: query });
  }
}
