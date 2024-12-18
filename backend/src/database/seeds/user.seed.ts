import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Enterprise } from 'src/modules/user/entities/entreprise.entity';
import { UserRoles } from 'src/modules/user/enums/user.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  async run() {
    console.log('Seeding data...');
    await this.createAdminUsers();
    const enterprises = await this.createModeratorAndEnterprises();
    await this.createRecruiters(enterprises);
    await this.createJobSeekers();
    console.log('Seeding completed.');
  }

  // Create Admin Users
  private async createAdminUsers() {
    const adminData = [
      {
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@example.com',
        password: 'Admin@123',
        roles: [UserRoles.ADMIN],
        location: 'Tunis, Tunisia',
      },
    ];

    await this.createUsers(adminData);
  }

  // Create Moderators and Enterprises
  private async createModeratorAndEnterprises(): Promise<Enterprise[]> {
    const moderatorsData = [
      {
        firstname: 'Tech Moderator',
        lastname: 'Manager',
        email: 'techmoderator@example.com',
        password: 'Moderator@123',
        roles: [UserRoles.MODERATOR],
        location: 'Sousse, Tunisia',
        enterprise: {
          name: 'Tech Solutions',
          sector: 'Technology',
          logo: 'https://example.com/logos/tech-solutions.png',
          size: '500-1000 employees',
          mission: 'Innovating technology solutions for the future.',
          FoundedAt: new Date('2010-05-10'),
          location: 'Sousse, Tunisia',
          description: 'A leading technology solutions company.',
        },
      },
      {
        firstname: 'Finance Moderator',
        lastname: 'Manager',
        email: 'financemoderator@example.com',
        password: 'Moderator@123',
        roles: [UserRoles.MODERATOR],
        location: 'Tunis, Tunisia',
        enterprise: {
          name: 'Finance Experts',
          sector: 'Finance',
          logo: 'https://example.com/logos/finance-experts.png',
          size: '200-500 employees',
          mission: 'Providing top-notch financial consultancy services.',
          FoundedAt: new Date('2005-03-15'),
          location: 'Tunis, Tunisia',
          description: 'Expert financial consultancy services.',
        },
      },
    ];

    const enterprises: Enterprise[] = [];
    for (const moderatorData of moderatorsData) {
      const existingUser = await this.userRepository.findOne({
        where: { email: moderatorData.email },
      });
      if (!existingUser) {
        const enterprise = this.enterpriseRepository.create(moderatorData.enterprise);
        const savedEnterprise = await this.enterpriseRepository.save(enterprise);

        const moderator = this.userRepository.create({
          firstname: moderatorData.firstname,
          lastname: moderatorData.lastname,
          email: moderatorData.email,
          password: await bcrypt.hash(moderatorData.password, 10),
          roles: moderatorData.roles,
          location: moderatorData.location,
          enterprise: savedEnterprise,
        });
        await this.userRepository.save(moderator);

        console.log(`Moderator ${moderator.email} and Enterprise ${enterprise.name} seeded successfully.`);
        enterprises.push(savedEnterprise);
      } else {
        console.log(`Moderator ${moderatorData.email} already exists.`);
      }
    }
    return enterprises;
  }

  // Create Recruiters for Enterprises
  private async createRecruiters(enterprises: Enterprise[]) {
    const recruitersData = [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'recruiter1@techsolutions.com',
        password: 'Recruiter@123',
        roles: [UserRoles.RECRUITER],
        location: 'Sousse, Tunisia',
        enterpriseName: 'Tech Solutions',
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'recruiter2@financeexperts.com',
        password: 'Recruiter@123',
        roles: [UserRoles.RECRUITER],
        location: 'Tunis, Tunisia',
        enterpriseName: 'Finance Experts',
      },
    ];

    for (const recruiterData of recruitersData) {
      const existingUser = await this.userRepository.findOne({
        where: { email: recruiterData.email },
      });
      if (!existingUser) {
        const enterprise = enterprises.find((e) => e.name === recruiterData.enterpriseName);
        if (!enterprise) {
          console.log(`Enterprise ${recruiterData.enterpriseName} not found. Skipping recruiter ${recruiterData.email}.`);
          continue;
        }

        const recruiter = this.userRepository.create({
          firstname: recruiterData.firstname,
          lastname: recruiterData.lastname,
          email: recruiterData.email,
          password: await bcrypt.hash(recruiterData.password, 10),
          roles: recruiterData.roles,
          location: recruiterData.location,
          enterprise,
        });
        await this.userRepository.save(recruiter);

        console.log(`Recruiter ${recruiter.email} added to Enterprise ${enterprise.name}.`);
      } else {
        console.log(`Recruiter ${recruiterData.email} already exists.`);
      }
    }
  }

  // Create Job Seekers
  private async createJobSeekers() {
    const jobSeekersData = [
      {
        firstname: 'Job Seeker',
        lastname: 'One',
        email: 'jobseeker1@example.com',
        password: 'JobSeeker@123',
        roles: [UserRoles.JOB_SEEKER],
        location: 'Gabes, Tunisia',
        industry: 'Engineering',
        jobTitle: 'Software Engineer',
      },
      {
        firstname: 'Job Seeker',
        lastname: 'Two',
        email: 'jobseeker2@example.com',
        password: 'JobSeeker@123',
        roles: [UserRoles.JOB_SEEKER],
        location: 'Sfax, Tunisia',
        industry: 'Healthcare',
        jobTitle: 'Medical Consultant',
      },
    ];

    await this.createUsers(jobSeekersData);
  }

  // Helper to Create Users
  private async createUsers(usersData: any[]) {
    for (const userData of usersData) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (!existingUser) {
        const user = this.userRepository.create({
          ...userData,
          password: await bcrypt.hash(userData.password, 10),
        });
        await this.userRepository.save(user);
        //console.log(`User ${user.email} seeded successfully.`);
      } else {
        console.log(`User ${userData.email} already exists.`);
      }
    }
  }
}
