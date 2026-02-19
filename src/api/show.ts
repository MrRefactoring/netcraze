import type { RunClient } from '../interfaces';
import { parseShowVersion, type ShowVersion } from '../schemas';

export function createShow(client: RunClient) {
  return {
    version: (): Promise<ShowVersion> =>
      client.run('show version').then(parseShowVersion),
  };
}
