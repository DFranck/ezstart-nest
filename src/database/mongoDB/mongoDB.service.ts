import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongoDBService {
  private client: MongoClient;
  private db: Db;

  async getMongoDBConnect(uri: string) {
    try {
      const reelUri = process.env[uri] || uri;

      console.log('Connecting to MongoDB at ' + reelUri);

      this.client = new MongoClient(reelUri);

      await this.client.connect();

      this.db = this.client.db();

      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }
}
