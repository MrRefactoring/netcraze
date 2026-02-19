import { describe, it, expect, vi } from 'vitest';
import { createShow } from '../../../src/api/show';
import type { RunClient } from '../../../src/interfaces';

describe('createShow', () => {
  it('version() runs show version and parses result', async () => {
    const run = vi.fn().mockResolvedValue(
      'release: 2.5\narch: arm\n(device)> '
    );
    const show = createShow({ run } as RunClient);
    const version = await show.version();
    expect(run).toHaveBeenCalledWith('show version');
    expect(version.release).toBe('2.5');
    expect(version.arch).toBe('arm');
  });
});
