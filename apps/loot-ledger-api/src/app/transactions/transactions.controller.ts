import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { TransactionsService, Transaction } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  private getUserId(headers: any): string {
    return headers['x-user-id'];
  }

  @Get()
  findAll(@Headers() headers: any, @Query() query: any) {
    return this.transactionsService.findAll(this.getUserId(headers), query);
  }

  @Post()
  create(@Headers() headers: any, @Body() data: Omit<Transaction, 'id'>) {
    return this.transactionsService.create(this.getUserId(headers), data);
  }

  @Patch(':id')
  update(
    @Headers() headers: any,
    @Param('id') id: string,
    @Body() data: Partial<Transaction>,
  ) {
    return this.transactionsService.update(this.getUserId(headers), id, data);
  }

  @Delete(':id')
  remove(@Headers() headers: any, @Param('id') id: string) {
    return this.transactionsService.remove(this.getUserId(headers), id);
  }

  @Get('categories')
  getCategories(@Headers() headers: any) {
    return this.transactionsService.getCategories(this.getUserId(headers));
  }

  @Get('subcategories')
  getSubcategories(@Headers() headers: any) {
    return this.transactionsService.getSubcategories(this.getUserId(headers));
  }

  @Get('widget-query')
  getWidgetData(@Headers() headers: any, @Query() query: any) {
    return this.transactionsService.getWidgetData(this.getUserId(headers), query);
  }

  @Get('summary')
  getSummary(@Headers() headers: any) {
    return this.transactionsService.getSummary(this.getUserId(headers));
  }
}
