import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('seeder');

  constructor(private readonly prismaService: PrismaService) {}

  async clearDatabase() {
    this.logger.log('Clearing database...');
    this.logger.log('Deleting all devices...');
    // Delete all devices
    await this.prismaService.device.deleteMany();
    this.logger.log('Deleted all devices');

    this.logger.log('Deleting all users...');
    // Delete all devices
    // Delete all users
    await this.prismaService.user.deleteMany();
    this.logger.log('Deleted all users');

    this.logger.log('Deleting all device types ...');
    // Delete all device types
    await this.prismaService.deviceType.deleteMany();
    this.logger.log('Deleted all device types');

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
    this.logger.log('Created admin user');

    // Create device types
    const types = ['robotic-arm', 'PID'];

    for (const type of types) {
      await this.prismaService.deviceType.create({
        data: {
          name: type.toLowerCase(),
        },
      });
    }

    this.logger.log(`Created device types ${types.join(', ')}`);

    // Create devices
    await this.prismaService.device.create({
      data: {
        name: 'levitador-clase',
        type: {
          connect: {
            name: 'PID',
          },
        },
        owner: {
          connect: {
            id: admin.id,
          },
        },
      },
    });
    this.logger.log(`Created levitator device `);

    this.logger.log('Database seeded successfully');
  }
}
