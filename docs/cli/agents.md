---
summary: "CLI reference for `SkyKoi agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
title: "agents"
---

# `SkyKoi agents`

Manage isolated agents (workspaces + auth + routing).

Related:

- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
SkyKoi agents list
SkyKoi agents add work --workspace ~/.skykoi/workspace-work
SkyKoi agents set-identity --workspace ~/.skykoi/workspace --from-identity
SkyKoi agents set-identity --agent main --avatar avatars/SkyKoi.png
SkyKoi agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.skykoi/workspace/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:

- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
SkyKoi agents set-identity --workspace ~/.skykoi/workspace --from-identity
```

Override fields explicitly:

```bash
SkyKoi agents set-identity --agent main --name "SkyKoi" --emoji "🦞" --avatar avatars/SkyKoi.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "SkyKoi",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/SkyKoi.png",
        },
      },
    ],
  },
}
```
