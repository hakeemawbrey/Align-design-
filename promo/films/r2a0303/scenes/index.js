// r2a0303: star_advice, ADVICE SOLO, "How to cheer up | *a Sagittarius.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine kind ways to lift a Sagittarius, each a relatable truth + a warm reframe. Ending: group.
//   0.0–3.6    "How to cheer up | *a Sagittarius.*"
//   3.6–37.8   nine cards: plan a tiny adventure (the corner shop counts) · make them laugh first · don't box them in, open a
//              window · ask about their next trip · a bad day isn't a bad life · let them rant, then walk · be honest, kindly
//              · send something silly · remind them the world is still huge
//  37.8        group (the ending): "Room to roam. | *Back to grinning.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c58bff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', LEAF = '#5fd48a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const WINDOW = ['KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK']
const CASE = ['...KKKKKK...', '...K....K...', 'KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBPPBBBBYYBK', 'KBPPBBBBYYBK', 'KBBBBMMBBBBK', 'KBBBBMMBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const SHOE = ['...KKKK....', '..KRRRRK...', '.KRRWRRRKK.', 'KRRRRRRRRRK', 'KWWWWWWWWWK', 'KKKKKKKKKKK']
const DUCK = ['..KKK....', '.KYYYK...', '.KYKYKOO.', '.KYYYKOO.', 'KYYYYYK..', 'KYYYYYYK.', '.KYYYYK..', '..KKKK...']
const SUNB = ['...Y..Y..Y...', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..']

function mapCard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -146, 352, 292)
  x.fillStyle = '#f2dfb0'; x.fillRect(-168, -138, 336, 276)
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath()
  const p = clamp((lt - 0.3) / 1.2); x.moveTo(-130, 90); x.quadraticCurveTo(-40, -120, lerp(-130, 110, p), lerp(90, -70, p)); x.stroke(); x.setLineDash([])
  if (p >= 1) { x.fillStyle = RED; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 110, -70) }
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('CORNER SHOP', 70, -14)
  x.restore()
}
function weekCard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-186, -96, 372, 192)
  x.fillStyle = BONE; x.fillRect(-178, -88, 356, 176)
  const D = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  D.forEach((d, i) => {
    const px = -152 + i * 51
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(d, px, -60)
    if (i === 2) { x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(px - 8, 10, 16, 0, 7); x.arc(px + 10, 6, 18, 0, 7); x.fill() }
    else { x.fillStyle = GOLD; x.beginPath(); x.arc(px, 8, 18, 0, 7); x.fill() }
  })
  x.restore()
}
function phone(x, cx, cy, k, head, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -210, 280, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#140c30'; x.fillRect(-118, -176, 236, 352)
  x.fillStyle = ACC; x.fillRect(-106, -162, 212, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -136)
  rows.forEach(([txt, col, kk], i) => { if (kk <= 0.01) return; x.save(); x.translate(0, -54 + i * 72); x.scale(kk, kk); x.fillStyle = col; x.fillRect(-106, -27, 212, 54); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(txt, 0, 2); x.restore() })
  x.restore()
}

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Plan a tiny adventure. | *The corner shop counts.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mapCard(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1090, 'EXPEDITION: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD)
    } },
  { sign: S, cap: 'Make them laugh first. | *Talk later.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.6, 1.9],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'knock knock', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      L(x, 790, 920, 'HA!', pop01(t, P.t0 + 1.2, 0.3, 2.6), GOLD, -0.12, 80)
      L(x, 830, 1080, 'MOOD: RECOVERING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Don’t box them in. | *Open a window.*', mood: lt => lt > 1.1 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = lt > 0.9
      drawBits(x, WINDOW, { K: INK, S: open ? SKYB : '#3a3466' }, 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (open) { x.save(); x.strokeStyle = CREAM; x.lineWidth = 7; x.lineCap = 'round'; for (let i = 0; i < 3; i++) { const o = (t * 300 + i * 80) % 220; x.globalAlpha = 0.8; x.beginPath(); x.moveTo(800 - o, 760 + i * 70); x.lineTo(700 - o, 760 + i * 70); x.stroke() } x.restore() }
      L(x, 800, 1090, 'FRESH AIR: IN', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04)
    } },
  { sign: S, cap: 'Ask about their next trip. | *Watch them glow.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, B: '#c98f5a', P: PINK, Y: GOLD, M: MINT }, 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'so where | next?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      if (lt > 1.0) sparkles(x, t, 560, 860, P.t0 + 1.0, 8, 170, 0.2)
      L(x, 800, 1100, 'GLOW: MAXIMUM', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04)
    } },
  { sign: S, cap: 'A bad day isn’t | *a bad life.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      weekCard(x, 770, 840, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1040, 'ONE CLOUD. SIX SUNS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Let them rant. | Then *go for a walk.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.3, 1.6, 1.9],
    front(x, t, lt, P) {
      if (lt < 1.1) bubble(x, 790, 720, 'AND ANOTHER | THING!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: '#ff8f6a', tail: 'bl' })
      else { drawBits(x, SHOE, { K: INK, R: ACC, W: CREAM }, 720, 920 + (Math.floor(lt * 5) % 2) * -16, 24); drawBits(x, SHOE, { K: INK, R: ACC, W: CREAM }, 880, 920 + (Math.floor(lt * 5 + 1) % 2) * -16, 24) }
      L(x, 800, 1100, lt < 1.1 ? 'RANT: IN PROGRESS' : 'WALK: BETTER', 1, lt < 1.1 ? BONE : MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Be honest, kindly. | *They’ll respect it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'real talk?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      bubble(x, 790, 900, 'finally. | thank you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      L(x, 790, 1100, 'NO SUGARCOATING ♥', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Send something silly. | *Instant sunshine.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), 'NEW MESSAGE', [['look at', BONE, 1], ['this duck', BONE, 1]])
      const kd = pop01(t, P.t0 + 0.8, 0.3, 2.4)
      drawBits(x, DUCK, { K: INK, Y: GOLD, O: ORANGE }, 780, 1005, 14 * kd, { rot: Math.sin(t * 6) * 0.1 })
    } },
  { sign: S, cap: 'Remind them the world | *is still huge.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const rise = ease.outCubic(prog(lt, 0.2, 1.4))
      x.save(); x.beginPath(); x.rect(560, 560, 400, 520); x.clip()
      drawBits(x, SUNB, { Y: GOLD, O: ORANGE }, 790, lerp(1020, 850, rise), 24)
      x.fillStyle = LEAF; x.beginPath(); x.ellipse(700, 1020, 220, 90, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3fae6e'; x.beginPath(); x.ellipse(900, 1040, 220, 90, 0, 0, Math.PI * 2); x.fill()
      x.restore()
      L(x, 790, 650, 'NEXT STOP: ANYWHERE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0303', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'group',
  title: 'How to cheer up | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Room to roam. | *Back to grinning.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
