// sblong — the SAY IT BETTER long template (ksbe16–ksbe20 import it read-only): one argument played twice.
//   0        frame 0: round 1's first line mid-slam, slam title (the payoff promise), whip; chapter "1 · THE BAD WAY"
//   0–~22    ROUND 1: shout bubbles alternate every R1GAP s, a DAMAGE meter fills, the camera pushes in
//   ~21      both storm off, Pisces left sobbing in the middle, "nobody *won.*"
//   REW      ◀◀ REWIND: the world clock scrubs back to frame 0 (2.2 s)
//   R2       chapter "2 · THE BETTER WAY": the same opening, now said better; bubbles every R2GAP s, a CLOSER meter
//            fills; THE STARS chip in once; a talk card lands
//   V        chapter "3 · THE VERDICT": two score cards, Pisces happy-sobs, the last line, hard cut
// spec: { ep, room, A: { sign }, B: { sign }, P: { x, y, s }, hook, r1: [{ who, text, kind? }], r1Caption,
//         r2: [{ who, text, kind? }], stars: [l1, l2], starsAfter (index in r2), card: { text, after }, scores: ['2/10', '10/10'],
//         last, end (story length is computed), draw/front extras, cues }
import { makeFilm, drawScoreCard, drawTalkCard, rect, INK, BONE, RED, MINT, GOLD } from './sbkit.js'
import { prog, ease, clamp, lerp } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

const r2f = v => +v.toFixed(2)
export function makeLong(S) {
  const R1GAP = S.r1gap ?? 3.9, R2GAP = S.r2gap ?? 5.6
  const r1 = S.r1.map((l, i) => ({ ...l, at: i === 0 ? -0.1 : r2f(0.5 + i * R1GAP) }))
  const r1End = r2f(0.5 + r1.length * R1GAP)                      // the storm-off
  const NOB = r1End + 0.6                                          // "nobody won."
  const REW = { at: r2f(NOB + 3.0), dur: 2.2, to: 0.4 }
  const R2 = r2f(REW.at + REW.dur)
  const starsAfter = S.starsAfter ?? 2, cardAfter = S.card ? S.card.after : -1
  // round 2 schedule (a STARS beat and a card beat are inserted as extra gaps)
  let t = R2 + 1.0
  const r2 = [], extra = {}
  S.r2.forEach((l, i) => {
    const words = l.text.split(' ').length
    r2.push({ ...l, at: r2f(t), dur: (l.kind ?? 'better') === 'better' ? Math.max(4.2, words / 4.5 + 2.4) : 3.2 })
    t += r2[i].dur + 0.6
    if (i === starsAfter) { extra.stars = r2f(t); t += 7.4 }
    if (i === cardAfter) { extra.card = r2f(t); t += 4.4 }
  })
  const V = r2f(t + 0.3), LAST = r2f(V + 4.6), DUR = r2f(LAST + 2.3)
  const A = { x: 300, y: 1090, s: 300, ...S.A }, B = { x: 790, y: 1090, s: 290, ...S.B }, P = { x: 820, y: 640, s: 130, ...S.P }
  const sort = k => k.sort((a, b) => a[0] - b[0])
  // ── actors
  const keysA = [[0, { x: A.x, y: A.y, s: A.s, mood: 'squint', look: [1, 0], red: 0.9, squash: -0.06 }]]
  const keysB = [[0, { x: B.x, y: B.y, s: B.s, mood: 'squint', look: [-1, 0], red: 0.6 }]]
  r1.forEach((l, i) => {
    const k = l.who === 'A' ? keysA : keysB, o = l.who === 'A' ? keysB : keysA
    if (i > 0) { k.push([l.at, { mood: 'squint', red: clamp(0.6 + i * 0.1), steam: i > 2 ? 1 : 0, s: (l.who === 'A' ? A.s : B.s) * (1 + i * 0.05), d: 0.25 }]); o.push([l.at + 0.2, { mood: 'wide', d: 0.2 }]) }
  })
  keysA.push([r1End, { x: -260, mood: 'squint', d: 0.9 }], [R2 - 0.05, { x: A.x, s: A.s, red: 0, steam: 0, mood: 'neutral', look: [1, 0], d: 0.01 }])
  keysB.push([r1End, { x: 1340, mood: 'squint', d: 0.9 }], [R2 - 0.05, { x: B.x, s: B.s, red: 0, steam: 0, mood: 'neutral', look: [-1, 0], d: 0.01 }])
  r2.forEach(l => {
    const k = l.who === 'A' ? keysA : keysB, o = l.who === 'A' ? keysB : keysA
    k.push([l.at, { mood: l.mood ?? 'sparkle', look: l.who === 'A' ? [1, 0] : [-1, 0] }]); o.push([l.at + 0.6, { mood: l.oMood ?? 'happy' }])
  })
  keysA.push([V, { x: A.x - 40, mood: 'happy' }], [LAST, { mood: 'heart', x: A.x - 30, d: 0.6 }])
  keysB.push([V, { x: B.x + 40, mood: 'happy' }], [LAST, { mood: 'heart', x: B.x + 30, d: 0.6 }])
  const keysP = [[0, { x: P.x, y: P.y, s: P.s, mood: 'wide', look: P.look ?? [-1, 1], tears: 2 }],
    [r1End + 0.2, { x: 540, y: 1100, s: 230, tears: 3, d: 0.6 }], [R2 - 0.05, { x: P.x, y: P.y, s: P.s, tears: 1, mood: 'neutral', d: 0.01 }],
    [R2 + 8, { tears: 2, mood: 'sparkle' }], [V, { x: 540, y: 1170, s: 170, tears: 3, mood: 'happy', d: 0.7 }]]
  const K = typeof S.keys === 'function' ? S.keys({ r1End, R2, V, LAST }) : S.keys || {}
  // ── bubbles
  const talk = []
  r1.forEach((l, i) => {
    const out = i < r1.length - 1 ? r1[i + 1].at - 0.05 : r1End
    if ((l.kind ?? 'bad') === 'bad') talk.push({ who: l.who, kind: 'bad', at: l.at, out, text: l.text, cy: l.who === 'A' ? 700 : 740, size: l.size ?? 72, maxW: 720, flyDir: l.who === 'A' ? 1 : -1, seed: i + 2 })
    else talk.push({ who: l.who, kind: 'say', at: l.at, out, text: l.text, cx: l.who === 'A' ? 380 : 700, cy: 860 })
  })
  r2.forEach((l, i) => {
    const out = l.at + l.dur
    if ((l.kind ?? 'better') === 'better') talk.push({ who: l.who, kind: 'better', at: l.at, out, text: l.text, wps: 4.5, cy: 700, label: l.who === 'A' ? '✓ SAY IT BETTER' : '✓ HEARD' })
    else talk.push({ who: l.who, kind: 'say', at: l.at, out, text: l.text, cx: l.who === 'A' ? 400 : 680, cy: 860, maxW: 520 })
    void i
  })
  if (S.talk) talk.push(...S.talk)
  // ── meters (world time: they rewind too)
  function meter(x, w, label, col, f, y = 520) {
    const W = 360, X = 1080 - 60 - W
    rect(x, X - 8, y - 8, W + 16, 64, INK); rect(x, X, y, W, 48, '#2a1f55'); rect(x, X, y, W * f, 48, col)
    x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(label, X + 14, y + 25)
  }
  function overlay(x, t, w) {
    if (w < r1End + 0.6 && w > 2.8) {
      let f = 0; r1.forEach((l, i) => { f = Math.max(f, ((i + 1) / r1.length) * ease.outCubic(prog(w, l.at, l.at + 0.4))) })
      meter(x, w, 'DAMAGE', RED, clamp(f), 470)
    } else if (w >= R2 && w < V) {
      let f = 0; r2.forEach((l, i) => { f = Math.max(f, ((i + 1) / r2.length) * ease.outCubic(prog(w, l.at + 0.5, l.at + 1.2))) })
      meter(x, w, 'CLOSER', MINT, clamp(f), 470)
    }
    if (w > NOB && w < REW.at + 0.1) {   // "nobody won."
      const k = easeOutBack(prog(w, NOB, NOB + 0.4), 2)
      x.save(); x.translate(540, 760); x.scale(k, k); x.rotate(-0.04)
      x.font = "900 96px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText(S.r1Caption ?? 'NOBODY WON.').width + 80
      rect(x, -tw / 2 - 8, -70, tw + 16, 140, INK); rect(x, -tw / 2, -62, tw, 124, RED); x.fillStyle = '#fff'; x.fillText(S.r1Caption ?? 'NOBODY WON.', 0, 4)
      x.restore()
    }
    if (S.overlay) S.overlay(x, t, w)
  }
  function front(x, w, KK) {
    if (S.card && extra.card != null) {
      const c0 = extra.card, k = easeOutBack(prog(w, c0, c0 + 0.45), 1.5) * (1 - ease.inCubic(prog(w, c0 + 4.0, c0 + 4.4)))
      if (k > 0.01) drawTalkCard(x, 540, 720, 230, S.card.text, { rot: lerp(0.6, 0.04, k), k })
    }
    if (w > V + 0.5) {
      const k1 = easeOutBack(prog(w, V + 0.6, V + 1.0), 2), k2 = easeOutBack(prog(w, V + 1.6, V + 2.0), 2.4)
      const fade = 1 - ease.inCubic(prog(w, LAST - 0.4, LAST))
      drawScoreCard(x, 320, 720, 300, 'ROUND 1', (S.scores || ['2/10'])[0], RED, { k: k1 * fade, rot: -0.06 })
      drawScoreCard(x, 760, 720, 300, 'ROUND 2', (S.scores || [, '10/10'])[1] ?? '10/10', MINT, { k: k2 * fade, rot: 0.05 })
    }
    if (S.front) S.front(x, w, KK)
  }
  const F = makeFilm({
    dur: DUR, ep: S.ep, room: S.room, roomOpts: S.roomOpts,
    cast: S.P === null ? { A: { sign: A.sign, seed: 3 }, B: { sign: B.sign, seed: 8 } } : { P: { sign: 'pisces', seed: 6 }, A: { sign: A.sign, seed: 3 }, B: { sign: B.sign, seed: 8 } },
    keys: { A: sort([...keysA, ...(K.A || [])]), B: sort([...keysB, ...(K.B || [])]), P: sort([...keysP, ...(K.P || [])]) },
    order: S.order ?? (S.P === null ? ['A', 'B'] : ['P', 'A', 'B']),
    hops: { P: [V + 0.6, V + 1.6, LAST], A: [LAST], B: [LAST + 0.1] },
    hook: { text: S.hook, out: [2.6, 2.8], size: 96 },
    talk,
    box: extra.stars != null ? { open: extra.stars, close: extra.stars + 7.0 } : null,
    stars: extra.stars != null ? [{ t: extra.stars + 0.2, text: S.stars[0] }, { t: extra.stars + 3.6, text: S.stars[1] }] : [],
    last: { at: LAST, text: S.last, top: 200, size: 92, accentSize: 130 },
    rewind: REW,
    chapters: [
      { at: 0.7, out: [3.6, 3.8], n: 1, title: 'the bad way', color: '#ff8f8f', y: 1580 },
      { at: R2 + 0.1, out: [R2 + 3.0, R2 + 3.2], n: 2, title: 'the better way', color: MINT, y: 1580 },
      { at: V, out: [LAST - 0.4, LAST - 0.2], n: 3, title: 'the verdict', color: GOLD, y: 1580 },
    ],
    cam: [[0, { z: 1, x: 540, y: 960 }], [0.6, { z: 1.12, x: 540, y: 960, d: r1End - 1, e: t => t }], [r1End - 0.2, { z: 1, d: 0.5 }],
      [R2 - 0.05, { z: 1, d: 0.01 }], [R2 + 0.5, { z: 1.08, y: 930, d: (V - R2) - 1, e: t => t }], [V - 0.3, { z: 1, y: 960, d: 0.6 }]],
    shake: [{ at: 0.05, len: 0.5, amp: 26 }, ...r1.slice(1).filter(l => (l.kind ?? 'bad') === 'bad').map(l => ({ at: l.at + 0.02, len: 0.35, amp: 16 }))],
    end: 'cut',
    draw: S.draw, front, overlay, kit: S.kit,
    cues: [['boom', r1End, 0.15], ['whoosh', r1End, 0.6, 0.05], ['pop', NOB, 196, 0.05, 0], ['tom', NOB + 0.05, 80, { gain: 0.25, decay: 0.4 }],
      ...(extra.card != null ? [['whoosh', extra.card, 0.4, 0.04], ['pluck', extra.card + 0.45, 1318.51, 0.04, 0.6, 0.2]] : []),
      ['pop', V + 0.6, 220, 0.05, -0.3], ['tom', V + 0.62, 90, { gain: 0.2, decay: 0.3 }], ['pop', V + 1.6, 1318.51, 0.05, 0.3], ['bell', V + 1.65, 1567.98, 0.03, 1.2, 0.3], ['glitter', V + 1.6, V + 2.2],
      ['pluck', V + 2.4, 659.25, 0.035, 0.5, 0], ['pluck', V + 2.55, 587.33, 0.035, 0.5, 0], ...(S.cues || [])],
  })
  return { ...F, TIMES: { r1End, NOB, REW, R2, V, LAST, DUR, r2, extra } }
}
