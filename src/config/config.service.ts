import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ConfigService {
  getDatabaseConfig() {
    const configPathFile = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'config.json',
    );
    const configFile = fs.readFileSync(configPathFile, 'utf8');
    const config = JSON.parse(configFile);
    return config.startConfig.database;
  }
}
