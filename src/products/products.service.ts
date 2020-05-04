import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductRepo } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepo) private productRepo: ProductRepo,
  ) {}

  getProducts(categoryId: number): Promise<Product[]> {
    return this.productRepo.getProducts(categoryId);
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(
      { id },
      { select: ['id', 'categoryId', 'name', 'description', 'quantity'] },
    );
    if (product) return product;
    throw new NotFoundException(`Product with ID ${id} not found`);
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepo.createProduct(createProductDto);
  }
}
