import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PublicUser } from './interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
      },
    });
    return this.returnPublicUser(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});
    return users.map(this.returnPublicUser);
  }

  private async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByIdPublic(id: string) {
    return this.returnPublicUser(await this.findOneById(id));
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);

    const isActive =
      updateUserDto.active === undefined ? user.active : updateUserDto.active;

    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email || user.email,
        password: updateUserDto.password || user.password,
        name: updateUserDto.name || user.name,
        active: isActive,
      },
    });

    return this.returnPublicUser(newUser);
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return {
      msg: 'ok',
    };
  }

  returnPublicUser(user: PublicUser) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      active: user.active,
    };
  }
}
