import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const config = this.configService.getDatabaseConfig();
    console.log(config);
  }
}
