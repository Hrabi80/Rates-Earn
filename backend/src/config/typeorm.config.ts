import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Job } from 'src/modules/job/entities/job.entity';
import { Enterprise } from 'src/modules/user/entities/entreprise.entity';
import { UserSettings } from 'src/modules/user/entities/user-settings.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {Forum} from "../modules/forum/entities/forum.entity";
import {Comment} from "../modules/forum/entities/comment.entity";

const entities = [User, Enterprise, UserSettings,Job,Forum,Comment];

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities,
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true, // Disable in production; use migrations instead
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true, // Disable in production
  logging: true,
};

export const testOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TEST_DATABASE_HOST,
  port: parseInt(process.env.TEST_DATABASE_PORT, 10),
  username: process.env.TEST_DATABASE_USERNAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  entities,
  synchronize: true, // Automatically create the schema in the test database
  dropSchema: true, // Drops the schema at the end of every test suite
};
