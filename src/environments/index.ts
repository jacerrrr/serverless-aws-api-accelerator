import { Environment } from './definition';
import { environment as local } from './environment';
import { environment as prod } from './environment.prod';
import { environment as test } from './environment.test';

const env = (): Environment => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return test;
    case 'production':
      return prod;
    default:
      return local;
  }
};

export const environment = env();
export { Environment };
