import {
  Injectable,
  Logger,
  NotFoundException,
  HttpService,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, FilterQuery } from 'mongoose';
import { AxiosResponse } from 'axios';

import { New } from '../entities/new.entity';
import { CreateNewDto, UpdateNewDto, FilterNewsDto } from '../dtos/news.dtos';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { type } from 'os';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(New.name) private newModel: Model<New>,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(NewsService.name);

  findAll(params?: FilterNewsDto) {
    if (params) {
      const filters: FilterQuery<New> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return this.newModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.newModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const newOne = await this.newModel.findById(id).exec();
    if (!newOne) {
      throw new NotFoundException(`New #${id} not found`);
    }
    return newOne;
  }

  create(data: CreateNewDto) {
    const newNew = new this.newModel(data);
    return newNew.save();
  }

  update(id: string, changes: UpdateNewDto) {
    const newOne = this.newModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!newOne) {
      throw new NotFoundException(`New #${id} not found`);
    }
    return newOne;
  }

  remove(id: string) {
    return this.newModel.findByIdAndDelete(id);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getDataFromApi() {
    const data = await this.httpService
      .get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
      .toPromise()
      .then((res) => res.data.hits);

    for (const i in data) {
      console.log(data[i]);
    }

    // const data = this.httpService
    //   .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    //   .toPromise()
    //   .then((res) => res.data.hits)
    //   .then((a) => console.log(a));

    // const data = await this.httpService
    //   .get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
    //   .toPromise()
    //   .then((res) => res.data.hits);

    // const data = this.httpService
    //   .get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
    //   .pipe(
    //     map((axiosResponse: AxiosResponse) => {
    //       return axiosResponse.data.hits;
    //     }),
    //   );
    // console.log(data);
    // const data = this.httpService
    //   .get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
    //   .toPromise()
    //   .then((res) => res.data.hits)
    //   .then(map((a: any) => console.log(a.author)));

    // .subscribe((res) => res.data.hits);

    // data.forEach((raw) => console.log(raw));
    // data.pipe(map((raw) => console.log(raw)));

    // for (const i in data) {
    //   console.log(data[i]);
    // }

    // this.logger.log(data);
  }
}
