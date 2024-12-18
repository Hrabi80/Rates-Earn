// Importing required modules and dependencies for testing
import { Test, TestingModule } from '@nestjs/testing'; // NestJS testing utilities
import { UserService } from './user.service'; // Service being tested
import { User } from '../entities/user.entity'; // User entity
import { Repository } from 'typeorm'; // TypeORM repository
import { getRepositoryToken } from '@nestjs/typeorm'; // Token to inject mock repository
import { UserRoles } from '../enums/user.enum'; // User roles enum
import { Enterprise } from '../entities/entreprise.entity'; // Enterprise entity
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService; // Instance of UserService
  let userRepository: Repository<User>; // Mock User repository
  let enterpriseRepository: Repository<Enterprise>; // Mock Enterprise repository

  // Mock repository simulating behavior of TypeORM repository
  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User), // Provide mock User repository
          useValue: mockRepository, // Use mock repository
        },
        {
          provide: getRepositoryToken(Enterprise), // Provide mock Enterprise repository
          useValue: mockRepository, // Use mock repository
        },
      ],
    }).compile(); // Compile the testing module

    service = module.get<UserService>(UserService); // Get UserService instance
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)); // Get User repository instance
    enterpriseRepository = module.get<Repository<Enterprise>>(getRepositoryToken(Enterprise)); // Get Enterprise repository instance
  });

  // Test case to check if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined(); // Ensure service is defined
  });

  describe('registerJobSeeker', () => {
    it('should register a new job seeker', async () => {
      const userDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'hashedpassword',
        roles: [UserRoles.JOB_SEEKER],
        industry: 'Tech',
        jobTitle: 'Developer',
        currentEntrepriseName: 'Tech Co',
        location: 'Tunis, Tunisia',
        confirm:'hashedpassword'
      };

      mockRepository.findOne.mockResolvedValue(null); // No existing user
      mockRepository.create.mockReturnValue(userDto); // Return created user
      mockRepository.save.mockResolvedValue(userDto); // Simulate save

      const result = await service.registerJobSeeker(userDto);
      expect(result).toEqual(userDto); // Assert the user is returned
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: userDto.email } });
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(userDto));
      expect(userRepository.save).toHaveBeenCalledWith(userDto);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const userDto = {
        email: 'existing@example.com',
      };
      mockRepository.findOne.mockResolvedValue({ email: 'existing@example.com' }); // Existing user

      await expect(service.registerJobSeeker(userDto as any)).rejects.toThrow(
        BadRequestException,
      ); // Expect exception
    });
  });

  describe('registerModerator', () => {
    it('should register a new moderator and create an enterprise', async () => {
      const dto = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'janesmith@example.com',
        password: 'hashedpassword',
        enterpriseName: 'Tech Corp',
        sector: 'Tech',
        size: '500 employees',
        mission: 'To innovate',
        location: 'Monastir, Tunisia',
        email2: "expertTech@gmail.com",
        phone:485745,
        fax:4554545,
        role:UserRoles.MODERATOR,
        logo:null,
        description:"lorem epsilome dsjqk qjsqs dqs"
      };

      mockRepository.findOne.mockResolvedValueOnce(null); // No existing user
      mockRepository.findOne.mockResolvedValueOnce(null); // No existing enterprise
      const enterpriseMock = { ...dto, id: 1 };
      const moderatorMock = { ...dto, id: 2, roles: [UserRoles.MODERATOR] };
      mockRepository.create.mockReturnValueOnce(enterpriseMock); // Create enterprise
      mockRepository.save.mockResolvedValueOnce(enterpriseMock); // Save enterprise
      mockRepository.create.mockReturnValueOnce(moderatorMock); // Create moderator
      mockRepository.save.mockResolvedValueOnce(moderatorMock); // Save moderator

      const result = await service.registerModerator(dto);
      expect(result.enterprise).toEqual(enterpriseMock);
      expect(result.user).toEqual(moderatorMock);
      expect(enterpriseRepository.create).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(dto));
    });

    it('should throw BadRequestException if email exists', async () => {
      const dto = { email: 'janesmith@example.com' };
      mockRepository.findOne.mockResolvedValueOnce({ email: 'janesmith@example.com' });

      await expect(service.registerModerator(dto as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if enterprise name exists', async () => {
      const dto = { enterpriseName: 'Tech Corp' };
      mockRepository.findOne.mockResolvedValueOnce(null); // No user
      mockRepository.findOne.mockResolvedValueOnce({ name: 'Tech Corp' }); // Existing enterprise

      await expect(service.registerModerator(dto as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('addRecruiterToEnterprise', () => {
    it('should add a recruiter to an enterprise', async () => {
      const moderatorMock = {
        id: 1,
        roles: [UserRoles.MODERATOR],
        enterprise: { id: 1, name: 'Tech Corp' },
      };
      const recruiterDto = {
        firstname: 'Sam',
        lastname: 'Recruiter',
        email: 'sam@example.com',
        password: 'hashedpassword',
      };

      mockRepository.findOne.mockResolvedValueOnce(moderatorMock); // Moderator found
      mockRepository.findOne.mockResolvedValueOnce(null); // No existing user
      const recruiterMock = { ...recruiterDto, roles: [UserRoles.RECRUITER], enterprise: moderatorMock.enterprise };
      mockRepository.create.mockReturnValue(recruiterMock); // Create recruiter
      mockRepository.save.mockResolvedValue(recruiterMock); // Save recruiter

      const result = await service.addRecruiterToEnterprise(moderatorMock.id, recruiterDto);
      expect(result).toEqual(recruiterMock);
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(recruiterDto));
      expect(userRepository.save).toHaveBeenCalledWith(recruiterMock);
    });

    it('should throw ForbiddenException if user is not a moderator', async () => {
      const nonModerator = { id: 2, roles: [UserRoles.JOB_SEEKER] };
      mockRepository.findOne.mockResolvedValueOnce(nonModerator);

      const recruiterDto = {
        firstname: 'Sam',
        lastname: 'Recruiter',
        email: 'sam@example.com',
        password: 'hashedpassword',
      };
      await expect(service.addRecruiterToEnterprise(nonModerator.id, recruiterDto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
