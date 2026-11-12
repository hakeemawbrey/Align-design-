// r2a0320: star_advice, ADVICE ROLLCALL, "How each sign | *can sleep better.*" (~53 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific bedtime nudge per sign, each with a light gag. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ phone down at ten (charging across the room) · ♉ the cosiest blanket, earned · ♊ one podcast, not five · ♋ a warm
//              teapot and a soft goodnight · ♌ dim the lights, even stars need dark · ♍ the mess can wait until morning
//              · ♎ make it pretty, then make it dark · ♏ you don't have to solve it tonight · ♐ adventures need charge
//              · ♑ clock off, for real · ♒ 2 a.m. genius idea? jot it, sleep · ♓ dream big, you're so good at it
//  49.2        "Sleep tight, | *every sign.*"
//  52.6        callback: "Aries’ phone? | *Still over there.*" — card 1's charging phone comes back, Aries asleep.
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

const NIGHT = '#a9b8ff'
const BLANKET = ['..BBBBBBBBBB..', '.BBbBBBbBBBbB.', 'BBBBBBBBBBBBBB', 'BbBBBbBBBbBBBB', 'BBBBBBBBBBBBBB', '.BBBbBBBBbBBB.']
const PHONES = ['..KKKKKK..KKKKKK..', '.KHHHHHHKKHHHHHHK.', 'KHHKKKKHKKHKKKKHHK', 'KHK....KKKK....KHK', 'KKK....K..K....KKK', 'KKK............KKK']
const TEAPOT = ['....KK.....', '..KKKKKK...', '.KTTTTTTK.K', 'KTTWTTTTTKK', 'KTTTTTTTTK.', 'KTTTTTTTTK.', '.KTTTTTTK..', '..KKKKKK...']
const TEAPOT_C = { K: INK, T: '#ff9cc0', W: CREAM }
const SOCK = ['.SS..', '.SS..', '.SS..', '.SSSS', 'SSSSS', '.SSS.']
const GLASS = ['..KKKK....', '.K....K...', 'K......K..', 'K......K..', '.K....K...', '..KKKKKK..', '......KK..', '.......KK.', '........KK']
const BATT = ['KKKKKKKKKKKKK.', 'K...........KK', 'K...........KK', 'K...........KK', 'KKKKKKKKKKKKK.']
const MOON = ['...YYY..', '..YYY...', '.YYY....', '.YYY....', '.YYY....', '..YYY...', '...YYYY.']
/** a phone face-up on a charger: big clock face */
function bedPhone(x, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -170, 220, 340); x.fillStyle = '#2a2350'; x.fillRect(-100, -160, 200, 320); x.fillStyle = '#140c30'; x.fillRect(-88, -136, 176, 272)
  x.fillStyle = NIGHT; x.font = `700 48px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('22:00', 0, -50)
  x.font = `700 24px ${MONO}`; x.fillText(txt, 0, 20)
  x.fillStyle = MINT; x.fillRect(-30, 70, 60, 26); x.fillStyle = INK; x.fillRect(-4, 170, 8, 90)
  x.restore()
}
const zz = (x, t, cx, cy) => { x.save(); x.fillStyle = BONE; x.font = `800 44px ${INTER}`; for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.globalAlpha = 0.85 * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 24 + Math.sin(ph * 6) * 10, cy - ph * 120) } x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'Phone down at ten. | *The world can wait.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bedPhone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 'goodnight')
      label(x, 800, 1130, 'CHARGING: ACROSS THE ROOM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) zz(x, t, 400, 720)
    } },
  { sign: 'taurus', cap: 'The cosiest blanket. | *You’ve earned it.*', mood: 'sleepy', look: [1, 0], star: { x: -60, y: -20 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { B: '#8fd08a', b: CREAM }, 540, 1020, 40 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 780, 660, 'COSY: MAXED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SAND, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One podcast, not five. | *Let your brain land.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PHONES, { K: INK, H: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 680, lt < 1.1 ? 'QUEUE: 5' : 'QUEUE: 1 ♡', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: lt < 1.1 ? RED : MINT, color: lt < 1.1 ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A warm drink | *and a soft goodnight.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TEAPOT, TEAPOT_C, 790, 920, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${(0.6 * Math.sin(Math.PI * ph)).toFixed(3)})`; x.fillRect(760 + i * 30 + Math.sin(ph * 6) * 8, 780 - ph * 120, 10, 26) }
      bubble(x, 790, 650, 'night night ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Dim the lights. | *Even stars need dark.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) { const d = clamp((lt - 0.4) / 1.0); x.fillStyle = `rgba(6,4,18,${(0.45 * d).toFixed(3)})`; x.fillRect(110, 480, 860, 740) },
    front(x, t, lt, P) {
      const b = Math.round(100 - 90 * clamp((lt - 0.4) / 1.0))
      label(x, 790, 760, `BRIGHTNESS: ${b}%`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The mess can wait | *until morning.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, SOCK, { S: PINK }, 760, 1080, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.4 })
      label(x, 790, 760, 'ONE SOCK. IT’S OK.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Make it pretty. | *Then make it dark.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const on = lt < 1.2
      x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 20; i++) { const fx = 140 + i * 40, fy = 560 + 24 * Math.sin(Math.PI * i / 20); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
      for (let i = 0; i < 10; i++) { const fx = 160 + i * 80, fy = 572 + 24 * Math.sin(Math.PI * (i * 80 + 20) / 800); x.fillStyle = on ? [GOLD, PINK, SKYB, MINT][i % 4] : '#3a3358'; x.fillRect(fx - 9, fy, 18, 22) }
      label(x, 790, 960, on ? 'AMBIENCE: PERFECT' : 'AMBIENCE: ASLEEP', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: on ? PINK : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'You don’t have to | *solve it tonight.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK }, 790, 880 + 180 * ease.inQuad(prog(lt, 0.9, 1.3)), 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 0.9 ? 1.2 * prog(lt, 0.9, 1.3) : 0 })
      label(x, 790, 680, 'CASE: PAUSED TILL 9AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Adventures need energy. | *Recharge first.*', mood: 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) * 3.2))
      drawBits(x, BATT, { K: INK }, 790, 880, 24 * k)
      if (k > 0.9) for (let i = 0; i < n; i++) { x.fillStyle = MINT; x.fillRect(790 - 6.5 * 24 + 24 + i * 52, 880 - 2.5 * 24 + 24, 40, 72) }
      label(x, 790, 1080, `CHARGE: ${n * 20}%`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Clock off. | *For real this time.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const c = clamp((lt - 0.5) / 0.6)
      x.save(); x.translate(790, 960); x.scale(pop01(t, P.t0 + 0.15, 0.3, 2), pop01(t, P.t0 + 0.15, 0.3, 2))
      x.fillStyle = INK; x.fillRect(-170, 0, 340, 30); x.fillStyle = '#a9a9bf'; x.fillRect(-162, 4, 324, 22)
      const h = 230 * (1 - c); x.fillStyle = INK; x.fillRect(-150, -h, 300, h); if (h > 20) { x.fillStyle = SKYB; x.fillRect(-138, -h + 12, 276, h - 20) }
      x.restore()
      label(x, 790, 680, c >= 1 ? 'OFFLINE ✓' : 'ONE MORE EMAIL…', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: c >= 1 ? MINT : SLATE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Genius idea at 2 a.m.? | *Jot it. Sleep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 300, h: 280, head: 'IDEA', headCol: SKYB, size: 30, paper: '#fff1a8', rows: [['hats for', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['clouds??', INK, pop01(t, P.t0 + 0.9, 0.2, 2)]] })
      if (lt > 1.4) zz(x, t, 400, 720)
    } },
  { sign: 'pisces', cap: 'Dream big. | *You’re so good at it.*', mood: 'sleepy', tears: 2, look: [0, -1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#fff1a8' }, 800, 760, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 1000, 'dolphin castle…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 800, 610, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0320', key: 'G', accent: NIGHT, ending: 'callback',
  title: 'How each sign | *can sleep better.*',
  cameos: CAMEOS,
  group: { cap: 'Sleep tight, | *every sign.*', moods: Array(12).fill('sleepy') },
  last: {
    text: 'Aries’ phone? | *Still over there.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bedPhone(x, 700, 1040, 1.0 * pop01(t, t0 + 0.6, 0.4, 2), 'goodnight')
      signChar(x, t, 'aries', 380, 1100, 240 * pop01(t, t0 + 0.4, 0.4, 2), { mood: 'sleepy', seed: 6 })
      zz(x, t, 400, 940)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
