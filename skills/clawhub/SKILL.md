---
name: SKYKOI Skills
description: Use the SKYKOI Skills CLI to search, install, update, and publish agent skills from SKYKOI Skills.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed SKYKOI Skills CLI.
metadata:
  {
    "SKYKOI":
      {
        "requires": { "bins": ["SKYKOI Skills"] },
        "install":
          [
            {
              "id": "node",
              "kind": "node",
              "package": "SKYKOI Skills",
              "bins": ["SKYKOI Skills"],
              "label": "Install SKYKOI Skills CLI (npm)",
            },
          ],
      },
  }
---

# SKYKOI Skills CLI

Install

```bash
npm i -g SKYKOI Skills
```

Auth (publish)

```bash
SKYKOI Skills login
SKYKOI Skills whoami
```

Search

```bash
SKYKOI Skills search "postgres backups"
```

Install

```bash
SKYKOI Skills install my-skill
SKYKOI Skills install my-skill --version 1.2.3
```

Update (hash-based match + upgrade)

```bash
SKYKOI Skills update my-skill
SKYKOI Skills update my-skill --version 1.2.3
SKYKOI Skills update --all
SKYKOI Skills update my-skill --force
SKYKOI Skills update --all --no-input --force
```

List

```bash
SKYKOI Skills list
```

Publish

```bash
SKYKOI Skills publish ./my-skill --slug my-skill --name "My Skill" --version 1.2.0 --changelog "Fixes + docs"
```

Notes

- Default registry: https://SKYKOI.com/skills (override with SKYKOI Skills_REGISTRY or --registry)
- Default workdir: cwd (falls back to SKYKOI workspace); install dir: ./skills (override with --workdir / --dir / SKYKOI Skills_WORKDIR)
- Update command hashes local files, resolves matching version, and upgrades to latest unless --version is set
