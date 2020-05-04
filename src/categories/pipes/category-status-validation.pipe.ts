import { CategoryStatus } from '../category-status.enum';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class CategoryStatusValidationPipe implements PipeTransform {
  readonly allowStatuses = [
    CategoryStatus.ACTIVE,
    CategoryStatus.INACTIVE,
    CategoryStatus.IN_PROGRESS,
  ];

  private isStatusValid(status: any) {
    return this.allowStatuses.indexOf(status) > -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (this.isStatusValid(value)) return value;
    throw new BadRequestException(`${value} is an unvalid status`);
  }
}
