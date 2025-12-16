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
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';
import { DeleteResult } from 'typeorm';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPost(): Promise<Postagem[]> {
    return this.postagemService.findAllPost();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findPostById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findPostById(id);
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  async findPostByTitle(@Param('title') title: string): Promise<Postagem[]> {
    return this.postagemService.findPostByTitle(title);
  }

  @Get('/tema/:temaId')
  @HttpCode(HttpStatus.OK)
  async findPostByTema(@Param('temaId', ParseIntPipe) temaId: number): Promise<Postagem[]> {
    return this.postagemService.findPostByTema(temaId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.createPost(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updatePost(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.updatePost(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.postagemService.deletePost(id);
  }
}
