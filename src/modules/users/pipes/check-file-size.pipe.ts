import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CheckFileSizePipe implements PipeTransform {
  constructor(private readonly limitMb: number) {}

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const limitBytes = this.limitMb * 1024 * 1024;

    if (value.size > limitBytes) {
      throw new ConflictException(
        `the file size must be less than ${this.limitMb} MB.`,
      );
    }

    return value;
  }
}
