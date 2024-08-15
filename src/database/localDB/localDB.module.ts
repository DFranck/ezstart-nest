import { Module } from '@nestjs/common';
import { LocalDBService } from './localDB.service';

@Module({
  providers: [LocalDBService],
  exports: [LocalDBService],
})
export class LocalDBModule {}
