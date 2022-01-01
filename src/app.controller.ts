import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor() {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  start() {
    return 'Welcome to my website';
  }

  // @Get('/ruta/')
  // hello() {
  //   return 'con /sas/';
  // }

  // @Get('/tasks/')
  // getTasks() {
  //   return this.appService.getTasks();
  // }
}
