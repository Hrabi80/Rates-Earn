import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { UserRegisterRequestDto } from "../dtos/user-register.req.dto";
import { User } from "../entities/user.entity";
import { UserRoles } from "../enums/user.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Enterprise } from "../entities/entreprise.entity";
import { ModeratorRegisterRequestDto } from "../dtos/moderator-register.req.dto";
import { AddRecruiterDto } from "../dtos/add-recruiter.req.dto";

@Injectable()
export class UserService{
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Enterprise) private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}
  
  async registerJobSeeker(userRegister: UserRegisterRequestDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: userRegister.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email ${userRegister.email} already exists`,
      );
    }
  
    // Create new user entity
    const user = this.userRepository.create({
      firstname: userRegister.firstname,
      lastname: userRegister.lastname,
      email: userRegister.email,
      password: userRegister.password, // Password hashing handled by @BeforeInsert
      roles: [UserRoles.JOB_SEEKER],
      industry: userRegister.industry || null,
      jobTitle: userRegister.jobTitle || null,
      currentEntrepriseName: userRegister.currentEntrepriseName || null,
      location: userRegister.location || null,
    });
  
    // Save the user to the database
    return await this.userRepository.save(user);
  }

  async registerModerator(dto: ModeratorRegisterRequestDto): Promise<{ user: User; enterprise: Enterprise }> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException(`User with email ${dto.email} already exists`);
    }

    // Check if enterprise name already exists
    const existingEnterprise = await this.enterpriseRepository.findOne({ where: { name: dto.enterpriseName } });
    if (existingEnterprise) {
      throw new BadRequestException(`Enterprise with name ${dto.enterpriseName} already exists`);
    }

    // Create the enterprise
    const enterprise = this.enterpriseRepository.create({
      name: dto.enterpriseName,
      sector: dto.sector,
      logo: dto.logo || null,
      size: dto.size,
      mission: dto.mission,
      location: dto.location,
      description: dto.description || null,
      isVerified: false, // Default to false until verified by the site owner
    });
    const savedEnterprise = await this.enterpriseRepository.save(enterprise);

    // Create the moderator
    const moderator = this.userRepository.create({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: dto.password,
      roles: [UserRoles.MODERATOR],
      enterprise: savedEnterprise,
    });
    const savedModerator = await this.userRepository.save(moderator);

    return { user: savedModerator, enterprise: savedEnterprise };
  }


  async addRecruiterToEnterprise(
    moderatorId: number,
    dto: AddRecruiterDto,
  ): Promise<User> {
    // Fetch moderator and validate role
    const moderator = await this.userRepository.findOne({
      where: { id: moderatorId },
      relations: ['enterprise'],
    });

    if (!moderator || !moderator.roles.includes(UserRoles.MODERATOR)) {
      throw new ForbiddenException('Only moderators can add recruiters');
    }

    if (!moderator.enterprise) {
      throw new ForbiddenException('Moderator must belong to an enterprise');
    }

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException(`User with email ${dto.email} already exists`);
    }

    // Create recruiter
    const recruiter = this.userRepository.create({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: dto.password, // Password hashing handled by @BeforeInsert in User entity
      roles: [UserRoles.RECRUITER],
      enterprise: moderator.enterprise, // Assign recruiter to moderator's enterprise
    });

    // Save recruiter to database
    return await this.userRepository.save(recruiter);
  }
  


 // async getUserByEmail(email: string): Promise<User | Manager |undefined > {
  async getUserByEmail(email: string): Promise<User  |undefined > {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return undefined;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } }) ;
  }
}   