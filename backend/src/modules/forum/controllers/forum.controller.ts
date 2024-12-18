import { ForumService } from "../../forum/services/forum.service";
import { Forum } from "../../forum/entities/forum.entity";
import { SETTINGS } from "../../../utils/app.utils";
import { CreateForumDto } from "../../forum/dtos/create-forum.req.dto";
import {
    Body, Controller, Get, Request, Param, ParseIntPipe, Post, Put, Query,
    UseGuards, UsePipes, ValidationPipe, BadRequestException, Delete, HttpCode, HttpStatus, NotFoundException
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateForumDto } from "../dtos/update-Forum.req.dto";

@ApiTags('Forum')
@Controller('forum')
export class ForumController {

    constructor(private readonly formService: ForumService) {

    }
    @Post('/create')
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({})
    async registration(@Body(SETTINGS.VALIDATION_PIPE) forumSpace: CreateForumDto) {
        const forum = await this.formService.createForum(forumSpace);
        return { success: true, data: forum };
    }

    @Get()
    @ApiOkResponse({
        description: 'List of all forums',
        type: [Forum],
    })
    async getAllForums(@Query() query: any) {
        const forums = await this.formService.getAllforums(query);
        return { success: true, data: forums };

    }

    @Put('/:id')
    @ApiOkResponse({
        description: 'Updated project object as response',
        type: Forum,
    })
    @ApiBadRequestResponse({ description: 'A problem occurs when updating the project. Try again!' })
    async updateForum(
        @Param('id', ParseIntPipe) id: number,
        @Body() forumDto: UpdateForumDto,
        @Request() req,
    ) {
        const forum = await this.formService.updateForum(id, forumDto);
        return { success: true, data: forum };

    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on success
    @ApiOkResponse({
        description: 'forum successfully deleted',
    })
    @ApiBadRequestResponse({ description: 'A problem occurred when deleting the forum. Try again!' })
    async deleteForum(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<any> {
        await this.formService.deleteForum(id);
        return { success: true, message: "forum successfully deleted" };
    }

    @Get(':id/comments')
    async getComments(@Param('id', ParseIntPipe) id: number) {
        return await this.formService.getCommentsByForumId(id);
    }

    @Get(':id')
    async getForumById(@Param('id') id: number): Promise<Forum> {
        try {
            return await this.formService.getForumById(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
