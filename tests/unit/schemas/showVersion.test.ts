import { describe, it, expect } from 'vitest';
import { parseShowVersion } from '../../../src/schemas/showVersion';

describe('parseShowVersion', () => {
  it('parses minimal show version output', () => {
    const raw = [
      '(device)> show version',
      'release: 1.2.3',
      '(device)>',
    ].join('\n');
    const result = parseShowVersion(raw);
    expect(result.release).toBe('1.2.3');
  });

  it('strips prompt and "show version" prefix', () => {
    const raw = '  show version  \nrelease: 2.0\n(router)> ';
    const result = parseShowVersion(raw);
    expect(result.release).toBe('2.0');
  });

  it('parses multiple fields', () => {
    const raw = [
      'release: 3.0',
      'arch: arm64',
      'model: KN-1010',
      'manufacturer: Keenetic',
    ].join('\n');
    const result = parseShowVersion(raw);
    expect(result.release).toBe('3.0');
    expect(result.arch).toBe('arm64');
    expect(result.model).toBe('KN-1010');
    expect(result.manufacturer).toBe('Keenetic');
  });

  it('splits features and components by comma and trims', () => {
    const raw = [
      'release: 1.0',
      'features: a, b , c',
      'components: x, y',
    ].join('\n');
    const result = parseShowVersion(raw);
    expect(result.features).toEqual(['a', 'b', 'c']);
    expect(result.components).toEqual(['x', 'y']);
  });

  it('normalizes hw_version, hw_type, hw_id to camelCase', () => {
    const raw = [
      'release: 1.0',
      'hw_version: 2.0',
      'hw_type: router',
      'hw_id: abc-123',
    ].join('\n');
    const result = parseShowVersion(raw);
    expect(result.hwVersion).toBe('2.0');
    expect(result.hwType).toBe('router');
    expect(result.hwId).toBe('abc-123');
  });

  it('fills missing optional fields with default empty string', () => {
    const raw = 'release: 1.0';
    const result = parseShowVersion(raw);
    expect(result.sandbox).toBe('');
    expect(result.arch).toBe('');
    expect(result.features).toEqual([]);
    expect(result.components).toEqual([]);
  });
});
