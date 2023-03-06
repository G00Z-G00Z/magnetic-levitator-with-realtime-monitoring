import { CreateDeviceDto } from './dto/create-device.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceTypesService } from 'src/device-types/device-types.service';
import { Device, Prisma } from '@prisma/client';

@Injectable()
export class DevicesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly deviceTypeService: DeviceTypesService,
  ) {}

  async checkIfUserOwnsDevice(deviceId: string, userId: string) {
    const device = await this.findOne(deviceId, userId);

    return device.userId === userId;
  }

  async create(createDeviceDto: CreateDeviceDto, requestingUserId: string) {
    const cleanName = createDeviceDto.name.trim();

    const deviceType = await this.deviceTypeService.findByName(
      createDeviceDto.name,
    );

    const device = await this.prismaService.device.create({
      data: {
        name: cleanName,
        owner: {
          connect: {
            id: requestingUserId,
          },
        },
        type: {
          connect: {
            id: deviceType.id,
          },
        },
      },
    });

    return device;
  }

  findAll() {
    return this.prismaService.device.findMany({});
  }

  async findOne(id: string, requestingUserId: string) {
    const device = await this.prismaService.device.findUnique({
      where: { id },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async update(
    id: string,
    updateDeviceDto: UpdateDeviceDto,
    requestingUserId: string,
  ) {
    if (!(await this.checkIfUserOwnsDevice(id, requestingUserId)))
      throw new UnauthorizedException(
        'You are not the owner of this device, therefore you cannot modify it',
      );

    const device = await this.findOne(id, requestingUserId);

    const { name, type } = updateDeviceDto;

    let data: Prisma.DeviceUpdateInput;

    if (!type) {
      data = {
        name: name || device.name,
      };
    } else {
      data = {
        name: name || device.name,
        type: {
          update: {
            name: type,
          },
        },
      };
    }

    const updatedDevice = await this.prismaService.device.update({
      where: {
        id,
      },
      data,
    });

    return updatedDevice;
  }

  async remove(id: string, requestingUserId: string) {
    await this.checkIfUserOwnsDevice(id, requestingUserId);
    await this.prismaService.device.delete({ where: { id } });
    return {
      msg: 'ok',
    };
  }
}
