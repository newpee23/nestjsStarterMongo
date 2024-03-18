import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.findProductByName(createProductDto.name);
    if (product) {
      throw new BadRequestException(`Product with name '${createProductDto.name}' already exists`);
    }
    const result = new this.productModel(createProductDto);
    return result.save();
  }

  async findProductByName(name: string, _id?: string): Promise<Product> {
    if (_id) {
      return this.productModel.findOne({
        name,
        _id: { $ne: _id }
      }).exec();
    }
    return this.productModel.findOne({ name }).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productName = await this.findProductByName(updateProductDto.name, id);
    if (productName) {
      throw new BadRequestException(`Product with name '${updateProductDto.name}' already exists`);
    }
    const result = this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    return result;
  }

  async remove(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('id not found');
    }
    return { message: 'Delete successful' };
  }
}
