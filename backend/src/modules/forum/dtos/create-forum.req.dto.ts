import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateForumDto {
  @ApiProperty({ description: 'Title of the forum', example: 'JS developer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Subject of the forum', example: 'Web development discussion' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The sector to which the forum belongs (optional)', example: 'Technology' })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiProperty({ description: 'Article content of the forum', example: 'JavaScript is a versatile language...' })
  @IsNotEmpty()
  @IsString()
  article: string;

  @ApiProperty({ description: 'Technology related to the forum (e.g., JavaScript, Node.js)', example: 'JavaScript' })
  @IsNotEmpty()
  @IsString()
  technology: string;

  @ApiProperty({ description: 'Type of the forum (optional)', example: 'Discussion' })
  @IsOptional()
  @IsString()
  type?: string;

}
