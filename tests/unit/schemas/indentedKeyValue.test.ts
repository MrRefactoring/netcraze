import { describe, it, expect } from 'vitest';
import { parseIndentedKeyValue } from '../../../src/schemas/indentedKeyValue';

describe('parseIndentedKeyValue', () => {
  it('parses flat key: value lines', () => {
    const text = 'release: 1.2.3\narch: arm';
    expect(parseIndentedKeyValue(text)).toEqual({
      release: '1.2.3',
      arch: 'arm',
    });
  });

  it('parses nested indented blocks', () => {
    const text = [
      'top:',
      '  a: 1',
      '  b: 2',
    ].join('\n');
    expect(parseIndentedKeyValue(text)).toEqual({
      top: { a: '1', b: '2' },
    });
  });

  it('handles empty lines', () => {
    const text = 'release: 1.0\n\narch: x64';
    expect(parseIndentedKeyValue(text)).toEqual({
      release: '1.0',
      arch: 'x64',
    });
  });

  it('handles keys with no value (nested object)', () => {
    const text = [
      'ndm:',
      '  exact: 1.0',
      '  cdate: 2020-01-01',
    ].join('\n');
    expect(parseIndentedKeyValue(text)).toEqual({
      ndm: { exact: '1.0', cdate: '2020-01-01' },
    });
  });
});
