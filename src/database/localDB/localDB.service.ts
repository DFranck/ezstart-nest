import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalDBService {
  private dbFilePath: string;

  constructor() {
    this.dbFilePath = path.resolve(process.cwd(), 'public', 'db.json');
  }

  async getData(): Promise<unknown> {
    try {
      const data = await fs.promises.readFile(this.dbFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to read local database', error);
      throw error;
    }
  }
}
