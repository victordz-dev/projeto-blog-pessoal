import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async encrypt(password: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }
  async compare(passwordTyped: string, passwordStored: string): Promise<boolean> {
    return bcrypt.compare(passwordTyped, passwordStored);
  }
}
