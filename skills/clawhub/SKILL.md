---
name: SkyKoi Skills
description: Use the SkyKoi Skills CLI to search, install, update, and publish agent skills from SkyKoi Skills.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed SkyKoi Skills CLI.
metadata:
  {
    "SkyKoi":
      {
        "requires": { "bins": ["SkyKoi Skills"] },
        "install":
          [
            {
              "id": "node",
              "kind": "node",
              "package": "SkyKoi Skills",
              "bins": ["SkyKoi Skills"],
              "label": "Install SkyKoi Skills CLI (npm)",
            },
          ],
      },
  }
---

# SkyKoi Skills CLI

Install

```bash
npm i -g SkyKoi Skills
```

Auth (publish)

```bash
SkyKoi Skills login
SkyKoi Skills whoami
```

Search

```bash
SkyKoi Skills search "postgres backups"
```

Install

```bash
SkyKoi Skills install my-skill
SkyKoi Skills install my-skill --version 1.2.3
```

Update (hash-based match + upgrade)

```bash
SkyKoi Skills update my-skill
SkyKoi Skills update my-skill --version 1.2.3
SkyKoi Skills update --all
SkyKoi Skills update my-skill --force
SkyKoi Skills update --all --no-input --force
```

List

```bash
SkyKoi Skills list
```

Publish

```bash
SkyKoi Skills publish ./my-skill --slug my-skill --name "My Skill" --version 1.2.0 --changelog "Fixes + docs"
```

Notes

- Default registry: https://skykoi.com/skills (override with SkyKoi Skills_REGISTRY or --registry)
- Default workdir: cwd (falls back to SkyKoi workspace); install dir: ./skills (override with --workdir / --dir / SkyKoi Skills_WORKDIR)
- Update command hashes local files, resolves matching version, and upgrades to latest unless --version is set
