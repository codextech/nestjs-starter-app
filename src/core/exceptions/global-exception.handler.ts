import {
  Catch,
  ArgumentsHost,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    //   console.log("AllExceptionsFilter -> exception", exception.toString())
    console.log(
      'AllExceptionsFilter -> exception',
      JSON.parse(JSON.stringify(exception)),
    );

    // mongo value already exist
    if (exception.code == 11000) {
      const badRequest = new BadRequestException({
        value: { ...exception.keyValue },
        message: Object.keys(exception.keyValue).map(
          o => `${o} already exists`,
        ),
      });
      super.catch(badRequest, host);
    }
    if (exception.name == 'CastError') {
      const badRequest = new BadRequestException({
        value: exception.value,
        message: `CastError: ${exception.path} Resource not found at value ${exception.value} `,
      });
      super.catch(badRequest, host);
    }
    if (exception.name === 'ValidationError') {
      const message = Object.values(exception.errors).map(
        (val: any) => val.message,
      );
      const badRequest = new BadRequestException(message);
      super.catch(badRequest, host);
    } else {
      super.catch(exception, host);
    }
  }
}