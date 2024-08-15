import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

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
  async createUser(createUserDto: CreateUserDto) {
    const query = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)';
    const values = [
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    ];
    await this.client.query(query, values);
    console.log('User created in PostgreSQL:', createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<unknown> {
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [loginUserDto.email, loginUserDto.password];
    const res = await this.client.query(query, values);
    return res.rows[0] || null;
  }
}
