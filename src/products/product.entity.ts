import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  imageUrl: string;

  @Column()
  categoryId: number;
}
