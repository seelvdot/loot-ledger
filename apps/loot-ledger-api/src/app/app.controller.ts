import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('uploads/:filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    throw new NotFoundException('Arquivo não encontrado');
  }
}
