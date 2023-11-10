import * as Joi from 'joi';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const validationSchema = Joi.object({
  server: Joi.object({
    port: Joi.number().min(1).max(65535).required(),
    origin: Joi.string().required(),
  }),
  db: Joi.object({
    host: Joi.string().required(),
    type: Joi.string().valid('postgres', 'mysql', 'mariadb').required(),
    port: Joi.number().min(1).max(65535).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    synchronize: Joi.boolean().optional(),
  }),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => {
          const yamlConfig = fs.readFileSync(
            `./config/${process.env.NODE_ENV}.yml`,
            'utf8',
          );
          return yaml.load(yamlConfig);
        },
      ],
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
