import { Environment } from './definition';

export const environment: Environment = {
  debug: true,
  logLevel: process.env.LOG_LEVEL as string,
  origin: '*',
};
