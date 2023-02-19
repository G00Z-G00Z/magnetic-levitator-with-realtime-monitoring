import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroDataModule } from './micro-data/micro-data.module';

@Module({
  imports: [MicroDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
