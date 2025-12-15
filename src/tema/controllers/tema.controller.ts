import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Tema } from '../entities/tema.entity';
import { TemaService } from '../services/tema.service';
import { DeleteResult } from 'typeorm';

@Controller('/tema')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllTema(): Promise<Tema[]> {
    return this.temaService.findAllTema();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findTemaById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findTemaById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findTemaByName(@Param('name') name: string): Promise<Tema[]> {
    return this.temaService.findTemaByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTema(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.createTema(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateTema(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.updateTema(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTema(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.temaService.deleteTema(id);
  }
}
