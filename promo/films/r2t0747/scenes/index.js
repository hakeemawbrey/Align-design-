// r2t0747: star_talk, BELIKE, "Self-checkout? | Zodiacs *be like.*" (~54 s vertical, signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order at the self-checkout, each pushed to the extreme:
//   Aries done in nine seconds · Taurus ate the snack before scanning · Gemini asked the machine its sign
//   · Cancer apologised to the scanner · Leo bowed at "thank you" · Virgo bagged by colour · Libra let everyone go first
//   · Scorpio stared down the unexpected item · Sagittarius wandered off mid-scan · Capricorn read the receipt aloud
//   · Aquarius scanned their birth chart · Pisces cried at "please wait"
//  49.2  group beat (the ending): "Help light on. | *For all twelve.*" (the kiosk light flashes)
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0'

// a self-checkout kiosk: screen with a message, a scanner glass with a red beam, a help light on a pole
function kiosk(x, t, cx, cy, k, { text = '', light = false, beam = true, size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(1.3 * k, 1.3 * k)
  // pole + help light
  x.fillStyle = INK; x.fillRect(96, -250, 16, 120)
  const on = light && Math.floor(t * 4) % 2 === 0
  x.fillStyle = INK; x.fillRect(80, -292, 48, 48); x.fillStyle = on ? '#ff4f5e' : '#6b2a3a'; x.fillRect(86, -286, 36, 36)
  if (on) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#ff4f5e'; x.beginPath(); x.arc(104, -268, 54, 0, Math.PI * 2); x.fill(); x.restore() }
  // body
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -126, 250, 330)
  x.fillStyle = INK; x.fillRect(-130, -138, 260, 330)
  x.fillStyle = '#9aa5c4'; x.fillRect(-122, -130, 244, 314)
  x.fillStyle = NIGHT; x.fillRect(-106, -114, 212, 140)
  x.fillStyle = MINT; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -44 + (i - (a.length - 1) / 2) * (size + 6), 200))
  // scanner glass
  x.fillStyle = INK; x.fillRect(-100, 60, 200, 70); x.fillStyle = '#2a2350'; x.fillRect(-92, 66, 184, 58)
  if (beam) { x.fillStyle = '#ff4f5e'; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 12); x.fillRect(-84, 92, 168, 6); x.globalAlpha = 1 }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Scanned everything | in *nine seconds.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.2) / 1.2) * 9))
      kiosk(x, t, 770, 920, pop01(t, P.t0 + 0.15, 0.3, 2), { text: `TIME | 0:0${n}` , size: 38 })
      L(x, 790, 1130, 'NEW RECORD', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 790, 860, P.t0 + 1.5, 7, 180, 0.2)
    } },
  { sign: 'taurus', cap: 'Ate the snack | *before scanning it.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const bite = lt > 0.9
      bits(x, 'COOKIE', 790, 860, (bite ? 28 * (1 - clamp((lt - 0.9) / 0.8) * 0.5) : 28) * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'ITEM: 1', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0.05, 34)
      L(x, 790, 1060, 'SCANNED: CRUMBS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Asked the machine | *its sign.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      kiosk(x, t, 770, 940, pop01(t, P.t0 + 0.2, 0.3, 2), { text: lt > 1.4 ? 'ERROR | ???' : 'PLEASE | SCAN ITEM' })
      bubble(x, 560, 600, 'and your sign?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Said sorry | to the *scanner.*', mood: lt => lt > 1 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'BEEP' , size: 40 })
      bubble(x, 600, 600, 'sorry! so sorry!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bc' })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 5)
      L(x, 390, 1110, `APOLOGIES: ${n}`, pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'It said “thank you.” | Leo *bowed.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.1 && lt < 1.7 ? 0.12 : 0,
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'THANK | YOU!', size: 36 })
      L(x, 390, 640, 'ENCORE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.05, 38)
      sparkles(x, t, 370, 860, P.t0 + 1.2, 7, 190, 0.6)
    } },
  { sign: 'virgo', cap: 'Bagged *by colour.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BAG', 700, 980, 14 * k); bits(x, 'BAG', 880, 980, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bits(x, 'APPLE', 700, 870, 10 * pop01(t, P.t0 + 0.8, 0.3, 2)); bits(x, 'APPLE', 740, 860, 10 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 700, 760, 'REDS', pop01(t, P.t0 + 0.9, 0.3, 2), RED, -0.05, 30)
      L(x, 880, 760, 'GREENS', pop01(t, P.t0 + 1.2, 0.3, 2), MINT, 0.05, 30)
      L(x, 790, 1130, 'SYSTEM: PERFECT', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.03, 30)
    } },
  { sign: 'libra', cap: 'Let everyone | *go first.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ids = ['taurus', 'virgo', 'capricorn']
      ids.forEach((id, i) => friend(x, t, id, 690 + i * 120, 980 - (i % 2) * 30, 140, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { look: [1, 0], mood: 'happy', seed: 40 + i }))
      bubble(x, 600, 640, 'no, you go!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 820, 'QUEUE: STILL LAST', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Unexpected item? | *Stared it down.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: lt > 1.6 ? 'ITEM | OK ✓' : 'UNEXPECTED | ITEM', size: 24 })
      bubble(x, 560, 620, '…explain.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'br', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Wandered off | *mid-scan.*', mood: 'sparkle', look: [-1, 0], star: { x: -220, y: -20 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'CUSTOMER?', size: 32 })
      bubble(x, 330, 640, 'ooh, plants!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Read the receipt. | *Out loud.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 360, rot: 0.04, bg: '#ffffff', head: 'RECEIPT', headBg: STEEL, headInk: INK, lines: ['milk ...... ✓', 'bread ..... ✓', 'eggs ...... ✓', 'bag ....... ?!'], size: 26, font: MONO, weight: 700, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      bubble(x, 420, 620, 'line three…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Scanned their | *birth chart.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: lt > 1.2 ? 'PRICE: | PRICELESS' : 'SCANNING…', size: 26 })
      // a little round chart card held over the glass
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(770, 1050); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#6b62a8'; x.lineWidth = 4
        for (let i = 0; i < 6; i++) { const a = i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(a) * 48, Math.sin(a) * 48); x.lineTo(-Math.cos(a) * 48, -Math.sin(a) * 48); x.stroke() }
        x.restore()
      }
    } },
  { sign: 'pisces', cap: 'It said *“please wait.”* | Pisces wept.', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      kiosk(x, t, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'PLEASE | WAIT', size: 36, light: true })
      bubble(x, 420, 620, 'so polite…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0747', key: 'E', accent: ACC, ending: 'group',
  title: 'Self-checkout? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Help light on. | *For all twelve.*',
    draw(x, t, lt) { kiosk(x, t, 540, 715, 0.65 * pop01(t, t - lt + 1.3, 0.35, 2), { text: 'HELP IS | COMING', size: 30, light: true, beam: false }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
