---
summary: "CLI reference for `SKYKOI reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `SKYKOI reset`

Reset local config/state (keeps the CLI installed).

```bash
SKYKOI reset
SKYKOI reset --dry-run
SKYKOI reset --scope config+creds+sessions --yes --non-interactive
```
