import 'reflect-metadata';

import { LoggerFake } from '@test/fakes';

import { HelloWorldController } from './hello-world.controller';

const testSubject = new HelloWorldController(new LoggerFake());
describe('HelloWorldController', () => {
  it('should return "Hello World"', async () => {
    const result = await testSubject.get();
    expect(result.statusCode).toBe(200);
  });
});
