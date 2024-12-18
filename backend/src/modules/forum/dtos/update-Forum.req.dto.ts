import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateForumDto {

    @ApiProperty({
        description: 'Title of the forum',
        example: 'Design UI',
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: 'Subject of the forum',
        example: 'Design the user interface for the main dashboard',
        required: false,
    })
    @IsOptional()
    @IsString()
    subject?: string;

    @ApiProperty({
        description: 'Sector related to the forum',
        example: 'Technology',
        required: false,
    })
    @IsOptional()
    @IsString()
    sector?: string;

    @ApiProperty({
        description: 'Article/content of the forum',
        example: 'Detailed explanation of the UI design for the dashboard',
        required: false,
    })
    @IsOptional()
    @IsString()
    article?: string;

    @ApiProperty({
        description: 'Technology related to the forum',
        example: 'JavaScript, React',
        required: false,
    })
    @IsOptional()
    @IsString()
    technology?: string;

    @ApiProperty({
        description: 'Type of the forum',
        example: 'Discussion',
        required: false,
    })
    @IsOptional()
    type?: string;


}