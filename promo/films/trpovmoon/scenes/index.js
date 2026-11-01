// trpovmoon (20 s vertical, Star Talk Trends §9 POV, ep 3 · synthwave · Am) · story 0–15.6, then the end card.
// "POV: your date asks your *moon sign.*" The camera is you, across a candlelit table from ♒ AQUARIUS.
//   0.9       AQUARIUS: "so… what's your *moon* sign?"
//   2.9–6.0   FREEZE: the picture stops (blue wash, punch-in), your brain checks the list (rule of three):
//             "sun: Virgo ✓" … "rising: …Leo? ✓" … "moon: ??? ✗". Sweat drops roll down the lens.
//   6.0       THE STARS slide down in the corner, whispering. THE STARS: "psst… it's *Cancer.* trust us."
//   8.7       card cut.
//   9.0       you: "“Cancer. obviously.”"   AQUARIUS: "wow. i don't even know *mine.*"
//   11.2      THE STARS swoop over to whisper in their ear too: "(they whispered theirs too)". Both of you laugh.
//   13.0      Last line: "*Moon* who?"   Pisces, the waiter in the back, cries the whole time (happy tears at the end).
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, R, pop01, outK, prog, ease, lerp, clamp, easeOutBack, INK, BONE, GOLD, r3, BEAT } from './povkit.js'
import { talkHops, STAR } from '../../startalk.js'

const AQU = signStar('aquarius')
const AN = `${AQU.glyph}︎ AQUARIUS`, SN = 'THE STARS'
const T = { freeze: [2.9, 6.0], s1: 3.3, s2: 4.05, s3: 4.8, stars: [5.75, 6.25], cut: 8.7, answer: 9.0, swoop: [11.0, 11.6], laugh: 11.9, last: 13.0, out: [15.1, 15.5] }
const LINES = [
  { t: 0.9, speaker: AN, text: 'so… what’s your *moon* sign?', color: '#9ff0ff' },
  { t: 6.35, speaker: SN, text: 'psst… it’s *Cancer.* trust us.' },
  { t: 9.6, speaker: AN, text: 'wow. i don’t even know *mine.*', color: '#9ff0ff' },
]
const DATE = { x: 540, y: 990, s: 460 }
const D_HOPS = [0.3, ...talkHops(LINES, AN), T.laugh, T.laugh + 0.5, T.last + 0.4]
const S_HOPS = [T.stars[1], ...talkHops(LINES, SN), T.swoop[1], T.last + 0.45]
const frozen = t => t > T.freeze[0] && t < T.freeze[1]

function table(x, t) {
  R(x, INK, 40, 1168, 1000, 170)
  R(x, '#7a1838', 48, 1176, 984, 156)
  R(x, '#c43a5e', 48, 1176, 984, 26)
  for (let i = 0; i < 14; i++) R(x, 'rgba(255,255,255,0.05)', 60 + i * 70, 1210, 30, 120)
  // the candle
  const cx = 250, fl = frozen(t) ? 0 : Math.sin(t * 17) * 4 + Math.sin(t * 7.3) * 3
  const g = x.createRadialGradient(cx, 1070, 0, cx, 1070, 260); g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(1, 'rgba(255,200,120,0)')
  x.fillStyle = g; x.fillRect(cx - 260, 810, 520, 520)
  R(x, INK, cx - 26, 1066, 52, 112); R(x, '#f4e8cc', cx - 20, 1072, 40, 106); R(x, '#fff8ef', cx - 20, 1072, 10, 106)
  drawBits(x, ['..F..', '.FFF.', '.FYF.', 'FFYFF', 'FYWYF', '.FYF.'], { F: '#ff8a3a', Y: '#ffd36a', W: '#fff8ef' }, cx + fl * 0.4, 1034, 9, { rot: fl * 0.01 })
}

function date(x, t) {
  const tt = frozen(t) ? T.freeze[0] : t
  let mood = 'sparkle', look = [0, 0]
  if (t > T.answer) { mood = 'wide'; look = [0, 0] }
  if (t > LINES[2].t) mood = 'squint'
  if (t > T.swoop[1]) { mood = 'wide'; look = [-1, -1] }
  if (t > T.laugh) { mood = 'happy'; look = undefined }
  if (t > T.last) mood = 'heart'
  drawStarChar(x, DATE.x, DATE.y, DATE.s, tt, { color: AQU.color, glyph: AQU.glyph, mood, look, hops: D_HOPS, seed: 7, glow: 1.1, pop: pop01(t, 0.15, 0.4, 2), blink: frozen(t) ? false : undefined })
}

function stars(x, t) {
  // THE STARS: three little gold whisperers, sliding down the left edge, later swooping to the date's ear
  if (t < T.stars[0]) return
  const inK = easeOutBack(prog(t, ...T.stars), 1.6), sw = ease.inOutCubic(prog(t, ...T.swoop)), o = outK(t, [T.out[0] - 0.3, T.out[0]])
  const base = [[150, 720], [270, 650], [130, 600]], dest = [[800, 700], [900, 640], [760, 620]]
  base.forEach(([bx, by], i) => {
    const X = lerp(bx, dest[i][0], sw), Y = lerp(lerp(-200, by, inK), dest[i][1], sw) - Math.sin(Math.PI * sw) * 120
    const mood = t > T.last ? 'happy' : t > T.answer && t < T.swoop[0] ? 'wink' : 'sparkle'
    drawStarChar(x, X, Y, i ? 96 : 120, t, { color: STAR.sky, mood, look: sw > 0.5 ? [-1, 1] : [1, 1], hops: S_HOPS.map(h => h + i * 0.06), seed: 12 + i, glow: 1.2, pop: o })
  })
  // a whisper squiggle toward you / toward them
  const wk = (t > LINES[1].t && t < T.cut) || (t > T.swoop[1] && t < T.laugh + 0.3)
  if (wk) {
    const [sx, sy, dx] = t < T.cut ? [300, 700, 1] : [740, 680, -1]
    x.save(); x.strokeStyle = 'rgba(255,233,160,0.85)'; x.lineWidth = 6; x.setLineDash([10, 12]); x.lineDashOffset = -t * 60
    x.beginPath(); for (let k = 0; k <= 20; k++) { const p = k / 20; x[k ? 'lineTo' : 'moveTo'](sx + dx * p * 180, sy + Math.sin(p * 12 + t * 8) * 16 + p * 40) } x.stroke(); x.restore()
  }
}

const EP = makePOV({
  id: 'trpovmoon', duration: 20,
  caption: 'your date asks your *moon sign.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 0.7, close: 12.6 }],
  stickers: [
    { at: T.s1, out: [5.7, 5.9], text: 'sun: Virgo ✓', x: 300, y: 390, rot: -4, size: 44, kind: 'dark' },
    { at: T.s2, out: [5.75, 5.95], text: 'rising: …Leo? ✓', x: 730, y: 500, rot: 3, size: 44, kind: 'dark' },
    { at: T.s3, out: [5.8, 6.0], text: 'moon: *???* ✗', x: 470, y: 620, rot: -2, size: 56, kind: 'hot' },
    { at: T.answer, out: [10.9, 11.1], text: '“Cancer. *obviously.*”', x: 540, y: 400, rot: -3, size: 50, kind: 'you' },
    { at: 11.55, out: [12.75, 12.95], text: '(they whispered *theirs* too)', x: 540, y: 400, rot: 2, size: 40, kind: 'dark' },
  ],
  last: { at: T.last, text: '*Moon* who?', color: '#ffe9a0' },
  cuts: [T.cut],
  punch: [{ at: T.freeze[0], dur: T.freeze[1] - T.freeze[0], z: 0.22, x: 540, y: 960 }, { at: T.laugh, dur: 0.8, z: 0.06 }],
  pitch: { [AN]: 698.46, [SN]: 1046.5 },
  scene(x, t) {
    const pt = frozen(t) ? T.freeze[0] : t
    pisces(x, t, { x: 920, y: 830, s: 130, tears: t > T.last ? 3 : t > T.freeze[0] ? 2 : 1, mood: t > T.last ? 'happy' : 'sparkle', look: [-1, 1], pop: pop01(t, 0.6, 0.3, 2) })
    void pt
    date(x, t)
    table(x, t)
    if (t > T.last) for (let i = 0; i < 5; i++) { const ph = t - T.last - 0.35 - i * 0.15; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#ff4f86' : '#9ff0ff' }, 540 + (i - 2) * 120 + Math.sin(ph * 4 + i) * 16, 820 - ph * 130, 9, { alpha: clamp(1 - ph / 2) }) }
    sparkles(x, t, 540, 900, T.last + 0.35, 12, 300, 1, ['#ffe9a0', GOLD, BONE])
  },
  front(x, t) {
    // the freeze: a cold wash + pause bars + sweat on the lens
    if (frozen(t)) {
      const k = Math.min(prog(t, T.freeze[0], T.freeze[0] + 0.12), 1 - prog(t, T.freeze[1] - 0.15, T.freeze[1]))
      x.save(); x.globalAlpha *= k
      x.fillStyle = 'rgba(40,70,160,0.28)'; x.fillRect(0, 0, 1080, 1920)
      R(x, 'rgba(255,255,255,0.85)', 900, 330, 22, 70); R(x, 'rgba(255,255,255,0.85)', 936, 330, 22, 70)
      for (let i = 0; i < 4; i++) {
        const t0 = T.s3 + 0.1 + i * 0.25, ph = t - t0
        if (ph < 0) continue
        const sx = [100, 1005, 180, 1000][i], sy = 260 + ph * 260
        drawBits(x, ['..D..', '.DDD.', 'DDWDD', 'DDDDD', '.DDD.'], { D: '#8fe3ff', W: '#ffffff' }, sx, sy, 14)
      }
      x.restore()
    }
    stars(x, t)
  },
  cues: [
    ['whoosh', r3(T.freeze[0] - 0.05), 0.3, 0.04], ['pop', r3(T.freeze[0]), 196, 0.06, 0], ['tick', r3(T.freeze[0]), 0.08],
    ['pluck', r3(T.s3 + 0.05), 233.08, 0.05, 0.5, 0],
    ['whoosh', r3(T.freeze[1] - 0.1), 0.3, 0.03], ['glitter', r3(T.stars[0]), r3(T.stars[1] + 0.3)],
    ['whoosh', r3(T.swoop[0]), 0.5, 0.03], ['glitter', r3(T.swoop[1]), r3(T.swoop[1] + 0.4)],
    ['pop', r3(T.laugh), 987.77, 0.035, 0.2], ['pop', r3(T.laugh + 0.12), 1174.66, 0.03, -0.2], ['pop', r3(T.laugh + 0.24), 1318.51, 0.03, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BEAT
