---
summary: "CLI reference for `SKYKOI doctor` (health checks + guided repairs)"
read_when:
  - You have connectivity/auth issues and want guided fixes
  - You updated and want a sanity check
title: "doctor"
---

# `SKYKOI doctor`

Health checks + quick fixes for the gateway and channels.

Related:

- Troubleshooting: [Troubleshooting](/gateway/troubleshooting)
- Security audit: [Security](/gateway/security)

## Examples

```bash
SKYKOI doctor
SKYKOI doctor --repair
SKYKOI doctor --deep
```

Notes:

- Interactive prompts (like keychain/OAuth fixes) only run when stdin is a TTY and `--non-interactive` is **not** set. Headless runs (cron, Telegram, no terminal) will skip prompts.
- `--fix` (alias for `--repair`) writes a backup to `~/.SKYKOI/SKYKOI.json.bak` and drops unknown config keys, listing each removal.

## macOS: `launchctl` env overrides

If you previously ran `launchctl setenv SKYKOI_GATEWAY_TOKEN ...` (or `...PASSWORD`), that value overrides your config file and can cause persistent “unauthorized” errors.

```bash
launchctl getenv SKYKOI_GATEWAY_TOKEN
launchctl getenv SKYKOI_GATEWAY_PASSWORD

launchctl unsetenv SKYKOI_GATEWAY_TOKEN
launchctl unsetenv SKYKOI_GATEWAY_PASSWORD
```
