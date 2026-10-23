// disposable30 (30s): film 2 "Flip it"'s fast edit, re-aimed. "We made people disposable." → the last face FLIPS into
// Juniper's blind card, "What if we flipped it?" → "Fall for the card. Face last." → push-in on her card: Push. Pull.
// Align. (p1-rows) → Marcus's card meets hers, the stars align → BOTH blind cards flip, "It's mutual." → they talk in
// cards, shown as a real thread (s-talk) → "No one is disposable." + lockup. f1–f3, f5, f8 are copies of
// promo/film2/scenes (f4, f6, f7 cut); f3 is cut at 9.95, f5 runs 1.25× fast from 12.45.
import f1, { cues as c1 } from './f1-old.js'
import f2, { cues as c2 } from './f2-flip.js'
import f3, { cues as c3 } from './f3-chart.js'
import p1, { cues as cp } from './p1-rows.js'
import f5, { cues as c5 } from './f5-stars.js'
import st, { cues as cs } from './s-talk.js'
import f8, { cues as c8 } from './f8-end.js'

/** cut a scene short (it still runs on its own clock) */
const cut = (build, end) => async (stage) => ({ ...(await build(stage)), end })
/** run a scene on a warped clock: global g → its own t = l0 + (g - g0) * rate */
function warp(build, g0, l0, rate) {
  const loc = g => l0 + (g - g0) * rate, glob = l => g0 + (l - l0) / rate
  return async (stage) => {
    const s = await build(stage)
    const o = { ...s, start: glob(s.start), end: glob(s.end), update: t => s.update(loc(t)) }
    if (s.fx) o.fx = (ctx, t) => s.fx(ctx, loc(t))
    if (s.fxStart != null) o.fxStart = glob(s.fxStart)
    if (s.fxEnd != null) o.fxEnd = glob(s.fxEnd)
    o.cueMap = c => c[0] === 'riser' || c[0] === 'glitter' ? [c[0], glob(c[1]), glob(c[2]), ...c.slice(3)]
      : c[0] === 'whoosh' ? [c[0], glob(c[1]), c[2] / rate, ...c.slice(3)] : [c[0], glob(c[1]), ...c.slice(2)]
    return o
  }
}
const F5 = { g0: 12.45, l0: 15.0, rate: 1.25 }
const f5g = l => F5.g0 + (l - F5.l0) / F5.rate
const mapF5 = c => c[0] === 'riser' || c[0] === 'glitter' ? [c[0], f5g(c[1]), f5g(c[2]), ...c.slice(3)]
  : c[0] === 'whoosh' ? [c[0], f5g(c[1]), c[2] / F5.rate, ...c.slice(3)] : [c[0], f5g(c[1]), ...c.slice(2)]

export const DURATION = 30
export const SCENES = [f1, f2, cut(f3, 9.98), p1, warp(f5, F5.g0, F5.l0, F5.rate), st, f8]
export const CUES = [...(c1 || []), ...(c2 || []), ...(c3 || []).filter(c => c[1] < 9.9), ...cp, ...(c5 || []).map(mapF5), ...cs, ...(c8 || [])]
