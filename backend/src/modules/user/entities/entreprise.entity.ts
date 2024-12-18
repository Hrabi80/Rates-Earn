import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Enterprise {
    @ApiProperty({ description: 'Primary key for the Enterprise entity', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ description: 'Name of the enterprise', example: 'Expert Tech Consulting' })
    @Column({ unique: true })
    name: string;


    @ApiProperty({
        description: 'entreprise email address 2',
        example: 'contact@expertTech.tn',
    })
    @Column({
        nullable:true
    })
    email2:string;

    @ApiProperty({
        description: 'entreprise phone number',
        example: 27757754,
    })
    @Column({
        unique:true,
        nullable:true
    })
    phone:number;


    @ApiProperty({
        description: 'entreprise fax',
        example: 27757754,
    })
    @Column({
        unique:true,
        nullable:true
    })
    fax:number;

    @ApiProperty({ description: 'Sector the enterprise belongs to', example: 'Technology' })
    @Column()
    sector: string;
  
    @ApiProperty({ description: 'URL of the enterprise logo', example: 'https://example.com/public/logos/logo.png' })
    @Column({ nullable: true })
    logo: string;
  
    @ApiProperty({ description: 'Size of the enterprise', example: '500-1000 employees' })
    @Column()
    size: string;
  
    @ApiProperty({ description: 'Mission statement of the enterprise', example: 'Delivering world-class IT solutions' })
    @Column()
    mission: string;
  
    @ApiProperty({ description: 'Date the enterprise was founded', example: '2001-05-10' })
    @Column({nullable:true})
    FoundedAt: Date;
  
    @ApiProperty({ description: 'Location of the enterprise', example: 'Monastir, Tunisia' })
    @Column()
    location: string;
  
    @ApiProperty({ description: 'Optional description of the enterprise', example: 'A leading company in IT consulting' })
    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    isVerified: boolean;

    @ApiProperty({
        description: 'Indicates whether the entreprise page is visible',
        example: true,
    })
    @Column({ default: true })
    isVisible: boolean;
  
    @ApiProperty({ description: 'List of users associated with the enterprise' })
    @OneToMany(() => User, (user) => user.enterprise)
    users: User[]; // Recruiters and moderators
}
