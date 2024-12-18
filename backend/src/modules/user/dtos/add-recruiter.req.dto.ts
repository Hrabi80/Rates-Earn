import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddRecruiterDto {
  @ApiProperty({ description: 'First name of the recruiter', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Last name of the recruiter', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Email of the recruiter', example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the recruiter', example: 'Password123!' })
  @IsNotEmpty()
  password: string;
}
