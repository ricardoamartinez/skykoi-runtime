---
summary: "CLI reference for `SKYKOI agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
title: "agents"
---

# `SKYKOI agents`

Manage isolated agents (workspaces + auth + routing).

Related:

- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
SKYKOI agents list
SKYKOI agents add work --workspace ~/.SKYKOI/workspace-work
SKYKOI agents set-identity --workspace ~/.SKYKOI/workspace --from-identity
SKYKOI agents set-identity --agent main --avatar avatars/SKYKOI.png
SKYKOI agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.SKYKOI/workspace/IDENTITY.md`
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
SKYKOI agents set-identity --workspace ~/.SKYKOI/workspace --from-identity
```

Override fields explicitly:

```bash
SKYKOI agents set-identity --agent main --name "SKYKOI" --emoji "🦞" --avatar avatars/SKYKOI.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "SKYKOI",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/SKYKOI.png",
        },
      },
    ],
  },
}
```
