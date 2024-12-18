import { Comment } from '../../forum/entities/comment.entity';
import { SETTINGS } from '../../../utils/app.utils';
import { CreateCommentDto } from '../../forum/dtos/create-comment.req.dto';
import {
    Body, Controller, Get, Request, Param, ParseIntPipe, Post, Put, Query,
    UseGuards, UsePipes, ValidationPipe, BadRequestException, Delete, HttpCode, HttpStatus, NotFoundException
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateCommentDto } from '../dtos/update-Comment.req.dto';
import { CommentService } from '../services/comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) {

    }
    @Post('/create')
    @ApiCreatedResponse({ description: 'Comment successfully created.' })
    @ApiBadRequestResponse({ description: 'Invalid data provided.' })
    async createComment(@Body() commentSpace: CreateCommentDto) {
        const { comment, forumId } = commentSpace;
        console.log("comment:", comment, "forumId:", forumId);
        const newComment = await this.commentService.createComment(forumId, comment);
        return { success: true, data: newComment };
    }

     @Get('/ByForumId/:id')
     @ApiOkResponse({
         description: 'List of all Comments',
         type: [Comment],
     })
     async getAllComments(@Param('id', ParseIntPipe) id: number) {
         const comments = await this.commentService.getCommentsByForumId(id);
         return { success: true, data: comments };
    
     }

    @Put('/:id')
    @ApiOkResponse({
        description: 'Updated project object as response',
        type: Comment,
    })
    @ApiBadRequestResponse({ description: 'A problem occurs when updating the project. Try again!' })
    async updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() commentDto: UpdateCommentDto,
        @Request() req,
    ) {
        const comment = await this.commentService.updateComment(id, commentDto);
        return { success: true, data: comment };

    }




    @Delete('/:id')
    //@UseGuards(ManagerRoleGuard) // Only managers can access this route
    @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on success
    @ApiOkResponse({
        description: 'comment successfully deleted',
    })
    @ApiBadRequestResponse({ description: 'A problem occurred when deleting the comment. Try again!' })
    async deleteComment(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<any> {
        await this.commentService.deleteComment(id);
        return { success: true, message: "comment successfully deleted" };
    }

}
