import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdatedBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name); // create instance of logger
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    this.logger.log('Getting all books');
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    this.logger.log(`Creating book: ${book.title}`);
    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    this.logger.log(`Getting book by id: ${id}`);
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdatedBookDto,
  ): Promise<Book> {
    this.logger.log(`Update book by id: ${id}`);
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    this.logger.log(`Deleted book by id: ${id}`);
    return this.bookService.deleteById(id);
  }
}
