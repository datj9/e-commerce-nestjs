import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCategoriesDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryStatus } from './category-status.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategories(filterDto: GetCategoriesDto): Promise<Category[]> {
    return this.categoryRepository.getCategories(filterDto);
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = this.categoryRepository.findOne({
      id,
    });
    if (category) return category;
    throw new NotFoundException(`Task with ID ${id} not found`);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async updateCategoryStatus(
    id: number,
    status: CategoryStatus,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.status = status;
    await category.save();
    return category;
  }

  // async createCategory(name: string, description: string) { }
}
