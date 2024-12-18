import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'Title of the job', example: 'JS developer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the job', example: 'Responsible for developing and maintaining JavaScript applications.' })
  @IsNotEmpty({})
  @IsString()
  description: string;

  @ApiProperty({ description: 'Type of contract (e.g., Full-time, Part-time)', required: false })
  @IsOptional({})
  @IsString()
  contrat_type?: string;

  @ApiProperty({ description: 'Location of the job (city, country)', example: 'Paris, France' })
  @IsNotEmpty({})
  @IsString()
  location: string;

  @ApiProperty({ description: 'Salary offered for the job (in USD)', required: false })
  @IsOptional({})
  salary?: number;

  @ApiProperty({ description: 'Publish date of the job listing', example: '2024-12-01T12:00:00Z' })
  @IsNotEmpty({})
  publish_date: Date;

  @ApiProperty({ description: 'Expiration date of the job listing', example: '2024-12-31T23:59:59Z' })
  @IsNotEmpty({})
  expiration_date: Date;

  @ApiProperty({ description: 'Experience level required for the job', example: 3, required: true })
  @IsNotEmpty({})
  experience_level: number;

  @ApiProperty({ description: 'Domain or sector related to the job (e.g., Software Engineering)', required: false })
  @IsString()
  @IsOptional()
  domain?: string;

}
