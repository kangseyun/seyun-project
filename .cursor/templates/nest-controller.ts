/**
 * {{ResourceName}}Controller
 * Controller for {{resourceName}}-related endpoints
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { {{ResourceName}}Service } from './{{resourceName}}.service';
import { Create{{ResourceName}}Dto } from './dto/create-{{resourceName}}.dto';
import { Update{{ResourceName}}Dto } from './dto/update-{{resourceName}}.dto';

@ApiTags('{{resourceName}}')
@Controller('{{resourceName}}')
export class {{ResourceName}}Controller {
  /**
   * Constructor
   * @param {{{ResourceName}}Service} {{resourceName}}Service - The {{resourceName}} service
   */
  constructor(private readonly {{resourceName}}Service: {{ResourceName}}Service) {}

  /**
   * Create a new {{resourceName}}
   * @param {Create{{ResourceName}}Dto} create{{ResourceName}}Dto - The {{resourceName}} creation data
   * @returns {Promise<{{ResourceName}}>} The created {{resourceName}}
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create {{resourceName}}' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() create{{ResourceName}}Dto: Create{{ResourceName}}Dto) {
    return this.{{resourceName}}Service.create(create{{ResourceName}}Dto);
  }

  /**
   * Find all {{resourceName}}s
   * @returns {Promise<{{ResourceName}}[]>} Array of {{resourceName}}s
   */
  @Get()
  @ApiOperation({ summary: 'Find all {{resourceName}}s' })
  @ApiResponse({ status: 200, description: 'Return all {{resourceName}}s.' })
  findAll() {
    return this.{{resourceName}}Service.findAll();
  }

  /**
   * Find {{resourceName}} by id
   * @param {string} id - The {{resourceName}} id
   * @returns {Promise<{{ResourceName}}>} The found {{resourceName}}
   */
  @Get(':id')
  @ApiOperation({ summary: 'Find {{resourceName}} by id' })
  @ApiResponse({ status: 200, description: 'Return {{resourceName}} by id.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  findOne(@Param('id') id: string) {
    return this.{{resourceName}}Service.findOne(id);
  }

  /**
   * Update {{resourceName}} by id
   * @param {string} id - The {{resourceName}} id
   * @param {Update{{ResourceName}}Dto} update{{ResourceName}}Dto - The {{resourceName}} update data
   * @returns {Promise<{{ResourceName}}>} The updated {{resourceName}}
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update {{resourceName}} by id' })
  @ApiResponse({ status: 200, description: 'Updated successfully.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  update(
    @Param('id') id: string,
    @Body() update{{ResourceName}}Dto: Update{{ResourceName}}Dto,
  ) {
    return this.{{resourceName}}Service.update(id, update{{ResourceName}}Dto);
  }

  /**
   * Remove {{resourceName}} by id
   * @param {string} id - The {{resourceName}} id
   * @returns {Promise<{{ResourceName}}>} The removed {{resourceName}}
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove {{resourceName}} by id' })
  @ApiResponse({ status: 200, description: 'Removed successfully.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  remove(@Param('id') id: string) {
    return this.{{resourceName}}Service.remove(id);
  }
} 