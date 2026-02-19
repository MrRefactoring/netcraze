export interface RunClient {
  run(command: string): Promise<string>;
}
