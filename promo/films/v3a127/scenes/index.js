// v3a127: star_advice, ADVICE SOLO, "Cancer, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): kind "stop doing this" notes for a Cancer in love, one gag each.
//   0.0–3.6    "Cancer, stop doing | *this in love.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              ties a bib on Leo: THEY'RE AN ADULT · a smiley mask on a stick, the real face behind it
//              · a SORRY FOR ASKING sign flips to CAN I HAVE A HUG? · a pop quiz for Gemini, crossed out: JUST ASK
//              · a shoebox of keepsakes: DATE 1 NAPKIN · at the window, then a book: LIVING MY LIFE
//              · shivering, hands Scorpio the blanket, then both under it: SHARE IT · a zipper on the mouth, unzipped:
//              "I miss you" · a match checked with a magnifying glass: IT'S REAL.
//  37.8        "Soft heart. | *Fair share.*"  Cancer comes back, big.
//  41.0        LESSON UNLOCKED: "Love them softly. | *Love you too.*"  HEART: SHARED
//  46.9        "Blanket for two? | *Finally.*" over the match card: Cancer + Scorpio (the blanket, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CN = '#3fb6f0', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'cancer'

function phone(x, cx, cy, k, { head = '', headBg = MINT, lines = [], lineBg = '#2a2350', ink = BONE, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-100, -146, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -122) }
  lines.forEach(([txt, a], i) => {
    if (a <= 0.01) return
    x.save(); x.translate(0, -40 + i * 92); x.scale(a, a)
    x.fillStyle = lineBg; x.fillRect(-96, -38, 192, 76)
    x.fillStyle = ink; x.font = `800 26px ${INTER}`
    String(txt).split('|').forEach((l, j, arr) => x.fillText(l.trim(), 0, (j - (arr.length - 1) / 2) * 30 + 2))
    x.restore()
  })
  x.restore()
}
function text(x, s, cx, cy, size, { col = INK, font = INTER, w = 800 } = {}) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
// a hand-held placard on a stick
function placard(x, cx, cy, k, lines, bg, rot = -0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 60, 24, 220); x.fillStyle = WOOD; x.fillRect(-6, 64, 12, 214)
  x.fillStyle = INK; x.fillRect(-200, -90, 400, 170); x.fillStyle = bg; x.fillRect(-192, -82, 384, 154)
  lines.forEach((l, i) => text(x, l, 0, -32 + i * 52, 40))
  x.restore()
}
// a blanket (a quilted rectangle), draped
function blanket(x, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 40); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.fill()
  x.strokeStyle = '#ffd0dc'; x.lineWidth = 5
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(-w / 2 + i * w / 5, -h / 2 + 10); x.lineTo(-w / 2 + i * w / 5, h / 2 - 10); x.stroke() }
  x.beginPath(); x.moveTo(-w / 2 + 10, 0); x.lineTo(w / 2 - 10, 0); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Stop parenting | *your date.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 820, 920, 220 * k, { mood: lt > 1.0 ? 'eyeroll' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.6] })
      const b = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (b > 0.01) {
        x.save(); x.translate(820, 1010); x.scale(b, b)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-80, -30); x.lineTo(80, -30); x.lineTo(60, 90); x.quadraticCurveTo(0, 130, -60, 90); x.closePath(); x.fill()
        x.fillStyle = '#f4eee2'; x.beginPath(); x.moveTo(-70, -22); x.lineTo(70, -22); x.lineTo(52, 82); x.quadraticCurveTo(0, 118, -52, 82); x.closePath(); x.fill()
        drawBits(x, ['.P.P.', 'PPPPP', '.PPP.', '..P..'], { P: PINK }, 0, 30, 9)
        x.restore()
      }
      label(x, 760, 620, 'THEY’RE AN ADULT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop hiding hurt | *behind a smile.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [0, 1], star: { x: -60 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const lift = ease.inOutCubic(prog(lt, 0.9, 1.4))
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(lerp(F.x, F.x + 260, lift), lerp(F.cy - 10, F.cy - 160, lift)); x.rotate(lift * 0.3); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-8, 60, 16, 200); x.fillStyle = WOOD; x.fillRect(-4, 64, 8, 194)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.fillRect(-46, -40, 20, 30); x.fillRect(26, -40, 20, 30)
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, 4, 56, 0.2, Math.PI - 0.2); x.stroke()
        x.restore()
      }
      label(x, 540, 1140, lt > 1.4 ? 'REAL FACE: WELCOME' : 'TOTALLY GREAT :)', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: lt > 1.4 ? MINT : BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop apologising | *for needing things.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -230 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const flip = prog(lt, 0.9, 1.2), sx = Math.abs(Math.cos(flip * Math.PI))
      x.save(); x.translate(780, 760); x.scale(Math.max(0.02, sx), 1); x.translate(-780, -760)
      placard(x, 780, 760, pop01(t, P.t0 + 0.2, 0.35, 2), flip < 0.5 ? ['SORRY FOR', 'ASKING…'] : ['CAN I HAVE', 'A HUG?'], flip < 0.5 ? BONE : MINT)
      x.restore()
      if (lt > 1.4) hearts(x, t, 780, 760, P.t0 + 1.8, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Stop testing them. | *Just ask.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(760, 800); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -180, 340, 360); x.fillStyle = '#f4eee2'; x.fillRect(-162, -172, 324, 344)
        text(x, 'POP QUIZ', 0, -130, 36, { font: MONO, w: 700 })
        text(x, 'Q1: what did', 0, -60, 30); text(x, 'I mean by “k”?', 0, -20, 30)
        x.fillStyle = INK; x.fillRect(-120, 40, 240, 4); x.fillRect(-120, 100, 240, 4)
        const c = ease.inOutCubic(prog(lt, 1.0, 1.3))
        if (c > 0) { x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-140, -150); x.lineTo(-140 + 280 * c, -150 + 300 * c); x.stroke() }
        x.restore()
      }
      const g = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (g > 0.01) signChar(x, t, 'gemini', 860, 1070, 140 * g, { mood: 'wide', look: [-1, -1], seed: 22, glyph: false })
      label(x, 600, 1150, 'JUST ASK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Keep the memories. | *Not every napkin.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 1], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 1020); x.scale(k, k)
        const items = [['DATE 1 NAPKIN', BONE, -0.2], ['A BOTTLE CAP', GOLD, 0.15], ['THEIR RECEIPT', PINK, -0.05], ['A LEAF?', MINT, 0.25]]
        items.forEach(([s, c, r], i) => {
          const up = ease.outBack ? ease.outCubic(prog(lt, 0.3 + i * 0.15, 0.7 + i * 0.15)) : 1
          x.save(); x.translate(-90 + (i % 2) * 180, -120 - up * (60 + i * 50)); x.rotate(r)
          x.font = `700 24px ${MONO}`; const w = x.measureText(s).width + 26
          x.fillStyle = INK; x.fillRect(-w / 2 - 4, -24, w + 8, 48); x.fillStyle = c; x.fillRect(-w / 2, -20, w, 40)
          x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
          x.restore()
        })
        x.fillStyle = INK; x.fillRect(-170, -90, 340, 180); x.fillStyle = '#c97a4a'; x.fillRect(-162, -82, 324, 164)
        x.fillStyle = '#a85e33'; x.fillRect(-162, -82, 324, 34)
        text(x, 'US ♡', 0, 20, 44, { col: BONE })
        x.restore()
      }
    } },
  { sign: S, cap: 'Stop waiting | *by the window.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: lt => lt > 1.3 ? [1, 1] : [-1, -1], star: { x: -200 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      if (k <= 0.01) return
      x.save(); x.translate(320, 740); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -170, 300, 300); x.fillStyle = '#0d1a3a'; x.fillRect(-138, -158, 276, 276)
      x.fillStyle = '#f2e7a5'; x.beginPath(); x.arc(60, -80, 30, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK; x.fillRect(-6, -158, 12, 276); x.fillRect(-138, -26, 276, 12)
      x.restore()
    },
    front(x, t, lt, P) {
      const b = pop01(t, P.t0 + 1.3, 0.35, 2)
      if (b > 0.01) {
        x.save(); x.translate(560, 1040); x.rotate(-0.1); x.scale(b, b)
        x.fillStyle = INK; x.fillRect(-110, -70, 220, 140); x.fillStyle = '#2fc79a'; x.fillRect(-104, -64, 100, 128); x.fillRect(4, -64, 100, 128)
        x.fillStyle = '#f4eee2'; x.fillRect(-94, -54, 84, 108); x.fillRect(10, -54, 84, 108)
        x.restore()
      }
      label(x, 790, 640, 'LIVING MY LIFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop giving away | *your blanket.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    squash: lt => lt < 1.3 ? 0.03 * Math.sin(lt * 70) : 0,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 760, 920, 210 * k, { mood: lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.9] })
      const share = ease.inOutCubic(prog(lt, 1.2, 1.6))
      blanket(x, lerp(760, 560, share), 1000, lerp(260, 640, share), 170, pop01(t, P.t0 + 0.4, 0.3, 2))
      if (lt < 1.2) label(x, 340, 620, 'BRRR', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.06, font: MONO, weight: 700 })
      else label(x, 560, 620, 'SHARE IT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Stop going quiet. | *Say it.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 320 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const un = ease.inOutCubic(prog(lt, 0.8, 1.2)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 52); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-90, -12, 180, 24); x.fillStyle = '#9aa3c7'
        for (let i = 0; i < 11; i++) if (i / 10 > un) x.fillRect(-84 + i * 16, -8, 10, 16)
        x.fillStyle = INK; x.fillRect(lerp(-90, 90, un) - 14, -24, 28, 48); x.fillStyle = GOLD; x.fillRect(lerp(-90, 90, un) - 9, -19, 18, 38)
        x.restore()
      }
      bubble(x, 740, 640, 'I miss you!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      hearts(x, t, 760, 900, P.t0 + 1.5, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Stop doubting | *a good match.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ IT’S A MATCH', headBg: MINT, lines: [['they like | you back', pop01(t, P.t0 + 0.5, 0.3, 2.2)]], lineBg: CN, ink: INK })
      const m = pop01(t, P.t0 + 0.6, 0.3, 2), mx = 700 + Math.sin(t * 3) * 40
      if (m > 0.01 && lt < 1.4) { x.save(); x.translate(mx, 820); x.scale(m, m); x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 12; x.stroke(); x.fillStyle = 'rgba(190,235,255,0.25)'; x.fill(); x.lineWidth = 24; x.strokeStyle = INK; x.beginPath(); x.moveTo(50, 50); x.lineTo(120, 120); x.stroke(); x.restore() }
      label(x, 790, 1120, 'IT’S REAL.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a127', key: 'E', accent: CN, solo: S, ending: 'card',
  title: 'Cancer, stop doing | *this in love.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'scorpio', chip: 'ALIGNED' },
  group: { cap: 'Soft heart. | *Fair share.*', mood: 'sparkle' },
  lesson: { text: 'Love them softly. | *Love you too.*', chip: 'HEART: SHARED' },
  last: { text: 'Blanket for two? | *Finally.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
