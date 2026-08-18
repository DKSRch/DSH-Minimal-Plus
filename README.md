# DSH Minimal Plus

A DSH agent preset that wraps the first model request in the **exact Minimal**
two-tool surface (`bash` + `str_replace_editor`), then opens the full
preset catalog once the session is safely anchored on a minimal-shaped reasoning
block.

## Files

- `agent.cordis.yml` — the preset composition (21 plugin rows).
- `tool-bootstrap.mjs` — local two-phase bootstrap / anchor gate / Code Mode
  switcher.
- `preset.yml` — display metadata shown in the new-session picker.
- `NOTICE` — upstream attribution chain.
- `LICENSE` — MIT (provided by GitHub when the repo was created).

## Upstream

- Adapted from DeepSeek Harness builtin `minimal` and `standard` presets
  (MIT).
- `tool-bootstrap.mjs` derived from
  [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)
  (MIT), with the dsh-liangshen two-phase isolation extension.
- See [NOTICE](./NOTICE) for the full attribution chain.

This preset is distributed under the MIT License — see [LICENSE](./LICENSE).

## Prerequisites

A working `dsh` install (the install that already ships the
`@deepseek-ai/dsh-*` packages this composition references).

No `npm install` is required: every package named in `agent.cordis.yml`
(`dsh-persona`, `dsh-terminal`, `dsh-tool-bash-persistent`,
`dsh-tool-str-replace-editor`, `dsh-tool-fs`, `dsh-tool-fs-search`,
`dsh-tool-jobs`, `dsh-skill-filesystem`, `dsh-tool-skill`,
`dsh-tool-goal`, `dsh-plan-mode`, `dsh-compaction-basic`,
`dsh-compaction-tool-result-pruner`, `dsh-command-compact`,
`dsh-tool-subagent`, `dsh-tool-subagent-control`,
`dsh-workflow-worker-thread`, `dsh-tool-workflow`, `dsh-tool-ralph`,
`dsh-tool-ask-user`, `dsh-tool-todo`, `dsh-tool-web`,
`dsh-agent-instructions`) ships with the standard `dsh` distribution.

## Install

Copy or clone this directory into the local agent-presets root, then restart
the `dsh-web` process so the roster re-scans:

```sh
# default root on Linux / macOS
git clone https://github.com/DKSRch/DSH-Minimal-Plus.git \
  "$HOME/.dsh/.agent-presets/DSH-Minimal-Plus"

# default root on Windows (PowerShell)
git clone https://github.com/DKSRch/DSH-Minimal-Plus.git `
  "$env:USERPROFILE\.dsh\.agent-presets\DSH-Minimal-Plus"
```

After restart, the preset appears in the new-session picker.

## Verify the mount

In any session, run:

```js
await ctx.agentPresets.standingKeyFor('DSH-Minimal-Plus')
```

This composes the preset's plugin subtree end-to-end and rejects:

- a row whose package does not resolve,
- invalid config,
- a row that never activated,
- a service published into the root realm.

A clean return means the composition mounts; then start a real session on it
to confirm the phase-1 tool catalog is `bash` + `str_replace_editor` only and
expands after the first anchored tool call.