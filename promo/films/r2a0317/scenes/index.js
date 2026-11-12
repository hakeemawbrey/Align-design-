// r2a0317: star_advice, ADVICE SOLO, "Signs a Leo | *likes you.*" (~52 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): the sweet, relatable ways a Leo shows they like you, one light gag each.
// Ending: card (lesson + last line over the match card).
//   0.0–3.6    hook
//   3.6–37.8   hypes you up louder than themselves · shares the spotlight (big for a Leo) · your snack, already in their bag
//              · you're on their profile · asks your sign and listens · lets you pick the song · saved you the best seat
//              · soft only with you · remembers the tiny thing you said
//  37.8        "Big heart. | *Bigger hugs.*"
//  41.0        LESSON: "A Leo’s love is loud. | Let it *warm you.*"  SPOTLIGHT: SHARED
//  46.9        "Their co-star? | *You.*" over the match card: Leo + Libra (the shared spotlight, card 2).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#9fb4c8', RED = '#e23d4e', CREAM = '#fff8ea', WOOD = '#c98f5a', SAND = '#f3d79a'
// ── props
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a wall clock */
function clock(x, cx, cy, k, hh, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
const LAPTOP = ['..KKKKKKKKKKKK..', '..KSSSSSSSSSSK..', '..KSWWWWWWWSSK..', '..KSSSSSSSSSSK..', '..KSWWWWWSSSSK..', '..KSSSSSSSSSSK..', '..KKKKKKKKKKKK..', 'GGGGGGGGGGGGGGGG', '.GGGGGGGGGGGGGG.']
const LAPTOP_C = { K: INK, S: SKYB, W: CREAM, G: '#a9a9bf' }
const UMBRELLA = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '......KK.......']
const UMBRELLA_C = { R: '#ff6b5a', W: CREAM, K: INK }
const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
const MEDAL = ['RR.....RR', '.RR...RR.', '..RR.RR..', '...RRR...', '..GGGGG..', '.GGYYYGG.', 'GGYGGGYGG', 'GGYGGGYGG', 'GGYGGGYGG', '.GGYYYGG.', '..GGGGG..']
const MEDAL_C = { R: '#e23d4e', G: GOLD, Y: '#fff1a8' }
const BOOK = ['KKKKKKKKKKKKKKKK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLWWK', 'KWWWWWWKKWWWWWWK', 'KWLLLWWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLWWWK', 'KWWWWWWKKWWWWWWK', 'KKKKKKKKKKKKKKKK']
const BOOK_C = { K: '#8a4a2e', W: '#fff8ea', L: '#9a90b8' }
const PIGGY = ['......PP....', '.PPPPPPPPP..', 'PPPPPPPPPPP.', 'PPKPPPPPPPPS', 'PPPPPPPPPPPS', 'PPPPPPPPPPP.', '.PPPPPPPPP..', '.PP.....PP..']
const PIGGY_C = { P: '#ff9cc0', K: INK, S: '#ff6fa3' }
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const COIN_C = { Y: GOLD, W: '#fff1a8' }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }
const BED = ['WW.............', 'WW.............', 'WWPPPBBBBBBBBBB', 'WWPPPBBBBBBBBBB', 'WWBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'W.............W']
const BED_C = { W: '#c98f5a', P: '#fff8ea', B: '#8fb8ff' }

const ORANGE = '#ffb34a'
/** a cone of stage light from above */
function spot(x, cx, top, bottom, w, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * k
  const g = x.createLinearGradient(0, top, 0, bottom); g.addColorStop(0, '#fff6c8'); g.addColorStop(1, 'rgba(255,246,200,0.1)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, top); x.lineTo(cx + 40, top); x.lineTo(cx + w / 2, bottom); x.lineTo(cx - w / 2, bottom); x.closePath(); x.fill()
  x.restore()
}
const MEGA = ['......KK', '....KKOK', 'KKKKOOOK', 'KOOOOOOK', 'KOOOOOOK', 'KKKKOOOK', '..KK.KOK', '..KK...K']
const MEGA_C = { K: INK, O: ORANGE }
const BAG = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BBSSSSSSBB', 'BBSYYYYSBB', 'BBSYYYYSBB', 'BBSSSSSSBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BAG_C = { K: INK, B: '#c98f5a', S: RED, Y: GOLD }
const SEAT = ['.RRRRRRR.', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'WWWWWWWWW', 'RRRRRRRRR', 'K.......K', 'K.......K']
const SEAT_C = { R: '#c23a5a', W: '#e8607e', K: INK }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }

const S = 'leo'
const CAMEOS = [
  { sign: S, cap: 'They hype you up | *louder than themselves.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, MEGA_C, F.x + 170, F.cy - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 790, 700, 'THAT’S MY | FRIEND!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      sparkles(x, t, 800, 760, P.t0 + 0.7, 7, 180, 0.2)
    } },
  { sign: S, cap: 'They share the spotlight. | *Huge, for a Leo.*', mood: 'heart', look: [1, 0], star: { x: -110 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const sh = ease.inOutCubic(prog(lt, 0.6, 1.3))
      spot(x, lerp(430, 540, sh), 470, 1200, lerp(380, 640, sh), pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 720, 920, 230 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 22, glyph: false })
      label(x, 600, 640, 'CO-STAR: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your favourite snack? | *Already in their bag.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 780, 900, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 780, 660, 'SNACKS: FOR YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re on | *their profile.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      sheet(x, 770, 860, k, { w: 330, h: 400, head: '♌︎ PROFILE', headCol: ORANGE, rows: [], scale: 1.1 })
      if (k > 0.6) { signChar(x, t, 'leo', 720, 880, 120, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.5 }); signChar(x, t, 'libra', 830, 890, 120, { mood: 'heart', seed: 62, glyph: false, glow: 0.5 }) }
      label(x, 770, 1080, 'PINNED. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They ask your sign | *and actually listen.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'what’s your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 860, 'ooh. tell me | everything.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      label(x, 790, 1060, 'PHONE: FACE DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They let you | *pick the song.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♪ AUX', headCol: GOLD, lines: [
        ['your pick ♡', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['(they hum it', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['for a week)', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'The best seat? | *Saved for you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SEAT, SEAT_C, 790, 950, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) drawBits(x, CROWN, CROWN_C, 790, lerp(600, 790, d), 14)
      label(x, 790, 1150, 'RESERVED: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big roar for everyone. | *Soft with you.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.0 ? 0.04 : 0,
    front(x, t, lt, P) {
      label(x, 790, 680, lt < 1.0 ? 'ROAR: ON' : 'ROAR: PURR', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: lt < 1.0 ? RED : PINK, color: lt < 1.0 ? CREAM : INK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 1.3, { n: 7, life: 1.8, spread: 260, cell: 8, seed: 5 })
    } },
  { sign: S, cap: 'That tiny thing you said? | *They remembered.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 330, head: 'NOTES: YOU', headCol: ORANGE, size: 30, rows: [
        ['likes rain ✓', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['no onions ✓', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['cat: biscuit ✓', INK, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2a0317', key: 'F', accent: ORANGE, solo: 'leo', ending: 'card',
  title: 'Signs a Leo | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'libra', chip: 'CO-STARS' },
  group: { cap: 'Big heart. | *Bigger hugs.*', mood: 'heart' },
  lesson: { text: 'A Leo’s love is loud. | Let it *warm you.*', chip: 'SPOTLIGHT: SHARED' },
  last: { text: 'Their co-star? | *You.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
