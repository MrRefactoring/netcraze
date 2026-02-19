import type { RunClient } from '../interfaces';
import { parseConfigurationSave, type ConfigurationSaveResult } from '../schemas';

export function createSystem(client: RunClient) {
  return {
    save: (): Promise<ConfigurationSaveResult> =>
      client.run('system configuration save').then(parseConfigurationSave),
  };
}
