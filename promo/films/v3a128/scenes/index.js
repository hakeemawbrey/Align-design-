// v3a128: star_advice, ADVICE SOLO, "Scorpio, stop doing | this in love." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): kind "stop doing this" notes for a Scorpio in love, one gag each.
//   0.0–3.6    "Scorpio, stop doing | *this in love.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a text "ok." and its full stop swells huge: IT'S JUST A DOT · a scoreboard ME 47 YOU 46 flips to hearts
//              · sunglasses poker face slides down to heart eyes · laced running shoes kicked off: STAYING.
//              · a secret tape, FEELINGS MIX, played out loud · hands Libra the remote: THEIR PICK TONIGHT
//              · a crystal ball that shows ???: SAY IT IN WORDS · tug of war with Aries, lets go, both laugh: BOTH WIN
//              · a match texts "same time next week?": WORTH STAYING FOR
//  37.8        "Intense. | *And worth it.*"  Scorpio comes back, big.
//  41.2        callback: "The scoreboard? | *Tied forever.*"  The board from card two returns: ♡ – ♡.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SC = '#e23d66', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'scorpio'
const SHOE = ['......KKKK.', '.....KWWWWK', '....KRRWRRK', 'KKKKRRRRRRK', 'KRRRRRRRRRK', 'KWWWWWWWWWK', 'KKKKKKKKKKK']
const SHOE_C = { K: INK, W: '#f4eee2', R: '#ff5a7a' }
const HEARTB = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

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
// a scoreboard: two panels, either scores or hearts
function scoreboard(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 120, 24, 120); x.fillRect(-200, -140, 400, 270)
  x.fillStyle = '#241a52'; x.fillRect(-190, -130, 380, 250)
  text(x, 'ME', -95, -95, 30, { col: BONE, font: MONO, w: 700 }); text(x, 'YOU', 95, -95, 30, { col: BONE, font: MONO, w: 700 })
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(s * 95 - 75, -60, 150, 150)
    x.save(); x.translate(s * 95, 15); x.scale(1, Math.max(0.02, Math.abs(Math.cos(Math.min(1, flip) * Math.PI))))
    if (flip < 0.5) text(x, s < 0 ? '47' : '46', 0, 0, 84, { col: GOLD, font: MONO, w: 700 })
    else drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, 0, 0, 13)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Stop decoding | *every full stop.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = ease.inOutCubic(prog(lt, 0.5, 1.2)), sh = 1 - ease.inOutCubic(prog(lt, 1.4, 1.7))
      if (k > 0.01) {
        x.save(); x.translate(780, 760); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -60, 320, 120); x.fillStyle = '#2a2350'; x.fillRect(-152, -52, 304, 104)
        text(x, 'ok', -30, 2, 64, { col: BONE })
        x.restore()
        const r = lerp(9, 110, g * sh) * k
        x.fillStyle = INK; x.beginPath(); x.arc(lerp(828, 800, g * sh), lerp(784, 960, g * sh), r + 6, 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.arc(lerp(828, 800, g * sh), lerp(784, 960, g * sh), r, 0, Math.PI * 2); x.fill()
      }
      label(x, 780, 1150, 'IT’S JUST A DOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop keeping score. | *Nobody’s losing.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scoreboard(x, 750, 820, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.9, 1.3))
      if (lt > 1.3) sparkles(x, t, 750, 820, P.t0 + 1.7, 8, 230, 0.4)
    } },
  { sign: S, cap: 'Drop the poker face. | *Smile back.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [0, 0], star: { x: -60 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2), slide = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy - 2 + slide * 46); x.rotate(slide * 0.12); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -30, 240, 16); x.fillRect(-116, -24, 100, 64); x.fillRect(16, -24, 100, 64)
        x.fillStyle = '#3a2f6a'; x.fillRect(-108, -16, 84, 48); x.fillRect(24, -16, 84, 48)
        x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-100, -10, 20, 8); x.fillRect(32, -10, 20, 8)
        x.restore()
      }
      // a fan of cards in front
      const c = pop01(t, P.t0 + 0.3, 0.3, 2)
      for (let i = 0; i < 3; i++) { x.save(); x.translate(720 + i * 10, 1060); x.rotate(-0.3 + i * 0.3); x.scale(c, c); x.fillStyle = INK; x.fillRect(-46, -130, 92, 130); x.fillStyle = '#f4eee2'; x.fillRect(-40, -124, 80, 118); drawBits(x, HEARTB, { H: RED, W: '#fff' }, 0, -66, 6); x.restore() }
      label(x, 540, 600, lt > 1.2 ? 'BUSTED: SMILING' : 'POKER FACE', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: lt > 1.2 ? PINK : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop leaving | *before they can.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -200 }, hops: [0.4, 1.5],
    front(x, t, lt, P) {
      const kick = ease.outCubic(prog(lt, 1.0, 1.5)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, SHOE_C, lerp(420, 760, kick), lerp(1100, 1000, kick) - Math.sin(Math.PI * kick) * 260, 14 * k, { rot: kick * 4 })
      drawBits(x, SHOE, SHOE_C, lerp(300, 860, kick), lerp(1110, 1090, kick) - Math.sin(Math.PI * kick) * 180, 14 * k, { rot: -kick * 3, sx: -1 })
      if (lt < 1.0) label(x, 760, 640, 'LACED UP. JUST IN CASE.', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      else label(x, 760, 640, 'STAYING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Stop hiding | *the love songs.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 860); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = '#3a2f6a'; x.fillRect(-172, -102, 344, 204)
        x.fillStyle = '#f4eee2'; x.fillRect(-150, -84, 300, 70); text(x, 'FEELINGS MIX', 0, -48, 30, { font: MONO, w: 700 })
        x.fillStyle = '#140c30'; x.fillRect(-110, 0, 220, 70)
        for (const s of [-1, 1]) { x.save(); x.translate(s * 60, 35); x.rotate(t * 4); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(-3, -24, 6, 12), x.rotate(Math.PI / 3); x.restore() }
        x.restore()
      }
      if (lt > 1.0) {
        const BM = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
        for (let i = 0; i < 4; i++) { const ph = ((t * 0.7 + i / 4) % 1); drawBits(x, BM, { X: i % 2 ? GOLD : PINK }, 760 + Math.sin(i * 2.3) * 140, 760 - ph * 220, 8, { alpha: Math.sin(Math.PI * ph) }) }
      }
      label(x, 780, 1110, 'PLAYING IT. OUT LOUD.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them choose | *the movie.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 940, 200 * k, { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.7] })
      const hand = ease.inOutCubic(prog(lt, 0.7, 1.3)), r = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (r > 0.01) {
        x.save(); x.translate(lerp(480, 700, hand), 1040); x.rotate(lerp(-0.3, 0.3, hand)); x.scale(r, r)
        x.fillStyle = INK; x.fillRect(-36, -90, 72, 180); x.fillStyle = '#4a4470'; x.fillRect(-28, -82, 56, 164)
        x.fillStyle = RED; x.beginPath(); x.arc(0, -52, 14, 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) x.fillRect(-18 + i * 24, -16 + j * 28, 14, 14)
        x.restore()
      }
      label(x, 700, 640, 'THEIR PICK TONIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They can’t read minds. | *Say it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -230 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, 110, 240, 70); x.fillStyle = WOOD; x.fillRect(-112, 118, 224, 54)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        const g = x.createRadialGradient(-40, -50, 10, 0, 0, 150); g.addColorStop(0, '#e8dcff'); g.addColorStop(1, '#7c5cc4')
        x.fillStyle = g; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
        text(x, '???', 0, 6 + Math.sin(t * 3) * 6, 80, { col: INK })
        x.restore()
      }
      label(x, 780, 1150, 'SAY IT IN WORDS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop fighting | *to win.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -250, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      const let_ = lt > 1.0, k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', let_ ? 860 : 830, 950, 210 * k, { mood: let_ ? 'happy' : 'squint', look: [-1, 0], seed: 22, glyph: false, squash: let_ ? 0.1 : 0, hops: let_ ? [P.t0 + 1.3] : [] })
      const pull = let_ ? 0 : Math.sin(t * 9) * 12
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = INK; x.lineWidth = 22; x.beginPath()
      if (!let_) { x.moveTo(420 + pull, 920); x.lineTo(740 + pull, 920) } else { x.moveTo(760, 920); x.quadraticCurveTo(640, 1100, 470, 1140) }
      x.stroke(); x.strokeStyle = '#e8c27a'; x.lineWidth = 12; x.stroke(); x.restore()
      if (!let_) { x.fillStyle = RED; x.fillRect(570 + pull, 900, 16, 40) }
      label(x, 600, 620, let_ ? 'BOTH WIN' : 'GRRR', pop01(t, P.t0 + (let_ ? 1.05 : 0.4), 0.3, 2.4), { size: 40, bg: let_ ? MINT : BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'You’re worth | *staying for.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headBg: MINT, lines: [['same time | next week?', pop01(t, P.t0 + 0.6, 0.3, 2.2)], ['and the week | after that?', pop01(t, P.t0 + 1.1, 0.3, 2.2)]], lineBg: SC })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 6, life: 1.5, spread: 180, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3a128', key: 'F', accent: SC, solo: S, ending: 'callback',
  title: 'Scorpio, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. | *And worth it.*', mood: 'sparkle' },
  last: {
    text: 'The scoreboard? | *Tied forever.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.5, 0.45, 1.8), b = pop01(t, t0 + 0.65, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'scorpio', 190, 1080, 210 * a, { mood: lt > 1.3 ? 'heart' : 'squint', look: [1, 0], seed: 31, hops: [t0 + 1.5] })
      if (b > 0.01) signChar(x, t, 'aries', 890, 1080, 210 * b, { mood: lt > 1.3 ? 'happy' : 'squint', look: [-1, 0], seed: 32, hops: [t0 + 1.6] })
      scoreboard(x, 540, 960, 1.15 * pop01(t, t0 + 0.3, 0.4, 1.8), prog(lt, 0.9, 1.3))
      if (lt > 1.3) { sparkles(x, t, 540, 960, t0 + 1.35, 9, 260, 0.2); hearts(x, t, 540, 900, t0 + 1.4, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 3 }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
