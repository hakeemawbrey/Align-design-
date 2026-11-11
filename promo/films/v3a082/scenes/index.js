// v3a082: zodiac.advice444, ADVICE SOLO, "Scorpio, read this | before your next date." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Scorpio dating truth, a warm reframe, one gag each.
//   0.0–3.6    "Scorpio, read this | *before your next date.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the interrogation lamp swings away, a cosy lamp swings in · sunglasses come off: MYSTERY 10% OFF
//              · their "typing…" bubble: IT'S NOT A PLOT · a huge vault door, one tiny hatch opens on a heart
//              · a chessboard with one heart piece: NO GAME PLAN · a birth chart printout: ASK THEM INSTEAD
//              · a little green cloud turns pink · floaties on: START IN THE SHALLOW END · a jack-in-the-box: SURPRISE!
//  37.8        "Deep waters. | *Soft heart.*"  Scorpio comes back.
//  41.2        CALLBACK: "Date two: | *floaties optional.*"  (the floaties come back)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#b07dff', RED = '#e23d4e', ORANGE = '#ffb34a'
const S = 'scorpio'

// ── props
const SHADES = ['KKKKK.KKKKK', 'KkKKKKKkKKK', 'KKKKK.KKKKK', '.KKK...KKK.']
const FLOAT = ['.OOOO.', 'OOWWOO', 'OW..WO', 'OW..WO', 'OOWWOO', '.OOOO.']
const FLOAT_C = { O: ORANGE, W: '#fff4e2' }
const CLOUD_BM = ['..CCC....', '.CCCCCCC.', 'CCCCCCCCC', '.CCCCCCC.']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a desk lamp on an arm: harsh white (interrogation) or warm (cosy)
function lamp(x, cx, cy, k, swing, warm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, 200, 180, 30); x.fillStyle = '#6b6b80'; x.fillRect(-84, 204, 168, 20)
  x.fillStyle = INK; x.fillRect(-8, 0, 16, 204); x.fillStyle = '#9a9ab0'; x.fillRect(-4, 0, 8, 202)
  x.translate(0, 0); x.rotate(swing)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, 10); x.lineTo(90, 10); x.lineTo(50, -80); x.lineTo(-50, -80); x.closePath(); x.fill()
  x.fillStyle = warm ? '#ffb34a' : '#c9c9d8'; x.beginPath(); x.moveTo(-80, 4); x.lineTo(80, 4); x.lineTo(44, -72); x.lineTo(-44, -72); x.closePath(); x.fill()
  x.globalAlpha = 0.35; x.fillStyle = warm ? '#ffd27a' : '#ffffff'
  x.beginPath(); x.moveTo(-70, 10); x.lineTo(70, 10); x.lineTo(warm ? 140 : 260, 260); x.lineTo(warm ? -140 : -260, 260); x.closePath(); x.fill()
  x.restore()
}
// a "typing…" bubble whose dots keep going
function typing(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -70, 300, 140); x.fillStyle = BONE; x.fillRect(-142, -62, 284, 124)
  x.fillStyle = INK; x.fillRect(-130, 62, 40, 30); x.fillStyle = BONE; x.fillRect(-122, 62, 26, 20)
  for (let i = 0; i < 3; i++) { const up = Math.max(0, Math.sin(t * 6 - i * 0.9)) * 16; x.fillStyle = '#6b62a8'; x.fillRect(-74 + i * 56 - 16, -16 - up, 32, 32) }
  x.restore()
}
// a huge round vault door with one tiny hatch that opens on a heart
function vault(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 200, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a8aa0'; x.beginPath(); x.arc(0, 0, 190, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6b6b80'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.fillRect(Math.cos(a) * 170 - 8, Math.sin(a) * 170 - 8, 16, 16) }
  // the wheel
  x.save(); x.rotate(t * 0.6); x.fillStyle = INK; for (let i = 0; i < 3; i++) { x.rotate(Math.PI / 3); x.fillRect(-90, -7, 180, 14) } x.restore()
  // the tiny hatch, bottom right
  x.fillStyle = INK; x.fillRect(48, 48, 64, 64); x.fillStyle = '#140c30'; x.fillRect(54, 54, 52, 52)
  x.restore()
  drawBits(x, HEART, { H: PINK }, cx + 80 * k, cy + 80 * k, 6 * k * open)
  if (open < 0.99) { x.save(); x.translate(cx + 48 * k, cy + 80 * k); x.scale(k * (1 - open), k); x.fillStyle = '#c9c9d8'; x.fillRect(0, -32, 64, 64); x.restore() }
}
// a chessboard with ordinary pieces and one heart piece
function chess(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -176, 352, 352)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#6b4a8a' : '#efe6d6'; x.fillRect(-168 + i * 42, -168 + j * 42, 42, 42) }
  x.restore()
  const P = ['.KK.', 'KKKK', '.KK.', 'KKKK']
  drawBits(x, P, { K: '#2a2350' }, cx - 100 * k, cy - 60 * k, 9 * k)
  drawBits(x, P, { K: '#2a2350' }, cx + 60 * k, cy - 110 * k, 9 * k)
  drawBits(x, HEART, { H: PINK }, cx + 10 * k, cy + 40 * k, 12 * k)
}
// a birth chart printout, covered in question marks
function chartSheet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -192, 316, 400)
  x.fillStyle = INK; x.fillRect(-162, -204, 324, 408)
  x.fillStyle = '#fff4e2'; x.fillRect(-154, -196, 308, 392)
  x.strokeStyle = PURPLE; x.lineWidth = 6; x.beginPath(); x.arc(0, -50, 110, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.arc(0, -50, 60, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(a) * 60, -50 + Math.sin(a) * 60); x.lineTo(Math.cos(a) * 110, -50 + Math.sin(a) * 110); x.stroke() }
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('fave food: ???', 0, 110); x.fillText('dreams: ???', 0, 154)
  x.restore()
}
// a pool depth sign
function poolSign(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 40, 24, 200); x.fillStyle = '#c9c9d8'; x.fillRect(-6, 40, 12, 196)
  x.fillStyle = INK; x.fillRect(-140, -70, 280, 130); x.fillStyle = SKYB; x.fillRect(-132, -62, 264, 114)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEEP END', 0, -24)
  x.font = `700 24px ${MONO}`; x.fillText('(feelings)', 0, 20)
  x.restore()
}
// a jack-in-the-box: the box, then a spring and a little heart face
function jackBox(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const up = ease.outBack ? ease.outBack(clamp(p)) : clamp(p)
  if (p > 0) {
    x.strokeStyle = INK; x.lineWidth = 10; x.beginPath()
    for (let i = 0; i <= 12; i++) { const yy = -40 - i * 14 * up, xx = (i % 2 ? 26 : -26); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke()
    x.fillStyle = INK; x.beginPath(); x.arc(0, -40 - 168 * up - 40, 50, 0, Math.PI * 2); x.fill()
    x.fillStyle = PINK; x.beginPath(); x.arc(0, -40 - 168 * up - 40, 42, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(-20, -40 - 168 * up - 52, 10, 10); x.fillRect(10, -40 - 168 * up - 52, 10, 10); x.fillRect(-14, -40 - 168 * up - 30, 28, 8)
  }
  x.fillStyle = INK; x.fillRect(-110, -50, 220, 190)
  x.fillStyle = RED; x.fillRect(-102, -42, 204, 174)
  x.fillStyle = GOLD; x.fillRect(-102, 30, 204, 22); x.fillRect(-12, -42, 24, 174)
  // the lid flipped back
  x.save(); x.translate(-110, -50); x.rotate(-Math.min(1, p * 3) * 2.0); x.fillStyle = INK; x.fillRect(0, -18, 220, 22); x.fillStyle = RED; x.fillRect(4, -14, 212, 14); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Skip the interrogation. | *Ask one question.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.8, 1.3))
      lamp(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lerp(-0.7, 0.15, sw), sw > 0.5)
      label(x, 800, 1110, sw > 0.5 ? 'COSY MODE' : 'WHERE WERE YOU…', 1, { size: 32, bg: sw > 0.5 ? ORANGE : '#c9c9d8', rot: -0.04, font: MONO, weight: 700 })
      if (sw > 0.5) bubble(x, 760, 580, 'so… fave snack?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Let them see | *a little of you.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', star: { x: -100 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const lift = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, SHADES, { K: INK, k: '#6b62a8' }, F.x, lerp(F.cy - 10, F.top - 50, lift), 11 * P.k, { rot: lift * 0.2 })
      label(x, 790, 640, 'MYSTERY: 10% OFF', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.35 * 3.1 / 2.4, 7, 150, 0.4)
    } },
  { sign: S, cap: 'A slow reply | *isn’t a plot.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      typing(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 950, 'THEY’RE JUST TYPING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trust can | *start small.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 1.0, 1.5)))
      label(x, 790, 1090, 'HATCH: OPEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Like them | *without a strategy.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      chess(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'NO GAME PLAN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04 })
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Their chart isn’t | *the whole story.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      chartSheet(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1090, 'ASK THEM INSTEAD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Felt jealous? | *Say it softly.*', mood: lt => lt > 1.4 ? 'heart' : 'eyeroll', star: { x: -150 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const turn = ease.inOutCubic(prog(lt, 1.0, 1.4))
      const col = turn < 0.5 ? '#7bd36a' : PINK
      drawBits(x, CLOUD_BM, { C: col }, F.x + 40, F.top - 70, 18 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 + 0.15 * Math.sin(Math.PI * turn)))
      bubble(x, 800, 1000, 'i missed you, | that’s all', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'All in is lovely. | *Wade in anyway.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      poolSign(x, 800, 740, pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 1.0, 0.3, 2.4)
      drawBits(x, FLOAT, FLOAT_C, F.x - 120, F.cy + 30, 14 * k); drawBits(x, FLOAT, FLOAT_C, F.x + 120, F.cy + 30, 14 * k)
      label(x, 800, 1110, 'SHALLOW END FIRST', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *surprise you.*', mood: lt => lt > 1.5 ? 'heart' : lt > 0.9 ? 'wide' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      jackBox(x, t, 800, 960, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.2))
      label(x, 800, 560, 'SURPRISE!', pop01(t, P.t0 + 1.05, 0.25, 2.6), { size: 44, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 800, 700, P.t0 + 1.05, 8, 190, 0.5)
    } },
]

const F = makeFilm({
  id: 'v3a082', key: 'E', accent: PURPLE, solo: S, ending: 'callback',
  title: 'Scorpio, read this | *before your next date.*',
  cameos: CAMEOS,
  group: { cap: 'Deep waters. | *Soft heart.*', mood: 'heart' },
  last: {
    text: 'Date two: | *floaties optional.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2.2)
      drawBits(x, FLOAT, FLOAT_C, 400, 900 + Math.sin(t * 2) * 10, 30 * k, { rot: -0.1 })
      drawBits(x, FLOAT, FLOAT_C, 680, 900 + Math.sin(t * 2 + 1) * 10, 30 * k, { rot: 0.1 })
      hearts(x, t, 540, 1150, t - lt + 0.9, { n: 6, life: 2.0, spread: 500, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'Scorpio,readthis'
async function build(stage) {
  const scene = await F.SCENES[0](stage)
  const box = [...stage.querySelectorAll('div')].find(d => d.querySelector(':scope > br') && d.textContent.replace(/\s+/g, '').startsWith(HOOK_START))
  if (box) {
    const prev = box.style.display; box.style.display = 'block'
    let widest = 0, cur = 0
    for (const n of box.childNodes) {
      if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
      cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || 92)
    }
    widest = Math.max(widest, cur)
    const maxW = parseFloat(box.style.width) || 940
    if (widest > maxW) {
      const k = Math.max(0.6, (maxW - 8) / widest)
      box.style.fontSize = (92 * k) + 'px'
      for (const sp of box.querySelectorAll(':scope > span')) if (sp.style.fontStyle === 'italic') sp.style.fontSize = (124 * k) + 'px'
    }
    box.style.display = prev
  }
  return scene
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
