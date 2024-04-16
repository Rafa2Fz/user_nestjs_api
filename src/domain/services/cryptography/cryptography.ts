export interface Cryptography {
  encrypt(input: Cryptography.InputEncrypt): Promise<string>;
  compare(input: Cryptography.InputDecrypt): Promise<boolean>;
}

export namespace Cryptography {
  export type InputEncrypt = {
    plainText: string;
  };

  export type InputDecrypt = {
    plainText: string;
    hash: string;
  };
}
