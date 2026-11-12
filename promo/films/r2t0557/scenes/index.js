// r2t0557: star_talk, ROLLCALL, "The signs | at the buffet." (signs3kit social cut, music: lofi · E). Ending: lesson.
//   ♈ first in line before it opened · ♉ plate one of nine, pacing · ♊ eighty dishes, one bite each · ♋ doggy bag for
//   the whole family · ♌ posed with every plate, food's cold · ♍ six plates, nothing touches · ♎ browsed an hour, took
//   a roll · ♏ stalked the shrimp refill · ♐ wandered into the kitchen · ♑ cost per bite · ♒ a salad of desserts
//   · ♓ saw the chocolate fountain, wept
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, drawBits } from '../../signs3kit.js'
import { L, sheet, confetti, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }
const CHOC = '#7a4a2e', CHOC2 = '#a8673f'
const SHRIMP = ['..PPPP.', '.PPWPPP', 'PP...PP', 'PP.....', '.PP....', '..PPP..']
const SHRIMP_C = { P: '#ff9a7a', W: INK }
const ROLL = ['..BBBB..', '.BBYBBB.', 'BBBBBBYB', 'BBBBBBBB', '.BBBBBB.']
const BAGB = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBHHBHHBB', 'BBBHHHHHBB', 'BBBBHHHBBB', 'BBBBBHBBBB', 'BBBBBBBBBB']
const BAGC = { K: INK, B: '#d9a46a', H: PINK }
const ROLL_C = { B: '#e8a24a', Y: '#ffd98a' }

function tray(x, cx, cy, k, w = 340) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-w / 2 + 10, -14, w, 46)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -26, w + 12, 50); x.fillStyle = STEEL; x.fillRect(-w / 2, -20, w, 38)
  x.fillStyle = '#c9d0e4'; x.fillRect(-w / 2 + 8, -16, w - 16, 8)
  x.restore()
}
function fountain(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const tier = (y, w) => { x.fillStyle = INK; x.fillRect(-w / 2 - 6, y - 6, w + 12, 30); x.fillStyle = STEEL; x.fillRect(-w / 2, y, w, 18); x.fillStyle = CHOC; x.fillRect(-w / 2 + 6, y - 2, w - 12, 8) }
  x.fillStyle = INK; x.fillRect(-14, -170, 28, 330); x.fillStyle = STEEL; x.fillRect(-8, -170, 16, 330)
  // chocolate sheets pouring off each tier
  for (const [y, w, h] of [[-160, 90, 60], [-80, 170, 70], [10, 250, 110]]) {
    for (const s of [-1, 1]) { const ex = s > 0 ? w / 2 - 14 : -w / 2 - 20; x.fillStyle = INK; x.fillRect(ex - 4, y + 8, 42, h + 4); x.fillStyle = CHOC; x.fillRect(ex, y + 8, 34, h); x.fillStyle = CHOC2; x.fillRect(ex + 8, y + 12 + ((t * 120) % (h - 16)), 10, 16) }
    x.fillStyle = CHOC; x.fillRect(-w / 2, y - 8, w, 12)
  }
  tier(-160, 90); tier(-80, 170); tier(10, 250)
  x.fillStyle = INK; x.fillRect(-170, 120, 340, 46); x.fillStyle = STEEL; x.fillRect(-162, 126, 324, 34); x.fillStyle = CHOC; x.fillRect(-156, 124, 312, 12)
  x.restore()
}
function camflash(x, t, cx, cy, lt, at) {
  const d = lt - at; if (d < 0 || d > 0.35) return
  x.save(); x.globalAlpha = 0.7 * (1 - d / 0.35); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(cx, cy, 260 * (0.6 + d), 0, Math.PI * 2); x.fill(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'First in line. | Before *it opened.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 200, head: 'BUFFET', headBg: RED, lines: ['OPENS 11:00'], size: 40, font: MONO, weight: 700 })
      L(x, 800, 1060, 'ARIES ARRIVED: 9:40', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      bubble(x, 800, 620, 'is it time??', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Plate one of nine. | *Pacing* themself.', mood: lt => lt < 1.3 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))
      for (let i = 0; i < n; i++) bits(x, 'PLATE', 800 + (i % 2 ? 8 : -8), 1080 - i * 34, 15 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.2, 2))
      L(x, 800, 640, `PLATE ${n}/9`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'gemini', cap: 'Tried all eighty dishes. | *One bite each.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(80, Math.floor(clamp((lt - 0.3) / 1.4) * 80))
      bits(x, 'FORK', 800, 860 - 30 * Math.abs(Math.sin(t * 9)), 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      L(x, 800, 1060, `DISHES: ${n}/80`, pop01(t, P.t0 + 0.4, 0.3, 2.2), '#ffd23a', -0.04, 34)
      bubble(x, 800, 640, 'ok but THIS one', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed a doggy bag. | For *the whole family.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BAGB, BAGC, 700 + (i % 2) * 190, 1020 - Math.floor(i / 2) * 200, 15 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2))
      L(x, 800, 640, 'GRANDMA · DAD · CAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Posed with every plate. | *Food’s cold.*', mood: lt => lt < 1.6 ? 'wink' : 'wide', star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      camflash(x, t, 420, 860, lt, 0.6); camflash(x, t, 420, 860, lt, 1.1)
      L(x, 800, 1060, `PHOTOS: ${Math.min(64, Math.floor(lt * 30))}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), '#ffb34a', -0.04, 32)
      if (lt > 1.6) bubble(x, 800, 690, 'brr.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Foods can’t touch. | *Six plates.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) bits(x, 'PLATE', 690 + (i % 2) * 220, 720 + Math.floor(i / 2) * 140, 13 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.22, 2))
      L(x, 800, 1130, 'ZERO TOUCHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Browsed for an hour. | Took *a roll.*', mood: lt => lt < 1.4 ? 'neutral' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      tray(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2))
      if (lt > 1.4) drawBits(x, ROLL, ROLL_C, 800, 900, 18 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      L(x, 800, 660, lt < 1.4 ? `BROWSING: ${Math.floor(lt * 40)} MIN` : 'DECISION: BREAD', pop01(t, P.t0 + 0.3, 0.3, 2.2), lt < 1.4 ? STEEL : PINK, 0.05, 32)
      if (lt > 1.4) sparkles(x, t, 800, 900, P.t0 + 1.45, 6, 140, 0.2)
    } },
  { sign: 'scorpio', cap: 'Waited by the shrimp. | *Struck at refill.*', mood: lt => lt < 1.3 ? 'squint' : 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      tray(x, 800, 980, pop01(t, P.t0 + 0.15, 0.3, 2))
      if (lt > 1.2) for (let i = 0; i < 5; i++) drawBits(x, SHRIMP, SHRIMP_C, 680 + i * 60, 930 - (i % 2) * 18, 9 * pop01(t, P.t0 + 1.2 + i * 0.05, 0.2, 2.2))
      const c = Math.max(1, 3 - Math.floor(lt / 0.4))
      L(x, 800, 680, lt < 1.2 ? `REFILL IN ${c}…` : 'REFILL: CLAIMED', pop01(t, P.t0 + 0.3, 0.3, 2.2), lt < 1.2 ? '#c97bff' : MINT, 0.05, 32)
    } },
  { sign: 'sagittarius', cap: 'Wandered into | *the kitchen.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(330, 920); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -220, 220, 440); x.fillStyle = STEEL; x.fillRect(-100, -210, 200, 420); x.fillStyle = SKYB; x.fillRect(-50, -170, 100, 70); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 330, 640, 'STAFF ONLY', pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, -0.05, 34)
      bubble(x, 760, 650, 'hi chef! | what’s your sign?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Worked out the cost | *per bite.*', mood: lt => lt < 1.4 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'BUFFET MATH', headBg: '#2fc79a', headInk: INK, lines: ['price ÷ bites', `bites: ${Math.min(57, Math.floor(lt * 40))}`, lt > 1.4 ? ['= 38¢ A BITE', '#2f8a48'] : '= …'], size: 30, font: MONO, weight: 700 })
      L(x, 800, 1100, 'GOING FOR 58', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Made a salad. | Out of *desserts.*', mood: lt => lt < 1.1 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 730 + i * 70, 880 - (i % 2) * 30, 10 * pop01(t, P.t0 + 0.5 + i * 0.2, 0.25, 2.2))
      L(x, 800, 680, 'DRESSING: SPRINKLES', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#6fc3ff', 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Chocolate fountain? | *Wept.*', mood: lt => lt < 0.9 ? 'wide' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fountain(x, t, 790, 870, 1.25 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 800, 800, P.t0 + 0.9, 8, 200, 0.3)
      L(x, 790, 640, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0557', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs | *at the buffet.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody left | *hungry.*' },
  lesson: { text: 'Life’s a buffet. | Go back *for seconds.*', chip: 'PLATES: FULL' },
  last: {
    text: 'Pisces is still | at *the fountain.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
