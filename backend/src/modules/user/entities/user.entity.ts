import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { UserRoles } from '../enums/user.enum';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from "@nestjs/swagger";
import { Enterprise } from "./entreprise.entity";
import { UserSettings } from "./user-settings.entity";
import { Forum } from "../../forum/entities/forum.entity";


@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User firstname', example: 'Ahmed' })
  @Column()
  firstname: string;

  @ApiProperty({ description: 'User lastname', example: 'Hrabi' })
  @Column()
  lastname: string;

  @ApiProperty({ description: 'User lastname', example: 'Hrabi' })
  @Column({ nullable: true })
  picture: string;

  @ApiProperty({
    description: 'User email address',
    example: 'ahmed.hrabi@gmail.com',
  })
  @Column({
    unique: true
  })
  email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string;



  @ApiProperty({
    description: "Array of user roles",
    example: [UserRoles.MODERATOR, UserRoles.RECRUITER],
  })
  @Column({
    type: "set", // Use 'set' type to store multiple roles
    enum: UserRoles, // Enum defines valid role values
    default: [UserRoles.JOB_SEEKER], // Default to JOB_SEEKER role
  })
  roles: UserRoles[];

  @ApiProperty({ description: 'industry/sector of work', example: 'Tech/Engineering/Finance' })
  @Column({ nullable: true })
  industry: string;

  @ApiProperty({ description: 'the current position of the user', example: 'Backend developer' })
  @Column({ nullable: true })
  jobTitle: string;

  @ApiProperty({ description: 'the current employer of the user', example: 'Expert Tech Consulting' })
  @Column({ nullable: true })
  currentEntrepriseName: string;

  @ApiProperty({ description: 'the location of the user', example: 'Monstir(Tunisia)' })
  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.users, { nullable: true })
  enterprise: Enterprise | null; // Only applicable for recruiters/moderators

  /*@ApiProperty({ description: 'List of users associated with the enterprise' })
  @OneToMany(() => Forum, (article) => article.user)
  articles: Forum[]; // Recruiters and moderators*/

  @OneToOne(() => UserSettings, { cascade: true, eager: true })
  @JoinColumn()
  settings: UserSettings;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}