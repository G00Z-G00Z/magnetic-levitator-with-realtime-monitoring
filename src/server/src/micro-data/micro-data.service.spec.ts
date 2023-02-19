import { Test, TestingModule } from '@nestjs/testing';
import { MicroDataService } from './micro-data.service';

describe('MicroDataService', () => {
  let service: MicroDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroDataService],
    }).compile();

    service = module.get<MicroDataService>(MicroDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
