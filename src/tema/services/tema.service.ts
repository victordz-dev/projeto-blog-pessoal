import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async checkTema(id: number): Promise<boolean> {
    const find = await this.temaRepository.exists({
      where: { id },
    });
    if (!find) {
      throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findAllTema(): Promise<Tema[]> {
    return this.temaRepository.find({
      relations: {
        postagem: true,
      },
    });
  }

  async findTemaById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        postagem: true,
      },
    });

    if (!tema) {
      throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
    }
    return tema;
  }

  async findTemaByName(name: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        postagem: true,
      },
    });
  }

  async createTema(tema: Tema): Promise<Tema> {
    const temaExist = await this.temaRepository.findOne({
      where: { name: tema.name },
    });
    if (temaExist) {
      throw new HttpException('Tema já existe!', HttpStatus.BAD_REQUEST);
    }
    return this.temaRepository.save(tema);
  }

  async updateTema(tema: Tema): Promise<Tema> {
    await this.checkTema(tema.id);
    await this.temaRepository.update(tema.id, tema);
    return this.findTemaById(tema.id);
  }

  async deleteTema(id: number): Promise<DeleteResult> {
    await this.checkTema(id);
    return this.temaRepository.delete(id);
  }
}
