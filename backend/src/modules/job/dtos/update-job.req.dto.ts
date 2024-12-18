import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateJobDto {

    @ApiProperty({
        description: 'Title of the job',
        example: 'Design UI',
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: 'Description of the job role',
        example: 'Design the user interface for the main dashboard',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Type of contract for the job (e.g., Full-time, Part-time)',
        example: 'Full-time',
        required: false,
    })
    @IsOptional()
    @IsString()
    contrat_type?: string;


    @ApiProperty({
        description: 'Location where the job is based (e.g., City, Country)',
        example: 'Paris, France',
        required: false,
    })
    @IsOptional()
    @IsString()
    location?: string;



    @ApiProperty({
        description: 'Salary offered for the job (in USD)',
        example: 60000,
        required: false,
    })
    @IsOptional()
    salary?: number;


    @ApiProperty({
        description: 'Publish date for the job listing (ISO string)',
        example: '2024-12-01T12:00:00Z',
        required: false,
    })
    @IsOptional()
    publish_date: Date;


    @ApiProperty({
        description: 'Expiration date for the job listing (ISO string)',
        example: '2024-12-31T23:59:59Z',
        required: false,
    })
    @IsOptional()
    expiration_date?: Date;

    @ApiProperty({
        description: 'Experience level required for the job (e.g., 1, 2, 3 years)',
        example: 3,
        required: false,
    })
    @IsOptional()
    experience_level?: number;

    @ApiProperty({
        description: 'Domain or sector of the job (e.g., Software Engineering)',
        example: 'Software Engineering',
        required: false,
    })
    @IsOptional()
    @IsString()
    domain?: string;

}