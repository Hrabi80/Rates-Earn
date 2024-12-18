import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Forum } from '../entities/forum.entity';
import { Repository } from "typeorm";
import { CreateForumDto } from "../../forum/dtos/create-forum.req.dto";
import { UpdateForumDto } from '../dtos/update-Forum.req.dto';
import { ForumQueryDto } from "../../forum/dtos/Forum-query.req.dto";
import { Comment } from './../entities/comment.entity';

@Injectable()
export class ForumService {


    constructor(
        @InjectRepository(Forum)
        private readonly ForumRepository: Repository<Forum>,
    ) { }
    async createForum(forumSpace: CreateForumDto): Promise<Forum> {
        // Create new forum offer entity
        const forum = this.ForumRepository.create({
            title: forumSpace.title,
            subject: forumSpace.subject,
            sector: forumSpace.sector,
            article: forumSpace.article,
            technology: forumSpace.technology,
            type: forumSpace.type,
            // comment: forumSpace.comment,
        });

        // Save the created forum entity
        return await this.ForumRepository.save(forum);
    }

    async getForumById(id: number): Promise<Forum> {
        const forum = await this.ForumRepository.findOne({
            where: { id: id }
        });
        if (!forum) {
            throw new NotFoundException(`forum with ID ${id} not found`);
        }
        return forum;
    }

    async updateForum(id: number, forumUpdatedData: UpdateForumDto): Promise<Forum> {
        const forum = await this.getForumById(id);
        if (forumUpdatedData == null) throw new Error('nothing to be updated');
        if (!forum) {
            throw new NotFoundException('forum not found');
        }

        Object.assign(forum, forumUpdatedData);
        const updatedForum = await this.ForumRepository.save(forum);
        // Notify WebSocket clients about the updated project
        return updatedForum;
    }



    async deleteForum(id: number): Promise<void> {
        const forum = await this.ForumRepository.findOne({
            where: { id },
        });

        if (!forum) {
            throw new NotFoundException('forum not found');
        }

        await this.ForumRepository.remove(forum);
    }


    async getAllforums(query: ForumQueryDto) {
        const { page, limit, title, sector } = query;
        // Validate pagination parameters
        const pageNumber = page > 0 ? page : 1;
        const pageSize = limit > 0 ? limit : 10;
        const skip = (pageNumber - 1) * pageSize;
        // Build the query with optional filters
        const queryBuilder = this.ForumRepository.createQueryBuilder('forum');
        if (title) {
            queryBuilder.andWhere('forum.title LIKE :title', { title: `%${title}%` });
        }


        if (sector) {
            queryBuilder.andWhere('forum.sector LIKE :sector', { sector: `%${sector}%` });
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

    async getCommentsByForumId(forumId: number): Promise<Comment[]> {
        const forum = await this.ForumRepository.findOne({
            where: { id: forumId },
            relations: ['comments'],
        });

        if (!forum) {
            throw new NotFoundException(`Forum avec l'ID ${forumId} non trouvé`);
        }

        if (!Array.isArray(forum.comments)) {
            throw new Error("Les commentaires récupérés ne sont pas de type 'Comment[]'");
        }

        return forum.comments;
    }



}
