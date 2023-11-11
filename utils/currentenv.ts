import * as fs from 'fs';
import * as yaml from 'js-yaml';

const environment = process.env.NODE_ENV;
const configFile = `./config/${environment}.yml`;

if (!fs.existsSync(configFile)) {
  throw new Error(`Config file ${configFile} not found.`);
}

export const currentEnvironmentConfigFile = () => {
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
};
