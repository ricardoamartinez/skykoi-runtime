# HEARTBEAT.md

## 🧠 Adaptive Priority System

Heartbeat fires every 2 minutes. Each beat, score what needs attention using staleness. Act on the top 1-2 items. Skip if nothing's due.

### How It Works
Each check has a **staleness score** = `(minutes since last run) / (ideal interval)`

Score >= 1.0 means it's due. Higher = more overdue. Always run the highest first.

### 📊 Universal Check Registry

These checks **auto-activate** based on your setup. Skip any that don't apply.

| Check | Ideal Interval | Activates When | What to Do |
|-------|---------------|----------------|------------|
| **Node health** | 5m | Paired nodes exist | Ping node endpoints, alert if down |
| **Unread messages** | 5m | Any channel configured | Check for missed pings/mentions needing response |
| **Git status** | 15m | Workspace has .git | Commit + push uncommitted changes |
| **Cron health** | 30m | Cron jobs exist | Check for failed runs |
| **Pending tasks** | 10m | Tasks mentioned in memory | Follow up on unfinished work from recent conversations |
| **Memory maintenance** | 4h | Always | Review daily files, distill into MEMORY.md |
| **Workspace cleanup** | 6h | Always | Fix stale notes, outdated docs, dead references |

### 🎯 Behavior-Adaptive Frequency

The checks above are baselines. **Adjust dynamically based on user behavior:**

- **User active in last 10m** → prioritize responsiveness, skip background work
- **User gone 30m+** → ramp up proactive work (git commits, memory, cleanup)
- **User gone 2h+** → deep work mode (memory maintenance, workspace organization, research)
- **Error detected** → increase health check frequency until resolved
- **Quiet hours** (detect from user timezone) → health checks only, skip noise

### 🔍 Context Discovery (First Few Beats)

On fresh start, discover what's relevant:
1. Check if workspace has `.git` → enable git checks
2. Check for paired nodes → enable node health
3. Check for cron jobs → enable cron health
4. Read recent memory files → find pending tasks
5. Check channel config → enable message checks

Store findings in `memory/heartbeat-state.json`.

### Algorithm
1. Read `memory/heartbeat-state.json` for last-run timestamps + discovered context
2. Calculate staleness score for each active check
3. If max score < 0.8, reply `HEARTBEAT_OK`
4. Run the 1-2 highest scoring checks
5. Update heartbeat-state.json
6. If actionable, message the user. If not, `HEARTBEAT_OK`

### Rules
- 🔴 **Critical alerts** (node down, auth expiring): bypass scoring, alert immediately
- 🟡 **User recently active**: be responsive, don't disappear into background work
- 🟢 **User away**: be productive, chain tasks, clean up, push code
- Never more than 2 checks per beat (stay fast)
- Proactive fixes (commit, push, fix typos) don't need permission
- Big changes (deploys, config changes, external sends) need permission
- **Learn patterns**: if user always asks about X in the morning, check X proactively

### 🏃 Be Productive, Not Busy
A real employee prioritizes by feel, not by checklist. Use scoring as a guide but also use judgment. If you notice something broken while doing another check, fix it. If everything is green, `HEARTBEAT_OK` and save the compute.
