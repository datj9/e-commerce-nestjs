import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepo extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      quantity,
      categoryId,
      imageUrl,
    } = createProductDto;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.categoryId = categoryId;
    product.imageUrl = imageUrl;

    try {
      await product.save();
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProducts(categoryId: number) {
    const query = Product.createQueryBuilder('product');
    if (categoryId) {
      query.where('product.categoryId = :categoryId', { categoryId });
    }
    const products = await query.getMany();
    return products;
  }
}
