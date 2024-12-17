import { Test, TestingModule } from '@nestjs/testing';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';

describe('LoggingController', () => {
  let controller: LoggingController;
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggingController],
      providers: [LoggingService],
    }).compile();

    controller = module.get<LoggingController>(LoggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should return search results', async () => {
      const result = { hits: { total: { value: 1 }, hits: [{ _source: { message: 'test' } }] } };
      jest.spyOn(service, 'search').mockResolvedValue(result as any);

      expect(await controller.search('test', 'test')).toBe(result);
      expect(service.search).toHaveBeenCalledWith('test', 'test');
    });
  });
});
