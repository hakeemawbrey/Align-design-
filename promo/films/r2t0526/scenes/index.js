// r2t0526: star_talk, SOLO, "Virgos packing | *a suitcase.*" (~47 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a Virgo packs for a trip, every step pushed to the extreme.
// Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   list version fourteen · socks colour-coded · snacks labelled by day · a backup toothbrush (and its backup)
//              · weighed it five times · unpacked to start over · checked the travel buddy's chart
//              · an itinerary with "relax" pencilled in · fixed your suitcase too
//  37.8        "Ready to go. | *Since March.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', TEAL = '#2fc79a', ORANGE = '#ffb34a'

/** a paper sheet / clipboard with a header strip and rows of text, drawn at k */
function sheet(x, cx, cy, k, { head = '', headCol = MINT, rows = [], w = 330, rowH = 62, rot = 0.04, clip = true, size = 30 } = {}) {
  if (k <= 0.01) return
  const h = 90 + rows.length * rowH + 20
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (clip) { x.fillStyle = SLATE; x.fillRect(-50, -h / 2 - 18, 100, 30); x.fillStyle = INK; x.fillRect(-50, -h / 2 + 8, 100, 4) }
  x.fillStyle = headCol; x.fillRect(-w / 2 + 14, -h / 2 + 18, w - 28, 54)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 46)
  x.textAlign = 'left'
  rows.forEach(([txt, kk, tick], i) => {
    if (kk <= 0.01) return
    const ry = -h / 2 + 90 + i * rowH + rowH / 2
    x.globalAlpha = clamp(kk)
    x.fillStyle = INK; x.fillRect(-w / 2 + 22, ry - 14, 28, 28); x.fillStyle = CREAM; x.fillRect(-w / 2 + 26, ry - 10, 20, 20)
    if (tick) { x.fillStyle = TEAL; x.fillRect(-w / 2 + 28, ry - 8, 16, 16) }
    x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.fillText(txt, -w / 2 + 64, ry + 2)
    x.globalAlpha = 1
  })
  x.restore()
}

const SOCK = ['.CCCCCC.', 'CCWWWWCC', 'CWCCCCWC', 'CWCCCCWC', 'CCWWWWCC', '.CCCCCC.']
const TOOTH = ['..WWW', '..WWW', '..BB.', '..BB.', '..BB.', '..BB.', '..BB.', '..BB.', '..BB.', '..BB.']
const BAG = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSYYSSOOSK', 'KSYYSSOOSK', 'KSSSSSSSSK', 'KSOOSSYYSK', 'KSOOSSYYSK', 'KSSSSSSSSK', 'KKKKKKKKKK']
const CASE = [
  '....KKKKKK....',
  '....K....K....',
  'KKKKKKKKKKKKKK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KYYYYYYYYYYYYK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KKKKKKKKKKKKKK',
  '.KK........KK.',
]
const MESS = [
  '..P...G..W....',
  '.PPP.GGG.WW.O.',
  'KKKKKKKKKKKKKK',
  'KPWGOPPGWOGPWK',
  'KGOPWGOWPGOWPK',
  'KWPGOPWGOPWGOK',
  'KKKKKKKKKKKKKK',
]
const NEAT = [
  'KKKKKKKKKKKKKK',
  'KPPPPPPPPPPPPK',
  'KGGGGGGGGGGGGK',
  'KWWWWWWWWWWWWK',
  'KOOOOOOOOOOOOK',
  'KKKKKKKKKKKKKK',
]
const CLOTH = { K: INK, P: PINK, G: MINT, W: CREAM, O: ORANGE }

/** a bathroom scale with a digital read-out */
function scale(x, cx, cy, k, txt, ok) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -40, 312, 140)
  x.fillStyle = INK; x.fillRect(-162, -52, 324, 144)
  x.fillStyle = '#d8dbe8'; x.fillRect(-154, -44, 308, 128)
  x.fillStyle = INK; x.fillRect(-100, -24, 200, 64)
  x.fillStyle = ok ? MINT : RED; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 10)
  x.restore()
}

/** a compatibility card with two glyphs */
function compat(x, cx, cy, k, glyphs, head) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -140, 312, 292)
  x.fillStyle = INK; x.fillRect(-162, -152, 324, 304); x.fillStyle = '#140c30'; x.fillRect(-154, -144, 308, 288)
  x.fillStyle = LAV; x.fillRect(-154, -144, 308, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -113)
  x.fillStyle = BONE; x.font = `700 96px ${GLYPH_FONT}`; x.fillText(glyphs, 0, 30)
  x.restore()
}

const S = 'virgo'
const R = (t, P, a) => pop01(t, P.t0 + a, 0.25, 2.2)
const CAMEOS = [
  { sign: S, cap: 'Trip’s in a month. | List *version fourteen.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'PACKING LIST', headCol: MINT, rows: [
        ['passport', R(t, P, 0.4), true], ['passport (2)', R(t, P, 0.7), true], ['the list', R(t, P, 1.0), true], ['list for list', R(t, P, 1.3), false],
      ] })
      label(x, 800, 600, 'v14', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 46, bg: GOLD, rot: 0.08, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Socks rolled. | *Colour-coded.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      const COLS = [RED, ORANGE, GOLD, MINT, SKYB, LAV]
      const n = Math.min(6, Math.floor(clamp((lt - 0.2) / 1.2) * 6) + 1)
      for (let i = 0; i < n; i++) drawBits(x, SOCK, { C: COLS[i], W: CREAM }, 700 + (i % 2) * 170, 690 + Math.floor(i / 2) * 150, 16)
      label(x, 790, 1130, 'RAINBOW ORDER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 1.6, 7, 200, 0.2)
    } },
  { sign: S, cap: 'Snacks labelled | *by day.*', mood: 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const DAYS = ['MON', 'TUE', 'WED', 'THU']
      DAYS.forEach((d, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2)
        const bx = 700 + (i % 2) * 180, by = 740 + Math.floor(i / 2) * 230
        drawBits(x, BAG, { K: INK, S: 'rgba(220,240,255,0.85)', Y: GOLD, O: ORANGE }, bx, by, 16 * k)
        label(x, bx, by + 100, d, k, { size: 28, bg: MINT, rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
      })
      bubble(x, 400, 620, 'THU is | sacred.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Toothbrush. | Backup *toothbrush.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const cols = [SKYB, PINK, MINT]
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.5, 0.3, 2)
        drawBits(x, TOOTH, { W: CREAM, B: cols[i] }, 680 + i * 110, 880, 20 * k, { rot: 0.1 * (i - 1) })
      }
      label(x, 790, 640, 'BACKUP OF THE BACKUP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Weighed the bag. | *Five times.*', mood: lt => lt > 1.6 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 5))
      drawBits(x, CASE, { K: INK, R: '#c97bff', Y: GOLD }, 790, 780, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      scale(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), ['22.9', '23.1', '22.9', '23.0', '23.0'][n - 1] + 'kg', n >= 4)
      label(x, 790, 610, `WEIGH-IN #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'All packed. | Unpacked. *Started over.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const out = lt > 1.0
      drawBits(x, CASE, { K: INK, R: '#c97bff', Y: GOLD }, 790, 880, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: out ? Math.sin(t * 20) * 0.03 : 0 })
      if (out) {
        const p = ease.outCubic(prog(lt, 1.0, 1.6))
        const BITS = [[SOCK, { C: PINK, W: CREAM }, -150, -260], [SOCK, { C: MINT, W: CREAM }, 140, -300], [TOOTH, { W: CREAM, B: SKYB }, 20, -340], [SOCK, { C: GOLD, W: CREAM }, -40, -230]]
        BITS.forEach(([bm, c, dx, dy], i) => drawBits(x, bm, c, 790 + dx * p, 820 + dy * p + 120 * p * p, 12, { rot: p * (i + 1) }))
      }
      label(x, 790, 1110, out ? 'ROUND 3' : 'DONE ✓', pop01(t, P.t0 + (out ? 1.1 : 0.4), 0.3, 2.4), { size: 38, bg: out ? PINK : MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked the travel buddy’s | *chart first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      compat(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), '♍︎ ♐︎', 'TRAVEL CHECK')
      label(x, 790, 1090, lt < 1.3 ? 'READING… AGAIN' : 'APPROVED. FOR NOW.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: lt < 1.3 ? BONE : MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The itinerary | *schedules relaxing.*', mood: 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'DAY 1', headCol: GOLD, w: 350, size: 28, rows: [
        ['7:00 wake', R(t, P, 0.4), true], ['7:04 coffee', R(t, P, 0.65), true], ['7:09 RELAX', R(t, P, 0.9), false], ['7:14 stop', R(t, P, 1.4), false],
      ] })
      bubble(x, 420, 620, 'five whole | minutes!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Your suitcase was a mess. | *Was.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fixed = lt > 1.2
      drawBits(x, fixed ? NEAT : MESS, CLOTH, 780, 760, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (fixed) sparkles(x, t, 780, 760, P.t0 + 1.2, 8, 190, 0.4)
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 1020, 180 * k, { mood: fixed ? 'wide' : 'happy', look: [-1, -1], seed: 19, glyph: false })
      bubble(x, 420, 610, fixed ? 'you’re welcome.' : 'oh no.', pop01(t, P.t0 + (fixed ? 1.3 : 0.4), 0.25, 2.2), { size: 36, col: fixed ? MINT : BONE, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0526', key: 'C', accent: MINT, solo: S, ending: 'group',
  title: 'Virgos packing | *a suitcase.*',
  cameos: CAMEOS,
  group: { cap: 'Ready to go. | *Since March.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
