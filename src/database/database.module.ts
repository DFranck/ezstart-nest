import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseService } from './database.service';
import { LocalDBModule } from './localDB/localDB.module';
import { MongoDBModule } from './mongoDB/mongoDB.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [ConfigModule, MongoDBModule, PostgresModule, LocalDBModule],
  providers: [DatabaseService],
  exports: [],
})
export class DatabaseModule {}
