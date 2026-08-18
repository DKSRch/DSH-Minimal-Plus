# DSH Minimal Plus

两阶段锚定的 DSH 代理预设,在首轮模型请求时只暴露官方 Minimal 精确双工具(持久 bash 与 str_replace_editor),只保留一行 persona,清空运行时上下文并只放行用户的直接消息,锚定 Minimal 推理轨迹;晋升受首块锚定门控(首块包含 we 且无 let me,四步兜底),无工具首轮会在响应后自动晋升,晋升后 wire 切换为 Code Mode(PTC,单一 run_code)并在 persona 追加所选工作区路径,workspace 指令与 skill 目录在晋升后再延迟一步注入。

---

## 文件结构

- `agent.cordis.yml` — preset 核心 composition,声明 21 行 plugin
- `tool-bootstrap.mjs` — 两阶段锚定引导器(本地扩展)
- `preset.yml` — 元数据(name/description/order)
- `NOTICE` — 版权声明
- `LICENSE` — MIT

## 上游来源

- `agent.cordis.yml` 改编自 DeepSeek Harness 内置 Minimal 与 Standard preset(MIT)
- `tool-bootstrap.mjs` 来自 [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)(MIT),并包含 dsh-liangshen 的两阶段隔离扩展
- 完整上游归属链见 [NOTICE](./NOTICE)

本 preset 以 MIT 协议分发 — 详见 [LICENSE](./LICENSE)

## 前置条件

可用的 `dsh` 安装(已包含本 composition 引用的所有 `@deepseek-ai/dsh-*` 包)

无需额外 `npm install`:`agent.cordis.yml` 中列出的所有包(
`dsh-persona`, `dsh-terminal`, `dsh-tool-bash-persistent`,
`dsh-tool-str-replace-editor`, `dsh-tool-fs`, `dsh-tool-fs-search`,
`dsh-tool-jobs`, `dsh-skill-filesystem`, `dsh-tool-skill`,
`dsh-tool-goal`, `dsh-plan-mode`, `dsh-compaction-basic`,
`dsh-compaction-tool-result-pruner`, `dsh-command-compact`,
`dsh-tool-subagent`, `dsh-tool-subagent-control`,
`dsh-workflow-worker-thread`, `dsh-tool-workflow`, `dsh-tool-ralph`,
`dsh-tool-ask-user`, `dsh-tool-todo`, `dsh-tool-web`,
`dsh-agent-instructions`)均随标准 `dsh` 分发一起提供。

## 安装

将此目录复制或克隆到本地 agent-presets 根目录,然后重启 `dsh-web` 进程使 roster 重新扫描:

```sh
# Linux / macOS 默认根
git clone https://github.com/DKSRch/DSH-Minimal-Plus.git \
  "$HOME/.dsh/.agent-presets/DSH-Minimal-Plus"

# Windows (PowerShell) 默认根
git clone https://github.com/DKSRch/DSH-Minimal-Plus.git `
  "$env:USERPROFILE\.dsh\.agent-presets\DSH-Minimal-Plus"
```

重启后,preset 会出现在新建会话的预设选择器中。

## 验证挂载

在任意 session 中执行:

```js
await ctx.agentPresets.standingKeyFor('DSH-Minimal-Plus')
```

此调用会端到端组合 preset 的 plugin 子树,并拒绝以下情况:
- package 无法解析的行
- config 无效的行
- 从未激活的行
- 发布到根 realm 的 service

返回正常即表示 composition 挂载成功;然后启动一个真实 session 以确认第一阶段工具目录仅为 `bash` + `str_replace_editor`,且在首次锚定工具调用后展开。

---

---

# DSH Minimal Plus (English)

A DSH agent preset that wraps the first model request in the **exact Minimal**
two-tool surface (persistent `bash` + `str_replace_editor`), only keeps a
one-line persona, empties runtime contexts and only lets direct user messages
pass through, anchoring the Minimal reasoning trajectory; promotion is gated
by the first-block anchor gate (first block contains `we` and no `let me`,
with a four-step fallback); a tool-less first response auto-promotes after
responding, then the wire switches to Code Mode (PTC, single `run_code`) and
the selected workspace path is appended to the persona, with workspace
instructions and skill catalog injected one step after promotion.

---

## Files

- `agent.cordis.yml` — preset composition (21 plugin rows)
- `tool-bootstrap.mjs` — two-phase anchor bootstrap (local extension)
- `preset.yml` — metadata (name/description/order)
- `NOTICE` — copyright notice
- `LICENSE` — MIT

## Upstream

- `agent.cordis.yml` adapted from DeepSeek Harness builtin `minimal` and
  `standard` presets (MIT)
- `tool-bootstrap.mjs` derived from
  [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)
  (MIT), with the dsh-liangshen two-phase isolation extension
- See [NOTICE](./NOTICE) for the full attribution chain

This preset is distributed under the MIT License — see [LICENSE](./LICENSE).

## Prerequisites

A working `dsh` install (ships every `@deepseek-ai/dsh-*` package this
composition references).

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
- a row with invalid config,
- a row that never activated,
- a service published into the root realm.

A clean return means the composition mounts; then start a real session on it
to confirm the phase-1 tool catalog is `bash` + `str_replace_editor` only and
expands after the first anchored tool call.

---

## AI 作品声明 / AI Creation Statement

**中文:**

本仓库是 AI 辅助开发的作品。主要开发工作由 DeepSeek Harness 上的 AI 代理完成,人类协作者提供需求描述、设计方向和质量审查。

特别致谢以下开源库对本项目的启发和贡献:
- [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) — DSH Web GUI 插件全家桶
- [oh-we-need](https://github.com/scp3500/oh-we-need) — DeepSeek V4 特化思维链引导规范

本项目的代码、文档和配置均由 AI 生成和整理,但所有创意决策、架构设计和质量保证均由人类协作者主导。

---

**English:**

This repository is an AI-assisted creation. The main development work was
completed by AI agents running on DeepSeek Harness, with human collaborators
providing requirement descriptions, design direction, and quality review.

Special thanks to the following open-source repositories for their inspiration
and contributions to this project:
- [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) — DSH Web GUI plugin suite
- [oh-we-need](https://github.com/scp3500/oh-we-need) — DeepSeek V4 specialized reasoning chain guidance spec

The code, documentation, and configuration of this project were all generated
and organized by AI, but all creative decisions, architecture design, and
quality assurance were led by human collaborators.
