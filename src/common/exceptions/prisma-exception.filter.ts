import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';
import { DuplicateRecordError } from '../errors/duplicate.error';

@Catch(
  DuplicateRecordError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | DuplicateRecordError
      | PrismaClientKnownRequestError
      | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMsg = exception.message;

    if (exception instanceof DuplicateRecordError) {
      Logger.error('Duplicate Record: ' + exception.message);
      statusCode = HttpStatus.CONFLICT;
      errorMsg = exception.message;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        Logger.error('Data conflict: ' + exception.message);
        statusCode = HttpStatus.CONFLICT;
        errorMsg = `Field: ${JSON.stringify(exception.meta)} Already Exist`;
      } else {
        Logger.error('Error on db: ' + exception.message);
        statusCode = HttpStatus.BAD_REQUEST;
        errorMsg = `Field: ${JSON.stringify(exception.meta)} incorrect`;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      Logger.error('Data conflict: ' + exception.message);
      statusCode = HttpStatus.BAD_REQUEST;
      errorMsg = 'Incorrect Request Data';
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      message: errorMsg,
    });
  }
}
