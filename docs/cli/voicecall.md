---
summary: "CLI reference for `SKYKOI voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
title: "voicecall"
---

# `SKYKOI voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
SKYKOI voicecall status --call-id <id>
SKYKOI voicecall call --to "+15555550123" --message "Hello" --mode notify
SKYKOI voicecall continue --call-id <id> --message "Any questions?"
SKYKOI voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
SKYKOI voicecall expose --mode serve
SKYKOI voicecall expose --mode funnel
SKYKOI voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.
