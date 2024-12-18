import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import for Swagger annotations
import { User } from './user.entity';

@Entity()
export class UserSettings {
  @ApiProperty({
    description: 'Primary key for UserSettings entity',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Indicates whether the user profile is visible',
    example: true,
  })
  @Column({ default: true })
  isVisible: boolean;

  @ApiProperty({
    description: 'Reason for deactivation (if applicable)',
    example: 'User requested account deactivation',
    nullable: true,
  })
  @Column({ nullable: true })
  deactivationReason: string;

  @ApiProperty({
    description: 'Indicates whether the account is temporarily deleted',
    example: false,
  })
  @Column({ default: false })
  isTemporarilyDeleted: boolean;

  @ApiProperty({
    description: 'Array of job preferences, such as sectors or locations',
    example: ['Engineering', 'Remote', 'Finance'],
    nullable: true,
  })
  @Column('simple-array', { nullable: true })
  jobPreferences: string[];

  @ApiProperty({
    description: 'Associated user for these settings',
    type: () => User, // Reference to the User entity
  })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
