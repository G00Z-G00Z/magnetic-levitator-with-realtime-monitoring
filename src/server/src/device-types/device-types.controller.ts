import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { DeviceTypesService } from './device-types.service';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('device-types')
export class DeviceTypesController {
  constructor(private readonly deviceTypesService: DeviceTypesService) {}

  @Post()
  create(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypesService.create(createDeviceTypeDto);
  }

  @Get()
  findAll() {
    return this.deviceTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceTypesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
  ) {
    return this.deviceTypesService.update(id, updateDeviceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceTypesService.remove(id);
  }
}
