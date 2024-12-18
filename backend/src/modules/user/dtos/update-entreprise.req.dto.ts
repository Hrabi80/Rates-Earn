import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class UpdateEnterpriseDto {
  @ApiProperty({ description: 'Enterprise Name', example: 'Expert Tech Consulting' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Secondary Email', example: 'contact@tech.com', nullable: true })
  @IsString()
  @IsOptional()
  email2?: string;

  @ApiProperty({ description: 'Phone number of the enterprise', example: 27757754, nullable: true })
  @IsOptional()
  phone?: number;

  @ApiProperty({ description: 'Fax number', example: 27757754, nullable: true })
  @IsOptional()
  fax?: number;

  @ApiProperty({ description: 'Sector of the enterprise', example: 'Technology' })
  @IsString()
  @IsOptional()
  sector?: string;

  @ApiProperty({ description: 'Logo URL', example: 'https://example.com/logo.png' })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ description: 'Enterprise size', example: '500-1000 employees' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ description: 'Mission of the enterprise souhaitons de continuer à mener une vie saine et active., example: "Delivering IT solutions"' })
  @IsString()
  @IsOptional()
  mission?: string;

  @ApiProperty({ description: 'Date the enterprise was founded', example: '2001-05-10' })
  @IsDate()
  @IsOptional()
  FoundedAt?: Date;

  @ApiProperty({ description: 'Location of the enterprise', example: 'Monastir, Tunisia' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Enterprise description', example: 'Leading IT company' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Visibility of the enterprise', example: true })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
