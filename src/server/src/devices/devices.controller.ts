import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DevicesService } from './devices.service';
import { JWTUserPayload } from '../auth/interfaces';
import { JwtUser } from '../auth/jwt-user.decorator';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  /**
   * The user using this method, must be authenticated and authorized to create a device.Automatically, it will be connected to the user that created it.
   */
  @Post()
  create(
    @Body() createDeviceDto: CreateDeviceDto,
    @JwtUser() user: JWTUserPayload,
  ) {
    return this.devicesService.create(createDeviceDto, user.sub);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @JwtUser() user: JWTUserPayload) {
    return this.devicesService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
    @JwtUser() user: JWTUserPayload,
  ) {
    return this.devicesService.update(id, updateDeviceDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @JwtUser() user: JWTUserPayload) {
    return this.devicesService.remove(id, user.sub);
  }

  @Post(':id/token')
  generateToken(@Param('id') id: string, @JwtUser() user: JWTUserPayload) {
    return this.devicesService.generateToken(id, user.sub);
  }
}
