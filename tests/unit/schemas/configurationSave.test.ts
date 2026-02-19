import { describe, it, expect } from 'vitest';
import { parseConfigurationSave } from '../../../src/schemas/configurationSave';

describe('parseConfigurationSave', () => {
  it('marks success when message contains "Saving configuration"', () => {
    const raw = 'Saving configuration.';
    const result = parseConfigurationSave(raw);
    expect(result.message).toBe('Saving configuration.');
    expect(result.success).toBe(true);
  });

  it('marks success for "Saving configuration" without period', () => {
    const result = parseConfigurationSave('Saving configuration');
    expect(result.success).toBe(true);
  });

  it('marks failure when message does not match', () => {
    const result = parseConfigurationSave('Error: something failed');
    expect(result.message).toBe('Error: something failed');
    expect(result.success).toBe(false);
  });
});
