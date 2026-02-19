import { describe, it, expect } from 'vitest';
import {
  parseComponentsList,
  parseComponentsInstall,
} from '../../../src/schemas/components';

describe('parseComponentsList', () => {
  it('returns raw and optional firmware version', () => {
    const raw = [
      'firmware:',
      '  version: 3.0',
      '',
      'sandbox: main',
    ].join('\n');
    const result = parseComponentsList(raw);
    expect(result.raw).toBe(raw);
    expect(result.firmware?.version).toBe('3.0');
    expect(result.firmware?.sandbox).toBe('main');
  });

  it('handles minimal output', () => {
    const raw = 'no components';
    const result = parseComponentsList(raw);
    expect(result.raw).toBe(raw);
  });
});

describe('parseComponentsInstall', () => {
  it('marks success when "queued for installation"', () => {
    const result = parseComponentsInstall('Component x is queued for installation.', 'x');
    expect(result.success).toBe(true);
    expect(result.component).toBe('x');
  });

  it('marks success when "is queued"', () => {
    const result = parseComponentsInstall('Package y is queued');
    expect(result.success).toBe(true);
  });

  it('marks failure otherwise', () => {
    const result = parseComponentsInstall('Error: not found');
    expect(result.success).toBe(false);
  });
});
