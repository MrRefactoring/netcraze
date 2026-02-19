import { describe, it, expect, vi } from 'vitest';
import { createSystem } from '../../../src/api/system';
import type { RunClient } from '../../../src/interfaces';

describe('createSystem', () => {
  it('save() runs system configuration save and parses result', async () => {
    const run = vi.fn().mockResolvedValue('Saving configuration.');
    const system = createSystem({ run } as RunClient);
    const result = await system.save();
    expect(run).toHaveBeenCalledWith('system configuration save');
    expect(result.success).toBe(true);
    expect(result.message).toContain('Saving configuration');
  });
});
