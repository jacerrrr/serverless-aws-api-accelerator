import { Environment } from './definition';

export const environment: Environment = {
  debug: false,
  logLevel: process.env.LOG_LEVEL as string,
  origin: '*',
};
