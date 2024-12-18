import { Module } from '@nestjs/common';
import { JobController } from './controllers/job.controller';
import { JobService } from './services/job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { UserModule } from '../user/user.module';
import { Enterprise } from '../user/entities/entreprise.entity';

@Module({
  imports: [
    // Register User and Enterprise entities
    TypeOrmModule.forFeature([Job, Enterprise]),
    UserModule,

  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule { }
