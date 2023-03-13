import { Test, TestingModule } from '@nestjs/testing';
import { WebSocketAuthService } from './web-socket-auth.service';

describe('WebSocketAuthService', () => {
  let service: WebSocketAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocketAuthService],
    }).compile();

    service = module.get<WebSocketAuthService>(WebSocketAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
