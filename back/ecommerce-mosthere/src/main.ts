import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger)

  const categoriesService =  app.get(CategoriesService)
  const categories = await categoriesService.findCategories()
  if (categories.length === 0){
    await categoriesService.seedCategories()
    console.log("Se insertaron las seeds de categorias")
  }
  const productSeeds = app.get(ProductsService)
  await productSeeds.seedProducts()
  console.log("Se insertaron las seeds de products")
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
