import 'reflect-metadata';

import { Container } from 'inversify';

import { environment } from '@environment';
import { AppLogger, Logger } from '@util';

// Create the IOC Container
const container = new Container({ autoBindInjectable: true });

// Constants
container.bind('env').toConstantValue(environment);

// Singletons
container
  .bind<Logger>('Logger')
  .to(AppLogger)
  .inSingletonScope();

export { container };
