import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductRepo } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: number,
  ): Promise<Product> {
    const { name, description, quantity, imageUrl } = updateProductDto;
    const product = await this.productRepo.findOne({ id });
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.imageUrl = imageUrl;

    try {
      await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return product;
  }
}
