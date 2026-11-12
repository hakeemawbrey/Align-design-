// r2a0560: star_advice, ADVICE ROLLCALL, "Each sign’s | spring reset." (topic: each sign's spring fresh start; signs3kit
// social cut, music: lofi · G). Twelve warm, specific fresh starts, each with a light visual gag. Ending: callback
// (Scorpio's let-go grudge balloon is still floating away).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, zzz, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }
const SPROUT = ['...GG.GG...', '..GGGGGGG..', '...GGGGG...', '.....G.....', '.....G.....']
const POT = ['TTTTTTTTTTT', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..']
const FLOWER = ['..PP.PP..', '.PPPPPPP.', 'PPPYYYPPP', '.PPYYYPP.', 'PPPYYYPPP', '.PPPPPPP.', '..PP.PP..', '....G....', '..G.G....', '...GG....', '....G....']
const FLOWER_C = { P: PINK, Y: GOLD, G: '#4fbf6a' }

function balloon(x, t, cx, cy, k, text = 'GRUDGE') {
  if (k <= 0.01) return
  x.save(); x.translate(cx + 10 * Math.sin(t * 2), cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 90); x.quadraticCurveTo(14, 150, -6, 220); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 96, 110, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c97bff'; x.beginPath(); x.ellipse(0, 0, 88, 102, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.ellipse(-34, -44, 18, 30, -0.5, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-12, 100); x.lineTo(12, 100); x.lineTo(0, 86); x.fill()
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
function windowFrame(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#8fd3ff'; x.fillRect(-138, -158, 276, 316)
  x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(60, -70, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; x.fillRect(-110, 40, 90, 26); x.fillRect(-90, 22, 50, 22)
  const w = 138 * (1 - open)
  x.fillStyle = WOOD; x.fillRect(-138, -158, w, 316); x.fillRect(138 - w, -158, w, 316)
  x.fillStyle = INK; x.fillRect(-6, -158, 12, 316 * (1 - open))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Start one thing. | *Finish it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 220, head: 'TO DO', headBg: '#ff6b5a', lines: [lt > 1.3 ? '✓ the one thing' : '○ the one thing'], size: 34, align: 'left' })
      L(x, 800, 1080, 'NEW START: FINISHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
      sparkles(x, t, 800, 850, P.t0 + 1.35, 7, 190, 0.2)
    } },
  { sign: 'taurus', cap: 'Plant something. | Let it *grow slow.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outCubic(clamp((lt - 0.4) / 1.4))
      drawBits(x, POT, { T: '#d9734a' }, 800, 1040, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (g > 0.01) drawBits(x, SPROUT, { G: '#4fbf6a' }, 800, 1040 - 70 - 60 * g, 22 * g)
      L(x, 800, 680, 'GROWTH: STEADY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: 'gemini', cap: 'Pick one new hobby. | *Okay, two.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'POTTERY', pop01(t, P.t0 + 0.3, 0.3, 2.2), '#ffd23a', 0.05, 38)
      L(x, 800, 900, '+ JUGGLING', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 38)
      L(x, 800, 1060, '+ … (just two!)', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.03, 30)
    } },
  { sign: 'cancer', cap: 'Open the windows. | Let *the light* in.', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      windowFrame(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.2)))
      if (lt > 1.1) { x.save(); x.globalAlpha = 0.18 * clamp((lt - 1.1) * 2); x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(660, 700); x.lineTo(660, 1020); x.lineTo(260, 1180); x.lineTo(260, 660); x.closePath(); x.fill(); x.restore() }
      L(x, 800, 1110, 'HOME: AIRED OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Want a new look? | *Go for it.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - 30, 11 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      sparkles(x, t, F.x, F.cy, P.t0 + 0.85, 8, 200, 0.2)
      L(x, 800, 760, 'GLOW-UP: ON', pop01(t, P.t0 + 1.1, 0.3, 2.4), '#ffb34a', 0.05, 36)
      bubble(x, 800, 960, 'iconic.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Declutter a drawer. | *Just one.*', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, lt < 1.3 ? 'JUNK DRAWER' : 'NICE DRAWER', pop01(t, P.t0 + 0.4, 0.3, 2.2), lt < 1.3 ? STEEL : MINT, 0.05, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.3, 8, 190, 0.3)
      L(x, 800, 1090, 'THE REST CAN WAIT', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Say the thing | you’ve been *holding in.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['i really', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), true], ['like you!', BONE, pop01(t, P.t0 + 0.9, 0.25, 2), true], ['me too!!', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.2)]] })
      hearts(x, t, 470, 780, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Let one grudge go. | *Feel lighter.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const up = ease.inOutCubic(prog(lt, 1.0, 2.4))
      balloon(x, t, lerp(780, 800, up), lerp(860, 700, up), pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.15 * up))
      L(x, 800, 1110, 'BYE, GRUDGE', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#c97bff', -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Take the trip | you *keep mentioning.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bits(x, 'STUB', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      L(x, 800, 680, 'MENTIONED: 41 TIMES', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, 0.05, 30)
      L(x, 800, 1060, 'BOOKED: FINALLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ff9a4a', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Rest counts | as *progress* too.', mood: lt => lt < 1.0 ? 'neutral' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'NAP: ON THE CALENDAR', pop01(t, P.t0 + 0.6, 0.3, 2.2), '#2fc79a', 0.04, 28)
      if (lt > 1.1) zzz(x, t, 470, 700)
      L(x, 800, 1080, 'GUILT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Text an old friend. | *Out of nowhere.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'OLD FRIEND', headCol: '#6fc3ff', lines: [['hi. thought', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['of you. ✦', BONE, pop01(t, P.t0 + 0.7, 0.25, 2), true], ['omg HI!!', GOLD, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      L(x, 800, 1110, 'LAST CHAT: 2019', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cry it out. | *Then bloom.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: lt => lt < 1.1 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outBack(clamp((lt - 0.9) / 0.6)) : clamp((lt - 0.9) / 0.6)
      drawBits(x, POT, { T: '#6fc3ff' }, 800, 1060, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (g > 0.01) drawBits(x, FLOWER, FLOWER_C, 800, 1060 - 140, 18 * g)
      L(x, 800, 680, 'WATERED (BY TEARS)', pop01(t, P.t0 + 0.4, 0.3, 2.2), SKYB, 0.05, 30)
      sparkles(x, t, 800, 920, P.t0 + 1.3, 7, 170, 0.3, [PINK, GOLD, BONE])
    } },
]

const F = makeFilm({
  id: 'r2a0560', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *spring reset.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh start. | *You’ve got this.*' },
  last: {
    text: 'Scorpio’s grudge? | *Still floating.*',
    draw(x, t, lt) {
      balloon(x, t, 540 + 40 * Math.sin(lt * 0.8), lerp(1250, 1000, ease.outCubic(clamp(lt / 3.5))), pop01(t, t - lt + 0.5, 0.4, 2) * 1.5)
      hearts(x, t, 540, 1420, t - lt + 1.2, { n: 6, life: 1.8, spread: 640, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
