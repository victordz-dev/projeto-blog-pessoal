import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../../auth/bcript/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: BcryptService,
  ) {}

  async checkUsuario(usuario: string): Promise<boolean> {
    const find = await this.usuarioRepository.exists({
      where: { usuario: usuario },
    });
    if (!find) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findByUsuario(usuario: string): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { usuario } });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async createUsuario(usuario: Usuario): Promise<Usuario> {
    await this.checkUsuario(usuario.usuario);
    usuario.senha = await this.bcrypt.encrypt(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }

  async updateUsuario(usuario: Usuario): Promise<Usuario> {
    await this.findUsuarioById(usuario.id);
    const buscar = await this.findByUsuario(usuario.usuario);

    if (buscar.id !== usuario.id) {
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }
    usuario.senha = await this.bcrypt.encrypt(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }
}
