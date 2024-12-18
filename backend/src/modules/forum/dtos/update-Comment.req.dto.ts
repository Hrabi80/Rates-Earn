import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCommentDto {

    @ApiProperty({
        description: 'Comment of the task',
        example: 'Design the user interface for the main dashboard',
        required: false,
    })
    @IsOptional()
    @IsString()  // Ensure the comment is a string if provided
    comment?: string;  // Use `?` to mark it as optional


}