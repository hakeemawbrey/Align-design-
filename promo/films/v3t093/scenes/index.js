// v3t093: THE SIGNS AS… v3, "Mysterious zodiacs | be like." (~57 s vertical, signs3kit social cut, lofi · E)
// Twelve signs try (and mostly fail) to be mysterious. Ending: 'callback' (Taurus, still "brooding").
//   0.0–3.6    "Mysterious zodiacs | *be like.*"
//   3.6–49.2   ♈ mysterious for nine seconds · ♉ dark glasses, fell asleep · ♊ kept one secret, told everyone
//              · ♋ a black cloak, hand-knitted by mom · ♌ announced it · ♍ a to-do list for being mysterious
//              · ♎ couldn't pick a mysterious outfit (black or black) · ♏ didn't try, still the most mysterious
//              · ♐ left without a word, came back for snacks · ♑ bio "mysterious", attached a résumé
//              · ♒ spoke in riddles, forgot the answers · ♓ a mysterious gaze, leaking
//  49.2        "Nobody | *pulled it off.*"
//  52.6        callback: "Taurus? | Still *“brooding.”*"  The sunglasses star is back, fast asleep.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CLOAK = [
  '....KKKK....',
  '...KKKKKK...',
  '..KKPKKPKK..',
  '..KKKKKKKK..',
  '.KKPKKKKPKK.',
  '.KKKKKKKKKK.',
  'KKPKKKKKKPKK',
  'KKKKKKKKKKKK',
  'KPKKPKKPKKPK',
]
const CLOAK_C = { K: '#2a2350', P: '#ff8fb1' }
const CHIPS = [
  '.YYYYYY.',
  'YRRRRRRY',
  'YRWWWWRY',
  'YRWOOWRY',
  'YRRRRRRY',
  'YRRRRRRY',
  '.YYYYYY.',
]
const CHIPS_C = { Y: GOLD, R: '#e23d4e', W: '#fff4e2', O: '#ffb34a' }

// dark glasses drawn on the star's face (sprite cells)
function shades(x, F) {
  inSprite(x, F, () => {
    x.fillStyle = INK; x.fillRect(6.5, 16, 10, 6.5); x.fillRect(19.5, 16, 10, 6.5); x.fillRect(16, 17, 4, 1.4)
    x.fillStyle = '#ffffff'; x.globalAlpha = 0.5; x.fillRect(8, 17.2, 2.5, 1.2); x.fillRect(21, 17.2, 2.5, 1.2)
  })
}
const Z = (x, t, cx, cy) => { for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${40 + i * 10}px ${INTER}`; x.fillText('z', cx + ph * 60 + i * 20, cy - ph * 140); x.restore() } }
// soft drifting fog
function fog(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save()
  for (let i = 0; i < 9; i++) {
    const px = cx + Math.sin(t * 0.6 + i * 1.7) * 260, py = cy + Math.cos(t * 0.4 + i) * 60 + (i % 3) * 40
    x.globalAlpha = 0.16 * k; x.fillStyle = '#d8d0ff'; x.beginPath(); x.ellipse(px, py, 170, 50, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
// a checklist on a clipboard
function checklist(x, cx, cy, k, lt, items) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -170, 320, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-152, -162, 304, 324)
  x.fillStyle = '#6b62a8'; x.fillRect(-50, -184, 100, 34)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.font = `800 28px ${INTER}`; x.fillText('BE MYSTERIOUS', -130, -120)
  x.font = `700 24px ${MONO}`
  items.forEach((s, i) => {
    const y = -64 + i * 54
    x.fillStyle = INK; x.fillRect(-130, y - 14, 28, 28); x.fillStyle = '#fff4e2'; x.fillRect(-126, y - 10, 20, 20)
    if (lt > 0.6 + i * 0.35) { x.fillStyle = '#2fc79a'; x.fillRect(-124, y - 8, 16, 16) }
    x.fillStyle = INK; x.fillText(s, -90, y)
  })
  x.restore()
}
// a dating-style profile card with a résumé stapled on
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -180, 300, 360)
  x.fillStyle = '#2a2350'; x.fillRect(-142, -172, 284, 344)
  x.fillStyle = '#7dffb0'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♑︎ CAPRICORN', 0, -136)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText('bio: “mysterious”', 0, -84)
  const r = ease.outBack ? clamp(prog(lt, 0.9, 1.2)) : 0
  if (r > 0) {
    x.save(); x.translate(10, 50); x.rotate(0.08); x.scale(r, r)
    x.fillStyle = INK; x.fillRect(-114, -96, 228, 200); x.fillStyle = '#fff4e2'; x.fillRect(-108, -90, 216, 188)
    x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('RÉSUMÉ', 0, -58)
    x.fillStyle = '#9aa5c4'; for (let i = 0; i < 5; i++) x.fillRect(-84, -24 + i * 22, 168 - (i % 2) * 40, 10)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Mysterious for | *nine seconds.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 660, `TIMER: 0:0${Math.min(9, Math.floor(lt * 7))}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04 })
      bubble(x, 790, 900, 'OK FINE, | here’s everything', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Wore dark glasses. | *Fell asleep.*', mood: 'sleepy', star: { x: -40 },
    front(x, t, lt, P, F) {
      if (P.k > 0.5) shades(x, F)
      if (lt > 1.0) Z(x, t, 700, 680)
      label(x, 760, 1080, 'BROODING (ASLEEP)', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: LAV, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Kept one secret. | Told *everyone.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'don’t tell, but | my rising sign—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 880, 'TOLD: 41 PEOPLE', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Wore a dark cloak. | *Mom knitted it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CLOAK, CLOAK_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 680, 'MADE WITH LOVE', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: PINK, rot: -0.05 })
    } },
  { sign: 'leo', cap: 'Played it cool. | *Announced it.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'I AM BEING | MYSTERIOUS', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 920, 'VOLUME: MAX', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 400, 860, P.t0 + 0.6, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Made a to-do list | for *being mysterious.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { checklist(x, 780, 850, pop01(t, P.t0 + 0.25, 0.35, 2), lt, ['sigh', 'look away', 'be vague', 'stop listing']) } },
  { sign: 'libra', cap: 'The black outfit | or *the black outfit?*', mood: 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      for (const [i, px] of [[0, 700], [1, 880]]) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        drawBits(x, ['.KK.KK.', 'KKKKKKK', '.KKKKK.', '.KKKKK.', '.KKKKK.', '.KKKKK.'], { K: '#140c30' }, px, 880, 22 * k, { outline: BONE })
      }
      label(x, 790, 690, `LOOK ${11 + Math.floor(lt * 3)}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Didn’t try. | Still *the most mysterious.*', mood: 'neutral', look: [1, 0], star: { x: 0 },
    back(x, t, lt, P) { fog(x, t, 540, 1020, ease.outCubic(prog(lt, 0.2, 1.0))) },
    front(x, t, lt, P) { fog(x, t, 540, 960, 0.8 * ease.outCubic(prog(lt, 0.4, 1.2))); label(x, 800, 640, '???', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 48, bg: LAV, rot: 0.06 }) } },
  { sign: 'sagittarius', cap: 'Left without a word. | Came back *for snacks.*', mood: 'sparkle', star: { x: 150 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 310, 880, 24 * pop01(t, P.t0 + 1.0, 0.35, 2), { rot: -0.08 })
      bubble(x, 310, 660, 'forgot these', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Bio: “mysterious.” | Attached *a résumé.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { profile(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Spoke in riddles. | *Forgot the answers.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'what has keys | but no doors?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      bubble(x, 800, 900, '…no idea', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'A mysterious gaze. | *Leaking.*', mood: lt => lt < 0.9 ? 'squint' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'MYSTERY: DAMP', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 960, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t093', key: 'E', accent: '#c9a6ff', ending: 'callback',
  title: 'Mysterious zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *pulled it off.*' },
  last: {
    text: 'Taurus? | Still *“brooding.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      const F = signChar(x, t, 'taurus', 540, 1080, 360, { mood: 'sleepy', pop: k, seed: 9 })
      if (k > 0.6) shades(x, F)
      if (lt > 0.9) Z(x, t, 700, 850)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
