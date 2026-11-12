// r2t0319: star_talk, ROLLCALL, "The signs at | *the toy store.*" (topic: The signs at a toy store) (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each its most extreme self in a toy store. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ raced the trolley, won, against nobody · ♉ tested every plush, still testing · ♊ walkie-talkies, talked to themself
//              · ♋ saw one lonely plush, adopted them all · ♌ toy piano, took a bow · ♍ sorted the blocks by colour · ♎ gave every doll a glow-up
//              · ♏ shook the mystery box, already knows · ♐ bounced every ball · ♑ bought a toy till, for practice
//              · ♒ ignored the toy, built a box robot · ♓ the music box played, Pisces cried
//  49.2        "Twelve big kids. | *One toy store.*"
//  52.4        LESSON: "Your inner kid | still *wants to play.*"  PLAYTIME: UNLOCKED  →  last: "Grown-ups? | *Not in this aisle.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
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

const TOY = '#ffcf5a', ORANGE = '#ff9a4a'
const CART = ['KK..............', '.K..............', '.KKKKKKKKKKKKKKK', '.KSSSSSSSSSSSSK.', '..KSSSSSSSSSSK..', '..KSSSSSSSSSSK..', '...KKKKKKKKKK...', '...K.......K....', '..KKK.....KKK...']
const CART_C = { K: INK, S: '#c9d4e8' }
const BEAR = ['.BB.....BB.', 'BBBB...BBBB', '.BBBBBBBBB.', 'BBBKBBBKBBB', 'BBBBBBBBBBB', 'BBBBTTTBBBB', '.BBBBKBBBB.', '..BBBBBBB..', '.BBBBBBBBB.', 'BBBBBBBBBBB', 'BBB.....BBB']
const BEAR_C = { B: '#c98f5a', K: INK, T: '#f3d79a' }
const WALKIE = ['.K....', '.K....', 'KKKKKK', 'KGGGGK', 'KGGGGK', 'KKKKKK', 'KRKRKK', 'KKKKKK', 'KRKRKK', 'KKKKKK']
const PIANO = ['KKKKKKKKKKKKKKKK', 'KRRRRRRRRRRRRRRK', 'KWKWWKWKWWKWKWWK', 'KWKWWKWKWWKWKWWK', 'KWWWWWWWWWWWWWWK', 'KWWWWWWWWWWWWWWK', 'KKKKKKKKKKKKKKKK', '.K............K.', '.K............K.']
const PIANO_C = { K: INK, R: RED, W: CREAM }
const DOLL = ['...PPPP...', '..PBBBBP..', '..BSSSSB..', '..BSKSKB..', '..BSSSSB..', '...SRRS...', '..DDDDDD..', '.DDDDDDDD.', 'DDDDDDDDDD', '...S..S...']
const DOLL_C = { P: PINK, B: '#8a4a2e', S: '#ffd9b8', K: INK, R: RED, D: '#b07bff' }
const BOX = ['KKKKKKKKKKKK', 'KYYYYQQYYYYK', 'KYYYYQQYYYYK', 'KKKKKKKKKKKK', 'KYYYYYYYYYYK', 'KYYY?YY?YYYK', 'KYYYYYYYYYYK', 'KYYY?YY?YYYK', 'KYYYYYYYYYYK', 'KKKKKKKKKKKK']
const BOX_C = { K: INK, Y: TOY, Q: RED, '?': '#b07bff' }
const BALL = ['.RRRR.', 'RWRRRR', 'RRRRRR', 'RRRRRR', '.RRRR.']
const TILL = ['....KKKKKK....', '....KGGGGK....', '....KKKKKK....', 'KKKKKKKKKKKKKK', 'KPPPPPPPPPPPPK', 'KPWKWKWKWKWKPK', 'KPKWKWKWKWKWPK', 'KPPPPPPPPPPPPK', 'KKKKKKKKKKKKKK', 'KYYYYYYYYYYYYK', 'KKKKKKKKKKKKKK']
const TILL_C = { K: INK, G: MINT, P: PINK, W: CREAM, Y: GOLD }
const ROBOT = ['....K....', '....R....', '.CCCCCCC.', '.CKCCCKC.', '.CCCCCCC.', '.CKKKKKC.', '...CCC...', 'CCCCCCCCC', 'C.CCCCC.C', 'C.CCCCC.C', '..CC.CC..', '..CC.CC..']
const ROBOT_C = { K: INK, R: RED, C: '#d9b27a' }
const MBOX = ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPWWWWWWWWPK', 'KPWPPPPPPWPK', 'KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPPPPGGPPPPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK']
const MBOX_C = { K: INK, P: '#8fd0ff', W: CREAM, G: GOLD }

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the trolley. | *Won. Against nobody.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CART, CART_C, lerp(640, 790, clamp(lt / 1.2)), 980, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 680, '1ST PLACE ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Tested every plush. | *Still testing.*', mood: 'sleepy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, BEAR, BEAR_C, 780, 900, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 780, 1130, 'SOFTNESS: 10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SAND, rot: 0.04, font: MONO, weight: 700 })
      x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.globalAlpha = 0.8; x.fillText('z', 420, 700 - (t * 30) % 60)
    } },
  { sign: 'gemini', cap: 'Got walkie-talkies. | *Talked to themself.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: 0 },
    front(x, t, lt, P) {
      drawBits(x, WALKIE, { K: INK, G: MINT, R: RED }, 260, 940, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.15 })
      drawBits(x, WALKIE, { K: INK, G: MINT, R: RED }, 820, 940, 16 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.15 })
      bubble(x, 280, 680, 'you there?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      bubble(x, 800, 680, 'yes. it’s me.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Saw one lonely plush. | *Adopted all of them.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); drawBits(x, BEAR, { ...BEAR_C, B: [ '#c98f5a', PINK, SKYB, LAV, MINT, '#ff9a4a'][i] }, 640 + (i % 3) * 120, 1040 - Math.floor(i / 3) * 150, 10 * k) }
      label(x, 760, 650, 'ADOPTED: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Played the toy piano. | *Took a bow.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.3 && lt < 1.9 ? 0.1 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIANO, PIANO_C, 790, 960, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      notes(x, t, 790, 860, { n: 4, cell: 7, col: GOLD, seed: 3 })
      label(x, 790, 680, 'ENCORE? (ASKED THEMSELF)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted the building blocks | *by colour.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const C = [RED, '#ff9a4a', GOLD, MINT, SKYB, LAV], s = clamp((lt - 0.3) / 1.2)
      for (let i = 0; i < 18; i++) { const c = i % 6, r = Math.floor(i / 6), mx = 650 + ((i * 7) % 6) * 50, my = 1080 - ((i * 5) % 3) * 50, sx = 650 + c * 50, sy = 1080 - r * 50
        x.fillStyle = INK; x.fillRect(lerp(mx, sx, s) - 3, lerp(my, sy, s) - 3, 48, 48); x.fillStyle = C[c]; x.fillRect(lerp(mx, sx, s), lerp(my, sy, s), 42, 42) }
      label(x, 790, 680, 'AISLE: FIXED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Gave every doll | *a glow-up.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOLL, DOLL_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 1.0, 8, 190, 0.3, [PINK, GOLD, BONE])
      label(x, 790, 1130, 'GLOW-UP: COMPLETE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Shook the mystery box. | *Already knows.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sh = lt < 1.0 ? Math.sin(t * 40) * 0.12 : 0
      drawBits(x, BOX, BOX_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: sh })
      bubble(x, 760, 660, 'it’s a duck.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'IT WAS A DUCK', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Bounced one ball. | *Then every ball.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 9), C = [RED, SKYB, GOLD, MINT, PINK, LAV]
      for (let i = 0; i < n; i++) { const ph = (t * 1.6 + i * 0.37) % 1, y = 1100 - Math.abs(Math.sin(Math.PI * ph)) * (300 + (i % 3) * 80); drawBits(x, BALL, { R: C[i % 6], W: CREAM }, 620 + ((i * 53) % 320), y, 10) }
      label(x, 790, 640, 'AISLE 4: CHAOS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Bought a toy till. | *For practice.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TILL, TILL_C, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1130, 'PROFIT: +3 BUTTONS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ignored the toy. | *Built a box robot.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1130, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The music box played. | *Pisces is gone.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MBOX, MBOX_C, 790, 950, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      notes(x, t, 790, 820, { n: 5, cell: 7, col: SKYB, seed: 1 })
      label(x, 790, 660, 'SONG LENGTH: 12 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0319', key: 'D', accent: TOY, ending: 'lesson',
  title: 'The signs at | *the toy store.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve big kids. | *One toy store.*' },
  lesson: { text: 'Your inner kid | still *wants to play.*', chip: 'PLAYTIME: UNLOCKED' },
  last: { text: 'Grown-ups? | *Not in this aisle.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
