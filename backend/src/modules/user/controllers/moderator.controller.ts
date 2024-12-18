import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ModeratorRegisterRequestDto } from '../dtos/moderator-register.req.dto';
import { UserService } from '../services/user.service';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AddRecruiterDto } from '../dtos/add-recruiter.req.dto';

@ApiTags('Moderator')
@Controller('moderator')
export class ModeratorController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Moderator and enterprise created successfully' })
  @ApiBadRequestResponse({ description: 'Failed to create moderator or enterprise' })
  async register(@Body() moderatorRegisterDto: ModeratorRegisterRequestDto) {
    const result = await this.userService.registerModerator(moderatorRegisterDto);
    return { success: true, data: result };
  }


  @Post('add-recruiter/:moderatorId')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Recruiter added successfully' })
  @ApiBadRequestResponse({ description: 'Validation failed or email already exists' })
  @ApiForbiddenResponse({ description: 'Unauthorized action' })
  async addRecruiter(
    @Param('moderatorId') moderatorId: number,
    @Body() addRecruiterDto: AddRecruiterDto,
  ) {
    const recruiter = await this.userService.addRecruiterToEnterprise(moderatorId, addRecruiterDto);
    return { success: true, data: recruiter };
  }
}
