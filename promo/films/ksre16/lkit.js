// lkit: helpers for the long "100%" runs of FALLING IN LOVE: SPEEDRUN (ksre16–ksre20). Read-only for other films.
// Builds on ../ksre01/srkit.js. Pure functions of t.
//   keyAt(keys, t)            keys [[t, value], …] → the last value whose t ≤ now (step function)
//   act(x, t, S, a)           one cast member: { id, x, y, s, moods: [[t, mood, look?]], hops, from, to, enter, exit, tears, flip }
//                             x / y may be numbers or [[t, v], …] (eased between keys). enter/exit = times it pops in / out.
//   say(x, t, S, lines, pos)  dialogue: lines [[t0, t1, who, text, opts?]]; pos(who, t) → { x, y } of the speaker's head
//   chapterFx(chs)            hook-kit chapter stickers + a whip at each chapter start: [['chapter', …], ['whipZoom', …]]
//   splitsFrom(chs)           split rows from chapters: { name, at: ch.split, time, state }
import { lerp, prog, ease, clamp, pop01, outK, fmtClock } from '../ksre01/srkit.js'

export const keyAt = (keys, t) => { let v = keys[0][1]; for (const [a, b] of keys) if (t >= a) v = b; return v }
export function tween(keys, t, e = ease.inOutCubic) {
  if (typeof keys === 'number') return keys
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return lerp(va, vb, e(prog(t, a, b))) }
  return keys[keys.length - 1][1]
}
export function act(x, t, S, a) {
  const en = a.enter ?? -10, ex = a.exit ?? 1e9
  if (t < en - 0.01 || t > ex + 0.3) return
  const pop = pop01(t, en, 0.32, 2.2) * outK(t, [ex, ex + 0.3])
  if (pop <= 0.01) return
  const X = tween(a.x, t), Y = tween(a.y ?? 1180, t)
  const m = a.moods ? keyAt(a.moods.map(([tt, mo, lk]) => [tt, [mo, lk]]), t) : ['happy', undefined]
  S.shadow(x, X, 1302, (a.s || 210) * 0.95 * pop)
  S.star(x, t, { id: a.id, x: X, y: Y, s: a.s || 210, mood: m[0], look: m[1], hops: a.hops, pop, seed: a.seed ?? a.id.length, tears: a.tears ? keyAt(a.tears, t) : 0, rot: a.rot ? a.rot(t) : 0, squash: a.squash ? a.squash(t) : 0, blush: a.blush })
}
export function say(x, t, S, lines, pos) {
  for (const [t0, t1, who, text, o = {}] of lines) {
    if (t < t0 - 0.05 || t > t1 + 0.25) continue
    const p = pos(who, t)
    S.bubble(x, t, clamp(p.x + (o.dx || 0), 300, 780), p.y + (o.dy || 0), t0, t1, text, { size: o.size || 34, col: o.col || '#efe6d6', tail: o.tail ?? (p.x < 540 ? -0.4 : 0.4), maxW: o.maxW || 600 })
  }
}
export function chapterFx(chs) {
  return chs.flatMap(c => [
    ['chapter', { at: c.t, out: [c.t + 2.6, c.t + 2.9], n: c.n, title: c.title, x: 60, y: 1560 }],
    ['whipZoom', { at: c.t, len: 0.4, from: 1.3, cx: 540, cy: 1100, flash: 0.25 }],
  ])
}
export const splitsFrom = (chs, extra = {}) => chs.filter(c => c.split).map(c => ({ name: c.split.name || c.title.toUpperCase(), at: c.split.at, time: c.split.time || fmtClock(c.split.run ?? c.split.at, { cs: false }), state: c.split.state || 'gold', delta: c.split.delta || '', ...extra }))
export const chapterAt = (chs, t) => { let c = chs[0]; for (const ch of chs) if (t >= ch.t) c = ch; return c }
