import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TemaService } from '../../tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
  ) {}

  async checkPost(id: number): Promise<boolean> {
    const find = await this.postagemRepository.exists({
      where: { id },
    });
    if (!find) {
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findAllPost(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async findPostById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    if (!postagem) {
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
    }

    return postagem;
  }

  async findPostByTitle(title: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${title}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async findPostByTema(temaId: number): Promise<Postagem[]> {
    await this.temaService.checkTema(temaId);
    return await this.postagemRepository.find({
      where: {
        tema: { id: temaId },
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async createPost(postagem: Postagem): Promise<Postagem> {
    await this.temaService.checkTema(postagem.tema.id);
    return await this.postagemRepository.save(postagem);
  }

  async updatePost(postagem: Postagem): Promise<Postagem> {
    await this.checkPost(postagem.id);
    await this.temaService.checkTema(postagem.tema.id);
    await this.postagemRepository.update(postagem.id, postagem);
    return this.findPostById(postagem.id);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    await this.checkPost(id);
    return await this.postagemRepository.delete(id);
  }
}
