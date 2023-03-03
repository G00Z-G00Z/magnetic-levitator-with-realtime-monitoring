import { CreateDeviceDto } from './dto/create-device.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  findAll() {
    return this.prismaService.device.findMany({});
  }

  async findOne(id: string) {
    const device = await this.prismaService.device.findUnique({
      where: { id },
    });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  async remove(id: string) {
    await this.prismaService.device.delete({ where: { id } });
    return {
      msg: 'ok',
    };
  }
}
