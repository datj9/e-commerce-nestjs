import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  UsePipes,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoriesDto } from './dto/get-category.dto';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryStatusValidationPipe } from './pipes/category-status-validation.pipe';
import { CategoryStatus } from './category-status.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query(ValidationPipe) filterDto: GetCategoriesDto,
  ): Promise<Category[]> {
    return this.categoriesService.getCategories(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CategoryStatusValidationPipe) status: CategoryStatus,
  ): Promise<Category> {
    return this.categoriesService.updateCategoryStatus(id, status);
  }
}
