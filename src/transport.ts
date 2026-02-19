import type { Client } from 'ssh2';
import type { ExecOptions } from './interfaces';

const DEFAULT_COMMAND_TIMEOUT = 15000;

/**
 * Runs a single CLI command via SSH exec. Returns concatenated stdout + stderr.
 */
export function runCommand(
  conn: Client,
  command: string,
  options: ExecOptions = {}
): Promise<string> {
  const commandTimeout = options.commandTimeout ?? DEFAULT_COMMAND_TIMEOUT;

  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err);
        return;
      }
      let buffer = '';
      const timeoutId = setTimeout(() => {
        stream.destroy();
        reject(new Error(`Timeout executing "${command}" (${commandTimeout}ms)`));
      }, commandTimeout);
      const append = (data: Buffer | string) => {
        buffer += typeof data === 'string' ? data : data.toString('utf8');
      };
      stream.on('data', append);
      stream.stderr?.on('data', append);
      stream.on('close', () => {
        clearTimeout(timeoutId);
        resolve(buffer);
      });
      stream.on('error', (e: Error) => {
        clearTimeout(timeoutId);
        reject(e);
      });
    });
  });
}
