import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString ,IsNumber} from 'class-validator';

export class CreateCommentDto {

  @ApiProperty({ description: 'ID of the associated forum', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  forumId: number;

  @ApiProperty({ description: 'Content of the comment', example: 'This is a comment.' })
  @IsString()
  @IsNotEmpty()
  comment: string;

}
