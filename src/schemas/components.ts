import { z } from 'zod';

const componentEntry = z.object({
  name: z.string().optional(),
  priority: z.string().optional(),
  size: z.string().optional(),
  hash: z.string().optional(),
  installed: z.string().optional(),
  preset: z.union([z.string(), z.array(z.string())]).optional(),
});

export const componentsListSchema = z.object({
  raw: z.string(),
  firmware: z.object({ version: z.string().optional(), sandbox: z.string().optional() }).optional(),
  local: z.object({ sandbox: z.string().optional() }).optional(),
  components: z.array(componentEntry).optional(),
});

export type ComponentsListResult = z.infer<typeof componentsListSchema>;

export function parseComponentsList(raw: string): ComponentsListResult {
  const result: ComponentsListResult = { raw };
  const fw = raw.match(/firmware:\s*\n\s*version:\s*(.+?)(?=\n\s*\n|\n\s*sandbox:)/s);
  if (fw) result.firmware = { version: fw[1].trim() };
  const sb = raw.match(/sandbox:\s*(\S+)/);
  if (sb && result.firmware) result.firmware.sandbox = sb[1];
  return componentsListSchema.parse(result);
}

export const componentsInstallSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  component: z.string().optional(),
});

export type ComponentsInstallResult = z.infer<typeof componentsInstallSchema>;

export function parseComponentsInstall(raw: string, component?: string): ComponentsInstallResult {
  const n = raw.trim();
  return componentsInstallSchema.parse({
    message: n,
    success: /queued for installation|is queued/i.test(n),
    component,
  });
}
