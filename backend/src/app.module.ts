import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig} from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './database/seeds/user.seed';
import { SeedModule } from './database/seeds/seed.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { JobModule } from './modules/job/job.module';
import { ForumModule } from './modules/forum/forum.module';


@Module({
  imports: [
    // Global ConfigModule with environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeORM database connection
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // Application-specific modules
    UserModule,
    AuthModule,
    GatewayModule,
    SeedModule,// (add this only when need seeding functionality ! )
    JobModule, 
    ForumModule,

            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
