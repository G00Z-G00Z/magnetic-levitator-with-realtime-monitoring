import { Test, TestingModule } from '@nestjs/testing';
import { MicroDataGateway } from './micro-data.gateway';

describe('MicroDataGateway', () => {
  let gateway: MicroDataGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroDataGateway],
    }).compile();

    gateway = module.get<MicroDataGateway>(MicroDataGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
