import { Test, TestingModule } from '@nestjs/testing';
import { LoggingIndex } from '../../common/enum/logging-index.enum';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingService],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log message', async () => {
    const index = LoggingIndex.TEST;
    const message = 'test-message';
    const data = { test: 'data' };
    await service.logMessage(index, message, data);
  });

  it('should search', async () => {
    const index = LoggingIndex.TEST;
    const query = { test: 'query' };
    await service.search(index, query);
  });

  it('should search with empty query', async () => {
    const index = LoggingIndex.TEST;
    const query = {};
    await service.search(index, query);
  });

  it('should search with empty index', async () => {
    const index = '';
    const query = { test: 'query' };
    await service.search(index, query);
  });

  it('should search with empty index and query', async () => {
    const index = '';
    const query = {};
    await service.search(index, query);
  });

  it('should search with undefined index', async () => {
    const index = undefined;
    const query = { test: 'query' };
    await service.search(index, query);
  });

  it('should search with undefined index and query', async () => {
    const index = undefined;
    const query = undefined;
    await service.search(index, query);
  });

  it('should search with undefined query', async () => {
    const index = LoggingIndex.TEST;
    const query = undefined;
    await service.search(index, query);
  });

  it('should search with null index', async () => {
    const index = null;
    const query = { test: 'query' };
    await service.search(index, query);
  });

  it('should search with null index and query', async () => {
    const index = null;
    const query = null;
    await service.search(index, query);
  });

  it('should search with null query', async () => {
    const index = LoggingIndex.TEST;
    const query = null;
    await service.search(index, query);
  });

  it('should search with null index and undefined query', async () => {
    const index = null;
    const query = undefined;
    await service.search(index, query);
  });

  it('should search with undefined index and null query', async () => {
    const index = undefined;
    const query = null;
    await service.search(index, query);
  });

  it('should search with null index and empty query', async () => {
    const index = null;
    const query = {};
    await service.search(index, query);
  });

  it('should search with empty index and null query', async () => {
    const index = '';
    const query = null;
    await service.search(index, query);
  });

  it('should search with undefined index and empty query', async () => {
    const index = undefined;
    const query = {};
    await service.search(index, query);
  });

  it('should search with empty index and undefined query', async () => {
    const index = '';
    const query = undefined;
    await service.search(index, query);
  });
});
