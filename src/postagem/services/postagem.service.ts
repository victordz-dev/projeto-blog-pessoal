import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}
  async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find();
  }
  async findByID(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
    });
    if (!postagem) {
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    }
    return postagem;
  }
  async findByTitle(title: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${title}%`),
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    const postAtualizada = postagem.id;

    if (!postAtualizada) {
      throw new HttpException(
        'Postagem não encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findByID(id);

    return await this.postagemRepository.delete(id);
  }
}
