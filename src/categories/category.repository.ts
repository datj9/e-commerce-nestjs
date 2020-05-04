import { Category } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetCategoriesDto } from './dto/get-category.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryStatus } from './category-status.enum';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategories(filterDto: GetCategoriesDto): Promise<Category[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('category');

    if (status) {
      query.where('category.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'category.name LIKE :search or category.description LIKE :search',
        { search },
      );
    }

    try {
      const categories = await query.getMany();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, description } = createCategoryDto;
    const category = new Category();

    category.name = name;
    category.description = description;
    category.status = CategoryStatus.INACTIVE;

    try {
      await category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return category;
  }
}
