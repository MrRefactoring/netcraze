import { describe, it, expect, afterAll } from 'vitest';
import { createClient } from '../../src/client';

const hasEnv =
  process.env.NETCRAZE_HOST &&
  process.env.NETCRAZE_USER &&
  (process.env.NETCRAZE_PASSWORD || process.env.NETCRAZE_PRIVATE_KEY);

describe.runIf(hasEnv)('integration: client', () => {
  const client = createClient({
    host: process.env.NETCRAZE_HOST!,
    username: process.env.NETCRAZE_USER!,
    password: process.env.NETCRAZE_PASSWORD,
    privateKey: process.env.NETCRAZE_PRIVATE_KEY,
    port: process.env.NETCRAZE_PORT ? Number(process.env.NETCRAZE_PORT) : undefined,
  });

  afterAll(async () => {
    await client.disconnect();
  });

  it('show.version() returns parsed version', async () => {
    const version = await client.show.version();
    expect(version).toBeDefined();
    expect(version.release).toBeDefined();
    expect(typeof version.release).toBe('string');
  });

  it.skip('system.save() returns save result', async () => {
    const result = await client.system.save();
    expect(result).toBeDefined();
    expect(typeof result.message).toBe('string');
    expect(typeof result.success).toBe('boolean');
  });

  it.skip('components.list() returns list result', async () => {
    const result = await client.components.list();
    expect(result).toBeDefined();
    expect(result.raw).toBeDefined();
    expect(typeof result.raw).toBe('string');
  });

  it.skip('components.install(name) returns install result', async () => {
    const result = await client.components.install('some-component');
    expect(result).toBeDefined();
    expect(typeof result.message).toBe('string');
    expect(typeof result.success).toBe('boolean');
  });
});
