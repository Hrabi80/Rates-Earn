import { JobService } from "../../job/services/job.service";
import { Job } from "../../job/entities/job.entity";
import { SETTINGS } from "../../../utils/app.utils";
import { CreateJobDto } from "../../job/dtos/create-job.req.dto";
import { Body, Controller, Get, Request, Param, ParseIntPipe, Post, Put,Query,
     UseGuards, UsePipes, ValidationPipe, BadRequestException, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateJobDto } from "../dtos/update-job.req.dto";

@ApiTags('Job')
@Controller('job')
export class JobController {

    constructor(private readonly jobService: JobService) {

    }
    @Post('/create')
    @ApiCreatedResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({})
    async registration(@Body(SETTINGS.VALIDATION_PIPE) jobOffer: CreateJobDto) {
        const job = await this.jobService.createJob(jobOffer);
        return { success: true, data: job };
    }

    @Get()
    @ApiOkResponse({
        description: 'List of all jobs',
        type: [Job],
    })
    async getAllJobs(@Query() query:any) {
        const jobs = await this.jobService.getAllJobs(query);
        return { success: true, data: jobs };

    }

    @Put('/:id')
    @ApiOkResponse({
        description: 'Updated project object as response',
        type: Job,
    })
    @ApiBadRequestResponse({ description: 'A problem occurs when updating the project. Try again!' })
    async updateJob(
        @Param('id', ParseIntPipe) id: number,
        @Body() jobDto: UpdateJobDto,
        @Request() req,
    ) {
        const job = await this.jobService.updateJob(id, jobDto);
        return { success: true, data: job };

    }


    

    @Delete('/:id')
    //@UseGuards(ManagerRoleGuard) // Only managers can access this route
    @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on success
    @ApiOkResponse({
        description: 'Job successfully deleted',
    })
    @ApiBadRequestResponse({ description: 'A problem occurred when deleting the job. Try again!' })
    async deleteJob(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<any> {
        await this.jobService.deleteJob(id);
        return { success: true, message: "Job successfully deleted" };
    }

}
