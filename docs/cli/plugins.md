---
summary: "CLI reference for `SkyKoi plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
title: "plugins"
---

# `SkyKoi plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:

- Plugin system: [Plugins](/tools/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
SkyKoi plugins list
SkyKoi plugins info <id>
SkyKoi plugins enable <id>
SkyKoi plugins disable <id>
SkyKoi plugins doctor
SkyKoi plugins update <id>
SkyKoi plugins update --all
```

Bundled plugins ship with SkyKoi but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `SkyKoi.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
SkyKoi plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
SkyKoi plugins install -l ./my-plugin
```

### Update

```bash
SkyKoi plugins update <id>
SkyKoi plugins update --all
SkyKoi plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
