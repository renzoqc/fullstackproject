import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  HttpService,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from './../../common/mongo-id.pipe';
import { CreateNewDto, UpdateNewDto, FilterNewsDto } from '../dtos/news.dtos';
import { NewsService } from '../services/news.service';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private httpService: HttpService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List of news' })
  getNews(@Query() params: FilterNewsDto) {
    return this.newsService.findAll(params);
  }

  @Get('message')
  getNewFilter() {
    return `yo soy un filter`;
  }

  // @Get('data')
  // root() {
  //   this.httpService
  //     .get(`https://api.github.com/users/januwA`)
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  @Get(':newId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('newId', MongoIdPipe) newId: string) {
    return this.newsService.findOne(newId);
  }

  @Post()
  create(@Body() payload: CreateNewDto) {
    return this.newsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateNewDto) {
    return this.newsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
