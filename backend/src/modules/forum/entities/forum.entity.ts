import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';

//@TODO SWAGGER
@Entity({ name: 'forums' })
export class Forum extends BaseEntity {
    @ApiProperty({ description: 'Primary key as forum ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Title of the forum', example: 'Default Title' })
    @Column({ default: "Default Title" })
    title: string;

    @ApiProperty({ description: 'Subject of the forum', example: 'Technology Trends' })
    @Column()
    subject: string;

    @ApiProperty({ description: 'Sector related to the forum', example: 'Information Technology', required: false })
    @Column({ nullable: true })
    sector?: string;

    @ApiProperty({ description: 'Article content of the forum', example: 'This is an article about tech trends.' })
    @Column()
    article: string;

    @ApiProperty({ description: 'Technology discussed in the forum', example: 'Blockchain' })
    @Column()
    technology: string;

    @ApiProperty({ description: 'Type of the forum', example: 'Discussion', required: false })
    @Column({ nullable: true })
    type?: string;

    @ApiProperty({ description: 'When the forum was created' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'When the forum was last updated' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'List of comments associated with the forum', type: () => Comment })
    // @OneToMany(() => Comment, (comment) => comment.forum)
    // comments!: Comment[];
    @OneToMany(() => Comment, comment => comment.forum, { lazy: true })
    comments!: Promise<Comment[]>;
}
