export interface NetcrazeConnectionOptions {
  host: string;
  port?: number;
  username: string;
  password?: string;
  privateKey?: string | Buffer;
  passphrase?: string;
  readyTimeout?: number;
}
