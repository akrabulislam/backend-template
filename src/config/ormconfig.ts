import { currentEnvironmentConfigFile } from 'utils/currentenv';

import { DataSourceOptions } from 'typeorm';

const dbConfig = currentEnvironmentConfigFile();

const ormConfig: DataSourceOptions = {
  type: dbConfig.db.type,
  host: dbConfig.db.host,
  port: dbConfig.db.port,
  username: dbConfig.db.username,
  password: dbConfig.db.password,
  database: dbConfig.db.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: dbConfig.db.synchronize,
};

export = ormConfig;
