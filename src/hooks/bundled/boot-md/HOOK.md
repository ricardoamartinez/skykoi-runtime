---
name: boot-md
description: "Run BOOT.md on gateway startup"
homepage: https://docs.skykoi.com/hooks#boot-md
metadata:
  {
    "skykoi":
      {
        "emoji": "🚀",
        "events": ["gateway:startup"],
        "requires": { "config": ["workspace.dir"] },
        "install": [{ "id": "bundled", "kind": "bundled", "label": "Bundled with SkyKoi" }],
      },
  }
---

# Boot Checklist Hook

Runs `BOOT.md` every time the gateway starts, if the file exists in the workspace.
