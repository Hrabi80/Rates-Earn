import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/create-comment.req.dto';
import { UpdateCommentDto } from '../dtos/update-Comment.req.dto';
import { Forum } from '../entities/forum.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private readonly CommentRepository: Repository<Comment>,
        @InjectRepository(Forum)
        private readonly forumRepository: Repository<Forum>,

    ) { }

    async createComment(forumId: number, commentData: string): Promise<Comment> {
        const forum = await this.forumRepository.findOne({ where: { id: forumId } });

        if (!forum) {
            throw new NotFoundException(`Forum with ID ${forumId} not found`);
        }

        const newComment = this.CommentRepository.create({
            comment: commentData,
            forum,  // Associe le forum à l'entité Comment
        });

        return await this.CommentRepository.save(newComment);
    }


    async getCommentById(id: number): Promise<Comment> {
        const comment = await this.CommentRepository.findOne({
            where: { id },
        });
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }

    async getCommentsByForumId(forumId: number): Promise<Comment[]> {
        // Check if the forum exists
        const forum = await this.forumRepository.findOne({ where: { id: forumId } });
    
        if (!forum) {
            throw new NotFoundException(`Forum with ID ${forumId} not found`);
        }
    
        // Fetch all comments for the specified forum
        const comments = await this.CommentRepository.find({
            where: { forum: { id: forumId } },
            order: { createdAt: 'ASC' }, // Sort comments by creation date (optional)
        });
    
        return comments;
    }

    async updateComment(id: number, commentUpdatedData: UpdateCommentDto): Promise<Comment> {
        const comment = await this.getCommentById(id);
        if (!commentUpdatedData) {
            throw new BadRequestException('Nothing to update');
        }
        Object.assign(comment, commentUpdatedData);
        return await this.CommentRepository.save(comment);
    }

    async deleteComment(id: number): Promise<void> {
        const forum = await this.CommentRepository.findOne({
            where: { id },
        });
        if (!forum) {
            throw new NotFoundException('Comment not found');
        }
        await this.CommentRepository.remove(forum);
    }
}