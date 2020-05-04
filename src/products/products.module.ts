import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepo } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepo])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
