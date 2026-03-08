---
summary: "CLI reference for `SkyKoi reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `SkyKoi reset`

Reset local config/state (keeps the CLI installed).

```bash
SkyKoi reset
SkyKoi reset --dry-run
SkyKoi reset --scope config+creds+sessions --yes --non-interactive
```
