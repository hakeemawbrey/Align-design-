// hxearlylate (30 s vertical, Star Talk Shows · TWO STARS DISAGREE, Houston edition) "Early dinner or late night?" · funk E.
// The set lives in ./debate.js (a local copy of sxdebatetext's, no numbers of episodes on screen, frame 0 is the
// thumbnail). Story 0–25.6, then the end card (default CTA).
//   hook   "Early dinner, | or *late* night?"  ♑ CAPRICORN (5:30 PM) vs ♌ LEO (10 PM). GONG.
//   v1     CAPRICORN: "5:30. no lines. *home by nine.*" (a pixel clock at half past five) · LEO: "10 pm. the city
//          *glows* then." (the downtown skyline lights up behind it)
//   v2     "Running | *late.*"  CAPRICORN: "at ten i'm in *pajamas.*" (a nightcap drops onto it) · LEO: "at 5:30 my hair
//          is still *wet.*" (a hair dryer, drips)
//   v3     card cut → "Final | *round.*"  CAPRICORN: "…i *could* nap at four." (a pillow, zzz) · LEO: "i *could* do one
//          outfit." (a clothes rack: ONE LOOK ✓). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. *halfway* is a time."
//   end    a clock between the podiums: its two hands sweep in from 5:30 and 10:00 and land on eight; bump, heart.
//          "Meet at | *eight.*"  + "Which side are *you* on?"
//   rewatch Pisces wears a sleep mask pushed up on its head in the crowd (it pulls it down when the clock lands).
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, BONE, POS } from './debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'E'
const CAP = ['......PP', '....BBB.', '...BBBB.', '..BBBBB.', '.BBBBBB.', 'WWWWWWWW']
const DRYER = ['.DDDDD...', 'DDDDDDDDN', 'DDDDDDDDN', '.DDDDD...', '...HH....', '...HH....', '...HH....']
const PILLOW = ['.WWWWWWWW.', 'WWWWWWWWWW', 'WwWWWWWWwW', 'WWWWWWWWWW', '.WWWWWWWW.']
const RACK = ['MMMMMMMMMMM', 'M....h....M', 'M...OOO...M', 'M..OOOOO..M', 'M..OOOOO..M', 'M...OOO...M', 'M...O.O...M', 'M.........M', 'MM.......MM']

// a pixel clock face; hands as angles (radians, 0 = twelve, clockwise)
function clock(H, cx, cy, R, hA, mA, { k = 1, face = '#fbf6ea', rim = GOLD } = {}) {
  if (k <= 0.01) return
  const { px } = H, c = Math.max(4, Math.round(R / 9)), r = R * k
  for (let j = -r; j < r; j += c) for (let i = -r; i < r; i += c) {
    const d = Math.hypot(i + c / 2, j + c / 2)
    if (d > r) continue
    px(cx + i, cy + j, c, c, d > r - c ? INK : d > r - 2 * c ? rim : face)
  }
  for (let n = 0; n < 12; n++) { const a = n / 12 * Math.PI * 2; px(cx + Math.sin(a) * r * 0.72 - c / 2, cy - Math.cos(a) * r * 0.72 - c / 2, c, c, n % 3 ? '#c9c2e6' : INK) }
  const hand = (a, len, col) => { for (let s = 0; s < len; s += c * 0.6) px(cx + Math.sin(a) * s - c / 2, cy - Math.cos(a) * s - c / 2, c, c, col) }
  hand(mA, r * 0.66, '#3a2a5c'); hand(hA, r * 0.44, '#ff5d6a')
  px(cx - c, cy - c, 2 * c, 2 * c, INK)
}
const HR = h => (h % 12) / 12 * Math.PI * 2, MN = m => m / 60 * Math.PI * 2

const cfg = {
  id: 'hxearlylate', key: KEY, accent: '#ffd36a',
  signs: [{ id: 'capricorn', name: 'CAPRICORN', stance: '5:30 PM' }, { id: 'leo', name: 'LEO', stance: '10 PM' }],
  heads: {
    hook: 'Early dinner, | or *late* night?',
    r2: 'Running | *late.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Meet at | *eight.*',
  },
  lines: [
    { who: 0, text: '5:30. no lines. *home by nine.*', moods: ['happy', 'eyeroll'] },
    { who: 1, text: '10 pm. the city *glows* then.', moods: ['sparkle', 'wide'] },
    { who: 0, text: 'at ten i’m in *pajamas.*', moods: ['squint', 'wide'] },
    { who: 1, text: 'at 5:30 my hair is still *wet.*', moods: ['wide', 'eyeroll'] },
    { who: 0, text: '…i *could* nap at four.', moods: ['neutral', 'happy'] },
    { who: 1, text: 'i *could* do one outfit.', moods: ['happy', 'sparkle'] },
  ],
  star: 'you’re *both* right. *halfway* is a time.',
  // behind Leo: the downtown skyline, lighting up window by window at "the city glows"
  back(x, t, H) {
    const { px, ok, L, T } = H
    const kg = ease.outCubic(prog(t, L[1].t + 0.2, L[1].t + 1.2)) * (1 - ease.inQuad(prog(t, T.stars - 0.2, T.stars + 0.3))) * ok
    if (kg <= 0.01) return
    const towers = [[600, 120, 70], [674, 210, 60], [740, 160, 54], [800, 260, 66], [872, 190, 58], [936, 240, 72], [1012, 140, 26]]
    x.save(); x.globalAlpha = kg * 0.85
    for (const [tx, h, w] of towers) {
      const top = 1012 - h
      px(tx, top, w, h, '#22184a'); px(tx, top, w, 4, '#3a2a6c')
      for (let j = top + 14; j < 1000; j += 18) for (let i = tx + 8; i < tx + w - 8; i += 14) {
        const on = Math.abs(Math.sin(i * 3.1 + j * 1.7)) * 1.6 < kg + 0.15 * Math.sin(t * 2 + i)
        if (on) px(i, j, 6, 8, '#ffd36a')
      }
    }
    x.restore()
  },
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    const cap = H.pos[0], leo = H.pos[1]
    // v1: Capricorn's clock, half past five
    const kc = until(0, L[2].t)
    if (kc > 0.01) clock(H, 100, 930, 62, HR(5.5), MN(30), { k: kc })
    // v2 → v3: the nightcap
    const kn = pop01(t, L[2].t + 0.2, 0.35, 2.2) * (1 - ease.inQuad(prog(t, T.bump - 0.2, T.bump + 0.1))) * ok
    if (kn > 0.01 && cap && cap.size) {
      const drop = ease.outBack(prog(t, L[2].t + 0.15, L[2].t + 0.55))
      bits(CAP, { B: '#4f7bd8', P: '#ffffff', W: '#efe6d6' }, cap.x + 12, lerp(cap.top - 200, cap.top + 4, drop), 10, { alpha: kn, rot: 0.18 })
    }
    // v2: Leo's hair dryer + drips
    const kd = until(3, L[4].t + 0.2)
    if (kd > 0.01) {
      bits(DRYER, { D: '#ff8fb1', N: '#3d3654', H: '#c9c2e6' }, POS[1].x + 40, 1180, 14, { sx: -kd, sy: kd, rot: 0.1 * Math.sin(t * 20) })
      for (let n = 0; n < 4; n++) { const p = ((t - L[3].t) * 2 + n / 4) % 1; px(lerp(POS[1].x - 40, POS[1].x - 150, p), 1150 + n * 14 + 6 * Math.sin(t * 30 + n), 30, 5, `rgba(255,255,255,${0.6 * (1 - p) * kd})`) }
      if (leo && leo.size) for (let n = 0; n < 3; n++) { const p = (t * 1.3 + n / 3) % 1; px(leo.x - 50 + n * 50, leo.top + 20 + p * 70, 7, 11, `rgba(143,216,255,${(1 - p) * kd})`) }
    }
    // v3: Capricorn's pillow, zzz
    const kp = until(4, T.stars)
    if (kp > 0.01) {
      bits(PILLOW, { W: '#efe6d6', w: '#c9c2e6' }, POS[0].x, 1196, 14, { sx: kp, sy: kp })
      for (let n = 0; n < 3; n++) { const p = (t * 0.8 + n / 3) % 1; txt('z', POS[0].x - 150 + p * 40 + n * 8, 960 - p * 150, { size: 22 + n * 6, color: '#bfe6ff', alpha: kp * Math.sin(Math.PI * p), font: "Inter, sans-serif", weight: 800 }) }
    }
    // v3: Leo's clothes rack — one look
    const kr = until(5, T.stars + 0.2)
    if (kr > 0.01) {
      bits(RACK, { M: '#9aa3b0', h: '#c9c2e6', O: '#f2c75c' }, POS[1].x, 1170, 13, { sx: kr, sy: kr })
      if (t > L[5].t + 0.8) txt('ONE LOOK ✓', POS[1].x, 726, { size: 26, color: '#7dffb0', alpha: kr })
    }
    // the end: a clock between the podiums; its hands sweep in from 5:30 and 10:00 and land on eight
    const ke = pop01(t, T.turn, 0.35, 2.2) * ok
    if (ke > 0.01) {
      const p = ease.inOutCubic(prog(t, T.turn + 0.3, T.bump + 0.05))
      const hA = lerp(HR(5.5), HR(8), p), mA = lerp(MN(30) + Math.PI * 2 * 0, Math.PI * 2, p)
      clock(H, 540, 1150, 74, hA, mA, { k: ke })
      if (p > 0.98) drawPixelStar(x, 600, 1090, 22 + 4 * Math.sin(t * 8), 1, '#ffffff', GOLD)
    }
  },
  // rewatch bait: Pisces wears a sleep mask pushed up on its head; it pulls it down when the clock lands on eight
  front(x, t, H) {
    const { px, ok, T } = H
    if (ok <= 0.01) return
    const down = ease.inOutCubic(prog(t, T.bump + 0.3, T.bump + 0.6))
    const y = lerp(1402 - 30, 1402 - 8, down)
    x.save(); x.globalAlpha = ok
    px(652 - 34, y - 9, 68, 18, INK); px(652 - 30, y - 6, 60, 12, '#ff8fb1')
    px(652 - 24, y - 3, 14, 6, '#ffd1de'); px(652 + 10, y - 3, 14, 6, '#ffd1de')
    x.restore()
  },
  sobAt: [],
}
// Pisces sobs hardest at "i could do one outfit" (growth)
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ...[0, 1, 2, 3].map(n => ['tick', +(L[0].t + 0.2 + n * 0.25).toFixed(3), 0.035]),
    ['glitter', L[1].t + 0.2, L[1].t + 1.2], ['pluck', L[1].t + 0.6, 1318.51, 0.03, 0.6, 0.3],
    ['whoosh', L[2].t + 0.15, 0.4, 0.03], ['pop', L[2].t + 0.55, 659.25, 0.04, -0.3],
    ['whoosh', L[3].t + 0.05, 1.2, 0.03],
    ['pop', L[4].t + 0.2, 493.88, 0.03, -0.3], ['bell', L[4].t + 0.6, 987.77, 0.02, 1.2, -0.3],
    ['tick', L[5].t + 0.3, 0.04], ['pluck', L[5].t + 0.85, 1318.51, 0.035, 0.5, 0.3],
    ...[0, 1, 2, 3, 4, 5].map(n => ['tick', +(T.turn + 0.35 + n * 0.25).toFixed(3), 0.03]), ['bell', T.bump + 0.05, 1318.51, 0.035, 1.4, 0],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
