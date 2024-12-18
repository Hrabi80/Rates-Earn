import { Module } from '@nestjs/common';
import { SeedService } from './user.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Enterprise } from 'src/modules/user/entities/entreprise.entity';
import { UserSettings } from 'src/modules/user/entities/user-settings.entity';
;

@Module({
  imports: [TypeOrmModule.forFeature([User,Enterprise,UserSettings])],
  providers: [SeedService],
  exports:[SeedService]
})
export class SeedModule {}
