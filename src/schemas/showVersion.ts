import { z } from 'zod';
import { parseIndentedKeyValue } from './indentedKeyValue';

const str = (v: unknown) => (typeof v === 'string' ? v : '');
const arr = (v: unknown) =>
  typeof v === 'string' ? v.split(',').map((x) => x.trim()).filter(Boolean) : [];
const nest = <T extends Record<string, string>>(def: T) => (v: unknown) =>
  v && typeof v === 'object' && !Array.isArray(v)
    ? { ...def, ...(v as Record<string, string>) }
    : def;

const NDM = { exact: '', cdate: '' };
const BSP = { exact: '', cdate: '' };
const NDW = { features: '', components: '' };
const NDW3 = { version: '' };
const NDW4 = { version: '' };

const ndmSchema = z.object({ exact: z.string(), cdate: z.string() });
const bspSchema = z.object({ exact: z.string(), cdate: z.string() });
const ndwSchema = z.object({ features: z.string(), components: z.string() });
const ndw3Schema = z.object({ version: z.string() });
const ndw4Schema = z.object({ version: z.string() });

const showVersionOutputSchema = z.object({
  release: z.string(),
  sandbox: z.string(),
  title: z.string(),
  arch: z.string(),
  ndm: ndmSchema,
  bsp: bspSchema,
  ndw: ndwSchema,
  ndw3: ndw3Schema,
  ndw4: ndw4Schema,
  features: z.array(z.string()),
  components: z.array(z.string()),
  manufacturer: z.string(),
  vendor: z.string(),
  series: z.string(),
  model: z.string(),
  hwVersion: z.string(),
  hwType: z.string(),
  hwId: z.string(),
  device: z.string(),
  consent: z.string(),
  region: z.string(),
  description: z.string(),
});

export type ShowVersion = z.infer<typeof showVersionOutputSchema>;

function build(raw: Record<string, unknown>) {
  const r = raw;
  return {
    release: str(r.release),
    sandbox: str(r.sandbox),
    title: str(r.title),
    arch: str(r.arch),
    ndm: nest(NDM)(r.ndm),
    bsp: nest(BSP)(r.bsp),
    ndw: nest(NDW)(r.ndw),
    ndw3: nest(NDW3)(r.ndw3),
    ndw4: nest(NDW4)(r.ndw4),
    features: arr(r.features),
    components: arr(r.components),
    manufacturer: str(r.manufacturer),
    vendor: str(r.vendor),
    series: str(r.series),
    model: str(r.model),
    hwVersion: str(r.hw_version ?? r.hwVersion),
    hwType: str(r.hw_type ?? r.hwType),
    hwId: str(r.hw_id ?? r.hwId),
    device: str(r.device),
    consent: str(r.consent),
    region: str(r.region),
    description: str(r.description),
  };
}

export const showVersionSchema = z
  .record(z.string(), z.unknown())
  .transform((raw) => build(raw as Record<string, unknown>))
  .pipe(showVersionOutputSchema);

export function parseShowVersion(raw: string): ShowVersion {
  const stripped = raw
    .replace(/\s*\([\w-]+\)>\s*$/, '')
    .replace(/^\s*show version\s*/i, '')
    .trim();
  const parsed = parseIndentedKeyValue(stripped) as Record<string, unknown>;
  return showVersionSchema.parse(parsed);
}
