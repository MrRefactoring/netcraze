import type { RunClient } from '../interfaces';
import {
  parseComponentsList,
  parseComponentsInstall,
  type ComponentsListResult,
  type ComponentsInstallResult,
} from '../schemas';

export function createComponents(client: RunClient) {
  return {
    list: (sandbox?: string): Promise<ComponentsListResult> =>
      client
        .run(sandbox ? `components list ${sandbox}` : 'components list')
        .then(parseComponentsList),
    install: (component: string): Promise<ComponentsInstallResult> =>
      client
        .run(`components install ${component}`)
        .then((raw) => parseComponentsInstall(raw, component)),
  };
}
