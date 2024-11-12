import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailsModule } from 'src/order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderRepository]),
    UsersModule,
    ProductsModule,
    OrderDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
