import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  const productsDto = [
    { id: 'test01', name: 'unitTest01', description: 'unit001', price: 199 },
    { id: 'test02', name: 'unitTest02', description: '', price: 123 },
    { id: 'test03', name: 'unitTest03', description: '', price: 456 },
  ]; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
    
    .overrideProvider(ProductsService) // Override ProductsService
    .useValue({ // Mock ProductsService
      create: jest.fn().mockImplementation(dto => Promise.resolve({ id: 'mocked_id' })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve(productsDto)),
      findOne: jest.fn().mockImplementation(id => Promise.resolve({ id: id })),
      update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id: id, ...dto })),
      remove: jest.fn().mockImplementation(id => Promise.resolve({ id: id })),
    })
    .compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService); // Get the instance of the mock service
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const productDto = { name: 'unitTest01', description: 'unit001', price: 199 };
    const createdProduct = await controller.create(productDto);

    expect(createdProduct).toEqual({ id: 'mocked_id' });
    expect(productsService.create).toHaveBeenCalledWith(productDto); // Check if the ProductsService create method is called with the correct arguments
  });

  it('should findAll a product', async () => {
    const findAllProducts = await controller.findAll();
    expect(findAllProducts).toEqual(productsDto);
  });

  it('should findOne a product', async () => {
    const productId = 'test01';
    const findOneProduct = await controller.findOne(productId);
    expect(findOneProduct).toEqual({ id: productId });
    expect(productsService.findOne).toHaveBeenCalledWith(productId);
  });

  it('should update a product', async () => {
    const productId = 'test01';
    const updateProductDto = { name: 'unitTestUpdated', description: 'unitUpdated', price: 299 };
    const updatedProduct = await controller.update(productId, updateProductDto);
    expect(updatedProduct).toEqual({ id: productId, ...updateProductDto });
    expect(productsService.update).toHaveBeenCalledWith(productId, updateProductDto);
  });
  
  it('should remove a product', async () => {
    const productId = 'test01';
    const removedProduct = await controller.remove(productId);
    expect(removedProduct).toEqual({ id: productId });
    expect(productsService.remove).toHaveBeenCalledWith(productId);
  });
});
