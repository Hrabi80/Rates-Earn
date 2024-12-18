import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import {Enterprise} from "../../user/entities/entreprise.entity";
import {Forum} from "./forum.entity";

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
    @ApiProperty({ description: 'Unique identifier for the comment', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({})
    @ApiProperty({ description: 'Content of the comment', example: 'This is a sample comment.' })
    comment: string;

    @ApiProperty({ description: 'Forum associated with the comment', type: () => Forum })
    @ManyToOne(() => Forum, (form) => form.comments, { nullable: true })
    forum: Forum | null; // Only applicable for recruiters/moderators

   
   // forum: Promise<Forum | null>;

    @ApiProperty({ description: 'Timestamp when the comment was created' })
    @CreateDateColumn()
      createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the comment was last updated' })
    @UpdateDateColumn()
    updatedAt: Date;
}