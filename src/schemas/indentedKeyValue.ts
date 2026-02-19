export function parseIndentedKeyValue(text: string): Record<string, unknown> {
  const lines = text.split(/\r?\n/);
  const entries: { indent: number; key: string; value: string }[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const indent = line.search(/\S/);
    if (indent === -1) {
      i++;
      continue;
    }
    const trimmed = line.slice(indent);
    const match = trimmed.match(/^(\S+):\s*(.*)$/);
    if (match) {
      const [, key, valueStart] = match;
      let value = valueStart;
      i++;
      while (i < lines.length) {
        const next = lines[i];
        const nextIndent = next.search(/\S/);
        if (nextIndent === -1) {
          i++;
          continue;
        }
        const nextTrimmed = next.slice(nextIndent);
        if (nextTrimmed.match(/^\S+:\s*/)) break;
        if (nextIndent > indent) {
          value = value ? `${value} ${nextTrimmed}` : nextTrimmed;
          i++;
        } else break;
      }
      entries.push({ indent, key, value: value.trim() });
    } else i++;
  }
  function buildNested(
    ent: typeof entries,
    start: number,
    minIndent: number
  ): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    let j = start;
    while (j < ent.length) {
      const { indent, key, value } = ent[j];
      if (indent < minIndent) break;
      if (value) {
        out[key] = value;
        j++;
      } else {
        const childStart = j + 1;
        let end = childStart;
        while (end < ent.length && ent[end].indent > indent) end++;
        out[key] = buildNested(ent, childStart, indent + 1);
        j = end;
      }
    }
    return out;
  }
  return buildNested(entries, 0, 0);
}
