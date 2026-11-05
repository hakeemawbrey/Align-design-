// sbshort — the SAY IT BETTER short template (ksbe02–ksbe15 import it read-only). Fills makeFilm() from a small spec
// with the series' standard beat sheet (times in s):
//   0      frame 0: A mid-shout (red, maybe steaming), the bad bubble mid-slam, B knocked back, slam-title hook, whip
//   0.9    record scratch + freeze (caption), caught circle        2.4  B reacts (say bubble)
//   3.2    red pen strike · 4.5 the bubble crumples away           4.9–10.1  THE STARS (two lines)
//   10.4   the better line writes in                               13.9 / 15.9  B's two replies
//   17.6   last line; the film ends ~2 s later (hard cut or loop)
// spec: { ep, room, A: { sign, x, y, s, steam, red }, B: {…}, P: { x, y, s } | null (Pisces is A or B), hook, caption,
//         caught: { x, y, r }, bad: { text, cy }, react, stars: [l1, l2], better, replies: [r1, r2], last,
//         keys: { A: [...], B: [...], P: [...] } extra keys, T: { …timing overrides }, plus any makeFilm field }
import { makeFilm } from './sbkit.js'

export function makeShort(S) {
  const T = { freeze: 0.9, react: 2.4, strike: 3.2, out: 4.5, box: 4.9, s1: 5.1, s2: 7.6, close: 10.1, better: 10.4, r1: 13.9, r2: 15.9, bOut: 15.8, last: 17.6, ...(S.T || {}) }
  const dur = S.dur ?? +(T.last + 2.0).toFixed(2)
  const A = { x: 300, y: 1090, s: 310, red: 1, steam: 0, ...S.A }, B = { x: 790, y: 1090, s: 280, ...S.B }
  const pisLead = A.sign === 'pisces' ? 'A' : B.sign === 'pisces' ? 'B' : null
  const sort = k => k.sort((a, b) => a[0] - b[0])
  const keys = {
    A: sort([[0, { x: A.x, y: A.y, s: A.s, mood: A.mood0 ?? 'squint', look: [1, 0], red: A.red, steam: A.steam, squash: -0.08, tears: pisLead === 'A' ? 3 : 0 }],
      [T.react, { red: A.red * 0.7, steam: A.steam * 0.6 }], [T.out - 0.1, { red: 0, steam: 0, mood: 'neutral', squash: 0, d: 0.8, ...(pisLead === 'A' ? { tears: 1 } : {}) }],
      [T.s2 + 0.2, { mood: 'wide', look: [0, -1] }], [T.better - 0.2, { mood: 'sparkle', look: [1, 0] }], [T.r1 + 0.1, { mood: 'happy' }],
      [T.r2, { x: A.x + 60, d: 0.6 }], [T.last, { mood: 'heart', ...(pisLead === 'A' ? { tears: 3 } : {}) }], ...((S.keys || {}).A || [])]),
    B: sort([[0, { x: B.x + 90, y: B.y - 130, s: B.s, rot: 0.55, mood: 'wide', look: [-1, 0], tears: pisLead === 'B' ? 2 : 0 }],
      [0.15, { x: B.x, y: B.y, rot: 0, d: 0.45, e: t => 1 - (1 - t) ** 3 }],
      [T.react, { s: B.s * 0.7, y: B.y + 40, mood: 'neutral', look: [0, 1], d: 0.5, ...(pisLead === 'B' ? { tears: 3 } : {}) }],
      [T.better + 1.0, { s: B.s * 0.82, look: [-1, 0], mood: 'wide' }], [T.r1 - 0.1, { s: B.s, y: B.y, mood: 'happy', d: 0.6 }],
      [T.r2, { x: B.x - 70, d: 0.6 }], [T.last, { mood: 'heart', ...(pisLead === 'B' ? { tears: 3 } : {}) }], ...((S.keys || {}).B || [])]),
  }
  const cast = { A: { sign: A.sign, seed: 3 }, B: { sign: B.sign, seed: 8 } }
  if (S.P !== null && !pisLead) {
    const P = { x: 820, y: 640, s: 130, ...S.P }
    cast.P = { sign: 'pisces', seed: 6 }
    keys.P = sort([[0, { x: P.x, y: P.y, s: P.s, mood: 'wide', look: P.look ?? [-1, 1], tears: 2 }], [T.out, { tears: 1, mood: 'neutral' }],
      [T.better + 1.8, { tears: 2, mood: 'sparkle' }], [T.r2, { tears: 3, mood: 'happy' }], ...((S.keys || {}).P || [])])
  }
  const order = S.order || (cast.P ? ['P', 'A', 'B'] : ['A', 'B'])
  const talk = [
    { who: 'A', kind: 'bad', at: -0.1, text: S.bad.text, strike: T.strike, out: T.out, cy: S.bad.cy ?? 730, size: S.bad.size, flyDir: S.bad.flyDir },
    { who: 'B', kind: 'say', at: T.react + 0.1, out: T.out + 0.1, text: S.react, cx: S.reactX ?? 700, cy: S.reactY ?? 900 },
    { who: 'A', kind: 'better', at: T.better, out: T.bOut, wps: S.wps ?? 5, text: S.better, cy: S.betterY ?? 700 },
    { who: 'B', kind: 'say', at: T.r1, out: T.r2 - 0.2, text: S.replies[0], cx: S.r1X ?? 700, cy: S.r1Y ?? 930 },
    ...(S.replies[1] ? [{ who: 'B', kind: 'say', at: T.r2, out: T.last - 0.1, text: S.replies[1], cx: S.r2X ?? 600, cy: S.r2Y ?? 880, maxW: 560 }] : []),
    ...(S.talk || []),
  ]
  return makeFilm({
    dur, ep: S.ep, heads: S.heads, room: S.room, roomOpts: S.roomOpts, cast, keys, order,
    hops: { A: [T.r2, T.r2 + 0.4], B: [T.r2 + 0.05, T.r2 + 0.45, T.last + 0.05], P: [T.better + 1.9, T.r2], ...(S.hops || {}) },
    hook: { text: S.hook, out: [T.react - 0.1, T.react + 0.1], ...(S.hookOpts || {}) },
    freeze: [{ at: T.freeze, len: 1.4, caption: S.caption }],
    caught: S.caught ? [{ at: T.freeze + 0.15, r: 200, out: [T.react - 0.2, T.react - 0.05], label: null, arrow: null, ...S.caught }] : [],
    talk,
    box: { open: T.box, close: T.close },
    stars: [{ t: T.s1, text: S.stars[0] }, { t: T.s2, text: S.stars[1] }],
    last: { at: T.last, text: S.last, top: 200, size: S.lastSize ?? 92, accentSize: S.lastAccent ?? 130 },
    cam: S.cam ?? [[0, { z: 1, x: 540, y: 960 }], [T.box, { z: 1.12, x: 700, y: 1000, d: 4.5, e: t => t }], [T.close - 0.3, { z: 1, x: 540, y: 960, d: 0.5 }], [T.better - 0.1, { z: 1.06, y: 900, d: 1.2 }], [T.r2, { z: 1.0, y: 960, d: 1.0 }]],
    shake: [{ at: 0.05, len: 0.5, amp: 26 }, ...(S.shake || [])],
    end: S.end || 'cut',
    draw: S.draw, front: S.front, overlay: S.overlay, kit: S.kit, base: S.base,
    cues: [['pluck', T.r2 + 0.1, 659.25, 0.035, 0.5, 0.3], ['pluck', T.r2 + 0.25, 587.33, 0.035, 0.5, 0.3], ['glitter', T.last - 0.2, T.last + 0.3], ...(S.cues || [])],
  })
}
export const T0 = { freeze: 0.9, react: 2.4, strike: 3.2, out: 4.5, box: 4.9, s1: 5.1, s2: 7.6, close: 10.1, better: 10.4, r1: 13.9, r2: 15.9, last: 17.6 }
