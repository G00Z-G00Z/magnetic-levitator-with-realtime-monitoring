import { Module } from '@nestjs/common';
import { MicroDataGateway } from './micro-data.gateway';
import { MicroDataService } from './micro-data.service';

@Module({
  providers: [MicroDataGateway, MicroDataService]
})
export class MicroDataModule {}
