import { Module } from '@nestjs/common';
import { MongoDBService } from './mongoDB.service';

@Module({
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
