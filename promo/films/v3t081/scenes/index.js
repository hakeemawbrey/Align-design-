// v3t081: THE SIGNS AS… v3, SOLO film, "Dating a Sagittarius | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Sagittarius version.
//   0.0–3.6    "Dating a Sagittarius | *be like.*"  One big Sag pops in, then the cards start.
//   3.6–37.8   nine cards: first date, booked a flight · went out for milk, came back tanned · "do I look okay?" honestly
//              · moved in with one backpack · met your parents, debated your dad · profile: catch me if you can
//              · anniversary call from a mountain · "where are we going?" "yes." · "what are we?" two tickets
//  37.8        "Never boring. | *Never home.*"
//  41.2        callback: "And the milk? | *Next Tuesday.*" with the milk carton and the sun back on screen.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#b98cff', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', ORANGE = '#ffb34a'

const PLANE = [
  '......WW......',
  '......WWW.....',
  'R.....WWWW....',
  'RR..WWWWWWWWW.',
  'RRWWWWWWWWWWWW',
  'RR..WWWWWWWWW.',
  'R.....WWWW....',
  '......WWW.....',
  '......WW......',
]
const PLANE_C = { W: '#fff4e2', R: RED }
const MILK = [
  '..KKKK..',
  '.KWWWWK.',
  'KWWWWWWK',
  'BBBBBBBB',
  'BWWWWWWB',
  'BWSSSSWB',
  'BWSWWSWB',
  'BWSSSSWB',
  'BWWWWWWB',
  'BWWWWWWB',
  'BBBBBBBB',
]
const MILK_C = { K: '#d8dbe8', W: '#fff4e2', B: SKYB, S: '#3fb6f0' }
const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....OOOOO....',
  'Y..OOOOOOO..Y',
  '...OOOOOOO...',
  '...OOOOOOO...',
  'Y..OOOOOOO..Y',
  '....OOOOO....',
  '.Y.........Y.',
  '...Y..Y..Y...',
]
const SUN_C = { Y: GOLD, O: ORANGE }
const PACK = [
  '...KKKK...',
  '..K....K..',
  '.PPPPPPPP.',
  'PPPPPPPPPP',
  'PPPPPPPPPP',
  'PPYYYYYYPP',
  'PPYPPPPYPP',
  'PPYYYYYYPP',
  'PPPPPPPPPP',
  'PPPPPPPPPP',
  '.PPPPPPPP.',
]
const PACK_C = { K: '#6b62a8', P: '#a35cf0', Y: GOLD }
const MOUNT = [
  '.......R.......',
  '.......RR......',
  '.......K.......',
  '......WWW......',
  '.....WWWWW.....',
  '....GGWWWGG....',
  '...GGGGGGGGG...',
  '..GGGGGGGGGGG..',
  '.GGGGGGGGGGGGG.',
  'GGGGGGGGGGGGGGG',
]
const MOUNT_C = { R: RED, K: INK, W: '#fff4e2', G: '#6b62a8' }

// a compass whose needle never settles
function compass(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 156, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 146, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -96); x.fillText('S', 0, 96); x.fillText('E', 96, 0); x.fillText('W', -96, 0)
  x.rotate(t * 9 + Math.sin(t * 5) * 2)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -84); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 84); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a boarding pass
function ticket(x, cx, cy, k, { rot = -0.05, text = 'GATE 12 · NOW', w = 330, col = '#fff4e2' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -82, w, 180)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -96, w + 12, 192)
  x.fillStyle = col; x.fillRect(-w / 2, -90, w, 180)
  x.fillStyle = '#a35cf0'; x.fillRect(-w / 2, -90, w, 46)
  x.fillStyle = '#fff4e2'; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', 0, -66)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText(text, 0, 0)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 14; i++) x.fillRect(-w / 2 + 24 + i * ((w - 48) / 14), 40, (i % 3) + 3, 34)
  x.restore()
}
// a dating-profile card with a blurred, running-away photo
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -190, 300, 400)
  x.fillStyle = INK; x.fillRect(-152, -204, 304, 408)
  x.fillStyle = '#fff4e2'; x.fillRect(-144, -196, 288, 392)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -176, 248, 230)
  x.restore()
  // the star in the photo, sliding out of frame
  const run = clamp((lt - 0.6) / 1.2)
  x.save(); x.beginPath(); x.rect(cx - 124 * k, cy - 176 * k, 248 * k, 230 * k); x.clip()
  for (let i = 3; i >= 0; i--) {
    x.globalAlpha = i ? 0.18 : 1
    signChar(x, t, 'sagittarius', cx + (lerp(0, 190, ease.inCubic(run)) - i * 26) * k, cy - 50 * k, 150 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.3 })
  }
  x.restore()
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♐︎ SAG, 27', 0, 92)
  x.fillStyle = '#6b62a8'; x.font = `700 22px ${MONO}`; x.fillText('“catch me if', 0, 138); x.fillText('you can”', 0, 166)
  x.restore()
}

const CAMEOS = [
  { sign: 'sagittarius', cap: 'First date? | Booked *a flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 1.4, 2.4))
      drawBits(x, PLANE, PLANE_C, 790 + fly * 260, 680 - fly * 120, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.18 })
      ticket(x, 790, 940, pop01(t, P.t0 + 0.6, 0.35, 2), { text: 'GATE 12 · NOW' })
      bubble(x, 390, 600, 'dessert in paris?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Went out for milk. | Came back *tanned.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.2],
    back(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 800, 660, 18 * pop01(t, P.t0 + 0.9, 0.35, 2), { rot: t * 0.3 })
    },
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1120, 'GONE: 6 DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Do I look okay?” | “*Honestly?* No.”', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 950, 230 * k, { mood: lt > 1.2 ? 'wide' : 'sparkle', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 800, 650, 'do i look okay?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'br' })
      bubble(x, 380, 600, 'honestly? no.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 800, 1170, 'BUT CUTE.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Moved in together. | Brought *one backpack.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1110, 'EVERYTHING I OWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Met your parents. | *Debated* your dad.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 960, 240 * k, { mood: lt > 1.4 ? 'squint' : 'neutral', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 390, 600, 'but what IS time?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 680, 'HOUR 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Their dating profile: | “*Catch me* if you can.”', mood: 'wink', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 1110, 'LAST SEEN: AIRPORT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Anniversary call. | From *a mountain.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -190, y: 40 }, hops: [1.0],
    back(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 780, 880, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 800, 600, 'happy 1 year!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1130, 'SIGNAL: 1 BAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 520, 780, P.t0 + 1.0, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'sagittarius', cap: '“Where are we going?” | “*Yes.*”', mood: 'sparkle', star: { x: -190 }, hops: [0.5, 1.1, 1.7],
    front(x, t, lt, P) {
      compass(x, t, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2), lt)
      bubble(x, 380, 600, 'yes.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 48, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Asked “what are we?” | Sag *booked two seats.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'what are we?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      ticket(x, 780, 870, pop01(t, P.t0 + 0.9, 0.35, 2), { text: 'SEAT 14A', w: 280, rot: -0.08 })
      ticket(x, 820, 1010, pop01(t, P.t0 + 1.2, 0.35, 2), { text: 'SEAT 14B', w: 280, rot: 0.06 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t081', key: 'C', accent: PURPLE, solo: 'sagittarius', ending: 'callback',
  title: 'Dating a Sagittarius | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never boring. | *Never home.*', mood: 'sparkle' },
  last: {
    text: 'And the milk? | *Next Tuesday.*',
    draw(x, t, lt) {
      drawBits(x, SUN, SUN_C, 700, 1000, 20 * pop01(t, t - lt + 0.5, 0.4, 2), { rot: t * 0.3 })
      drawBits(x, MILK, MILK_C, 540, 1120, 26 * pop01(t, t - lt + 0.3, 0.35, 2), { rot: -0.08 + 0.05 * Math.sin(t * 3) })
      label(x, 540, 1360, 'ON ITS WAY', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
