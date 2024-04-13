export interface Cryptograph {
  encrypt(input: CryptoGraph.InputEncrypt): Promise<string>;
  decrypt(input: CryptoGraph.InputDecrypt): Promise<string>;
}

export namespace CryptoGraph {
  export type InputEncrypt = {
    plainText: string;
  };

  export type InputDecrypt = {
    plainText: string;
    hash: string;
  };
}
