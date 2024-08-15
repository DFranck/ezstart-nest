import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LocalDBService } from './localDB/localDB.service';
import { MongoDBService } from './mongoDB/mongoDB.service';
import { PostgresService } from './postgres/postgres.service';
@Injectable()
export class DatabaseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mongoDBService: MongoDBService,
    private readonly postgresService: PostgresService,
    private readonly localDBService: LocalDBService,
  ) {}

  async onModuleInit() {
    const config = this.configService.getDatabaseConfig();
    if (Array.isArray(config)) {
      for (const { type: database, uri } of config) {
        switch (database) {
          case 'mongodb':
            if (uri) {
              await this.mongoDBService.getMongoDBConnect(uri);
            } else {
              console.error('MongoDB URI is missing');
            }
            break;
          case 'postegres':
            if (uri) {
              await this.postgresService.connectToPostgres(uri);
            } else {
              console.error('PostgreSQL URI is missing');
            }
            break;
          case 'local':
            if (uri) {
              const data = await this.localDBService.getData();
              console.log('Local database data:', data);
            } else {
              console.error('Local database file path is missing');
            }
            break;
          default:
            console.error('Unknown database type');
            break;
        }
      }
    } else {
      console.error('config.array is not an array or is undefined');
    }
  }
}
