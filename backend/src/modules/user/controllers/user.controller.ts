import { Body, Controller, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRegisterRequestDto } from "../dtos/user-register.req.dto";
import { SETTINGS } from "src/utils/app.utils";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

@ApiTags('User')
@Controller('user')

export class UserController{

    constructor(private readonly userService : UserService){

    }
    @Post('/register')
    @ApiCreatedResponse({
        description: 'Created user object as response',
        type: User,
      })
    @ApiCreatedResponse({ description: 'User registered successfully' })
    @ApiBadRequestResponse({ description: 'Invalid registration data' })
    async registration(@Body(SETTINGS.VALIDATION_PIPE) userRegister : UserRegisterRequestDto){
        const user = await this.userService.registerJobSeeker(userRegister);
        return { success: true, data: user };
    }

    
}   