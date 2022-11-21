import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const status = exception.getStatus();
    const { message, name } = exception.getResponse() as {
      message: string | string[];
      name: string;
    };

    res.status(status).json({
      status,
      name: name,
      message: message,
    });
  }
}
