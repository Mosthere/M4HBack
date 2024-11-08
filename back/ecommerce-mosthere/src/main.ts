import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { CategoriesSeeds } from './seeds/categories/categories.seeds';
import { ProductsSeeds } from './seeds/products/products.seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger)

  // const categoriesSeeds = app.get(CategoriesSeeds)
  // await categoriesSeeds.seed()
  // console.log("Se insertaron las seeds de categorias")

  // const productSeeds = app.get(ProductsSeeds)
  // await productSeeds.seed()
  // console.log("Se insertaron las seeds de products")
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
