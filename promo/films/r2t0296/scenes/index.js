// r2t0296: star_talk, ROLLCALL, "The signs lost | in a *new city.*" (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself when lost somewhere new. Ending: lesson.
//   0.0–3.6    "The signs lost | in a *new city.*"
//   3.6–49.2   ♈ refused the map, crossed a border · ♉ found a bakery, moved in · ♊ asked for directions, made eleven
//              friends · ♋ lost two minutes, called mom · ♌ lost in the square, signed autographs · ♍ nine laminated
//              maps · ♎ at a fork in the road, day three · ♏ got lost, found the secret door · ♐ lost on purpose
//              · ♑ got lost, opened a business there · ♒ navigated by the stars · ♓ cried, filled the fountain
//  49.2        "Twelve signs. | *Still lost.*"
//  52.4        LESSON UNLOCKED: "Get lost a little. | You'll *find your people.*"  STATUS: FOUND
//  58.3        "Next trip: Virgo | *holds the map.*"  the nine maps fan out once more.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = SKYB, RED = '#e23d4e', BROWN = '#c98f5a', GREEN = '#4ac77d', CREAM = '#fff4e2'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// a folded paper map
function map(x, cx, cy, k, rot = 0.05, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -84, 256, 180)
  x.fillStyle = INK; x.fillRect(-136, -96, 272, 192)
  const P = ['#fff4e2', '#f3e6c8', '#fff4e2', '#f3e6c8']
  for (let i = 0; i < 4; i++) { x.fillStyle = P[i]; x.fillRect(-128 + i * 64, -88, 64, 176) }
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-100, 50); x.quadraticCurveTo(-20, -70, 90, -30); x.stroke(); x.setLineDash([])
  x.fillStyle = '#3d8fd8'; x.fillRect(-110, -60, 60, 26); x.fillStyle = GREEN; x.fillRect(30, 20, 70, 44)
  x.fillStyle = RED; x.beginPath(); x.arc(90, -30, 12, 0, 7); x.fill()
  x.restore()
}
const BREAD = ['..BBBBBB..', '.BbBBbBBB.', 'BBBbBBBbBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const SIGNPOST = ['...KK...', '...KK...', '...KK...', '...KK...', '...KK...', '...KK...', '...KK...', '...KK...', '..KKKK..']
const FOUNTAIN = ['....WW....', '...WWWW...', '....SS....', '....SS....', '.SSSSSSSS.', 'SWWWWWWWWS', 'SWWWWWWWWS', '.SSSSSSSS.']
const DOOR = ['.KKKKKK.', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBGBK', 'KBBBBBBK', 'KBBBBBBK', 'KKKKKKKK']

function arrow(x, cx, cy, w, dir, text, col, k) {
  if (k <= 0.01) return
  const shape = (pad) => { x.beginPath(); x.moveTo(-w / 2 - pad, -28 - pad); x.lineTo(w / 2 - 6, -28 - pad); x.lineTo(w / 2 + 24 + pad * 1.4, 0); x.lineTo(w / 2 - 6, 28 + pad); x.lineTo(-w / 2 - pad, 28 + pad); x.closePath(); x.fill() }
  x.save(); x.translate(cx, cy); x.scale(k * dir, k)
  x.fillStyle = INK; shape(8); x.fillStyle = col; shape(0)
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -dir * 8, 2); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Refused the map. | Now in *another country.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      map(x, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - clamp((lt - 0.7) / 0.3)), 0.1)
      bubble(x, 760, 860, 'I KNOW the way!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1080, 'NOW ENTERING: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Lost? Found a bakery. | *Moved in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BREAD, { B: BROWN, b: '#f3d29a' }, 790, 760, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'BAKERY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: CREAM, rot: 0.03 })
      L(x, 790, 1000, 'NEW ADDRESS ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
      hearts(x, t, 790, 800, P.t0 + 1.0, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Asked for directions. | Made *eleven friends.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'which way is the station?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 30, tail: 'bl' })
      bubble(x, 780, 840, 'also, what’s your sign?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 30, col: GOLD, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 1.1) / 0.9) * 10)
      if (lt > 1.1) L(x, 790, 1060, `FRIENDS: ${n}`, 1, MINT, 0.04, 40)
    } },
  { sign: 'cancer', cap: 'Lost for two minutes. | Already *homesick.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: ST, tears: lt => lt > 1.6 ? 1 : 0,
    front(x, t, lt, P) {
      L(x, 790, 680, 'LOST: 0:02', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.04, 36)
      bubble(x, 780, 860, 'mom? | come get me.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      L(x, 790, 1060, 'CALLING: MOM ♥', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Lost in the main square. | Signed *autographs.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, ['gemini', 'libra', 'aries'][i], 660 + i * 130, 1100, 110 * k, { mood: 'heart', look: [-1, 0], seed: 30 + i, glyph: false }) }
      bubble(x, 790, 680, 'one photo, please!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'br' })
      L(x, 790, 880, 'FAN CLUB: FOUNDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Lost? Never. | Printed *nine maps.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.max(1, Math.floor(clamp((lt - 0.2) / 1.2) * 9))
      for (let i = 0; i < n; i++) map(x, 790 + (i % 3 - 1) * 14, 930 - i * 26, 1, (i % 2 ? 0.06 : -0.06), 0.8)
      L(x, 790, 640, `MAPS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), BONE, 0.04, 38)
      L(x, 790, 1120, 'ALL LAMINATED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Fork in the road. | Still *standing there.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SIGNPOST, { K: '#8a4a2e' }, 790, 960, 26 * k)
      arrow(x, 700, 740, 160, -1, 'LEFT', PINK, k)
      arrow(x, 880, 820, 160, 1, 'RIGHT', SKYB, pop01(t, P.t0 + 0.4, 0.35, 2))
      L(x, 790, 1150, 'DAY 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Got lost. Found | the city’s *secret door.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, DOOR, { K: INK, B: '#4a2f7a', G: GOLD }, 790, 860, 34 * k)
      if (lt > 0.9) { x.save(); x.globalAlpha = 0.5 * clamp((lt - 0.9) / 0.4); x.fillStyle = GOLD; x.fillRect(760, 760, 60, 240); x.restore() }
      bubble(x, 790, 640, 'shh. | don’t tell.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 790, 1120, 'NOT ON ANY MAP', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Lost on purpose. | *Best day ever.*', mood: 'sparkle', star: { x: 170 }, hops: [0.5, 1.1, 1.7],
    front(x, t, lt, P) {
      L(x, 330, 680, 'PLAN: NONE', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 36)
      bubble(x, 330, 860, 'this way? | sure!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: GOLD, tail: 'br' })
      L(x, 330, 1060, 'MILES: 26', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
      sparkles(x, t, 710, 800, P.t0 + 0.6, 7, 170, 0.5)
    } },
  { sign: 'capricorn', cap: 'Got lost. Opened | a *business* there.', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#9aa5c4'; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = GREEN; x.fillRect(-162, -142, 324, 60)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAP & CO.', 0, -112)
        x.fillStyle = SKYB; x.fillRect(-130, -60, 110, 90); x.fillRect(20, -60, 110, 90)
        x.fillStyle = '#8a4a2e'; x.fillRect(-36, 50, 72, 92)
        x.restore()
      }
      L(x, 790, 1110, 'NOW HIRING', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Skipped the map. | Followed *the stars.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const pts = [[660, 640], [740, 700], [820, 660], [880, 760], [800, 840], [900, 900]]
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * pts.length)
      x.save(); x.strokeStyle = 'rgba(143,227,255,0.7)'; x.lineWidth = 4; x.beginPath()
      for (let i = 0; i < n; i++) i ? x.lineTo(...pts[i]) : x.moveTo(...pts[i]); x.stroke(); x.restore()
      for (let i = 0; i < n; i++) { x.fillStyle = BONE; x.fillRect(pts[i][0] - 9, pts[i][1] - 9, 18, 18); x.fillStyle = GOLD; x.fillRect(pts[i][0] - 5, pts[i][1] - 5, 10, 10) }
      L(x, 790, 1040, 'ROUTE: BY CHART', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried so hard | the *fountain* filled up.', mood: lt => lt < 0.8 ? 'neutral' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, FOUNTAIN, { W: SKYB, S: '#c9d3e8' }, 790, 1000, 26 * k)
      L(x, 790, 680, 'WATER LEVEL: RISING', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 28)
      bubble(x, 790, 830, 'everyone’s so nice here…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 28, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0296', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs lost | in a *new city.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Still lost.*' },
  lesson: { text: 'Get lost a little. | You’ll *find your people.*', chip: 'STATUS: FOUND' },
  last: {
    text: 'Next trip: Virgo | *holds the map.*',
    draw(x, t, lt) {
      for (let i = 0; i < 5; i++) map(x, 540 + (i - 2) * 120, 1500 + Math.abs(i - 2) * 20, pop01(t, t - lt + 0.5 + i * 0.12, 0.3, 2), (i - 2) * 0.12, 0.8)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
