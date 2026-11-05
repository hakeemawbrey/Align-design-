// BRAIN VS HEART long-episode engine (kbhe16–kbhe20; owned by kbhe16, imported read-only by the others).
// A long episode = an intro (hook + promise) and five ROUNDS, refereed by THE STARS (standing on the console button).
// Every round: whistle + chapter sticker + the window blinks to the round's view, three or four lines, a gag, the ref's
// call and a point on the scoreboard, so there is a new beat every few seconds.
//
//   makeLong(cfg) → { build, chapters, cues }
//     cfg.sign, cfg.duration
//     cfg.rounds: [{ at, n, title, len, view(x, t, R, u), lines: [{ dt, who, text, size, maxW, t1 }], point: 'brain'|'heart'|'both'|null,
//                  call: 'POINT: HEART', brain: [[dt, {pose}]…], heart: [[dt, {pose}]…], props(x, t, u, B, H), alarm: [dt0, dt1] }]
//     cfg.intro / cfg.outro: same shape as a round (at, len, view, lines, brain, heart, props) without chapter / point
//     cfg.ref: { x, y, s }  cfg.cam: drawCam opts (tears/mood schedules in absolute time)
//   Lines: who = 'brain' | 'heart' | 'stars' | 'both' | a WHO object; positioned automatically (brain left, heart right,
//   ref centre). t1 defaults to the next line's start − 0.15 (or the round end).
import { makeBuild, bubble, bubbleCues, drawRef, stepObj, key, clamp, lerp, prog, ease, pop01, sparkles, INK, BONE, GOLD } from '../kbhe01/bhkit.js'
import { chapter, chapterCues } from '../hookkit.js'

export const BOTH = { bg: '#fff1c8', fg: INK, acc: '#d0306a', tag: 'BRAIN + HEART' }
const POS = { brain: { x: 380, y: 1195, tail: -130 }, heart: { x: 700, y: 1195, tail: 130 }, stars: { x: 540, y: 1075, tail: 0 }, both: { x: 540, y: 1205, tail: 0 } }
const BASE_B = { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4], look: [1, 0] }
const BASE_H = { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4], look: [-1, 0] }

export function makeLong(cfg) {
  const { sign, duration, rounds, intro, outro, ref = { x: 540, y: 1300, s: 150 }, cam = {}, buttonLabel = 'DECIDE', buttonCol = '#ff3b5c', blinksExtra = [], score0 = [0, 0] } = cfg
  const segs = [intro, ...rounds, outro].filter(Boolean).map(s => ({ ...s, end: s.at + s.len }))
  const segAt = t => { let s = segs[0]; for (const g of segs) if (t >= g.at) s = g; return s }
  // bubbles (absolute)
  const BUB = []
  for (const g of segs) {
    (g.lines || []).forEach((L, i) => {
      const nxt = g.lines[i + 1]
      const who = L.who === 'both' ? BOTH : L.who
      const p = POS[typeof L.who === 'string' ? L.who : 'both']
      BUB.push({ t0: g.at + L.dt, t1: L.t1 != null ? g.at + L.t1 : (nxt ? g.at + nxt.dt - 0.15 : (g.call ? g.at + g.len - 2.55 : g.end - 0.25)), who, x: L.x ?? p.x, y: L.y ?? p.y, tail: L.tail ?? p.tail, text: L.text, size: L.size || 44, maxW: L.maxW || 560, shake: L.shake || 0 })
    })
    if (g.call) BUB.push({ t0: g.at + g.len - 2.4, t1: g.end - 0.3, who: 'stars', ...POS.stars, text: g.call, size: 46, maxW: 640 })
  }
  // score
  const SB = [[0, score0[0]]], SH = [[0, score0[1]]]
  let b = score0[0], h = score0[1]
  for (const r of rounds) { const tp = r.at + r.len - 2.3; if (r.point === 'brain' || r.point === 'both') SB.push([tp, ++b]); if (r.point === 'heart' || r.point === 'both') SH.push([tp, ++h]) }
  const WHISTLE = rounds.map(r => r.at + 0.05)
  const pose = (who, t) => {
    const g = segAt(t), u = t - g.at
    const base = who === 'brain' ? BASE_B : BASE_H
    // default: the one talking hops, gets an open mouth
    const P = stepObj(u, g[who] || [], base)
    const hops = (g.lines || []).filter(L => L.who === who || L.who === 'both').map(L => g.at + L.dt)
    return { x: who === 'brain' ? 250 : 830, y: 1440, hops, ...P, ...(P.fn ? P.fn(t, u) : {}) }
  }
  const build = makeBuild({
    sign, blinks: [...rounds.map(r => r.at + 0.12), ...(outro ? [outro.at + 0.05] : []), ...blinksExtra],
    view: (x, t, R) => { const g = segAt(t); if (g.view) g.view(x, t, R, t - g.at) },
    desk: t => ({ button: { label: buttonLabel, press: [], glow: 0.35, col: buttonCol }, score: { b: SB, h: SH }, cam }),
    brain: t => pose('brain', t), heart: t => pose('heart', t),
    alarm: t => { const g = segAt(t), u = t - g.at; return g.alarm && u > g.alarm[0] && u < g.alarm[1] ? 0.4 : 0 },
    back: (x, t) => {
      const g = segAt(t), u = t - g.at
      const callOn = g.call && u > g.len - 2.4
      drawRef(x, t, { x: ref.x, y: ref.y, s: ref.s, mood: callOn ? 'happy' : (u < 1 ? 'wide' : 'neutral'), look: callOn ? [0, 0] : [Math.sin(t * 0.7), 0], whistle: WHISTLE, hops: [...WHISTLE, ...rounds.map(r => r.at + r.len - 2.4)], pop: pop01(t, -1, 0.3) })
      if (g.back) g.back(x, t, u)
    },
    front: (x, t, B, H) => {
      const g = segAt(t), u = t - g.at
      if (g.props) g.props(x, t, u, B, H)
      for (const r of rounds) sparkles(x, t, 540, 1220, r.at + r.len - 2.3, 12, 200, r.n, [GOLD, BONE, '#ff8fa0'])
    },
    bubbles: BUB,
  })
  const CH = rounds.map(r => ({ at: r.at + 0.1, out: [r.at + r.len - 0.35, r.at + r.len - 0.1], n: r.n, title: r.title, x: 70, y: 230 }))
  const cues = [
    ...bubbleCues(BUB), ...CH.flatMap(c => chapterCues(c)),
    ...WHISTLE.flatMap(w => [['pluck', +w.toFixed(2), 2637, 0.035, 0.25, 0], ['pluck', +(w + 0.12).toFixed(2), 2637, 0.03, 0.35, 0]]),
    ...rounds.filter(r => r.point).flatMap(r => { const tp = r.at + r.len - 2.3; return [['bell', +tp.toFixed(2), 1760, 0.035, 0.9, 0], ['glitter', +tp.toFixed(2), +(tp + 0.4).toFixed(2)]] }),
    ...rounds.map(r => ['whoosh', +(r.at + 0.08).toFixed(2), 0.25, 0.035]),
  ]
  return { build, chapters: CH.map(c => chapter(c)), cues, BUB }
}
