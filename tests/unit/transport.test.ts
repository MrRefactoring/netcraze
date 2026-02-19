import { describe, it, expect, vi } from 'vitest';
import { runCommand } from '../../src/transport';
import type { Client } from 'ssh2';

describe('runCommand', () => {
  it('runs command via exec and returns output', async () => {
    const conn = {
      exec(
        cmd: string,
        cb: (err: null, stream: { on: (ev: string, fn: (...args: any[]) => void) => void; stderr?: { on: (ev: string, fn: (...args: any[]) => void) => void }; destroy: () => void }) => void
      ) {
        setImmediate(() => {
          const stream = {
            on(ev: string, fn: (...args: any[]) => void) {
              if (ev === 'data') setImmediate(() => fn(Buffer.from('out')));
              if (ev === 'close') setImmediate(() => fn());
            },
            stderr: null,
            destroy: vi.fn(),
          };
          cb(null, stream as any);
        });
      },
    };
    const result = await runCommand(conn as unknown as Client, 'show version', {
      commandTimeout: 5000,
    });
    expect(result).toBe('out');
  });
});
