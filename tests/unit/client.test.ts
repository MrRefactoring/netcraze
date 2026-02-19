import { describe, it, expect, vi, afterEach } from 'vitest';
import { createClient } from '../../src/client';

describe('createClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns disconnect, run, show, system, components', () => {
    const client = createClient({
      host: 'localhost',
      username: 'admin',
      password: 'secret',
    });
    expect(typeof client.disconnect).toBe('function');
    expect(typeof client.run).toBe('function');
    expect(client.show).toBeDefined();
    expect(client.system).toBeDefined();
    expect(client.components).toBeDefined();
  });

  it('show.version is a function', () => {
    const client = createClient({ host: 'h', username: 'u', password: 'p' });
    expect(typeof client.show.version).toBe('function');
  });

  it('system.save is a function', () => {
    const client = createClient({ host: 'h', username: 'u', password: 'p' });
    expect(typeof client.system.save).toBe('function');
  });

  it('components.list and components.install are functions', () => {
    const client = createClient({ host: 'h', username: 'u', password: 'p' });
    expect(typeof client.components.list).toBe('function');
    expect(typeof client.components.install).toBe('function');
  });
});
