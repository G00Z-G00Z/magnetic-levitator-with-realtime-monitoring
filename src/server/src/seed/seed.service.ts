import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('seeder');

  constructor(private readonly prismaService: PrismaService) {}

  async clearDatabase() {
    this.logger.log('Clearing database...');
    this.logger.debug('Deleting all devices...');
    // Delete all devices
    await this.prismaService.device.deleteMany();
    this.logger.debug('Deleted all devices');

    this.logger.debug('Deleting all users...');
    // Delete all devices
    // Delete all users
    await this.prismaService.user.deleteMany();
    this.logger.debug('Deleted all users');

    this.logger.debug('Deleting all device types ...');
    // Delete all device types
    await this.prismaService.deviceType.deleteMany();
    this.logger.debug('Deleted all device types');

    this.logger.log('Database cleared successfully');
  }

  async seedDatabase() {
    // Create admin user
    this.logger.log('Seeding database...');
    const admin = await this.prismaService.user.create({
      data: {
        email: 'admin@google.com',
        password: '123456789',
        name: 'admin',
      },
    });
    this.logger.debug('Created admin user');

    // Create device types
    const types = ['robotic-arm', 'PID'];

    for (const type of types) {
      await this.prismaService.deviceType.create({
        data: {
          name: type.toLowerCase(),
        },
      });
    }

    this.logger.debug(`Created device types ${types.join(', ')}`);

    // Create devices
    await this.prismaService.device.create({
      data: {
        name: 'levitador-clase',
        type: {
          connect: {
            name: 'pid',
          },
        },
        owner: {
          connect: {
            id: admin.id,
          },
        },
      },
    });
    this.logger.debug(`Created levitator device `);

    this.logger.log('Database seeded successfully');
  }
}
