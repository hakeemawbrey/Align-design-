// kxsre04: SILENT REVIEW: EXTENDED, "Taurus and the ex mentions" (60 s vertical, star_talk post, jazzy · Ab).
// The format lives in ../../kxsre01/srkit.js. No end card, no card transition: hard cut on the last line.
// ♉ Taurus reviews a pasta date with ♎ Libra, who keeps mentioning their ex, then is honest about it. Taurus never speaks.
//   0.0–3.0    HOOK: Taurus mid-drop of its fork (the fork flying), EX MENTIONS: 4 slamming in, Libra mid-sentence.
//              "They mentioned their ex. | *Again.*" record scratch: "stay for the *verdict.*" ◀◀ REWIND
//   3.0–14.0   1 · BREAD: "my ex loved this place". [ chews… *slower* ] → 6/10
//   14.0–25.0  2 · PASTA: mentions 2 and 3. [ fork pauses mid-air ] → 4/10
//   25.0–36.0  3 · THE QUIET: mention 4; Libra notices and says it: "sorry. i'm still a bit sad about it. but i'm here,
//              and i like this." [ eyebrows soften ] [ slow nod ] → 8/10
//   36.0–48.5  4 · DESSERT: Taurus slides the tiramisu into the middle, two spoons. [ a single tear ] → 10/10
//   48.5–60.0  THE VERDICT: Ex mentions ★ · Honesty ★★★★★ · The pasta ★★★★★ · Dessert *two spoons* · 9/10.
//              "Ex mentions: four. | Honesty: *ten.*"
import { makeSR, R, box, plate, label, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, DATE, REV, INTER } from '../../kxsre01/srkit.js'

const MENTIONS = [5.0, 15.8, 19.0, 26.5]
const nEx = t => t < 3.0 ? 4 : MENTIONS.filter(c => t >= c).length

function venue(x, t) {
  // a brick trattoria wall, a framed (wordless) landscape, hanging plants
  R(x, '#7a3a2e', -300, 300, 1680, 800)
  for (let j = 0; j < 14; j++) for (let i = 0; i < 16; i++) R(x, (i + j) % 3 ? '#8a4434' : '#6c3127', -300 + i * 110 + (j % 2) * 55, 300 + j * 50, 104, 44)
  R(x, '#4a2a22', -300, 960, 1680, 110)
  box(x, 600, 380, 300, 200, '#2a3a6a', { b: 10, hi: null }); R(x, '#f2a65c', 600, 470, 300, 50); R(x, '#4fae6a', 600, 520, 300, 60); R(x, '#d9a94a', 590, 370, 320, 10)
  for (const px of [120, 960]) {
    const sw = 0.05 * Math.sin(t * 1.2 + px)
    x.save(); x.translate(px, 330); x.rotate(sw); R(x, INK, -2, 0, 4, 90); box(x, -46, 90, 92, 70, '#c96f4a', { b: 5 })
    for (let i = 0; i < 5; i++) { R(x, INK, -44 + i * 22, 150, 14, 60 + (i % 2) * 40); R(x, '#4fae6a', -41 + i * 22, 152, 8, 56 + (i % 2) * 40) }
    x.restore()
  }
  glow(x, 540, 820, 520, '255,200,150', 0.12)
}

function fork(x, cx, cy, rot, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -6, -10, 12, 110); R(x, '#d8dde8', -3, -6, 6, 104)
  R(x, INK, -20, -60, 40, 54); for (let i = 0; i < 4; i++) R(x, '#d8dde8', -17 + i * 10, -56, 5, 48)
  x.restore()
}
/** pasta in a bowl (local coords) */
const pasta = q => { for (let i = 0; i < 7; i++) { R(q, '#f2c75c', -80 + i * 22, -24 - (i % 3) * 8, 18, 24) } R(q, '#d8442e', -30, -40, 50, 16); R(q, '#4fae6a', 20, -44, 14, 8) }

const EP = makeSR({
  id: 'kxsre04', reviewer: 'taurus', date: 'libra', accent: GOLD,
  hookLine: 'They mentioned their ex. | *Again.*',
  promise: 'stay for the *verdict.*',
  plate: 'TAURUS · CRITIC', cloth: '#f4ece0', check: '#d9b49a',
  venue,
  hook: {
    circle: { x: 820, y: 500, r: 240, ry: 90 },
    draw(x, t) {
      // the fork goes flying out of Taurus's grip
      const p = clamp((t + 0.4) / 2.0)
      if (p < 1) fork(x, lerp(470, 760, p), 980 - 380 * Math.sin(Math.PI * p * 0.9), t * 11, 1.4)
      else fork(x, 760, 1230, 1.5, 1.4)
      plate(x, 470, 1190, 220, { kind: 'bowl', food: pasta })
    },
  },
  hookFace: () => ({ mood: 'wide', look: [1, 0], brows: { l: 1, r: 1, sl: 0.3, sr: 0.3 }, mouth: 'o', squash: -0.04 }),
  hookDate: () => ({ mood: 'happy', look: [-1, 0], mouth: 'o', hops: [0.2, 0.5] }),
  courses: [
    { title: 'BREAD',
      shots: [[0, 'wide'], [1.9, 'date'], [4.2, 'rev'], [7.0, 'wide']],
      cc: [[0.3, '[ tears bread. *happily.* ]'], [2.1, '[ chews… *slower* ]'], [4.3, '[ the slowest blink ]'], [7.0, '[ noted. ]']],
      face: [[0, 'smile'], [2.0, 'chew'], [4.2, 'blink'], [7.0, 'poker']],
      date: (u, t, t0) => ({ mood: 'happy', look: [-1, 0], hops: [t0 + 2.0, t0 + 2.5, t0 + 3.0] }),
      bubbles: [[2.0, 3.9, 'my ex loved this place']],
      draw(x) { box(x, 430, 1140, 220, 60, '#c98e5e', { b: 5 }); for (let i = 0; i < 3; i++) box(x, 450 + i * 64, 1112, 52, 34, '#f2c88a', { b: 4 }) },
      card: '6/10', pis: { at: 1.0, tears: 1, mood: 'wide' },
      cues: [['pop', 2.0, 880, 0.035, 0.3], ['tick', 2.0, 0.06]] },
    { title: 'PASTA',
      shots: [[0, 'wide'], [1.7, 'two'], [3.4, 'rev'], [4.9, 'date'], [7.2, 'tight']],
      cc: [[0.3, '[ twirls. *expertly.* ]'], [1.9, '[ fork pauses mid-air ]'], [5.1, '[ one eyebrow ]'], [7.3, '[ counting ]']],
      face: [[0, 'chew'], [1.9, 'eyebrow'], [5.0, 'clench'], [7.2, 'eyebrow']],
      date: (u, t, t0) => ({ mood: 'happy', look: [-1, 0], hops: [t0 + 1.8, t0 + 2.3, t0 + 5.0, t0 + 5.5] }),
      bubbles: [[1.8, 3.4, 'my ex always ordered this'], [5.0, 6.8, 'my ex hated olives, ha']],
      draw(x, t, P) {
        plate(x, 470, 1190, 220, { kind: 'bowl', food: pasta })
        const up = ease.outCubic(prog(P.u, 1.2, 1.8)), wob = P.u > 1.9 ? Math.sin(t * 4) * 0.03 : 0
        fork(x, 560, lerp(1180, 1020, up), -0.4 + wob, 1.2)
        if (P.u > 1.9) R(x, '#f2c75c', 548, lerp(1180, 1020, up) - 70, 10, 50)
      },
      card: '4/10', pis: { at: 0.6, tears: 2 },
      cues: [['pop', 1.8, 880, 0.035, 0.3], ['pop', 5.0, 880, 0.035, 0.3], ['whoosh', 1.2, 0.4, 0.02]] },
    { title: 'THE QUIET',
      shots: [[0, 'wide'], [1.5, 'date'], [3.0, 'two'], [5.0, 'rev'], [6.3, 'wide']],
      cc: [[0.3, '[ bracing ]'], [1.6, '[ mention *four* ]'], [3.1, '[ eyebrows soften ]'], [6.4, '[ slow nod ]']],
      face: [[0, 'poker'], [1.6, 'clench'], [3.0, 'wide'], [4.2, 'touched'], [6.4, 'nod', { n: 3 }]],
      date: (u, t, t0) => ({ mood: u > 2.6 && u < 6.2 ? 'neutral' : 'happy', look: u > 2.6 && u < 4.6 ? [0, 1] : [-1, 0], tears: u > 2.6 && u < 6.2 ? 1 : 0, hops: [t0 + 1.5, t0 + 3.0, t0 + 6.2] }),
      bubbles: [[1.5, 2.7, 'my ex— wait.'], [3.0, 6.0, 'sorry. i’m still a bit sad about it.'], [6.2, 8.8, 'but i’m here. and i like this.']],
      draw(x) { plate(x, 470, 1190, 220, { kind: 'bowl', food: pasta }) },
      card: '8/10', pis: { at: 3.2, tears: 3, mood: 'sparkle' },
      cues: [['pop', 1.5, 880, 0.035, 0.3], ['tick', 2.7, 0.06], ['pluck', 3.1, 1174.66, 0.035, 0.6, 0], ['tom', 6.8, 72, { gain: 0.12, decay: 0.22 }], ['tom', 7.65, 70, { gain: 0.12, decay: 0.22 }]] },
    { title: 'DESSERT',
      shots: [[0, 'wide'], [2.0, 'two'], [4.0, 'rev'], [5.6, 'tight'], [8.6, 'wide']],
      cc: [[0.3, '[ orders dessert. *for two.* ]'], [2.1, '[ two spoons ]'], [4.1, '[ the honesty got to them ]'], [5.7, '[ a single tear ]'], [8.7, '[ shares the last bite ]']],
      face: [[0, 'smile'], [2.0, 'grin'], [4.0, 'touched'], [5.6, 'tear'], [8.6, 'smile']],
      date: (u, t, t0) => ({ mood: u > 8.6 ? 'heart' : 'happy', look: [-1, 0], hops: [t0 + 2.4, t0 + 8.8] }),
      bubbles: [[2.4, 4.6, 'two spoons? ok, you’re sweet.']],
      draw(x, t, P) {
        const sp = ease.inOutCubic(prog(P.u, 1.0, 1.8))
        plate(x, lerp(430, 600, sp), 1190, 210, { food: (q) => { box(q, -60, -60, 120, 56, '#e9d3b0', { b: 5 }); R(q, '#6b4a2f', -60, -60, 120, 14); R(q, '#6b4a2f', -60, -32, 120, 6) } })
        if (P.u > 2.0) { fork(x, 540, 1120, 0.3, 0.9); fork(x, 680, 1120, -0.3, 0.9) }
        hearts(x, t, P.t0 + 8.8, 620, 820, { n: 6, rise: 220 })
      },
      card: '10/10', pis: { at: 0.4, tears: 3 },
      cues: [['whoosh', 1.0, 0.5, 0.03], ['tick', 2.0, 0.05], ['tick', 2.1, 0.05], ['bell', 5.7, 2637.02, 0.026, 1.8, -0.2], ['glitter', 8.8, 9.3]] },
  ],
  over(tx, t, P) {
    if (P.ph === 'verdict' && t > 49.2) return
    const n = nEx(t), last = t < 3 ? -0.2 : Math.max(-9, ...MENTIONS.filter(c => t >= c))
    const fl = clamp(1 - (t - last) / 0.6)
    tx.save(); tx.translate(1010, t < 3 ? 500 : 225); tx.rotate(t < 3 ? 0.04 * Math.sin(t * 40) * Math.exp(-t * 2) : 0)
    tx.scale(1 + 0.25 * fl, 1 + 0.25 * fl)
    tx.font = `800 40px ${INTER}`; tx.textAlign = 'right'; tx.textBaseline = 'middle'
    const s = `EX MENTIONS: ${n}`, w = tx.measureText(s).width + 40
    box(tx, -w, -34, w, 68, fl > 0.3 || t < 3 ? RED : 'rgba(16,9,38,0.92)', { b: 5 })
    tx.fillStyle = BONE; tx.fillText(s, -20, 2)
    tx.restore()
  },
  verdict: { rows: [['Ex mentions', 1], ['Honesty', 5], ['The pasta', 5], ['Dessert', '*two spoons*']], total: '9/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7] }),
  last: 'Ex mentions: four. | Honesty: *ten.*',
  hookCues: [['boom', 0.05, 0.2], ['whoosh', 0.0, 0.5, 0.04], ['tick', 1.62, 0.06]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, sparkles, GOLD, PINK, CREAM, DATE, REV, pop01, outK]
