import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import * as bcrypt from 'bcrypt';
import { ApiProperty } from "@nestjs/swagger";
import { Enterprise } from "../../user/entities/entreprise.entity";


@Entity({ name: 'jobs' })
export class Job extends BaseEntity {
    @ApiProperty({ description: 'Primary key as job ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Job description', example: 'PHP developer' })
    @Column({ default: "Default Title" })
    title: string;

    @ApiProperty({ description: 'Job description', example: 'Develop PHP applications' })
    @Column()
    description: string;

    @ApiProperty({ description: 'Type of contract for the job', example: 'CDI' })
    @Column({nullable:true})
    contrat_type?: string;

    @ApiProperty({ description: 'Job location', example: 'Sfax' })
    @Column()
    location: string;

    @ApiProperty({ description: 'Salary offered for the job', example: '2000' })
    @Column({ nullable: true })
    salary?: number;


    @ApiProperty({ description: 'When the job was published' })
    @CreateDateColumn()
    publish_date: Date;

    @ApiProperty({ description: 'Expiration date of the job listing' })
    @UpdateDateColumn()
    expiration_date: Date;

    @ApiProperty({ description: 'Experience level required for the job', example: 3 })
    @Column()
    experience_level: number;

    @ApiProperty({ description: 'Domain or field of the job', example: 'Software Development' })
    @Column({ nullable: true })
    domain?: string;

    @ApiProperty({ description: 'The enterprise associated with the job (for recruiters/moderators)' })
    @ManyToOne(() => Enterprise, (enterprise) => enterprise.users, { nullable: true })
    @JoinColumn()
    enterprise: Enterprise | null; // Only applicable for recruiters/moderators
}