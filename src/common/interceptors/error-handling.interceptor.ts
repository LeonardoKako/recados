/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  /* async */ intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandlingInterceptor');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return next.handle().pipe(
      catchError((error) => {
        console.log('Deu erro');
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }

          return new BadRequestException('Ocorreu um erro desconhecido');
        });
      }),
    );
  }
}
