import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { container } from '@api/startup';
import { HelloWorldController } from '@api/controllers/hello-world.controller';
import { invalidHttpMethod } from '@api/helpers';

container.bind<HelloWorldController>('HelloWorldController').to(HelloWorldController);
const helloWorldController: HelloWorldController = container.get('HelloWorldController');

// Find Handler
const find = async ({ pathParameters }): Promise<APIGatewayProxyResult> => {
  return await helloWorldController.find(pathParameters.id);
};

// List Handler
const list = async (): Promise<APIGatewayProxyResult> => {
  return await helloWorldController.get();
};

const collectionHandlers = {
  GET: list,
  // POST: createItem,
};

const itemHandlers = {
  // DELETE: deleteItem,
  GET: find,
  // PATCH: patchItem,
  // POST: postItem,
  // PUT: putItem,
};

// Route handler - Single entry point for a given route path
const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const handlers = event.pathParameters == null ? collectionHandlers : itemHandlers;

  const httpMethod = event.httpMethod;
  if (httpMethod in handlers) {
    return await handlers[httpMethod](event, context);
  }

  return invalidHttpMethod(httpMethod);
};

export { handler };
