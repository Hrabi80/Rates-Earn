import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, Length, Matches, IsOptional, IsString } from "class-validator";
import { REGEX, MESSAGES } from "src/utils/app.utils";
import { UserRoles } from "../enums/user.enum";

export class UserRegisterRequestDto {
  @ApiProperty({
    description: "First name of the user",
    example: "Ahmed",
  })
  @IsNotEmpty({ message: "First name is required" })
  firstname: string;

  @ApiProperty({
    description: "Last name of the user",
    example: "Hrabi",
  })
  @IsNotEmpty({ message: "Last name is required" })
  lastname: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "hrabi.ahmed8@gmail.com",
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "Password@123",
  })
  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 24, { message: "Password must be between 6 and 24 characters" })
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @ApiProperty({
    description: "Confirm the password",
    example: "Password@123",
  })
  @IsNotEmpty({ message: "Password confirmation is required" })
  @Length(6, 24, { message: "Password confirmation must be between 6 and 24 characters" })
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  confirm: string;


  @ApiProperty({
    description: 'Industry/sector of work',
    example: 'Tech/Engineering/Finance',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Industry must be a string' })
  industry?: string;

  @ApiProperty({
    description: 'The current position of the user',
    example: 'Backend developer',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Job title must be a string' })
  jobTitle?: string;

  @ApiProperty({
    description: 'The current employer of the user',
    example: 'Expert Tech Consulting',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Current employer name must be a string' })
  currentEntrepriseName?: string;

  @ApiProperty({
    description: 'The location of the user',
    example: 'Monastir (Tunisia)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;

  
  // @ApiProperty({
  //   description: "The role of the user (defaults to JOB_SEEKER if not provided)",
  //   example: "JOB_SEEKER",
  // })
  // @IsEnum(UserRoles, { message: "Invalid role provided" })
  // roles: UserRoles = UserRoles.JOB_SEEKER; // Defaults to JOB_SEEKER

}
