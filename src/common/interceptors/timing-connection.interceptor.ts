import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  /* async */ intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();
    console.log('Entry date: ', now);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return next.handle().pipe(
      tap(() => {
        const nowEnd = Date.now();
        console.log('TimingConnection exec: ', nowEnd);
      }),
    );
  }
}
