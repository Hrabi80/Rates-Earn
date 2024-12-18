import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from '../forum/entities/forum.entity';
import { UserModule } from '../user/user.module';
import { ForumController } from '../forum/controllers/forum.controller';
import { CommentController } from '../forum/controllers/comment.controller';
import { ForumService } from '../forum/services/forum.service';
import {CommentService} from "./services/comment.service";
import {Comment} from "./entities/comment.entity";

@Module({
    imports: [
        // Register User and Enterprise entities
        TypeOrmModule.forFeature([Forum,Comment]),
        UserModule,

    ],
    controllers: [ForumController, CommentController],
    providers: [ForumService, CommentService]
})
export class ForumModule { }
