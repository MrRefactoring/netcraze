# Netcraze

TypeScript API client for Netcraze routers. Connects via SSH and runs CLI commands (show version, system configuration save, components list, components install).

## Install

```bash
npm install netcraze
# or
pnpm add netcraze
```

## Usage

```typescript
import { createClient } from 'netcraze';

const client = createClient({ host: '192.168.1.1', username: 'admin', password: '…' });
// Connection is established automatically on first command

const v = await client.show.version();
await client.system.save();
const components = await client.components.list();
await client.components.install('ntfs');

await client.disconnect();
```

## API

- `createClient(options, execOptions?)` — returns client with `disconnect()`, `run(command)`, `show.version()`, `system.save()`, `components.list(sandbox?)`, `components.install(component)`. Connection is established automatically on first use.
- All methods return Zod-validated results.

From `netcraze` you also get: `parseShowVersion`, `parseConfigurationSave`, `parseComponentsList`, `parseComponentsInstall`, schemas and types.

## Docs

- `netcraze_cli_reference.md` — full CLI reference.
- `netcraze_command_index.md` — command index.
- `netcraze_commands_normalized.json` — normalized command definitions.
