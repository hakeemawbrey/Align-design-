// r2t0027: star_talk, ROLLCALL, "The signs at | the block meeting." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme version of themself at a neighbourhood meeting. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ volunteered for everything, before hearing what · ♉ repaint the fence? absolutely not
//              · ♊ four side chats at once · ♋ a casserole for every house · ♌ added themself to the agenda
//              · ♍ corrected the minutes in red pen · ♎ bins on Tuesday or Thursday? both are valid
//              · ♏ knows who took the gnome · ♐ pitched a block party on a cruise · ♑ audited the bake sale
//              · ♒ motion to adopt a neighbourhood goose · ♓ "welcome, new neighbours." sobbed
//  49.2        "Meeting adjourned. | *Barely.*"
//  52.6        CALLBACK: "The goose? | *Runs things now.*"  The goose with a little gavel.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fd6c0', RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
const FENCE = ['B..B..B..B..B', 'BB.BB.BB.BB.B', 'BBBBBBBBBBBBB', 'BB.BB.BB.BB.B', 'BB.BB.BB.BB.B', 'BBBBBBBBBBBBB', 'BB.BB.BB.BB.B', 'BB.BB.BB.BB.B']
const DISH = ['..HH......HH..', '.CCCCCCCCCCCC.', 'CYYYOYYYYOYYYC', 'CYOYYYYOYYYOYC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const GNOME = ['....R....', '...RRR...', '...RRR...', '..RRRRR..', '..SSSSS..', '.WSKSKSW.', '.WWSSSWW.', '..WWWWW..', '.BBBBBBB.', '.BBBBBBB.', '..KK.KK..']
const GOOSE = ['...WWW......', '..WWKWO.....', '..WWWWOO....', '...WW.......', '...WW.......', '...WWW......', '..WWWWWWWW..', '.WWWWWWWWWWW', '.WWWGGWWWWW.', '..WWWWWWWW..', '....O..O....', '...OO.OO....']
const GOOSE_C = { W: '#f4f1ea', K: INK, O: '#ff9a3a', G: '#c9c4b8' }
const GAVEL = ['BBBBBB....', 'BBBBBB....', 'BBBBBBKKKKKK', 'BBBBBB....', 'BBBBBB....']
const SHIP = ['......F.......', '......FF......', '......K.......', '..WWWWWWWWWW..', 'NNNNNNNNNNNNNN', '.NNNNNNNNNNNN.', '..NNNNNNNNNN..']

// the minutes, with red corrections appearing
function minutes(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = CREAM; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MINUTES', 0, -142)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-112, -84 + i * 46, 224 - (i % 3) * 30, 12)
  x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'
  const n = Math.floor(clamp((lt - 0.5) / 1.3) * 6)
  for (let i = 0; i < n; i++) { x.beginPath(); x.moveTo(-116, -78 + i * 46); x.lineTo(100 - (i % 3) * 30, -78 + i * 46 + (i % 2 ? -6 : 6)); x.stroke() }
  if (lt > 1.6) { x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.fillText('see me.', 60, 160) }
  x.restore()
}
// a little ledger
function ledger(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = '#e8f3e0'; x.fillRect(-142, -172, 284, 344)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BAKE SALE', 0, -134)
  x.font = `700 30px ${MONO}`; x.textAlign = 'left'
  const L = ['cookies $12', 'cakes   $9', 'pie?    !!']
  L.forEach((s, i) => { if (lt > 0.4 + i * 0.4) { x.fillStyle = i === 2 ? RED : INK; x.fillText(s, -118, -64 + i * 70) } })
  if (lt > 1.7) { x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('1 PIE MISSING', 0, 140) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Volunteered for everything. | *Before hearing what.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'ME! ME! ME!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 6)
      label(x, 790, 900, `SIGNED UP: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, 'incl. the gutters', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Repaint the fence? | *Absolutely not.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, FENCE, { B: '#a0623a' }, 790, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'it’s been brown | for 30 years.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1120, 'VOTE: NO', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ran four side chats. | *At once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const B = ['did you hear—', 'wait, the dog?', 'new café!', 'ok so anyway—']
      B.forEach((s, i) => bubble(x, 700 + (i % 2) * 170, 680 + Math.floor(i / 2) * 170 + (i % 2) * 50, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 31, col: [BONE, SKYB, GOLD, PINK][i], tail: i % 2 ? 'br' : 'bl' }))
      label(x, 790, 1110, 'SIDE CHATS: 4', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought a casserole. | *For every house.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.35) + 1)
      for (let i = 0; i < n; i++) drawBits(x, DISH, { H: '#9aa5c4', C: SKYB, Y: '#ffd23a', O: '#ff9a4a' }, 790, 1100 - i * 76, 13 * pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2))
      label(x, 790, 690, 'HOUSES: ALL 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wasn’t on the agenda. | *Added themself.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -190, 320, 380); x.fillStyle = CREAM; x.fillRect(-152, -182, 304, 364)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGENDA', 0, -140)
        x.textAlign = 'left'; x.font = `700 34px ${MONO}`
        const L = ['1. LEO', '2. parking', '3. LEO again']
        L.forEach((s, i) => { x.fillStyle = s.includes('LEO') && lt > 0.8 ? '#d9822b' : '#b9b0a0'; if (s.includes('LEO') ? lt > 0.8 + i * 0.2 : true) x.fillText(s, -130, -60 + i * 80) })
        x.restore()
      }
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Corrected the minutes. | *In red pen.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { minutes(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'Bins Tuesday or Thursday? | *Both are valid.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const sw = Math.sin(t * 5) * 0.12
      label(x, 700, 760, 'TUE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 50, bg: SKYB, rot: sw, font: MONO, weight: 700 })
      label(x, 880, 760, 'THU', pop01(t, P.t0 + 0.35, 0.3, 2), { size: 50, bg: PINK, rot: -sw, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'what if… | both?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1120, 'DECIDED: NOT YET', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows exactly | who *took the gnome.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GNOME, { R: RED, S: '#ffd0a8', K: INK, W: CREAM, B: SKYB }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'i’m not saying. | yet.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1120, 'CASE: SOLVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Pitched a block party. | *On a cruise.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const bob = Math.sin(t * 3) * 10
      drawBits(x, SHIP, { F: RED, K: '#9aa5c4', W: CREAM, N: '#4a5bd6' }, 790, 900 + bob, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 690, 'everyone’s | invited!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'BUDGET: ???', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Audited | *the bake sale.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { ledger(x, 790, 880, pop01(t, P.t0 + 0.15, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Motion to adopt | *a neighbourhood goose.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, GOOSE, GOOSE_C, 800, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      bubble(x, 830, 690, 'HONK.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 1130, 'MOTION: PASSED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“Welcome, new neighbours.” | *Sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 720, 'WELCOME!', pop01(t, P.t0 + 0.25, 0.3, 2), { size: 50, bg: GOLD, rot: 0.04 })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 810, 960, 180 * k, { mood: 'wide', look: [-1, 0], seed: 33, glyph: false })
      hearts(x, t, 800, 1120, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0027', key: 'E', accent: TEAL, ending: 'callback',
  title: 'The signs at | *the block meeting.*',
  cameos: CAMEOS,
  group: { cap: 'Meeting adjourned. | *Barely.*' },
  last: {
    text: 'The goose? | *Runs things now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      drawBits(x, GOOSE, GOOSE_C, 520, 1100, 26 * k, { sx: -1 })
      if (k > 0.5) {
        const sw = lt > 1.2 ? Math.max(0, Math.sin((lt - 1.2) * 9)) * 0.5 : 0
        drawBits(x, GAVEL, { B: '#a0623a', K: '#6b3a22' }, 700, 980, 14, { rot: -0.5 + sw })
        label(x, 540, 1360, 'ORDER! HONK!', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
