import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsController } from './controllers/news.controller';
// import { BrandsController } from './controllers/brands.controller';
// import { Brand, BrandSchema } from './entities/brand.entity';
// import { CategoriesController } from './controllers/categories.controller';
import { NewsService } from './services/news.service';
// import { BrandsService } from './services/brands.service';
// import { CategoriesService } from './services/categories.service';
import { New, NewSchema } from './entities/new.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: New.name,
        schema: NewSchema,
      },
      // {
      //   name: Brand.name,
      //   schema: BrandSchema,
      // },
    ]),
    HttpModule,
  ],
  controllers: [
    NewsController,
    // CategoriesController,
    // BrandsController
  ],
  providers: [
    NewsService,
    // BrandsService,
    // CategoriesService
  ],
  exports: [NewsService],
})
export class NewsModule {}
