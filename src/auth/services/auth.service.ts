import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../bcript/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
  ) {}

  async validateUsuario(usuario: string, senha: string): Promise<object | null> {
    const user = await this.usuarioService.findByUsuario(usuario);
    const senhaValida = await this.bcrypt.compare(senha, user.senha);

    if (senhaValida) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(usuarioLogin: UsuarioLogin): Promise<object> {
    const payload = { sub: usuarioLogin.user };
    const buscarUsuario = await this.usuarioService.findByUsuario(usuarioLogin.user);
    return {
      id: buscarUsuario.id,
      nome: buscarUsuario.nome,
      usuario: buscarUsuario.usuario,
      senha: '',
      foto: buscarUsuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
