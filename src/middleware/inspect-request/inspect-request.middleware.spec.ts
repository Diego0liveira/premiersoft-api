import { InspectRequestMiddleware } from './inspect-request.middleware';

describe('InspectRequestMiddleware', () => {
  it('should be defined', () => {
    expect(new InspectRequestMiddleware()).toBeDefined();
  });
});
