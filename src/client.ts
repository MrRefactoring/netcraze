import { Client } from 'ssh2';
import type { NetcrazeConnectionOptions, ExecOptions, RunClient } from './interfaces';
import { runCommand } from './transport';
import { createShow } from './api/show';
import { createSystem } from './api/system';
import { createComponents } from './api/components';

function buildConnectionConfig(
  opts: NetcrazeConnectionOptions
): Parameters<Client['connect']>[0] {
  const {
    host,
    username,
    port = 22,
    readyTimeout = 10000,
    password,
    privateKey,
    passphrase,
  } = opts;
  const config: Parameters<Client['connect']>[0] = {
    host,
    username,
    port,
    readyTimeout,
    tryKeyboard: false,
  };
  if (password) config.password = password;
  if (privateKey !== undefined) config.privateKey = privateKey;
  if (passphrase !== undefined) config.passphrase = passphrase;
  return config;
}

export function createClient(
  connectionOptions: NetcrazeConnectionOptions,
  execOptions: ExecOptions = {}
) {
  const conn = new Client();
  let isReady = false;
  let connectPromise: Promise<void> | null = null;

  const connectionConfig = buildConnectionConfig(connectionOptions);

  async function ensureConnected(): Promise<void> {
    if (isReady && connectPromise !== null) return connectPromise;

    connectPromise = new Promise((resolve, reject) => {
      if (connectionConfig.password) {
        conn.once('keyboard-interactive', (_name, _instructions, _lang, _prompts, finish) => {
          finish([connectionConfig.password as string]);
        });
      }
      let settled = false;
      const onReady = () => {
        if (settled) return;
        settled = true;
        isReady = true;
        resolve();
      };
      const onError = (err: Error) => {
        if (settled) return;
        settled = true;
        reject(err);
      };
      conn.once('ready', onReady).once('error', onError).connect(connectionConfig);
    });
    return connectPromise;
  }

  const run = async (command: string) => {
    await ensureConnected();
    return runCommand(conn, command, execOptions);
  };

  let show: ReturnType<typeof createShow> | undefined;
  let system: ReturnType<typeof createSystem> | undefined;
  let components: ReturnType<typeof createComponents> | undefined;

  const runClient: RunClient = { run };

  return {
    async disconnect(): Promise<void> {
      return new Promise((resolve) => {
        conn.once('close', () => {
          isReady = false;
          connectPromise = null;
          resolve();
        }).end();
      });
    },

    run,

    get show() {
      if (!show) show = createShow(runClient);
      return show;
    },

    get system() {
      if (!system) system = createSystem(runClient);
      return system;
    },

    get components() {
      if (!components) components = createComponents(runClient);
      return components;
    },
  };
}

export type NetcrazeClient = ReturnType<typeof createClient>;
