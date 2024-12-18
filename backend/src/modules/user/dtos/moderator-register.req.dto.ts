import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UserRoles } from '../enums/user.enum';

export class ModeratorRegisterRequestDto {
  // User fields
  @ApiProperty({ description: 'First name of the moderator', example: 'Ahmed' })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: 'Last name of the moderator', example: 'Hrabi' })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'Email of the moderator', example: 'ahmed.hrabi@example.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Email of the entreprise 2', example: 'contact@example.tn' })
  @IsOptional()
  email2: string;

  @ApiProperty({ description: 'phone of the entreprise', example: 72025225 })
  @IsOptional()
  phone: number;

  @ApiProperty({ description: 'fax of the entreprise', example: 55488554 })
  @IsOptional()
  fax: number;

  @ApiProperty({ description: 'Password of the moderator', example: 'SecurePassword123!' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the moderator (automatically set to MODERATOR)',
    example: 'MODERATOR',
  })
  @IsOptional()
  role: UserRoles = UserRoles.MODERATOR;

  // Enterprise fields
  @ApiProperty({ description: 'Name of the enterprise', example: 'Expert Tech Consulting' })
  @IsNotEmpty()
  @IsString()
  enterpriseName: string;

  @ApiProperty({ description: 'Sector of the enterprise', example: 'Technology' })
  @IsNotEmpty()
  @IsString()
  sector: string;

  @ApiProperty({ description: 'Enterprise logo URL', example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty({ description: 'Size of the enterprise', example: '500-1000 employees' })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({ description: 'Mission of the enterprise', example: 'Delivering world-class IT solutions' })
  @IsNotEmpty()
  @IsString()
  mission: string;

  @ApiProperty({ description: 'Location of the enterprise', example: 'Monastir, Tunisia' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Description of the enterprise',
    example: 'A leading IT consulting company.',
  })
  @IsOptional()
  @IsString()
  description: string;
}
