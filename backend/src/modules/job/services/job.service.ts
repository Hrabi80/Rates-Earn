import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../entities/job.entity";
import { Repository, Transaction } from "typeorm";
import { CreateJobDto } from "../../job/dtos/create-job.req.dto";
import { UserRoles } from "../../user/enums/user.enum";
import { Enterprise } from 'src/modules/user/entities/entreprise.entity';
import { UpdateJobDto } from '../dtos/update-job.req.dto';
import { JobQueryDto } from "../../job/dtos/job-query.req.dto";

@Injectable()
export class JobService {


    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>,
        @InjectRepository(Enterprise) private readonly enterpriseRepository: Repository<Enterprise>,
    ) { }

    async createJob(jobOffer: CreateJobDto): Promise<Job> {
        // Create new job offer entity
        const job = this.jobRepository.create({
            title: jobOffer.title,
            description: jobOffer.description,
            contrat_type: jobOffer.contrat_type || null,
            location: jobOffer.location,
            salary: jobOffer.salary || null,
            publish_date: jobOffer.publish_date,
            expiration_date: jobOffer.expiration_date,
            experience_level: jobOffer.experience_level,
            domain: jobOffer.domain,
        });

        // Save the created job entity
        return await this.jobRepository.save(job);
    }

    // async getAllJobs(query:any): Promise<any> {
    //     const { page, limit, location, domaine, isVisible, title, type_contrat, date_publication,niveau_experience } = query;
    //     const queryBuilder = this.jobRepository.createQueryBuilder('job');
    //     // Validate pagination parameters
    //         const pageNumber = page > 0 ? page : 1;
    //         const pageSize = limit > 0 ? limit : 10;
    //         const skip = (pageNumber - 1) * pageSize;
    //          // Apply pagination with skip and take
    //          queryBuilder.skip(skip).take(pageSize);
    //          // Execute the query
    //       const [data, total] = await queryBuilder.getManyAndCount();
    //
    //       return {
    //         data,
    //         meta: {
    //           itemCount: total,
    //           totalPages: Math.ceil(total / pageSize),
    //           currentPage: pageNumber,
    //           itemsPerPage: pageSize,
    //         },
    //       };
    //    // return await this.jobRepository.find({ relations: ['enterprise'] });
    // }


    async getJobById(id: number): Promise<Job> {
        const job = await this.jobRepository.findOne({
            where: { id: id }
        });
        if (!job) {
            throw new NotFoundException(`job with ID ${id} not found`);
        }
        return job;
    }

    async updateJob(id: number, jobUpdatedData: UpdateJobDto): Promise<Job> {
        const job = await this.getJobById(id);
        if (jobUpdatedData == null) throw new Error('nothing to be updated');
        if (!job) {
            throw new NotFoundException('job not found');
        }

        Object.assign(job, jobUpdatedData);
        const updatedProject = await this.jobRepository.save(job);
        return updatedProject;
    }



    async deleteJob(id: number): Promise<void> {
        const job = await this.jobRepository.findOne({
            where: { id },
        });

        if (!job) {
            throw new NotFoundException('job not found');
        }

        await this.jobRepository.remove(job);
    }


    async getAllJobs(query: JobQueryDto) {
        const { page, limit, title, contrat_type } = query;
        // Validate pagination parameters
        const pageNumber = page > 0 ? page : 1;
        const pageSize = limit > 0 ? limit : 10;
        const skip = (pageNumber - 1) * pageSize;
        // Build the query with optional filters
        const queryBuilder = this.jobRepository.createQueryBuilder('job');
        if (title) {
            queryBuilder.andWhere('job.title LIKE :title', { title: `%${title}%` });
        }


        if (contrat_type) {
            queryBuilder.andWhere('job.contrat_type LIKE :contrat_type', { contrat_type: `%${contrat_type}%` });
        }
        // Apply pagination with skip and take
        queryBuilder.skip(skip).take(pageSize);
        // Execute the query
        const [data, total] = await queryBuilder.getManyAndCount();
        // Return paginated response
        return {
            data,
            meta: {
                itemCount: total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: pageNumber,
                itemsPerPage: pageSize,
            },
        };
    }


}
