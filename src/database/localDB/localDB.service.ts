import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class LocalDBService {
  private dbFilePath: string;
  private users = [];
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
  async createUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    console.log('User created in local DB:', createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    const user = this.users.find(
      (user) =>
        user.email === loginUserDto.email &&
        user.password === loginUserDto.password,
    );
    return user || null;
  }
}
