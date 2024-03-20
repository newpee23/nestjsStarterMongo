import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import  * as path from "path";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post("/upload/:filename")
  @UseInterceptors(FileInterceptor('file' , {
    storage : diskStorage({
      destination : "./uploads",
      filename : (_req: any , file: { originalname: string, filename: string }, cb: (error: Error | null, filename: string) => void) => {
       
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const uniqueFileName = `${timestamp}-${_req?.params?.filename}${fileExtension}`;
        cb(null , uniqueFileName);
      }
    })
  }))
  async uploadFile(@UploadedFile() file : { fieldname: string, originalname: string, encoding: string, mimetype: string, size: number, destination: string, filename: string, path: string, buffer: Buffer }, @Param('filename') filename: string) {
    return `Upload successfuly ${file.filename}`;
  }
}

