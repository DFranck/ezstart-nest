import { Injectable } from '@nestjs/common';
import { LocalDBService } from '../database/localDB/localDB.service';
import { MongoDBService } from '../database/mongoDB/mongoDB.service';
import { PostgresService } from '../database/postgres/postgres.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly localDBService: LocalDBService,
    private readonly mongoDBService: MongoDBService,
    private readonly postgresService: PostgresService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    // Logique pour créer un utilisateur dans chaque DB
    await this.localDBService.createUser(createUserDto);
    await this.mongoDBService.createUser(createUserDto);
    await this.postgresService.createUser(createUserDto);

    return { message: 'User created successfully in all databases' };
  }

  async signin(loginUserDto: LoginUserDto) {
    // Logique pour authentifier un utilisateur
    const userLocal = await this.localDBService.loginUser(loginUserDto);
    const userMongo = await this.mongoDBService.loginUser(loginUserDto);
    const userPostgres = await this.postgresService.loginUser(loginUserDto);

    // Vous pouvez fusionner les résultats ou renvoyer celui qui correspond
    return (
      userLocal || userMongo || userPostgres || { message: 'User not found' }
    );
  }
}
