// r2t0521: star_talk, SOLO, "Capricorn parties | *be like.*" (topic: Capricorns at a party) (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine party moments, each the most extreme Capricorn version. Ending: group.
//   0.0–3.6    "Capricorn parties | *be like.*"
//   3.6–37.8   nine cards: arrived 8:00 sharp, host not dressed · birthday, handed out business cards · brought an agenda,
//              printed copies · brought a gift with a warranty · did their taxes in the coat room · "one more hour",
//              meant exactly one · "what's your sign?" handed over a résumé · musical chairs like a merger
//              · secretly had fun, booked next year's
//  37.8        group (the ending): "Came to network. | *Stayed for cake.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9aa5c4', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'capricorn'

// a framed sheet of paper (bone card with ink outline and shadow), body drawn by fn in local coords
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function clock(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 136, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 112 - 6, Math.sin(a) * 112 - 6, 12, 12) }
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(Math.PI * 5 / 6) * 66, Math.sin(Math.PI * 5 / 6) * 66); x.stroke()   // hour hand on 8
  x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -100); x.stroke()          // minute hand on 12
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 14, 0, 7); x.fill()
  x.restore()
}
function bizCard(x, cx, cy, k, rot) {
  sheet(x, cx, cy, 250, 140, k, rot, () => {
    txt(x, '♑︎ CAPRICORN', 0, -30, 26, '#4a4470', 'center', MONO, 700)
    txt(x, 'Guest. Visionary.', 0, 14, 24, INK)
    x.fillStyle = ACC; x.fillRect(-100, 44, 200, 8)
  })
}
function clipboard(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 290, 380, k, 0.05, () => {
    x.fillStyle = BROWN; x.fillRect(-60, -210, 120, 40)
    txt(x, 'PARTY AGENDA', 0, -140, 28, INK)
    const rows = ['8:00  arrive', '8:05  small talk', '8:40  cake', '9:00  reflect']
    rows.forEach((r, i) => { if (lt > 0.4 + i * 0.25) { txt(x, r, -120, -70 + i * 62, 25, '#2a2350', 'left', MONO, 700); x.fillStyle = MINT; x.fillRect(100, -82 + i * 62, 22, 22) } })
  })
}
function gift(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -96, 260, 226); x.fillRect(-146, -136, 292, 60)
  x.fillStyle = PINK; x.fillRect(-120, -86, 240, 206)
  x.fillStyle = '#ff6b9a'; x.fillRect(-136, -126, 272, 44)
  x.fillStyle = GOLD; x.fillRect(-18, -126, 36, 246)
  x.fillStyle = INK; x.fillRect(-64, -178, 52, 40); x.fillRect(12, -178, 52, 40)
  x.fillStyle = GOLD; x.fillRect(-56, -170, 38, 26); x.fillRect(18, -170, 38, 26)
  x.restore()
}
function calc(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -170, 256, 360)
  x.fillStyle = INK; x.fillRect(-132, -182, 264, 364)
  x.fillStyle = '#4a4470'; x.fillRect(-122, -172, 244, 344)
  x.fillStyle = '#b8f5c8'; x.fillRect(-104, -152, 208, 70)
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 99999)
  txt(x, String(n).padStart(5, '0'), 92, -116, 40, INK, 'right', MONO, 700)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { x.fillStyle = c === 3 ? ORANGE : CREAM; x.fillRect(-100 + c * 52, -56 + r * 54, 42, 42) }
  x.restore()
}
function timer(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 300, 170, k, -0.04, () => {
    const s = Math.max(0, 3600 - Math.floor(clamp((lt - 0.3) / 1.7) * 3600))
    const mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0')
    txt(x, `${mm}:${ss}`, 0, 6, 76, s === 0 ? RED : INK, 'center', MONO, 700)
  }, '#d8f0ff')
}
function resume(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 280, 370, k, 0.05, () => {
    x.fillStyle = ACC; x.fillRect(-140, -185, 280, 70)
    txt(x, 'RÉSUMÉ', 0, -150, 34, INK)
    txt(x, '♑︎ sign: capricorn', -118, -80, 22, '#2a2350', 'left', MONO, 700)
    const rows = ['· 10 yrs exp.', '· references', '· 5-yr plan', '  (attached)']
    rows.forEach((r, i) => txt(x, r, -118, -30 + i * 48, 24, '#2a2350', 'left', MONO, 700))
  })
}
const CHAIR = ['KKKKK....', 'KBBBK....', 'KBBBK....', 'KBBBKKKKK', 'KBBBBBBBK', 'KKKKKKKKK', 'K.......K', 'K.......K', 'K.......K']
function calendar(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 300, 320, k, 0.04, () => {
    x.fillStyle = RED; x.fillRect(-150, -160, 300, 60)
    txt(x, 'NEXT YEAR', 0, -130, 30, CREAM)
    for (let d = 0; d < 28; d++) { const c = d % 7, r = Math.floor(d / 7); x.fillStyle = d === 17 ? GOLD : '#d9d0bf'; x.fillRect(-130 + c * 38, -80 + r * 52, 30, 40) }
    if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(-130 + 3 * 38 + 15, -80 + 2 * 52 + 20, 34, 0, 7 * clamp((lt - 1.0) / 0.4)); x.stroke() }
  })
}

const CAMEOS = [
  { sign: S, cap: 'Arrived 8:00 sharp. | Host *wasn’t dressed.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      L(x, 790, 1040, 'EARLY = ON TIME', pop01(t, P.t0 + 0.8, 0.3, 2.4), ACC, 0.04)
      bubble(x, 790, 1150, 'one sec!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
    } },
  { sign: S, cap: 'It’s a birthday. | Handed out *business cards.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bizCard(x, 780 + (i - 1.5) * 30, 820 + (i - 1.5) * 70, pop01(t, P.t0 + 0.25 + i * 0.22, 0.3, 2), -0.12 + i * 0.08)
      bubble(x, 790, 600, 'let’s connect.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Brought an agenda. | *Printed copies.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clipboard(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1110, 'COPIES: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Brought a gift. | With a *warranty.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      gift(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'WARRANTY: 5 YRS', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, -0.05, 32)
      L(x, 790, 1100, 'RECEIPT INCLUDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: S, cap: 'Did their taxes | in the *coat room.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calc(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 600, 'COAT ROOM', pop01(t, P.t0 + 0.4, 0.3, 2.4), BONE, -0.05, 30)
      L(x, 790, 1110, 'REFUND: FOUND', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Said “one more hour.” | Meant *exactly one.*', mood: lt => lt > 2.0 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      timer(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 1040, 'goodnight. | all of you.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: '“What’s your sign?” | Handed over *a résumé.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 610, 'your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      resume(x, 790, 900, pop01(t, P.t0 + 0.7, 0.35, 2), lt)
    } },
  { sign: S, cap: 'Musical chairs? | Treated it like *a merger.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -60, y: -40, s: 260 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CHAIR, { K: INK, B: BROWN }, 480, 1010, 18 * k)
      // the other chairs slide away, one by one
      for (let i = 0; i < 3; i++) { const g = ease.inCubic(prog(lt, 0.6 + i * 0.3, 1.0 + i * 0.3)); drawBits(x, CHAIR, { K: INK, B: '#4a4470' }, 700 + i * 0 + g * 300, 1010 - i * 0, 14 * k, { alpha: 1 - g }) }
    },
    front(x, t, lt, P) { L(x, 760, 640, 'CHAIR: ACQUIRED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 34) } },
  { sign: S, cap: 'Secretly had fun. | Booked *next year’s.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1120, 'SAVE THE DATE', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0521', key: 'C', accent: ACC, solo: 'capricorn', ending: 'group',
  title: 'Capricorn parties | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Came to network. | *Stayed for cake.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
