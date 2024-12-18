import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ModeratorController } from './controllers/moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Enterprise } from './entities/entreprise.entity';
import { EnterpriseService } from './services/entreprise.service';
import { EnterpriseController } from './controllers/entreprise.controller';
//import {ForumModule} from "../forum/forum.module";

@Module({
  imports: [
    // Register User and Enterprise entities
    TypeOrmModule.forFeature([User, Enterprise]),
    // ForumModule,
  ],
  providers: [UserService, EnterpriseService],
  controllers: [UserController, ModeratorController, EnterpriseController],
  exports: [UserService]
})
export class UserModule { }
