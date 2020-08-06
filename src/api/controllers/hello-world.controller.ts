import { APIGatewayProxyResult } from 'aws-lambda';
import { inject } from 'inversify';

import { Logger } from '@util';

import { BaseController } from './base.controller';

export class HelloWorldController extends BaseController {
  constructor(@inject('Logger') logger: Logger) {
    super(logger);
  }

  /** An example of a controller function using get many as an array */
  async get(): Promise<APIGatewayProxyResult> {
    return Promise.resolve(this.ok([{ message: 'Hello World' }]));
  }

  /**
   * An example of a controller function using get by id
   * @param id The id to retrieve
   */
  async find(id: string): Promise<APIGatewayProxyResult> {
    return Promise.resolve(this.ok({ message: `Hello ${id}` }));
  }
}
