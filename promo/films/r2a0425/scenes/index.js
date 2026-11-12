// r2a0425: star_advice, ADVICE ROLL CALL, "What each sign | *needs less of.*" (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific "a little less of this" per sign, each with a light visual gag. Ending: lesson.
//   0.0–3.6    "What each sign | *needs less of.*"
//   3.6–49.2   ♈ less rushing · ♉ less "I'm fine" · ♊ fewer open tabs · ♋ less carrying everyone · ♌ less performing
//              · ♍ less self-editing · ♎ fewer sorrys · ♏ less guarding · ♐ running from feelings? stay a minute · ♑ less overtime
//              · ♒ less saving the world tonight · ♓ fewer sad songs (happy tears)
//  49.2        "A little less. | *A lot more peace.*"
//  52.4        LESSON: "Less isn’t lacking. | It’s *room to breathe.*"  LOAD: LIGHTER
//  58.3        "Take less on. | Keep *more you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#7dffb0'
const CASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOOOYYOOOK', 'KOOOOOOOOK', 'KOOOOOOOOK', 'KKKKKKKKKK', '.K......K.']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']

function strike(x, cx, cy, w, d, rot = -0.05) { if (d <= 0) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = RED; x.fillRect(-w / 2, -5, w * d, 10); x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'Less rushing. | *The finish line waits.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 790, 700, 'SPEED: 100', pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.04, 40, CREAM)
      strike(x, 790, 700, 240, prog(lt, 0.8, 1.1))
      L(x, 790, 880, 'SPEED: STROLL ♡', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 40)
      bubble(x, 790, 1080, 'oh, flowers!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Less “I’m fine.” | *Say what you need.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'I’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      strike(x, 790, 658, 230, prog(lt, 0.7, 1.0))
      bubble(x, 790, 900, 'a hug, | please?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
      hearts(x, t, 420, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Fewer open tabs. | *Your brain says thanks.*', mood: lt => lt < 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt < 1.1 ? 87 : 3
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: `TABS OPEN: ${n}`, headCol: lt < 1.1 ? ORANGE : MINT, lines: (lt < 1.1 ? ['fun facts…', 'zodiac quiz', 'recipe??', 'cats'] : ['one thing', 'at a time ♡']).map((s, i) => [s, lt < 1.1 ? PINK : MINT, 1, i % 2 === 1]) })
    } },
  { sign: 'cancer', cap: 'Less carrying everyone. | *Let someone hold you.*', mood: lt => lt < 1.1 ? 'squint' : 'heart', star: { x: -150, y: 40, s: 260 },
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.9, 1.5))
      const ids = ['aries', 'leo', 'gemini']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); if (k > 0.01) signChar(x, t, id, lerp(F.x, 760 + i * 70, off), lerp(F.top - 50 - i * 70, 1020 - (i % 2) * 40, off), 120 * k, { mood: 'happy', seed: 60 + i, glyph: false }) })
      L(x, 790, 640, 'LOAD: SHARED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Less performing. | *You’re loved off-stage.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', star: { x: -170 },
    back(x, t, lt, P) {
      const on = 1 - prog(lt, 0.8, 1.1)
      if (on > 0) { x.save(); x.globalAlpha = 0.35 * on; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(300, 470); x.lineTo(440, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 790, 720, lt < 1.0 ? 'SPOTLIGHT: ON' : 'SPOTLIGHT: OFF', pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.0 ? GOLD : LAV, -0.04, 36)
      bubble(x, 790, 940, 'still love | you ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Less self-editing. | *First drafts are brave.*', mood: lt => lt < 1.1 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['hi! I made', 'a thing ♡'], { w: 320, bg: CREAM, size: 40 })
      for (let i = 0; i < 3; i++) { const d = prog(lt, 0.4 + i * 0.12, 0.55 + i * 0.12) * (1 - prog(lt, 1.0, 1.2)); strike(x, 790, 800 + i * 40 - 20, 200, d, 0) }
      L(x, 790, 1080, 'DRAFT 1: SENT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Fewer sorrys. | *You did nothing wrong.*', mood: lt => lt < 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bubble(x, 700 + (i % 2) * 170, 620 + i * 110, 'sorry!', pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2) * (1 - prog(lt, 1.0 + i * 0.05, 1.2 + i * 0.05)), { size: 36, col: LAV, tail: 'bl' })
      L(x, 790, 860, 'SORRYS: 0 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 44)
    } },
  { sign: 'scorpio', cap: 'Less guarding. | *Some people are safe.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ks = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (ks > 0.01) signChar(x, t, 'cancer', 800, 980, 180 * ks, { mood: 'heart', look: [-1, 0], seed: 24, glyph: false })
      L(x, 790, 680, 'TRUST: GROWING', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 36)
      hearts(x, t, 600, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'Running from feelings? | *Stay a minute.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const down = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.1)) : prog(lt, 0.6, 1.1)
      drawBits(x, CASE, { K: '#8a4a2e', O: ORANGE, Y: GOLD }, 790, lerp(820, 990, down), 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'STAYING ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 44)
    } },
  { sign: 'capricorn', cap: 'Less overtime. | *The work will wait.*', mood: lt => lt < 1.0 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.8, 1.2))
      drawBits(x, LAPTOP, { K: INK, S: SKYB, G: GREY }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(1, 0.25, shut) })
      L(x, 790, 680, lt < 1.0 ? '9:47 PM' : 'LOGGED OFF ♡', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.0 ? BONE : MINT, -0.04, 40)
    } },
  { sign: 'aquarius', cap: 'Saving the world? | *Rest first.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['TO DO:', 'save world', 'NAP ♡'], { w: 300, bg: '#ffe27a', size: 40 })
      strike(x, 790, 820, 210, prog(lt, 0.8, 1.1), 0)
      L(x, 790, 1080, 'WORLD: TOMORROW', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Fewer sad songs. | *Maybe one happy one.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: lt => lt < 1.1 ? 3 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: lt < 1.1 ? SKYB : GOLD, alpha: clamp(lt * 2), seed: 3 })
      L(x, 790, 660, lt < 1.1 ? 'PLAYLIST: SOB' : 'PLAYLIST: SUNNY', pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.1 ? LAV : GOLD, -0.04, 38)
      L(x, 790, 1100, 'HAPPY TEARS ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0425', key: 'G', accent: ACC, ending: 'lesson',
  title: 'What each sign | *needs less of.*',
  cameos: CAMEOS,
  group: { cap: 'A little less. | *A lot more peace.*', moods: ['happy', 'heart', 'happy', 'heart', 'heart', 'sparkle', 'happy', 'happy', 'heart', 'happy', 'sleepy', 'heart'] },
  lesson: { text: 'Less isn’t lacking. | It’s *room to breathe.*', chip: 'LOAD: LIGHTER' },
  last: {
    text: 'Take less on. | Keep *more you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 9 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
