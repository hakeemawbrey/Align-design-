// v3a122: star_advice, ADVICE SOLO, "What Scorpios need | in love." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Scorpio needs in love, a warm reframe each, one gag each.
//   0.0–3.6    "What Scorpios | need *in love.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              Gemini confesses "I ate your last fry", Scorpio swoons: HONESTY: HOT · a deep question, a diving mask:
//              DEEP END ONLY · a little vault opens a crack, a heart inside: ACCESS: PENDING · a padlocked diary:
//              PRIVATE, NOT SHADY · a heart too big to carry, Taurus catches it: "got it!" · hugs a plush bunny: SECRETLY SOFT
//              · sets down a heavy GRUDGES backpack · a shield that says YOURS · a match notification: ALL IN, BOTH WAYS
//  37.8        "Deep water. | *Warm heart.*"  Scorpio comes back, big.
//  41.2        callback: "Gemini ate the fry. | *Still loved.*"  The empty fries box returns, Gemini and Scorpio, hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SC = '#ff5a7a', RED = '#e23d4e', STEEL = '#9aa3c7'
const S = 'scorpio'

// ── props
const FRIES = ['.F.F..F.', '.F.FF.F.', 'RRRRRRRR', 'RRRYYRRR', 'RRYRRYRR', '.RRRRRR.', '.RRRRRR.', '..RRRR..']
const FRIES_C = { F: GOLD, R: RED, Y: GOLD }
const EMPTY = ['........', '........', 'RRRRRRRR', 'RRRYYRRR', 'RRYRRYRR', '.RRRRRR.', '.RRRRRR.', '..RRRR..']
const BUNNY = ['.W...W.', '.WP.PW.', '.WP.PW.', 'WWWWWWW', 'WKWWWKW', 'WWWPWWW', '.WWWWW.', 'WWWWWWW', 'WWWWWWW', '.WW.WW.']
const BUNNY_C = { W: '#f4eee2', P: PINK, K: INK }
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
// a small safe/vault whose door swings open a crack
function vault(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#5b5f86'; x.fillRect(-140, -140, 280, 280)
  x.fillStyle = '#140c30'; x.fillRect(-120, -120, 240, 240)
  drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, 0, 0, 16 * clamp(open * 2))
  // the door, hinged on the left, narrows as it opens
  const w = lerp(240, 150, open)
  x.fillStyle = INK; x.fillRect(-124, -124, w + 8, 248); x.fillStyle = STEEL; x.fillRect(-120, -120, w, 240)
  x.fillStyle = INK; x.beginPath(); x.arc(-120 + w * 0.5, 0, 40 * (w / 240), 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-120 + w * 0.5, 0, 30 * (w / 240), 0, Math.PI * 2); x.fill()
  x.restore()
}
// a padlocked diary
function diary(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -146, 256, 312)
  x.fillStyle = INK; x.fillRect(-134, -160, 268, 320); x.fillStyle = '#7a2f6b'; x.fillRect(-126, -152, 252, 304)
  x.fillStyle = '#f4eee2'; x.fillRect(110, -146, 14, 292)
  x.fillStyle = GOLD; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DIARY', -10, -90)
  x.fillText('♏︎', -10, -40)
  x.fillStyle = INK; x.fillRect(80, 10, 80, 80); x.fillStyle = GOLD; x.fillRect(86, 16, 68, 68)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(120, 10, 24, Math.PI, 0); x.stroke()
  x.fillStyle = INK; x.fillRect(115, 38, 10, 24)
  x.restore()
}
// a heavy backpack labelled GRUDGES
function pack(x, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -130, 240, 260); x.fillStyle = '#6b5a3e'; x.fillRect(-112, -122, 224, 244)
  x.fillStyle = INK; x.fillRect(-80, -170, 160, 50); x.fillStyle = '#6b5a3e'; x.fillRect(-72, -162, 144, 38)
  x.fillStyle = '#4a3d29'; x.fillRect(-90, 10, 180, 90)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGES', 0, -60)
  x.font = `700 22px ${MONO}`; x.fillText('(SINCE 2016)', 0, -26)
  x.restore()
}
// a shield with a heart and YOURS
function shield(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const sh = (o, c) => { x.fillStyle = c; x.beginPath(); x.moveTo(-130 - o, -150 - o); x.lineTo(130 + o, -150 - o); x.lineTo(130 + o, 10); x.quadraticCurveTo(100 + o, 120 + o, 0, 170 + o); x.quadraticCurveTo(-100 - o, 120 + o, -130 - o, 10); x.closePath(); x.fill() }
  sh(8, INK); sh(0, SC); sh(-18, '#7a1f38')
  drawBits(x, HEARTB, { H: '#ffd0dc', W: '#fff' }, 0, -30, 14)
  x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOURS', 0, 80)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Honesty, even | *the small stuff.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 950, 200 * k, { mood: lt > 1.4 ? 'happy' : 'wink', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.9] })
      drawBits(x, EMPTY, FRIES_C, 900, 1110, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 760, 620, 'I ate your | last fry.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 420, 1140, 'HONESTY: HOT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip the small talk. | *Go deep.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P, F) {
      // a diving mask on the star's eyes
      const m = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (m > 0.01) {
        x.save(); x.translate(F.x, F.cy - 4); x.scale(m, m)
        x.fillStyle = INK; x.fillRect(-120, -48, 240, 96); x.fillStyle = 'rgba(143,227,255,0.45)'; x.fillRect(-108, -38, 216, 76)
        x.fillStyle = '#ffd34d'; x.fillRect(-150, -14, 30, 20); x.fillRect(120, -14, 30, 20)
        x.fillStyle = INK; x.fillRect(110, -120, 22, 90); x.fillStyle = '#ff9a3c'; x.fillRect(114, -116, 14, 80)
        x.restore()
      }
      bubble(x, 760, 640, 'what do you | dream about?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      for (let i = 0; i < 5; i++) { const ph = ((t * 0.9 + i / 5) % 1); x.fillStyle = 'rgba(190,235,255,0.7)'; x.beginPath(); x.arc(700 + i * 40 + Math.sin(ph * 6 + i) * 10, 1100 - ph * 260, 10 + i * 2, 0, Math.PI * 2); x.fill() }
      label(x, 800, 1000, 'DEEP END ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trust takes time. | *That’s allowed.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 1.8), ease.inOutCubic(prog(lt, 0.9, 1.6)))
      label(x, 790, 1110, lt > 1.6 ? 'ACCESS: GRANTED' : 'ACCESS: PENDING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: lt > 1.6 ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Private isn’t | *a red flag.*', mood: 'wink', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      diary(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'PRIVATE. NOT SHADY.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big feelings? | Find one *who stays.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -240, s: 260 }, hops: [0.6],
    front(x, t, lt, P) {
      const grow = ease.outCubic(prog(lt, 0.2, 1.0)), move = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, lerp(500, 660, move), lerp(820, 790, move) + Math.sin(t * 4) * 6, lerp(8, 40, grow) * pop01(t, P.t0 + 0.2, 0.3, 1.6))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 840, 1000, 190 * k, { mood: lt > 1.6 ? 'happy' : 'wide', look: [-1, -1], seed: 22, glyph: false, hops: [P.t0 + 2.0] })
      bubble(x, 860, 1150 - 0, 'got it!', pop01(t, P.t0 + 2.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Let them see | *the soft side.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [0, 1], star: { x: -60 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BUNNY, BUNNY_C, 660, 1050, 16 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: 0.1 })
      label(x, 760, 600, 'SECRETLY SOFT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      hearts(x, t, 600, 940, P.t0 + 1.5, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Old grudges are heavy. | *Set one down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    squash: lt => lt < 1.2 ? 0.12 : 0, hops: [1.3],
    front(x, t, lt, P) {
      const drop = ease.inOutCubic(prog(lt, 1.0, 1.3))
      pack(x, lerp(560, 780, drop), lerp(820, 1040, drop), pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lerp(-0.2, 0.05, drop))
      if (lt > 1.3) sparkles(x, t, 320, 840, P.t0 + 1.75, 7, 170, 0.5)
      label(x, 360, 580, lt > 1.3 ? 'SO MUCH LIGHTER' : 'OOF', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your loyalty | is *a superpower.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      shield(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 0.7, 8, 220, 0.2)
      label(x, 790, 1130, 'ON YOUR SIDE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Find someone | *all in.* Like you.', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ IT’S A MATCH', headBg: MINT, lines: [['all in.', pop01(t, P.t0 + 0.7, 0.3, 2.2)], ['same. | all in.', pop01(t, P.t0 + 1.2, 0.3, 2.2)]], lineBg: SC, ink: INK })
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 6, life: 1.5, spread: 180, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3a122', key: 'E', accent: SC, solo: S, ending: 'callback',
  title: 'What Scorpios | need *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Deep water. | *Warm heart.*', mood: 'sparkle' },
  last: {
    text: 'Gemini ate the fry. | *Still loved.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.3, 0.45, 1.8), b = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'scorpio', 400, 1000, 260 * a, { mood: lt > 1.6 ? 'heart' : 'squint', look: [1, 0], seed: 31, hops: [t0 + 1.6] })
      if (b > 0.01) signChar(x, t, 'gemini', 700, 1000, 230 * b, { mood: lt > 1.6 ? 'happy' : 'wink', look: [-1, 0], seed: 32, hops: [t0 + 1.7] })
      drawBits(x, EMPTY, FRIES_C, 550, 1210, 20 * pop01(t, t0 + 0.9, 0.3, 2))
      hearts(x, t, 550, 900, t0 + 1.6, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
