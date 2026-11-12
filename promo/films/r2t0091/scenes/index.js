// r2t0091: star_talk, ROLL CALL, "The signs | volunteering." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme volunteer. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs | *volunteering.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one volunteer per sign (3.8 s each):
//              ♈ signed up for every shift, read nothing · ♉ ran the bake sale, bought it all · ♊ one flyer, two hours
//              of chat · ♋ walked the shelter dogs, adopted all of them · ♌ came to help, gave a keynote
//              · ♍ cleaned the park, then ironed the grass · ♎ redesigned the volunteer shirts (couture now)
//              · ♏ the cookie jar went missing, Scorpio already knows (chart says: Taurus) · ♐ volunteered abroad, day 400
//              · ♑ helped for an hour, now runs the charity · ♒ a petition, signed by pigeons · ♓ read to the kittens, sobbed
//  49.2        "Helpful? | *Aggressively.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Show up how you can. | It *all* counts."  HELP: GIVEN
//  58.3        "Taurus paid | for *every cookie.*"  The cookies come back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e', GRASS = '#5fd068'

// ── props
const COOKIE = [
  '..BBBBB..',
  '.BBdBBBB.',
  'BBBBBBdBB',
  'BdBBBBBBB',
  'BBBBdBBBB',
  '.BBBBBdB.',
  '..BBBBB..',
]
const COOKIE_C = { B: '#e8a24a', d: '#5b2e1a' }
const DOG = [
  'E.......E.',
  'EE.....EE.',
  'EBBBBBBBE.',
  'BBKBBBKBB.',
  'BBBBNBBBB.',
  '.BBBBBBB..',
  '..BBBBBBBT',
  '.BBBBBBBBT',
  '.BB.BB.BB.',
]
const IRON = [
  '.....HHHH.',
  '....H...H.',
  '...SSSSSSS',
  '..SSSSSSSS',
  '.SSSSSSSSS',
  'MMMMMMMMMM',
]
const IRON_C = { H: '#2a2350', S: SKYB, M: '#c9c9d8' }
const SHIRT = [
  'PPP....PPP',
  'PPPP..PPPP',
  'PPPPPPPPPP',
  '..PPPPPP..',
  '..PPWWPP..',
  '..PPPPPP..',
  '..PPPPPP..',
  '..PPPPPP..',
]
const BOW = ['G.....G', 'GG...GG', 'GGGRGGG', 'GG...GG', 'G.....G']
const JAR = [
  '.KKKKKK.',
  '.KKKKKK.',
  'GGGGGGGG',
  'G......G',
  'G......G',
  'G......G',
  'G......G',
  'GGGGGGGG',
]
const JAR_C = { K: WOOD, G: '#bfe6f0' }
const GLOBE = [
  '...BBBBB...',
  '..BGGBBBB..',
  '.BGGGGBBBB.',
  'BBBGGBBGGBB',
  'BBBBBBGGGGB',
  'BBGBBBBGGBB',
  '.BGGBBBBBB.',
  '..BBBBBGB..',
  '...BBBBB...',
]
const GLOBE_C = { B: '#6fc3ff', G: GRASS }
const PIGEON = [
  '..GG.....',
  '.GGWG....',
  'OGGGG....',
  '..GGGGGG.',
  '..GGLLLGG',
  '...GGGGG.',
  '....Y.Y..',
]
const PIGEON_C = { G: '#9aa5c4', W: '#ffffff', O: GOLD, L: '#c9c9d8', Y: '#ffb34a' }
const KITTEN = [
  'O...O.',
  'OO.OO.',
  'OOOOO.',
  'OKOKO.',
  'OOPOO.',
  '.OOOOT',
  '.OOOOT',
  '.O.O..',
]
const KITTEN_C = { O: '#ffb34a', K: INK, P: PINK, T: '#ffb34a' }
const BOOK = [
  'RRRRRRRRRRRR',
  'RWWWWWRWWWWR',
  'RWKKKWRWKKWR',
  'RWWWWWRWWWWR',
  'RWKKWWRWKKKR',
  'RWWWWWRWWWWR',
  'RRRRRRRRRRRR',
]
const BOOK_C = { R: LAV, W: CREAM, K: '#b9b0a0' }

/** a clipboard sheet with rows that fill in */
function clipboard(x, cx, cy, k, { head = 'SIGN-UP', rows = [], rot = 0.05, w = 260, rowH = 54 } = {}) {
  if (k <= 0.01) return
  const h = 110 + rows.length * rowH
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = WOOD; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = CREAM; x.fillRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 44)
  x.fillStyle = '#9aa5c4'; x.fillRect(-40, -h / 2 - 14, 80, 30)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 24px ${MONO}`; x.fillText(head, 0, -h / 2 + 62)
  rows.forEach(([txt, kk, col], i) => {
    const y = -h / 2 + 108 + i * rowH
    x.fillStyle = '#d9cfbd'; x.fillRect(-w / 2 + 30, y + 20, w - 60, 3)
    if (kk > 0.01) { x.save(); x.globalAlpha = clamp(kk); x.fillStyle = col || INK; x.font = `800 28px ${INTER}`; x.fillText(txt, 0, y); x.restore() }
  })
  x.restore()
}
/** a little folding table with a cloth */
function table(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -6, w + 12, 40); x.fillStyle = PINK; x.fillRect(-w / 2, 0, w, 28)
  x.fillStyle = '#ffffff'; for (let i = 0; i < w / 40; i++) x.fillRect(-w / 2 + i * 40, 0, 20, 28)
  x.fillStyle = INK; x.fillRect(-w / 2 + 20, 34, 12, 110); x.fillRect(w / 2 - 32, 34, 12, 110)
  x.restore()
}
/** a podium with a mic arm */
function podium(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -6, 232, 236); x.fillStyle = BROWN; x.fillRect(-108, 0, 216, 222)
  x.fillStyle = '#a5643a'; x.fillRect(-108, 0, 216, 30)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 112, 42, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎', 0, 114)
  x.fillStyle = '#2a2350'; x.fillRect(-6, -110, 10, 110); x.fillRect(-20, -130, 34, 28)
  x.restore()
}
/** a nameplate on a desk */
function nameplate(x, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 34px ${INTER}`; const w = x.measureText(text).width + 50
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -36, w + 12, 76); x.fillStyle = GOLD; x.fillRect(-w / 2, -30, w, 64)
  x.fillStyle = '#c98f2a'; x.fillRect(-w / 2, 22, w, 12)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -2)
  x.restore()
}
/** a mini birth chart */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
/** a magnifying glass */
function magnifier(x, cx, cy, k, rot = -0.6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 50, 24, 110); x.fillStyle = BROWN; x.fillRect(-7, 54, 14, 100)
  x.lineWidth = 16; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 9; x.strokeStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.3)'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Signed up for everything. | Read *nothing.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.35) / 1.1) * 6)
      const JOBS = ['ARIES', 'ARIES', 'ARIES', 'ARIES', 'ARIES', 'ARIES']
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SHIFTS', rows: JOBS.map((j, i) => [j, i < n ? 1 : 0, RED]), rowH: 50 })
      label(x, 790, 560, 'WAIT, WHAT IS IT?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Ran the bake sale. | *Bought it all.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', star: { x: -170 },
    back(x, t, lt, P) {
      table(x, 790, 990, 300, pop01(t, P.t0 + 0.1, 0.3, 2))
      for (let i = 0; i < 6; i++) {
        const m = ease.inOutCubic(prog(lt, 0.8 + i * 0.14, 1.15 + i * 0.14))
        const cx = lerp(680 + (i % 3) * 110, 600 + (i % 2) * 34, m), cy = lerp(950 - Math.floor(i / 3) * 70, 1130 - i * 46, m) - Math.sin(Math.PI * m) * 120
        drawBits(x, COOKIE, COOKIE_C, cx, cy, 11 * pop01(t, P.t0 + 0.2 + i * 0.05, 0.3, 2))
      }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SOLD OUT (TO TAURUS)', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Handed out one flyer. | *Chatted two hours.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const TOP = ['hi! one sec—', 'love your shoes', "what's your sign?", 'no WAY, me too', 'ok so anyway—']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 780, 660, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 880, 'FLYERS LEFT: 499', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 1060, 150 * k, { mood: lt > 1.6 ? 'sleepy' : 'happy', look: [-1, 0], seed: 12, glyph: false })
    } },
  { sign: 'cancer', cap: 'Walked the shelter dogs. | *Adopted every one.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const COLS = ['#e8a24a', '#fff4e2', '#8a4a2e', '#9aa5c4', '#ffd23a']
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2)
        drawBits(x, DOG, { E: BROWN, B: COLS[i], K: INK, N: INK, T: COLS[i] }, 640 + (i % 3) * 130, 820 + Math.floor(i / 3) * 150 + (i % 2) * 20, 12 * k)
      }
      label(x, 790, 1160, 'ADOPTED: ALL 5', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
      hearts(x, t, 760, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Came to help. | Gave a *keynote.*', mood: 'sparkle', star: { x: -40, y: -90, s: 250 }, hops: [0.9],
    back(x, t, lt, P) {
      podium(x, 500, 1010, pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 800, 600, 'thank you, | me.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 820, 1120, 'TALK: 3 HOURS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 500, 760, P.t0 + 1.0, 6, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Cleaned the whole park. | Then *ironed the grass.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P) {
      // a strip of grass along the floor, crumpled on the left, ironed flat where the iron passed
      const p = ease.inOutCubic(prog(lt, 0.4, 1.8)), ex = lerp(560, 960, p)
      for (let i = 0; i < 30; i++) {
        const gx = 140 + i * 28, flat = gx < ex - 20 && gx > 560
        x.fillStyle = INK; x.fillRect(gx - 2, flat ? 1150 : 1110 - (i % 3) * 14, 18, flat ? 22 : 62 + (i % 3) * 14)
        x.fillStyle = flat ? '#7be07f' : GRASS; x.fillRect(gx, flat ? 1152 : 1112 - (i % 3) * 14, 14, flat ? 18 : 58 + (i % 3) * 14)
      }
    },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.8)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, IRON, IRON_C, lerp(600, 920, p), 1110, 15 * k)
      if (lt > 0.5) { x.save(); x.globalAlpha = 0.5; x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(lerp(600, 920, p) - 30 + i * 30, 1040 - ((t * 60 + i * 20) % 50), 8, 18); x.restore() }
      label(x, 790, 680, 'CRISP.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Fixed the volunteer shirts. | *Couture now.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), glam = prog(lt, 0.8, 1.2)
      drawBits(x, SHIRT, { P: glam > 0.5 ? '#ff8fb1' : '#9aa5c4', W: CREAM }, 790, 880, 26 * k, { rot: 0.05 })
      if (glam > 0) {
        drawBits(x, BOW, { G: GOLD, R: RED }, 790, 790, 12 * pop01(t, P.t0 + 0.8 * 1.29, 0.3, 2.4))
        sparkles(x, t, 790, 880, P.t0 + 1.1, 8, 170, 0.3)
      }
      label(x, 790, 1120, 'VOLUNTEER · FALL LOOK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'The cookie jar vanished. | Scorpio *already knows.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 700, 1040, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      chart(x, 810, 720, 110, pop01(t, P.t0 + 0.5, 0.35, 2), t)
      magnifier(x, 860, 960, pop01(t, P.t0 + 0.3, 0.3, 2), -0.5 + 0.1 * Math.sin(t * 3))
      label(x, 790, 1160, 'CULPRIT: A TAURUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Volunteered abroad. | It’s *day four hundred.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 320, 760, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t) * 0.1 })
      const n = Math.floor(lerp(1, 400, ease.inCubic(prog(lt, 0.5, 1.7))))
      label(x, 310, 1000, `DAY ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 300, 1140, 'back soon!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Helped for an hour. | Now *runs the charity.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(310, 780); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = CREAM; x.fillRect(-142, -142, 284, 284)
      x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE CHARITY', 0, -112)
      // org chart: one box on top, lines down to three
      const g = ease.outCubic(prog(lt, 0.4, 1.2))
      x.fillStyle = '#2fc79a'; x.fillRect(-60, -80, 120, 50)
      x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText('CAP', 0, -55)
      x.fillStyle = INK; x.fillRect(-2, -30, 4, 40 * g); x.fillRect(-100, 8, 200 * g, 4)
      for (let i = 0; i < 3; i++) if (g > 0.3 + i * 0.2) { x.fillStyle = '#9aa5c4'; x.fillRect(-120 + i * 90, 30, 60, 40); x.fillStyle = INK; x.fillRect(-92 + i * 90, 10, 4, 22) }
      x.fillStyle = '#9aa5c4'; x.fillRect(-120, 90, 240, 14); x.fillRect(-120, 112, 160, 14)
      x.restore()
    },
    front(x, t, lt, P) {
      nameplate(x, 310, 1050, 'DIRECTOR', pop01(t, P.t0 + 1.3, 0.3, 2.4))
      label(x, 320, 1150, 'DAY 1', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a petition. | *For the pigeons.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clipboard(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'PIGEON RIGHTS', rows: [['coo', lt > 0.9 ? 1 : 0, '#6b62a8'], ['coo coo', lt > 1.2 ? 1 : 0, '#6b62a8'], ['(a beak print)', lt > 1.5 ? 1 : 0, '#6b62a8']], w: 290 })
      for (let i = 0; i < 3; i++) drawBits(x, PIGEON, PIGEON_C, 680 + i * 110, 1120 - (i % 2) * 10, 10 * pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2.2), { sx: i === 1 ? -1 : 1 })
    } },
  { sign: 'pisces', cap: 'Read to shelter kittens. | *Sobbed* at page one.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 720, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      for (let i = 0; i < 3; i++) drawBits(x, KITTEN, KITTEN_C, 700 + i * 100, 1060, 12 * pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2.2))
      bubble(x, 800, 900, '“Once upon | a time…”', pop01(t, P.t0 + 0.7, 0.25, 2.2) * (1 - prog(lt, 1.5, 1.7)), { size: 32, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'KITTENS: FINE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0091', key: 'C', accent: MINT, ending: 'lesson',
  title: 'The signs | *volunteering.*',
  cameos: CAMEOS,
  group: { cap: 'Helpful? | *Aggressively.*' },
  lesson: { text: 'Show up how you can. | It *all* counts.', chip: 'HELP: GIVEN' },
  last: {
    text: 'Taurus paid | for *every cookie.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 5; i++) drawBits(x, COOKIE, COOKIE_C, 300 + i * 120, 1520 + (i % 2) * 24, 14 * pop01(t, t0 + 0.6 + i * 0.12, 0.3, 2.2))
      label(x, 540, 1660, 'PAID IN FULL', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
