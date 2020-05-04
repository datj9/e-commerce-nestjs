import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { CategoryStatus } from '../category-status.enum';

export class GetCategoriesDto {
  @IsOptional()
  @IsIn([
    CategoryStatus.ACTIVE,
    CategoryStatus.INACTIVE,
    CategoryStatus.IN_PROGRESS,
  ])
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
