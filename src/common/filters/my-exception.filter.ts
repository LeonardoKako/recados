/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(BadRequestException, UnauthorizedException, ForbiddenException)
export class MyExceptionFilter<T extends BadRequestException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as object);

    response.status(statusCode).json({
      ...error,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
