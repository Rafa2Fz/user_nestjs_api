import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cryptography } from 'src/domain/services/cryptography/cryptography';

@Injectable()
export class BcryptService implements Cryptography {
  rounds = 10;

  async encrypt({ plainText }: Cryptography.InputEncrypt): Promise<string> {
    return await bcrypt.hash(plainText, this.rounds);
  }
  async compare({
    plainText,
    hash,
  }: Cryptography.InputDecrypt): Promise<boolean> {
    return await bcrypt.compare(plainText, hash);
  }
}
