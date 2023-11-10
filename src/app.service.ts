import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const port = this.configService.get<number>('server.port', 3000);
    const origin = this.configService.get<string>(
      'server.origin',
      'http://localhost:3000',
    );
    return `Hello World! Server is running on port ${port}, origin is ${origin}`;
  }
}
