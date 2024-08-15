import { Module } from '@nestjs/common';
import { LocalDBModule } from '../database/localDB/localDB.module';
import { MongoDBModule } from '../database/mongoDB/mongoDB.module';
import { PostgresModule } from '../database/postgres/postgres.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [LocalDBModule, MongoDBModule, PostgresModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
