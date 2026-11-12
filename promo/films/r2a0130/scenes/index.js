// r2a0130: star_advice, ADVICE ROLLCALL, "Each sign | after a big win." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific line each for after a big win, one light gag each.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ pause before the next race · ♉ treat yourself, the good one · ♊ tell everyone, then tell yourself
//              · ♋ call home, they're so proud · ♌ take the bow, thank the crew · ♍ stop fixing it, it's great
//              · ♎ just say thanks, not "it was luck" · ♏ let people see you're happy · ♐ stay a minute, the view is yours
//              · ♑ close the laptop, celebrate tonight · ♒ share the credit, keep some · ♓ happy tears count
//  49.2        "Twelve signs. | *One big win.*"
//  52.4        LESSON: "You did that. | *Let it land.*"  WIN: SAVOURED
//  58.3        "Victory lap? | *Take the slow one.*"  A trophy, glittering.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const TROPHY = ['GG.GGGGGG.GG', 'G.GGGGGGGG.G', 'G.GGgGGGGG.G', '.GGGgGGGGGG.', '..GGGGGGGG..', '....GGGG....', '.....GG.....', '.....GG.....', '...GGGGGG...', '..BBBBBBBB..', '..BBBBBBBB..']
const TROPHY_C = { G: GOLD, g: '#fff1b0', B: BROWN }
const CAKE = ['....F....', '....W....', 'PPPPPPPPP', 'WWWWWWWWW', 'PWPWPWPWP', 'WWWWWWWWW']
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK }
const FLAG = ['KRRRRR', 'KRRRRR', 'KRRRR.', 'K.....', 'K.....', 'K.....']
function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, 0, 260, 26); x.fillStyle = '#9aa5c4'; x.fillRect(-124, 4, 248, 16)
  const h = lerp(170, 8, close)
  x.fillStyle = INK; x.fillRect(-114, -h - 6, 228, h + 6); x.fillStyle = '#2a2350'; x.fillRect(-106, -h, 212, h - 4)
  if (close < 0.5) { x.fillStyle = SKYB; for (let i = 0; i < 4; i++) x.fillRect(-90, -h + 22 + i * 30, 150 - i * 20, 12) }
  x.restore()
}
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Next race? | *Enjoy this one first.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', star: { x: -190 }, hops: [0.4],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 640, 'NEXT GOAL: LATER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.5, 7, 180, 0.3)
    } },
  { sign: 'taurus', cap: 'Treat yourself. | *The good one.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 26 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 800, 1100, 'EARNED: FULLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 6, 160, 0.4)
    } },
  { sign: 'gemini', cap: 'Told everyone? | Now *tell yourself.*', mood: lt => lt < 1.3 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.25) + 1)
      if (lt < 1.3) for (let i = 0; i < n; i++) bubble(x, 700 + (i % 2) * 170, 640 + Math.floor(i / 2) * 140, 'I WON!!', pop01(t, P.t0 + 0.2 + i * 0.25, 0.22, 2.2), { size: 34, col: [GOLD, SKYB, MINT, PINK][i], tail: i % 2 ? 'br' : 'bl' })
      else bubble(x, 790, 760, 'hey, me: | proud of you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
      label(x, 790, 1100, 'SENT TO: YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Call home. | *They’re so proud.*', mood: 'heart', tears: lt => lt > 1.2 ? 1 : 0, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 800, 860, 220, 380, '#2a2350', pop01(t, P.t0 + 0.2, 0.3, 2), 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-94, -160, 188, 300)
        x.fillStyle = MINT; x.beginPath(); x.arc(0, 60, 40, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOME', 0, -80)
        x.restore()
      }
      bubble(x, 800, 620, 'WE KNEW IT!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 800, 1110, 'HAPPY TEARS: BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Take the bow. | Then *thank the crew.*', mood: 'sparkle', star: { x: -190 }, hops: [0.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#ffe7a8'; x.beginPath(); x.moveTo(300, 470); x.lineTo(440, 470); x.lineTo(560, 1060); x.lineTo(180, 1060); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) for (let i = 0; i < 3; i++) signChar(x, t, ['virgo', 'capricorn', 'taurus'][i], 680 + i * 120, 990, 110 * k, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 50 + i, glyph: false })
      bubble(x, 800, 680, 'thank you, | team!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Stop fixing it. | *It’s already great.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 800, 850, 300, 320, CREAM, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04)) {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE WIN', 0, -110)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 5; i++) x.fillRect(-110, -60 + i * 40, 220 - (i * 33) % 70, 12)
        x.fillStyle = MINT; x.fillRect(-80, 110, 160, 34)
        x.restore()
      }
      label(x, 800, 620, lt < 1.2 ? 'EDIT #38…' : 'EDITS: DONE', pop01(t, P.t0 + (lt < 1.2 ? 0.5 : 1.2), 0.3, 2.4), { size: 34, bg: lt < 1.2 ? GOLD : MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Just say thanks. | Not *“it was luck.”*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'congrats!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      if (lt < 1.2) bubble(x, 800, 880, 'oh it was | just luck…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      else bubble(x, 800, 880, 'thank you! | i worked hard.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 800, 1110, 'CREDIT: TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Let people see | *you’re happy.*', mood: lt => lt < 1.3 ? 'neutral' : 'heart', look: lt => lt < 1.3 ? [0, 0] : [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 800, 700, lt < 1.3 ? 'POKER FACE: ON' : 'POKER FACE: OFF', pop01(t, P.t0 + (lt < 1.3 ? 0.2 : 1.3), 0.3, 2.4), { size: 34, bg: lt < 1.3 ? '#9aa5c4' : '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) { bubble(x, 800, 900, 'i’m SO | happy', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' }); hearts(x, t, 400, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 }) }
    } },
  { sign: 'sagittarius', cap: 'Stay a minute. | *The view is yours.*', mood: 'sparkle', look: [1, -1], star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(810, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-190, 170); x.lineTo(0, -150); x.lineTo(190, 170); x.fill()
        x.fillStyle = '#7d86a8'; x.beginPath(); x.moveTo(-172, 160); x.lineTo(0, -132); x.lineTo(172, 160); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.moveTo(0, -132); x.lineTo(-40, -64); x.lineTo(40, -64); x.fill()
        x.restore()
      }
      drawBits(x, FLAG, { K: INK, R: RED }, 836, 700, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      label(x, 800, 1120, 'ROUTE NEXT: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Close the laptop. | *Celebrate tonight.*', mood: lt => lt < 1.1 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      laptop(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.1)))
      if (lt > 1.1) confetti(x, t, 800, 820, P.t0 + 1.1, { n: 16, spread: 160, h: 420 })
      label(x, 800, 1110, 'INBOX: TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Share the credit. | *Keep some too.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 690, 1090, 'TEAM: HALF', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 1150, 'ME: HALF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears count. | *Let them flow.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 230 * ease.outCubic(prog(lt, 0.6, 2.0)); x.beginPath(); x.ellipse(400, 1130, pw, 24, 0, 0, Math.PI * 2); x.fill()
      label(x, 800, 640, 'PROUD (SOGGY)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0130', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'Each sign | *after a big win.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One big win.*' },
  lesson: { text: 'You did that. | *Let it land.*', chip: 'WIN: SAVOURED' },
  last: {
    text: 'Victory lap? | *Take the slow one.*',
    draw(x, t, lt) {
      drawBits(x, TROPHY, TROPHY_C, 540, 700, 22 * pop01(t, t - lt + 0.5, 0.4, 2))
      sparkles(x, t, 540, 680, t - lt + 0.9, 8, 220, 0.2)
      confetti(x, t, 540, 640, t - lt + 0.8, { n: 20, spread: 360, h: 420 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
