---
summary: "CLI reference for `SKYKOI onboard` (interactive onboarding wizard)"
read_when:
  - You want guided setup for gateway, workspace, auth, channels, and skills
title: "onboard"
---

# `SKYKOI onboard`

Interactive onboarding wizard (local or remote Gateway setup).

## Related guides

- CLI onboarding hub: [Onboarding Wizard (CLI)](/start/wizard)
- CLI onboarding reference: [CLI Onboarding Reference](/start/wizard-cli-reference)
- CLI automation: [CLI Automation](/start/wizard-cli-automation)
- macOS onboarding: [Onboarding (macOS App)](/start/onboarding)

## Examples

```bash
SKYKOI onboard
SKYKOI onboard --flow quickstart
SKYKOI onboard --flow manual
SKYKOI onboard --mode remote --remote-url ws://gateway-host:18789
```

Flow notes:

- `quickstart`: minimal prompts, auto-generates a gateway token.
- `manual`: full prompts for port/bind/auth (alias of `advanced`).
- Fastest first chat: `SKYKOI dashboard` (Control UI, no channel setup).

## Common follow-up commands

```bash
SKYKOI configure
SKYKOI agents add <name>
```

<Note>
`--json` does not imply non-interactive mode. Use `--non-interactive` for scripts.
</Note>
