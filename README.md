# DSH Minimal Plus

## 这是什么？

- 这是一款结合了 `dsh-web-ui` 中的“梁神模式”, `dsh-gitbash-preset`中的“极简模式（Git Bash）”和 `oh-we-need` 的 deepseek-v4-pro 性能提升提示词各优点的预设。
- 它保留了“梁神模式”中的两阶段锚定，并解决了此模式在Windows系统上工作时无法使用bash的痛点。此外，还将二阶段注入的官方提示词更改为 `oh-we-need` 优化过的性能提升提示词。

---

## 文件结构

- `agent.cordis.yml` — preset 核心 composition(全部 plugin 行)
- `tool-bootstrap.mjs` — 两阶段锚定引导器(本地扩展)
- `reasoning-style.mjs` — oh-we-need 思维链规则注入(Phase 2 生效)
- `gitbash-executor.mjs` — Windows Git Bash 子进程 shell 执行器
- `preset.yml` — 元数据(name/description/order)
- `NOTICE` — 版权声明
- `LICENSE` — MIT

## 上游来源

- `agent.cordis.yml` 改编自 DeepSeek Harness 内置 Minimal 与 Standard preset(MIT)
- `tool-bootstrap.mjs` 来自 [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)(MIT),并包含 dsh-liangshen 的两阶段隔离扩展
- `reasoning-style.mjs` 改编自 [oh-we-need](https://github.com/scp3500/oh-we-need) 的思维链提示词(MIT)
- `gitbash-executor.mjs` 来自 [dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset)(MIT),并移除机器特定硬编码路径
- 完整上游归属链见 [NOTICE](./NOTICE)

本 preset 以 MIT 协议分发 — 详见 [LICENSE](./LICENSE)

## 前置条件

- `deepseek-harness` 本体
- Windows 上需安装 Git for Windows(提供 `bash.exe`)。`gitbash-executor.mjs` 自动按 `GIT_BASH` 环境变量 → Program Files / Program Files (x86) / LOCALAPPDATA 标准安装根 → PATH 的顺序查找,无需手动配置;若 Git 装在自定义位置,请设置 `GIT_BASH` 环境变量。

## 安装

将此目录复制或克隆到本地 agent-presets 根目录,然后重启 `dsh-web` 进程使 roster 重新扫描:

```sh
# Linux / macOS 默认根
git clone https://github.com/DKSRch/dsh-minimal-plus.git \
  "$HOME/.dsh/.agent-presets/dsh-minimal-plus"

# Windows (PowerShell) 默认根
git clone https://github.com/DKSRch/dsh-minimal-plus.git `
  "$env:USERPROFILE\.dsh\.agent-presets\dsh-minimal-plus"
```

重启后,preset 会出现在新建会话的预设选择器中。

## 验证挂载

在任意 session 中执行:

```js
await ctx.agentPresets.standingKeyFor('dsh-minimal-plus')
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

## What is this?

- This is a preset for deepseek-harness that combines the advantages of "Liangshen Mode (梁神模式)" from `dsh-web-ui` , "极简模式（Git Bash）" from `dsh-gitbash-preset` , and performance-boosting prompt from `oh-we-need` .
- It retains the 2-stage approach adopted by "Liangshen Mode", and addressed the issue where the model cannot use bash on Windows systems. Furthermore, the original, official system prompt that was injected during the 2nd stage is replaced by the prompt provided by `oh-we-need` so as to boost performance.

---

## Files

- `agent.cordis.yml` — preset composition (all plugin rows)
- `tool-bootstrap.mjs` — two-phase anchor bootstrap (local extension)
- `reasoning-style.mjs` — oh-we-need reasoning rules injection (Phase 2 only)
- `gitbash-executor.mjs` — Windows Git Bash subprocess shell executor
- `preset.yml` — metadata (name/description/order)
- `NOTICE` — copyright notice
- `LICENSE` — MIT

## Upstream

- `agent.cordis.yml` adapted from DeepSeek Harness builtin `minimal` and
  `standard` presets (MIT)
- `tool-bootstrap.mjs` derived from
  [xiaobright/dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)
  (MIT), with the dsh-liangshen two-phase isolation extension
- `reasoning-style.mjs` adapted from the
  [oh-we-need](https://github.com/scp3500/oh-we-need) reasoning prompt (MIT)
- `gitbash-executor.mjs` from
  [dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset) (MIT),
  with machine-specific hardcoded paths removed
- See [NOTICE](./NOTICE) for the full attribution chain

This preset is distributed under the MIT License — see [LICENSE](./LICENSE).

## Prerequisites

- A working `deepseek-harness` installation
- Git for Windows is required on Windows (provides `bash.exe`).
  `gitbash-executor.mjs` auto-discovers it in this order: the `GIT_BASH`
  environment variable → standard install roots (Program Files /
  Program Files (x86) / LOCALAPPDATA) → PATH. No manual configuration is
  needed; if Git lives in a custom location, set the `GIT_BASH` environment
  variable.

## Install

Copy or clone this directory into the local agent-presets root, then restart
the `dsh-web` process so the roster re-scans:

```sh
# default root on Linux / macOS
git clone https://github.com/DKSRch/dsh-minimal-plus.git \
  "$HOME/.dsh/.agent-presets/dsh-minimal-plus"

# default root on Windows (PowerShell)
git clone https://github.com/DKSRch/dsh-minimal-plus.git `
  "$env:USERPROFILE\.dsh\.agent-presets\dsh-minimal-plus"
```

After restart, the preset appears in the new-session picker.

## Verify the mount

In any session, run:

```js
await ctx.agentPresets.standingKeyFor('dsh-minimal-plus')
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

**本项目直接衍生自以下三个开源库,没有它们就没有本项目:**

- **[dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui)** — DSH Web GUI 插件全家桶,本项目的 plugin 架构、cordis 配置结构和 DSH 集成模式完全来自此库。本项目本质上是 dsh-web-ui 生态中的一个 preset 包。
- **[dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset)** — Windows 上 Git Bash 子进程 shell 的实现来源,本 preset 的 bash 工具直接继承自此项目(每次命令执行 `<git bash> -c <command>`,非持久化 PTY shell)。
- **[oh-we-need](https://github.com/scp3500/oh-we-need)** — DeepSeek V4 特化思维链引导规范,本 preset 二阶段注入的提示词采用了 oh-we-need 优化的性能提升提示词。

本项目的代码、文档和配置均由 AI 生成和整理,但所有创意决策、架构设计和质量保证均由人类协作者主导。

---

**English:**

This repository is an AI-assisted creation. The main development work was
completed by AI agents running on DeepSeek Harness, with human collaborators
providing requirement descriptions, design direction, and quality review.

**This project is directly derived from the following three open-source
repositories. Without them, this project would not exist:**

- **[dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui)** — DSH Web GUI plugin suite. The plugin architecture, cordis configuration structure, and DSH integration patterns of this project come entirely from this repository. This project is essentially a preset package within the dsh-web-ui ecosystem.
- **[dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset)** — The implementation source of the Git Bash subprocess shell on Windows. The bash tool of this preset is directly inherited from this project (each command runs as `<git bash> -c <command>`; it is not a persistent PTY shell).
- **[oh-we-need](https://github.com/scp3500/oh-we-need)** — DeepSeek V4 specialized reasoning chain guidance spec. The prompt injected in the second stage of this preset adopts the performance-boosting prompt optimized by oh-we-need.

The code, documentation, and configuration of this project were all generated
and organized by AI, but all creative decisions, architecture design, and
quality assurance were led by human collaborators.
