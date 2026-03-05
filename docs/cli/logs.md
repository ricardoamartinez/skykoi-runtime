---
summary: "CLI reference for `SKYKOI logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `SKYKOI logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
SKYKOI logs
SKYKOI logs --follow
SKYKOI logs --json
SKYKOI logs --limit 500
```
