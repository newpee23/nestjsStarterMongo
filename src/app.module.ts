import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // เพิ่มไว้สำหรับการอ่าน config ผ่าน .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // จะอ่านจาก dotenv หรือ fix code ก็ได้ (สำหรับตัวอย่างนี้)
    MongooseModule.forRoot('mongodb://localhost:27017/nest_starter'),
    ProductsModule,
    OrdersModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
