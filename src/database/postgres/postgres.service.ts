import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PostgresService {
  private client: Client;

  async connectToPostgres(uri: string) {
    try {
      const reelUri = process.env[uri] || uri;
      console.log('Connecting to PostgreSQL at ' + reelUri);
      this.client = new Client({
        connectionString: reelUri,
      });

      await this.client.connect();
      console.log('Connected to PostgreSQL');
    } catch (error) {
      console.error('Failed to connect to PostgreSQL', error);
      throw error;
    }
  }
}
