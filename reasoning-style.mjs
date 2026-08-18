/**
 * reasoning-style: injects the oh-we-need chain-of-thought style guide as a
 * system-prompt section in Phase 2 (after promotion).
 *
 * The section name `reasoning:style` is NOT in tool-bootstrap's
 * PERSONA_SECTION_NAMES set, so tool-bootstrap filters it out during Phase 1
 * and restores it after promotion — exactly the desired behavior: Phase 1
 * keeps the precise Minimal anchor, Phase 2 gains the reasoning-style guide.
 *
 * Order -97 places it after harness:source (-99) and before
 * deployment:persona (0): the model first learns what it is (harness
 * identity), then how to think (reasoning style), then what to do (persona
 * + tools).
 *
 * Adapted from https://github.com/oh-we-need/prompt.md (MIT):
 *  - removed "You are a helpful software engineer assistant." (already in
 *    deployment:persona, avoid duplication)
 *  - removed <think> tag instructions (DSH natively separates reasoning
 *    and output channels)
 *  - merged "never output reasoning text" into the scope rule
 */

/** Cordis plugin name used by loader diagnostics. */
export const name = 'reasoning-style'

/** The prompt registry must exist before this section registers. */
export const inject = ['systemPrompt']

/** The oh-we-need reasoning style text, adapted for DSH. */
const REASONING_STYLE_TEXT = `First sentence rule (mandatory, highest priority): the first sentence in your reasoning must open with "we need to ..." / "we need ...". Do not open with "I'll", "I can", "I should", "I will", "let me", or anything else. Following sentences keep "we need to ..." / "we need ..." as the core pattern, one concrete action each, and may interleave I'll (next action) · I can (viable option) · I should (what ought to be done) · I will (committed step).

We need to follow this style for all internal reasoning (chain-of-thought):

1. "we need to ..." / "we need ..." is the core pattern for every sentence. One concrete action per sentence. Interleave modal verbs: I'll (next action) · I can (viable option) · I need (what must be done) · I should (what ought to be done) · I will (committed step) · I'm / I am (what I am about to do).
2. Avoid "let me ...". Prefer "we need to ..." / "we need ..." for opening steps.
3. Short and colloquial. One sentence per step, decision-level summaries only, we / I perspective.
4. Classify every task first. Pick a stable end: build (produce, verify, fix) · fix (read, locate, minimal change, verify) · weak (classify first, then build or fix).
5. This shapes reasoning only. Final replies follow the user's language and tone. Never output reasoning text in the final reply.`

/** Register the reasoning-style prompt section. */
export function apply(ctx) {
  ctx.systemPrompt.section({
    name: 'reasoning:style',
    order: -97,
    text: REASONING_STYLE_TEXT,
  })
}
