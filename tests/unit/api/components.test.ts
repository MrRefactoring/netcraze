import { describe, it, expect, vi } from 'vitest';
import { createComponents } from '../../../src/api/components';
import type { RunClient } from '../../../src/interfaces';

describe('createComponents', () => {
  it('list() runs components list and parses result', async () => {
    const raw = 'firmware:\n  version: 3.0\n\nsandbox: main';
    const run = vi.fn().mockResolvedValue(raw);
    const components = createComponents({ run } as RunClient);
    const result = await components.list();
    expect(run).toHaveBeenCalledWith('components list');
    expect(result.raw).toBe(raw);
    expect(result.firmware?.version).toBe('3.0');
  });

  it('list(sandbox) runs components list <sandbox>', async () => {
    const run = vi.fn().mockResolvedValue('raw');
    const components = createComponents({ run } as RunClient);
    await components.list('my-sandbox');
    expect(run).toHaveBeenCalledWith('components list my-sandbox');
  });

  it('install(name) runs components install <name> and parses result', async () => {
    const run = vi.fn().mockResolvedValue('Component foo is queued for installation.');
    const components = createComponents({ run } as RunClient);
    const result = await components.install('foo');
    expect(run).toHaveBeenCalledWith('components install foo');
    expect(result.success).toBe(true);
    expect(result.component).toBe('foo');
  });
});
