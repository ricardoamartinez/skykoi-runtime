---
summary: "CLI reference for `SKYKOI config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
title: "config"
---

# `SKYKOI config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `SKYKOI configure`).

## Examples

```bash
SKYKOI config get browser.executablePath
SKYKOI config set browser.executablePath "/usr/bin/google-chrome"
SKYKOI config set agents.defaults.heartbeat.every "2h"
SKYKOI config set agents.list[0].tools.exec.node "node-id-or-name"
SKYKOI config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
SKYKOI config get agents.defaults.workspace
SKYKOI config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
SKYKOI config get agents.list
SKYKOI config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
SKYKOI config set agents.defaults.heartbeat.every "0m"
SKYKOI config set gateway.port 19001 --json
SKYKOI config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.
