// disposable30 (30s): film 2 "Flip it"'s fast edit, re-aimed. "We made dating disposable." → the last face FLIPS into
// Juniper's blind card, "What if we flipped it?" → chart first, face last → your card meets hers, the stars align →
// BOTH blind cards flip over, "It's mutual." (f5 now runs to 24.05; f6 is cut) → then you talk in cards → SKIP THE SMALL TALK (talk cards, new) → "No one is
// disposable." + lockup. Scenes are copies of promo/film2/scenes (f4 "everyone gets a chance" cut); f5–f7 run 4.5 s
// earlier than in film 2 (their own clocks are untouched — see shift()), which frees 22.2–26.85 for t1-talk.
import f1, { cues as c1 } from './f1-old.js'
import f2, { cues as c2 } from './f2-flip.js'
import f3, { cues as c3 } from './f3-chart.js'
import f5, { cues as c5 } from './f5-stars.js'
import f7, { cues as c7 } from './f7-talk.js'
import t1, { cues as ct } from './t1-talk.js'
import f8, { cues as c8 } from './f8-end.js'

export const SHIFT = 4.5
/** run a film-2 scene SHIFT seconds earlier: global t → its own clock t + SHIFT */
function shift(build) {
  return async (stage) => {
    const s = await build(stage)
    const o = { ...s, start: s.start - SHIFT, end: s.end - SHIFT, update: t => s.update(t + SHIFT) }
    if (s.fx) o.fx = (ctx, t) => s.fx(ctx, t + SHIFT)
    if (s.fxStart != null) o.fxStart = s.fxStart - SHIFT
    if (s.fxEnd != null) o.fxEnd = s.fxEnd - SHIFT
    return o
  }
}
const early = cs => (cs || []).map(c => c[0] === 'riser' || c[0] === 'glitter' ? [c[0], c[1] - SHIFT, c[2] - SHIFT, ...c.slice(3)] : [c[0], c[1] - SHIFT, ...c.slice(2)])

export const DURATION = 30
export const SCENES = [f1, f2, f3, shift(f5), shift(f7), t1, f8]
export const CUES = [...(c1 || []), ...(c2 || []), ...(c3 || []), ...early(c5), ...early(c7), ...ct, ...(c8 || [])]
