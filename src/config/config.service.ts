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
    const startConfig = config.currentConfig.database.map((db) => {
      return {
        type: db,
        uri: config.customConfig[db].uri,
      };
    });
    return startConfig;
  }
}
