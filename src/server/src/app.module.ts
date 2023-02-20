import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MicroDataModule } from './micro-data/micro-data.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MicroDataModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
