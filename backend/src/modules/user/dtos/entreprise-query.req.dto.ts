import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EnterpriseQueryDto {
  @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @IsInt()
  page: number = 1;

  @ApiPropertyOptional({ description: 'Limit per page for pagination', default: 10 })
  @IsOptional()
  @IsInt()
  limit: number = 10;

  @ApiPropertyOptional({ description: 'Filter by location' })
  @IsOptional()
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'Filter by sector' })
  @IsOptional()
  @IsString()
  sector: string;

  @ApiPropertyOptional({ description: 'Filter by visibility (true/false)' })
  @IsOptional()
  @IsBoolean()
  isVisible: boolean;

  @ApiPropertyOptional({ description: 'Filter by name' })
  @IsOptional()
  @IsString()
  name: string;
}
