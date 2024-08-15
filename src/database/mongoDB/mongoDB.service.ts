import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
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
  async createUser(createUserDto: CreateUserDto) {
    await this.db.collection('users').insertOne(createUserDto);
    console.log('User created in MongoDB:', createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    return await this.db.collection('users').findOne({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
  }
}
