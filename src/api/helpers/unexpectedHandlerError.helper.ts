import { APIGatewayProxyResult } from 'aws-lambda';

export const unexpectedHanlderError = (): APIGatewayProxyResult => ({
  statusCode: 500,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({ errorCode: 500, message: 'An unexpected error occurred!' }),
});
