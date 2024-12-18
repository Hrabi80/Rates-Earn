import { Controller, Get, Param, Query, Put, Body } from '@nestjs/common';
import { EnterpriseService } from '../services/entreprise.service';
import { EnterpriseQueryDto } from '../dtos/entreprise-query.req.dto';
import { UpdateEnterpriseDto } from '../dtos/update-entreprise.req.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Enterprise } from '../entities/entreprise.entity';

@ApiTags('Enterprises')
@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all enterprises with optional filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved enterprises',
    type: Enterprise,
  })
  async getEnterprises(@Query() query: EnterpriseQueryDto) {
    const enterprises= await this.enterpriseService.getAllEnterprises(query);
    console.log("entreprise back",enterprises);
    return {data: enterprises, success:true}
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single enterprise by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the enterprise',
    type: Enterprise,
  })
  @ApiResponse({ status: 404, description: 'Enterprise not found' })
  async getEnterprise(@Param('id') id: number) {
    const entreprise= await this.enterpriseService.getOneEnterprise(id);
    return {data: entreprise, success:true}
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an enterprise' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the enterprise',
    type: Enterprise,
  })
  async updateEnterprise(
    @Param('id') id: number,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    const updatedEntreprise = await this.enterpriseService.updateEnterprise(id, updateEnterpriseDto);
    return {data: updatedEntreprise, success:true}
  }

  @Put(':id/hide')
  @ApiOperation({ summary: 'Toggle visibility of the enterprise' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the visibility of the enterprise',
    type: Enterprise,
  })
  async hideEnterprise(@Param('id') id: number) {
    return await this.enterpriseService.hideEnterprise(id);
  }
}