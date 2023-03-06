import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

@Injectable()
export class DeviceTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreateDeviceTypeDto) {
    const cleanName = name.toLocaleLowerCase().trim();

    const repeatedType = await this.findByName(cleanName);

    if (repeatedType) {
      return repeatedType;
    }

    const newType = await this.prisma.deviceType.create({
      data: {
        name: cleanName,
      },
    });

    return newType;
  }

  findAll() {
    return this.prisma.deviceType.findMany({});
  }

  async findById(id: string) {
    const devType = await this.prisma.deviceType.findUnique({
      where: { id },
    });

    if (!devType) {
      throw new NotFoundException('Device Type not found');
    }

    return devType;
  }

  async findByName(name: string) {
    const devType = await this.prisma.deviceType.findUnique({
      where: { name },
    });

    if (!devType) {
      throw new NotFoundException('Device Type not found');
    }

    return devType;
  }

  async update(id: string, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    const devType = await this.findById(id);

    if (updateDeviceTypeDto.name === undefined) {
      return devType;
    }

    const cleanName = updateDeviceTypeDto.name.toLocaleLowerCase().trim();

    try {
      return await this.prisma.deviceType.update({
        where: { id },
        data: {
          name: cleanName,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Duplicate device type name', {
            cause: error,
          });
        }
        throw error;
      }
    }
  }

  async remove(id: string) {
    await this.prisma.deviceType.delete({
      where: { id },
    });

    return {
      msg: 'ok',
    };
  }
}
