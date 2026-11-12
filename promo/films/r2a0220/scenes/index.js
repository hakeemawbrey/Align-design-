// r2a0220: star_advice, ADVICE ROLL CALL, "Holiday tips | for each sign." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific way each can handle the holidays, with a light visual gag.
//   0.0–3.6    "Holiday tips | *for each sign.*"
//   3.6–49.2   ♈ rushing every plan, savour it · ♉ food coma, take the walk · ♊ too many parties, pick two
//              · ♋ hosting everyone, let them bring dessert · ♌ gift pressure, you're the present
//              · ♍ the table isn't perfect, the people are · ♎ peacekeeping at dinner, not your job tonight
//              · ♏ "so… dating anyone?", pass the potatoes · ♐ travel delays, every delay is a story
//              · ♑ budgeting every gift, handmade counts double · ♒ not into traditions, start your own
//              · ♓ feeling it all, happy tears count too
//  49.2        "Twelve ways | *to feel at home.*"  Group photo.
//  52.6        callback: "Best present? | *Still you.*"  Leo's gift box opens on a little gold star.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const HOLLY = '#ff6b5a', PINE = '#2fc79a'
const MUG = ['.W.W.W....', '..........', 'RRRRRRR...', 'RCCCCCRRR.', 'RRRRRRR.R.', 'RRRRRRR.R.', 'RRRRRRRRR.', '.RRRRR....']
const PIE = ['....BBBB....', '..BBYBBYBB..', '.BYYYYYYYYB.', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const SHOE = ['.....WWW....', '....WWWWW...', 'WWWWWWWWWWW.', 'WRWRWWWWWWWW', 'KKKKKKKKKKKK']
const ENV = ['WWWWWWWWWW', 'WW.WWWW.WW', 'WWW.WW.WWW', 'WWWW..WWWW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const CAKE = ['....F.F....', '....Y.Y....', '.PPPPPPPPP.', '.PWPWPWPWP.', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'GGGGGGGGGGG']
const GIFT = ['...R...R...', '....R.R....', 'GGGGGRGGGGG', 'GGGGGRGGGGG', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.', '.BBBBRBBBB.']
const BOWL = ['.Y.Y.Y.Y.', 'YYYYYYYYY', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']
const CASE = ['...KKKK....', '...K..K....', 'BBBBBBBBBBB', 'BPBBBBBBYBB', 'BBBBBBBBBBB', 'BBBMBBBBBBB', 'BBBBBBBBBBB', '.K.......K.']
const WHISTLE = ['......KK', 'SSSSSSSK', 'SSSSSSS.', 'SSSSSS..', '.SSSS...']
const SCOPE = ['..........WW', '........WWWW', '......WWWW..', '....WWWW....', '..WWWW......', '.....K......', '....K.K.....', '...K...K....']
const SNOW = ['.W.', 'WWW', '.W.']

/** a few snowflakes drifting down inside the panel */
function snow(x, t, a = 1) {
  for (let i = 0; i < 12; i++) {
    const ph = (t * 0.25 + i * 0.137) % 1
    drawBits(x, SNOW, { W: '#ffffff' }, 160 + (i * 73) % 760 + Math.sin(t + i) * 14, 500 + ph * 700, 5, { outline: null, alpha: a * Math.sin(Math.PI * ph) * 0.8 })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Rushing every plan? | *Slow down. Savour it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: '#ffffff', R: HOLLY, C: '#8a4a2e' }, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      if (lt > 0.7) for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.6; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = 760 - j * 12, xx = 740 + i * 40 + Math.sin(j * 0.9 + t * 4 + i) * 8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke(); x.restore() }
      label(x, 790, 1090, 'SPEED: COCOA', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Food coma coming? | *Take the walk.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIE, { B: '#e8a24a', Y: '#ffd23a' }, 790, 760, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const w = prog(lt, 1.0, 2.2)
      drawBits(x, SHOE, { W: CREAM, R: HOLLY, K: INK }, lerp(720, 880, w), 1000 - Math.abs(Math.sin(w * 12)) * 20, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 1130, 'WALK: 10 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Too many parties? | *Pick your favourite two.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2), pick = i === 1 || i === 4
        const fade = pick ? 1 : 1 - 0.65 * prog(lt, 1.1, 1.4)
        drawBits(x, ENV, { W: pick && lt > 1.1 ? GOLD : CREAM }, 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 170, 12 * k, { alpha: fade, rot: (i - 2.5) * 0.05 })
      }
      label(x, 790, 1120, 'RSVP: 2 YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Hosting everyone? | *Let them bring dessert.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      drawBits(x, CAKE, { F: ORANGE, Y: SUN, P: PINK, W: CREAM, C: '#8a4a2e', G: GREY }, 820, 780, 16 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      bubble(x, 420, 610, 'oh! thank you', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Gift pressure? | *You’re the present.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, G: HOLLY, B: '#c2304a' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 650, 'TO: YOU · FROM: ME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'CONTENTS: A HUG', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Table not perfect? | *The people are.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 960); x.scale(k, k); x.rotate(0.04)
        x.fillStyle = INK; x.fillRect(-180, -16, 360, 36); x.fillStyle = WOOD; x.fillRect(-172, -10, 344, 24)
        x.fillStyle = CREAM; for (const [px, rot] of [[-120, 0.3], [-20, -0.15], [90, 0.5]]) { x.save(); x.translate(px, -30); x.rotate(rot); x.fillRect(-36, -12, 72, 24); x.restore() }
        x.restore()
      }
      for (let i = 0; i < 3; i++) { const kk = pop01(t, P.t0 + 0.9 + i * 0.15, 0.3, 2); if (kk > 0.01) signChar(x, t, ['aries', 'cancer', 'pisces'][i], 680 + i * 110, 840, 110 * kk, { mood: 'happy', seed: 50 + i, glyph: false, tears: i === 2 ? 1 : 0 }) }
      label(x, 790, 1120, 'NAPKINS: CROOKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Peacekeeping at dinner? | *Not your job tonight.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 1.0, 1.4))
      drawBits(x, WHISTLE, { S: GREY, K: INK }, 790, lerp(760, 1040, down), 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.2, 0.3, down) })
      label(x, 790, 640, 'REFEREE: OFF DUTY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 900, 'more pie?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: '“So… dating anyone?” | *Pass the potatoes.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so… dating | anyone?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      const p = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BOWL, { Y: SUN, W: CREAM }, lerp(480, 840, p), 960, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1110, 'TOPIC: CHANGED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Travel delays? | *Every delay is a story.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, B: '#b98aff', P: PINK, Y: SUN, M: MINT }, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 680, 'DELAYED: 2 HRS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: HOLLY, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'met a juggler!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Budgeting every gift? | *Handmade counts double.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        x.strokeStyle = PINE; x.lineWidth = 10; x.beginPath(); x.moveTo(0, -120); x.lineTo(-90, 40); x.lineTo(90, 40); x.closePath(); x.stroke()
        x.fillStyle = BROWN; x.fillRect(-14, 44, 28, 34); x.fillStyle = GOLD; x.fillRect(-12, -140, 24, 24)
        txt(x, 'for you ♡', 0, 120, { size: 32, color: HOLLY })
      })
      label(x, 790, 1110, 'VALUE: PRICELESS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Not into traditions? | *Start your own.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { W: GREY, K: INK }, 800, 960, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      chart(x, 820, 720, 80, pop01(t, P.t0 + 0.8, 0.3, 2), t)
      label(x, 790, 1130, 'NEW: CHART NIGHT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Feeling it all? | *Happy tears count too.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -150 },
    back(x, t, lt, P) { snow(x, t, pop01(t, P.t0 + 0.2, 0.4, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 720, 'TEARS: THE GOOD KIND', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 980, P.t0 + 0.8, { n: 5, life: 1.8, spread: 240, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0220', key: 'G', accent: HOLLY, ending: 'callback',
  title: 'Holiday tips | *for each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to feel at home.*', moods: Array(12).fill('heart') },
  last: {
    text: 'Best present? | *Still you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2), open = ease.outCubic(prog(lt, 1.0, 1.4))
      if (k <= 0.01) return
      if (open > 0.05) signChar(x, t, 'leo', 540, lerp(1160, 930, open), 300 * open, { mood: 'sparkle', seed: 33, hops: [t0 + 1.6] })
      drawBits(x, GIFT.slice(4), { R: GOLD, B: '#c2304a' }, 540, 1200, 34 * k)
      drawBits(x, GIFT.slice(0, 4), { R: GOLD, G: HOLLY }, 540 + open * 300, 1110 + open * 60, 34 * k, { rot: open * 0.25 })
      sparkles(x, t, 540, 1000, t0 + 1.3, 8, 220, 0.3)
      hearts(x, t, 540, 1100, t0 + 1.5, { n: 6, life: 1.8, spread: 420, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
