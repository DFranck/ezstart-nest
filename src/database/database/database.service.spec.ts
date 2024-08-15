import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../config/config.service'; // Assurez-vous que le chemin est correct
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, ConfigService], // Ajoutez ConfigService ici
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
