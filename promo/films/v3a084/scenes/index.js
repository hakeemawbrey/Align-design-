// v3a084: zodiac.advice444, ADVICE SOLO, "Signs you're | a healed Capricorn." (~46 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable healed-Capricorn moment, warm, one gag each.
//   0.0–3.6    "Signs you’re | *a healed Capricorn.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the laptop lid shuts at 5:00: OUT OF OFFICE · a sticky note: PLANS: SURPRISE · a typo ("thnaks so mcuh!!"), left in
//              · a hammock, NO REASON NEEDED · a block tower held up by a friend: STILL STANDING · the to-do list
//              folds into a paper plane and flies off · the piggy bank pays for an ice cream · a match with
//              "plans: none" gets a yes · a cupcake with one candle: INBOX: ONE LESS
//  37.8        "Still ambitious. | *Also: chill.*"  Capricorn comes back.
//  41.2        CALLBACK: "Out of office: | *still on.*"  (the closed laptop comes back)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fd3a8', ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'capricorn'

// ── props
const CONE = ['.PPPP.', 'PPPPPP', 'PWPPPP', 'MMMMMM', '.CCCC.', '.CCCC.', '..CC..', '..CC..']
const CONE_C = { P: PINK, W: '#fff', M: '#fff4e2', C: '#c98f2a' }
const PIG = [
  '.....KK.....',
  '.PPPPPPPPP..',
  'PPPPPPPPPPPP',
  'PPKPPPPPPPSS',
  'PPPPPPPPPPSS',
  'PPPPPPPPPPP.',
  '.PP.PP.PP...',
]
const COIN = ['.YYY.', 'YYWYY', 'YYYYY', '.YYY.']
const CUPCAKE = ['....F....', '....C....', '..WWWWW..', '.WWWWWWW.', 'PPPPPPPPP', '.PPPPPPP.', '..PPPPP..']
const PLANE = ['W.......', 'WWW.....', 'WWWWW...', 'WWWWWWWW', 'WWWWW...', 'WWW.....', 'W.......']

// a laptop: lid angle 1 = open, 0 = shut
function laptop(x, cx, cy, k, open, glow = true) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, 0, 360, 34); x.fillStyle = '#9a9ab0'; x.fillRect(-174, 4, 348, 24)
  const h = 230 * open
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-170, -h - 6, 340, h + 8)
    x.fillStyle = '#6b6b80'; x.fillRect(-164, -h, 328, h)
    if (glow && open > 0.6) { x.fillStyle = '#c8f0ff'; x.fillRect(-150, -h + 14, 300, h - 28); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INBOX (47)', 0, -h / 2) }
  } else { x.fillStyle = INK; x.fillRect(-184, -34, 368, 38); x.fillStyle = '#8a8aa0'; x.fillRect(-178, -28, 356, 28); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, -14, 4) }
  x.restore()
}
// a yellow sticky note
function sticky(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -124, 272, 264)
  x.fillStyle = INK; x.fillRect(-140, -136, 280, 272)
  x.fillStyle = '#ffe36a'; x.fillRect(-132, -128, 264, 256)
  x.fillStyle = '#f2c84a'; x.fillRect(-132, -128, 264, 30)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([s, f], i) => { x.font = f; x.fillText(s, 0, -40 + i * 64) })
  x.restore()
}
// a hammock strung between two posts
function hammock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -150, 26, 280); x.fillRect(170, -150, 26, 280)
  x.fillStyle = '#8a5a2e'; x.fillRect(-190, -146, 14, 272); x.fillRect(176, -146, 14, 272)
  const sw = Math.sin(t * 1.6) * 10
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(-170, -110); x.quadraticCurveTo(sw, 60, 170, -110); x.stroke()
  x.strokeStyle = '#ff9f5a'; x.lineWidth = 24; x.beginPath(); x.moveTo(-170, -110); x.quadraticCurveTo(sw, 60, 170, -110); x.stroke()
  x.strokeStyle = '#fff4e2'; x.lineWidth = 6; x.beginPath(); x.moveTo(-160, -104); x.quadraticCurveTo(sw, 52, 160, -104); x.stroke()
  x.restore()
}
// a wobbly block tower
function tower(x, t, cx, base, k, wob) {
  if (k <= 0.01) return
  const COLS = [ORANGE, SKYB, PINK, MINT, GOLD, LAV]
  for (let i = 0; i < 6; i++) {
    const w = 140 - i * 10, off = Math.sin(t * 7 + i) * wob * i * 3
    x.save(); x.translate(cx + off, base - i * 62); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -60, w + 10, 62); x.fillStyle = COLS[i]; x.fillRect(-w / 2, -55, w, 52); x.restore()
  }
}
// a to-do list (a sheet) that becomes a paper plane
function todo(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -180, 260, 360); x.fillStyle = '#fff4e2'; x.fillRect(-122, -172, 244, 344)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('TO DO (73)', -100, -134)
  x.fillStyle = '#c9c0b0'; for (let i = 0; i < 7; i++) { x.fillRect(-100, -84 + i * 40, 24, 24); x.fillRect(-64, -78 + i * 40, 150 - (i % 3) * 30, 10) }
  x.restore()
}
// a phone with a match and a green tick
function matchPhone(x, cx, cy, k, yes) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = LAV; x.fillRect(-92, -130, 184, 150)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('✦ NEW MATCH', 0, -104)
  x.font = `800 30px ${INTER}`; x.fillText('plans:', 0, -54); x.fillText('none :)', 0, -14)
  if (yes > 0.01) { x.save(); x.translate(0, 90); x.scale(yes, yes); x.fillStyle = INK; x.fillRect(-70, -40, 140, 80); x.fillStyle = '#2f9e5a'; x.fillRect(-64, -34, 128, 68); x.fillStyle = '#fff'; x.font = `800 36px ${INTER}`; x.fillText('YES', 0, 2); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You log off | *at five.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      laptop(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), 1 - ease.inOutCubic(prog(lt, 0.8, 1.3)))
      label(x, 790, 620, lt < 1.3 ? '4:59' : '5:00', 1, { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'OUT OF OFFICE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: TEAL, rot: -0.04 })
    } },
  { sign: S, cap: 'You say yes | *to last-minute plans.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), [['PLANS:', `700 30px ${MONO}`], ['SURPRISE', `800 44px ${INTER}`], ['(fine!)', `700 26px ${MONO}`]])
      bubble(x, 790, 1080, 'sure, let’s go!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'You laughed at | *your own typo.*', mood: lt => lt > 1.3 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'thnaks so | mcuh!!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 1000, 'SENT. LEFT IT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.05 })
      label(x, 450, 620, 'HA!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.08 })
    } },
  { sign: S, cap: 'Rest isn’t | *a prize you earn.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      hammock(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'NO REASON NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You asked for help. | *Nothing fell.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), steady = ease.outCubic(prog(lt, 0.9, 1.3))
      tower(x, t, 720, 1120, k, 1 - steady)
      const kf = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (kf > 0.01) signChar(x, t, 'taurus', 890, 980, 180 * kf, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 620, 'STILL STANDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'You are not | *your to-do list.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const fold = prog(lt, 0.8, 1.1)
      todo(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - fold))
      if (fold >= 1) { const f = ease.inCubic(prog(lt, 1.1, 2.1)); drawBits(x, PLANE, { W: '#fff4e2' }, lerp(790, 1000, f), lerp(850, 520, f), 14 * (1 - 0.5 * f), { rot: -0.6 }) }
      label(x, 790, 1100, 'BYE, LIST', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'You spend money | *on joy.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, PIG, { P: PINK, K: INK, S: '#ff6f9a' }, 700, 990, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const c = ease.outCubic(prog(lt, 0.7, 1.2))
      if (lt > 0.65 && lt < 1.25) drawBits(x, COIN, { Y: GOLD, W: '#fff' }, lerp(700, 880, c), lerp(900, 780, c) - Math.sin(Math.PI * c) * 80, 10)
      drawBits(x, CONE, CONE_C, 880, 800, 24 * pop01(t, P.t0 + 1.2 * 3.1 / 2.4, 0.35, 2.4))
      label(x, 800, 620, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'No five-year plan? | *You said yes anyway.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      matchPhone(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.4, 0.3, 2.6))
      hearts(x, t, 790, 700, P.t0 + 1.6, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'You celebrate | *the tiny wins.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CUPCAKE, { F: lt > 0.9 ? GOLD : '#ffe7a8', C: '#fff4e2', W: '#fff4e2', P: '#b07dff' }, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1090, 'INBOX: ONE LESS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 8, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'v3a084', key: 'G', accent: TEAL, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Still ambitious. | *Also: chill.*', mood: 'happy' },
  last: {
    text: 'Out of office: | *still on.*',
    draw(x, t, lt) {
      laptop(x, 540, 980, 1.5 * pop01(t, t - lt + 0.5, 0.45, 2.2), 0)
      label(x, 540, 1130, 'BACK MONDAY', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 40, bg: TEAL, rot: -0.04 })
      sparkles(x, t, 540, 960, t - lt + 0.6, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'Signsyou'
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
