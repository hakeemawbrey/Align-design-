// r2t0104: THE SIGNS AS… v3, ROLLCALL, "The signs on | their last day." (~57 s vertical, signs3kit social cut, music: lofi · D)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs on | their *last day.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one last day at work per sign (3.8 s each), pushed to the extreme:
//              ♈ farewell speech: one word, "Bye." · ♉ took the office chair, it's theirs now · ♊ said bye to everyone, twice each
//              · ♋ made everyone a scrapbook · ♌ planned their own farewell party · ♍ handover doc includes everyone's
//              birth chart · ♎ still deciding if they're leaving · ♏ took every secret with them · ♐ next job: on a boat
//              · ♑ worked overtime on their last day · ♒ said goodbye by hologram · ♓ cried at the goodbye cake
//  49.2        "Clocked out. | *Legendary.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Taurus got home. | *So did the chair.*"  Taurus rolls back in on the office chair.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', WATER = '#3d8fd8'

// ── props
function chair(x, cx, cy, k, spin = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#7a7aa0'; x.fillRect(-14, 40, 28, 110); x.fillRect(-120, 140, 240, 22)
  for (const wx of [-110, 0, 110]) { x.beginPath(); x.arc(wx + Math.sin(spin) * 6, 176, 18, 0, 7); x.fill() }
  x.fillStyle = INK; x.fillRect(-150, 0, 300, 60); x.fillStyle = '#4a4a6a'; x.fillRect(-140, 8, 280, 44)
  x.fillStyle = INK; x.fillRect(-130, -210, 260, 220); x.fillStyle = '#5a5a80'; x.fillRect(-120, -200, 240, 200)
  x.restore()
}
function banner(x, cx, cy, k, text, col = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 44px ${INTER}`; const w = x.measureText(text).width + 70
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -48, w + 16, 96); x.fillStyle = col; x.fillRect(-w / 2, -40, w, 80)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 8, -48); x.lineTo(-w / 2 - 50, 0); x.lineTo(-w / 2 - 8, 48); x.fill(); x.beginPath(); x.moveTo(w / 2 + 8, -48); x.lineTo(w / 2 + 50, 0); x.lineTo(w / 2 + 8, 48); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}
function balloon(x, t, cx, cy, k, col) {
  if (k <= 0.01) return
  const by = cy + Math.sin(t * 2 + cx) * 10
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, by + 70 * k); x.lineTo(cx + 6, by + 220 * k); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, by, 58 * k, 72 * k, 0, 0, 7); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, by, 50 * k, 64 * k, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - 26 * k, by - 36 * k, 12 * k, 20 * k)
}
function book(x, cx, cy, k, rot, col, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = col; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(-140, -180, 30, 360)
  x.fillStyle = BONE; x.fillRect(-90, -120, 210, 90)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(title).split('|').forEach((l, i, a) => x.fillText(l.trim(), 15, -75 + (i - (a.length - 1) / 2) * 34))
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}
const BOX = ['KKKKKKKKKKK', 'KYYYYYYYYYK', 'KYYYYKYYYYK', 'KYYYKKKYYYK', 'KKKKKKKKKKK', 'KBBBBBBBBBK', 'KBBBBGBBBBK', 'KBBBBBBBBBK', 'KBBBBBBBBBK', 'KKKKKKKKKKK']
const BOX_C = { K: INK, Y: '#3d3470', B: '#2a2350', G: GOLD }
function boat(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + Math.sin(t * 2.4) * 8); x.rotate(Math.sin(t * 2) * 0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -230, 12, 220)
  x.fillStyle = INK; x.beginPath(); x.moveTo(10, -220); x.lineTo(150, -40); x.lineTo(10, -40); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(18, -200); x.lineTo(134, -48); x.lineTo(18, -48); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, -20); x.lineTo(200, -20); x.lineTo(150, 70); x.lineTo(-150, 70); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-188, -12); x.lineTo(188, -12); x.lineTo(142, 62); x.lineTo(-142, 62); x.closePath(); x.fill()
  x.restore()
  x.fillStyle = INK; x.fillRect(cx - 260, cy + 56, 520, 70); x.fillStyle = WATER; x.fillRect(cx - 252, cy + 62, 504, 56)
  x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 5; i++) x.fillRect(cx - 230 + ((i * 97 + t * 50) % 460), cy + 76 + (i % 2) * 20, 40, 6)
}
function clock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 116, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 94 - 5, Math.sin(a) * 94 - 5, 10, 10) }
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(-Math.PI / 2 - Math.PI / 6) * 56, Math.sin(-Math.PI / 2 - Math.PI / 6) * 56); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(Math.PI / 2 - 0.6) * 0 , -86); x.stroke()
  x.restore()
}
function cake(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 90, 200, 40, 0, 0, 7); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 86, 190, 32, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.fillRect(-160, -60, 320, 150); x.fillStyle = '#8fe3ff'; x.fillRect(-150, -50, 300, 134)
  x.fillStyle = '#fff4e2'; x.fillRect(-150, -50, 300, 26)
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BYE :(', 0, 30)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Farewell speech? | *One word: “Bye.”*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'BYE.', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 90, tail: 'bl' })
      label(x, 790, 1060, 'SPEECH: 0.3 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Took the office chair. | *It’s theirs now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: 40, y: -120, s: 240 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { chair(x, 580, 960, 1.1 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 280, 700, 'PROPERTY OF TAURUS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Said bye to everyone. | *Twice each.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.8) * 84)
      bubble(x, 780, 680, Math.floor(lt * 3) % 2 ? 'bye!!' : 'ok, BYE!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 920, `GOODBYES: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made everyone | *a scrapbook.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      book(x, 820, 930, 0.85 * pop01(t, P.t0 + 0.6, 0.3, 2), 0.1, LAV, 'US | 2019–NOW')
      book(x, 770, 900, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2), -0.06, SKYB, 'MEMORIES | VOL. 12')
      label(x, 790, 650, 'ONE EACH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Farewell party? | *Planned it themself.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      banner(x, 600, 600, pop01(t, P.t0 + 0.2, 0.35, 2), 'WE’LL MISS LEO')
      balloon(x, t, 760, 860, pop01(t, P.t0 + 0.6, 0.35, 2), '#ffb34a'); balloon(x, t, 880, 820, pop01(t, P.t0 + 0.8, 0.35, 2), PINK)
      label(x, 820, 1140, 'HOST: LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Handover doc includes | *everyone’s birth chart.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) { if (k < 0.01) break; x.save(); x.translate(790, 1060 - i * 30); x.rotate((i % 2 ? 1 : -1) * 0.02); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -16, 340, 32); x.fillStyle = '#fff4e2'; x.fillRect(-162, -10, 324, 20); x.restore() }
      chart(x, 790, 820, 120, pop01(t, P.t0 + 0.8, 0.35, 2), t)
      label(x, 790, 640, 'PAGE 212 OF 400', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still deciding | *if they’re leaving.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, Math.floor(lt * 2.5) % 2 ? '…or stay?' : 'leave?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 920, 'TIME: 4:59 P.M.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: '#ff8fb1', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Took every secret | *with them.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 900, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'OFFICE GOSSIP', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 900, 'CLASSIFIED', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 40, bg: RED, color: BONE, rot: -0.12 })
    } },
  { sign: 'sagittarius', cap: 'Next job? | *On a boat.*', mood: 'sparkle', star: { x: 150, y: -60, s: 260 }, hops: [0.5, 1.4],
    back(x, t, lt, P) { boat(x, t, 330, 980, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 330, 640, 'DESTINATION: ???', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Worked overtime | *on their last day.*', mood: lt => lt < 1.2 ? 'neutral' : 'sleepy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      clock(x, 320, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 320, 1030, '11 P.M.', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 330, 1140, 'ONE MORE EMAIL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Said goodbye | *by hologram.*', mood: 'sparkle', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.45 + 0.25 * Math.sin(t * 40) * (Math.sin(t * 7) > 0.6 ? 1 : 0.2)
        signChar(x, t, 'aquarius', 790, 900, 240 * k, { mood: 'happy', look: [-1, 0], seed: 30, glyph: false })
        x.fillStyle = 'rgba(143,227,255,0.25)'; for (let i = 0; i < 12; i++) x.fillRect(650, 760 + i * 24, 280, 6)
        x.restore()
        x.fillStyle = INK; x.fillRect(710, 1060, 160, 30); x.fillStyle = SKYB; x.fillRect(720, 1064, 140, 20)
      }
      label(x, 790, 650, 'SIGNAL: FROM HOME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the goodbye cake.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, t, 790, 960, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'NOT EVEN THEIR CAKE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0104', key: 'D', accent: GOLD, ending: 'callback',
  title: 'The signs on | their *last day.*',
  cameos: CAMEOS,
  group: { cap: 'Clocked out. | *Legendary.*' },
  last: {
    text: 'Taurus got home. | *So did the chair.*',
    draw(x, t, lt) {
      const roll = ease.outCubic(prog(lt, 0.2, 1.2))
      chair(x, lerp(1180, 560, roll), 1150, 1.45, roll * 12)
      if (roll > 0.01) signChar(x, t, 'taurus', lerp(1180, 560, roll) - 10, 1030, 300, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 40, hops: [t - lt + 1.3] })
      label(x, 560, 1440, 'HOME OFFICE', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
