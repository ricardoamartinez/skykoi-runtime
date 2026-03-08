---
summary: "CLI reference for `SkyKoi voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
title: "voicecall"
---

# `SkyKoi voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
SkyKoi voicecall status --call-id <id>
SkyKoi voicecall call --to "+15555550123" --message "Hello" --mode notify
SkyKoi voicecall continue --call-id <id> --message "Any questions?"
SkyKoi voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
SkyKoi voicecall expose --mode serve
SkyKoi voicecall expose --mode funnel
SkyKoi voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.
