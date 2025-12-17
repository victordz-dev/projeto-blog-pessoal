import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAllUsuarios();
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  async findUsuarioById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findUsuarioById(id);
  }

  @Get('/usuario/:usuario')
  @HttpCode(HttpStatus.OK)
  async findByUsuario(@Param('usuario') usuario: string): Promise<Usuario | null> {
    return this.usuarioService.findByUsuario(usuario);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async createUsuario(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.createUsuario(usuario);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async updateUsuario(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.updateUsuario(usuario);
  }
}
