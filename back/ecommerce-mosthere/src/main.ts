import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest demo')
    .setDescription('Demo m4 backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  const categoriesService = app.get(CategoriesService);
  const categories = await categoriesService.findCategories();
  if (categories.length === 0) {
    await categoriesService.seedCategories();
    console.log('Se insertaron las seeds de categorias');
  }
  const productSeeds = app.get(ProductsService);
  await productSeeds.seedProducts();
  console.log('Se insertaron las seeds de products');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
