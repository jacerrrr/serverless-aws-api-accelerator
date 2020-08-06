import { APIGatewayProxyResult } from 'aws-lambda';

export const invalidHttpMethod = (httpMethod: string): APIGatewayProxyResult => ({
  statusCode: 405,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: `Invalid HTTP Method: ${httpMethod}`,
  }),
});
