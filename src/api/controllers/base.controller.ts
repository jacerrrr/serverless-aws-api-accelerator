import { APIGatewayProxyResult } from 'aws-lambda';
import { inject, injectable } from 'inversify';

import { BadRequestError, ForbiddenError, NotAllowedError, NotFoundError, UnauthorizedError } from '@api/errors';
import { Logger } from '@util';

@injectable()
export abstract class BaseController {
  protected HTTP_CODE_OK = 200;
  protected HTTP_CODE_CREATED = 201;
  protected HTTP_CODE_BAD_REQUEST = 400;
  protected HTTP_CODE_UNAUTHORIZED = 401;
  protected HTTP_CODE_FORBIDDEN = 403;
  protected HTTP_CODE_NOT_FOUND = 404;
  protected HTTP_CODE_NOT_ALLOWED = 405;
  // protected HTTP_CODE_CONFLICT = 409;
  // protected HTTP_CODE_UNPROCESSABLE_ENTITY = 422;
  protected HTTP_CODE_INTERNAL_SERVER_ERROR = 500;
  // protected HTTP_CODE_BAD_GATEWAY = 502;
  // protected HTTP_CODE_SERVICE_UNAVAILABLE = 503;
  // protected HTTP_CODE_GATEWAY_TIMEOUT = 504;

  constructor(@inject('Logger') protected readonly logger: Logger) {}

  /**
   * Creates an API Gateway 200 result
   * @param body The body result
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected ok(body: any): APIGatewayProxyResult {
    return this.createJsonResponseModel(this.HTTP_CODE_OK, body);
  }

  /**
   * Creates an API Gateway 201 result
   * @param body The body result
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected created(body: any): APIGatewayProxyResult {
    return this.createJsonResponseModel(this.HTTP_CODE_CREATED, body);
  }

  /**
   * Handles errors thrown by controllers
   * @param error The error thrown by sub-classed controllers
   */
  protected error(error: Error): APIGatewayProxyResult {
    if (error instanceof BadRequestError) {
      return this.createErrorResponse(this.HTTP_CODE_BAD_REQUEST, error.message, {});
    } else if (error instanceof UnauthorizedError) {
      return this.createErrorResponse(this.HTTP_CODE_UNAUTHORIZED, error.message, {});
    } else if (error instanceof ForbiddenError) {
      return this.createErrorResponse(this.HTTP_CODE_FORBIDDEN, error.message, {});
    } else if (error instanceof NotFoundError) {
      return this.createErrorResponse(this.HTTP_CODE_NOT_FOUND, error.message, {});
    } else if (error instanceof NotAllowedError) {
      return this.createErrorResponse(this.HTTP_CODE_NOT_ALLOWED, error.message, {});
    }

    return this.createErrorResponse(this.HTTP_CODE_INTERNAL_SERVER_ERROR, 'An unexpected error occurred!', error);
  }

  private createErrorResponse(
    errorCode: number,
    message: string,
    data: string | { message?: string },
  ): APIGatewayProxyResult {
    const bodyObject = {
      errorCode: errorCode,
      message: message,
      data: typeof data === 'string' ? data : data.message,
    };

    this.logger.error('createErrorResponse() called', bodyObject, this.constructor.name, {});
    return this.createJsonResponseModel(errorCode, bodyObject);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createJsonResponseModel(statusCode: number, body: any): APIGatewayProxyResult {
    const logObject = { statusCode: statusCode, bodyObject: body };
    this.logger.debug('Creating response', logObject, this.constructor.name, {});

    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }
}
