// disposable30 · half b (12.0–30.0): the answer, aligning. Pattern's half b (the alignment reading → Push / Pull / Align
// → "Venus rules you both." → the chakra lock → end line + lockup), copied with new copy, and played on a clock that
// maps its native 15–30 onto 12–30 (0.83× speed). Starts on H: Juniper's veiled card (card-profile-3, body h 600 at
// 960,540) over the sky with the one moon, which is exactly where half a lands.
import read, { cues as readCues } from './read.js'
import end, { cues as endCues } from './end.js'

export const B_START = 12.0
const L0 = 15.0, L1 = 30.0, G1 = 30.0
const K = (L1 - L0) / (G1 - B_START)                       // local seconds per global second
const local = t => L0 + (t - B_START) * K
const glob = u => B_START + (u - L0) / K

function warp(build) {
  return async (stage) => {
    const s = await build(stage)
    const out = { ...s, start: Math.max(B_START, glob(s.start)), end: s.end >= L1 ? s.end : glob(s.end), update: t => s.update(local(t)) }
    if (s.fx) out.fx = (ctx, t) => s.fx(ctx, local(t))
    if (s.fxStart != null) out.fxStart = glob(s.fxStart)
    if (s.fxEnd != null) out.fxEnd = glob(s.fxEnd)
    if (s.fadeIn) out.fadeIn = s.fadeIn / K
    return out
  }
}
// cue format: [kind, time, …]; riser/glitter carry an end time, whoosh a duration
const mapCue = c => c[0] === 'riser' || c[0] === 'glitter' ? [c[0], glob(c[1]), glob(c[2]), ...c.slice(3)]
  : c[0] === 'whoosh' ? [c[0], glob(c[1]), c[2] / K, ...c.slice(3)] : [c[0], glob(c[1]), ...c.slice(2)]

export const SCENES = [warp(read), warp(end)]
export const CUES = [...readCues, ...endCues].map(mapCue)
