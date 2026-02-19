import { z } from 'zod';

export const configurationSaveSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type ConfigurationSaveResult = z.infer<typeof configurationSaveSchema>;

export function parseConfigurationSave(raw: string): ConfigurationSaveResult {
  const n = raw.trim();
  return configurationSaveSchema.parse({
    message: n,
    success: /Saving configuration\.?/i.test(n),
  });
}
