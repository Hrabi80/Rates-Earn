import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from '../entities/entreprise.entity';
import { UpdateEnterpriseDto } from '../dtos/update-entreprise.req.dto';
import { EnterpriseQueryDto } from '../dtos/entreprise-query.req.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class EnterpriseService {
  constructor(
      @InjectRepository(Enterprise)
      private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}
  /**
   * Get all enterprises with pagination and filters
   * @param query EnterpriseQueryDto
   * @returns Paginated enterprises
   */
  async getAllEnterprises(query: EnterpriseQueryDto) {
    const { page, limit, location, sector, isVisible, name } = query;
    // Validate pagination parameters
    const pageNumber = page > 0 ? page : 1;
    const pageSize = limit > 0 ? limit : 10;
    const skip = (pageNumber - 1) * pageSize;
    // Build the query with optional filters
    const queryBuilder = this.enterpriseRepository.createQueryBuilder('enterprise');
    if (location) {
      queryBuilder.andWhere('enterprise.location LIKE :location', { location: `%${location}%` });
    }
    if (sector) {
      queryBuilder.andWhere('enterprise.sector LIKE :sector', { sector: `%${sector}%` });
    }
    if (isVisible !== undefined) {
      queryBuilder.andWhere('enterprise.isVisible = :isVisible', { isVisible });
    }
    if (name) {
      queryBuilder.andWhere('enterprise.name LIKE :name', { name: `%${name}%` });
    }
    // Apply pagination with skip and take
    queryBuilder.skip(skip).take(pageSize);
    // Execute the query
    const [data, total] = await queryBuilder.getManyAndCount();
    // Return paginated response
    return {
      data,
      meta: {
        itemCount: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: pageNumber,
        itemsPerPage: pageSize,
      },
    };
  }
  /**
   * Get a single enterprise by ID
   * @param id Enterprise ID
   * @returns The enterprise
   */
  async getOneEnterprise(id: number): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOne({ where: { id: id } });
    if (!enterprise) {
      throw new BadRequestException('Enterprise not found');
    }
    return enterprise;
  }
  /**
   * Update enterprise data
   * @param id Enterprise ID
   * @param updateEnterpriseDto DTO for updating enterprise
   * @returns Updated enterprise
   */
  async updateEnterprise(id: number, updateEnterpriseDto: UpdateEnterpriseDto): Promise<Enterprise> {
    const enterprise = await this.getOneEnterprise(id);
    Object.assign(enterprise, updateEnterpriseDto);
    return await this.enterpriseRepository.save(enterprise);
  }
  /**
   * Toggle visibility of an enterprise (Hide or Show)
   * @param id Enterprise ID
   * @returns Updated enterprise with changed visibility
   */
  async hideEnterprise(id: number): Promise<Enterprise> {
    const enterprise = await this.getOneEnterprise(id);
    enterprise.isVisible = !enterprise.isVisible;
    return await this.enterpriseRepository.save(enterprise);
  }
}