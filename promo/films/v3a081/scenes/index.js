// v3a081: zodiac.advice444, ADVICE SOLO, "Aries, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to slow down, Aries-style, one gag each.
//   0.0–3.6    "Aries, you’re allowed | *to rest.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a snail wins the race and gets the medal · the alarm rattles, Aries hits snooze · a little white flag:
//              TRUCE · a dumbbell wearing a pillow (REST DAY = GAINS) · the fire on Aries' head meets an ice pack
//              · a match profile that says "likes: slow mornings" · a stopwatch: sat still 0:04, PERSONAL BEST
//              · Aries holds the AFTER YOU sign while Libra goes first · a tiny campfire with a marshmallow: SLOW BURN
//  37.8        "Fastest at | *slowing down.*"  Aries comes back, calm.
//  41.0        LESSON UNLOCKED: "Rest isn’t quitting. | It’s *reloading.*"  ENERGY: RESTORED
//  46.9        "The snail says | *you’re doing great.*"  (the winning snail comes back with its medal)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a5a', ORANGE = '#ffb34a'
const S = 'aries'

// ── props
const SNAIL = [
  '....SSSS.......',
  '...SsSSsS......',
  '..SsSSSSsS.....',
  '..SsSssSsS.E.E.',
  '..SsSsSSsS.B.B.',
  '..SSsSSsSS.BBB.',
  '...SSSSSS..BBB.',
  'BBBBBBBBBBBBBB.',
  'BBBBBBBBBBBBB..',
]
const SNAIL_C = { S: ORANGE, s: '#c96a1a', B: '#b9e6a0', E: INK }
const MEDAL = ['R...R', '.R.R.', '..R..', '.YYY.', 'YYYYY', 'YYYYY', '.YYY.']
const MEDAL_C = { R: '#6f8cff', Y: GOLD }
const CLOCK = [
  'BB.....BB',
  'BRRRRRRRB',
  '.RWWWWWR.',
  'RWWWKWWWR',
  'RWWWKWWWR',
  'RWWWKKWWR',
  'RWWWWWWWR',
  '.RWWWWWR.',
  '..RRRRR..',
  '.R.....R.',
]
const CLOCK_C = { B: GOLD, R: RED, W: '#fff4e2', K: INK }
const FLAG = [
  'KWWWWWWW',
  'KWWWWWWW',
  'KWWWWWWW',
  'KWWWWWW.',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
]
const FLAG_C = { K: '#c98f2a', W: '#ffffff' }
const DUMB = [
  'GG........GG',
  'GG........GG',
  'GGBBBBBBBBGG',
  'GG........GG',
  'GG........GG',
]
const PILLOW = ['.PPPPPPPP.', 'PPPPPPPPPP', 'PPpPPPPpPP', 'PPPPPPPPPP', '.PPPPPPPP.']
const ICE = ['.CCCCCC.', 'CCWCCCCC', 'CCCCCCCC', 'CCCCCWCC', '.CCCCCC.']
const FLAME = ['..F...', '.FF.F.', '.FYF..', 'FFYFF.', 'FYYYF.', '.FFF..']
const FIRE = [
  '....F.....',
  '...FF..F..',
  '..FYF.FF..',
  '.FYYFFYF..',
  '.FYYYYYF..',
  'LLLLLLLLLL',
  '.LL.LL.LL.',
]
const FIRE_C = { F: ORANGE, Y: '#ffe36a', L: '#8a4a2e' }

// a small match profile card
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 300, 400)
  x.fillStyle = INK; x.fillRect(-156, -206, 312, 412)
  x.fillStyle = '#2a2350'; x.fillRect(-148, -198, 296, 396)
  x.fillStyle = MINT; x.fillRect(-148, -198, 296, 52)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -172)
  x.fillStyle = '#140c30'; x.fillRect(-130, -132, 260, 170)
  x.restore()
  signChar(x, t, 'taurus', cx, cy - 40 * k, 150 * k, { mood: 'sleepy', seed: 55, glyph: false, glow: 0.7 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('likes:', 0, 78)
  x.font = `800 32px ${INTER}`; x.fillText('slow mornings', 0, 124)
  x.restore()
}
// a stopwatch with a tiny number
function stopwatch(x, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-22, -196, 44, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-16, -190, 32, 30)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 168, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 158, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 72px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`0:0${secs}`, 0, 0)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('SAT STILL', 0, 64)
  x.restore()
}
// a hand-held sign on a stick
function sign(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 40, 24, 170); x.fillStyle = '#c98f2a'; x.fillRect(-6, 40, 12, 166)
  x.fillStyle = INK; x.fillRect(-150, -64, 300, 120); x.fillStyle = BONE; x.fillRect(-142, -56, 284, 104)
  x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -2)
  x.restore()
}
// smoke puffs rising
function steam(x, t, cx, cy, a) {
  if (a <= 0.01) return
  for (let i = 0; i < 4; i++) {
    const ph = ((t * 0.8 + i / 4) % 1)
    x.save(); x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.8
    x.fillStyle = '#e6e6f2'; const r = 14 + ph * 22
    x.fillRect(cx + Math.sin(i * 2 + ph * 5) * 30 - r / 2, cy - ph * 160 - r / 2, r, r); x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Not everything | *is a race.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      // the finish tape and a snail crossing it
      x.fillStyle = INK; x.fillRect(700, 760, 12, 300); x.fillRect(930, 760, 12, 300)
      if (k > 0.01) { x.fillStyle = BONE; x.fillRect(706, 820, 230, 12) }
      const sx = lerp(990, 820, ease.outCubic(prog(lt, 0.3, 1.4)))
      drawBits(x, SNAIL, SNAIL_C, sx, 1000, 16 * k)
      drawBits(x, MEDAL, MEDAL_C, sx - 26, 900, 11 * pop01(t, P.t0 + 1.6, 0.3, 2.4))
      label(x, 820, 640, 'WINNER: SNAIL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Hitting snooze | *isn’t losing.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const ring = lt < 1.1 ? Math.sin(t * 60) * 0.12 : 0
      drawBits(x, CLOCK, CLOCK_C, 790, 840, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      if (lt < 1.1) label(x, 790, 620, 'RING RING RING', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      else bubble(x, 790, 620, '5 more mins', pop01(t, P.t0 + 1.2 * 3.1 / 2.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1090, 'SNOOZE: EARNED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'You don’t have to | *win the argument.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, FLAG, FLAG_C, F.x + 170, F.cy - 80, 22 * k, { rot: 0.08 + Math.sin(t * 5) * 0.05 })
      label(x, 800, 1080, 'TRUCE. (COMFY)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
      bubble(x, 800, 600, 'fair point!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Rest days | *still build muscle.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, DUMB, { G: '#6b6b80', B: '#c9c9d8' }, 790, 1000, 26 * k)
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) drawBits(x, PILLOW, { P: PINK, p: '#ffd0df' }, 790, lerp(560, 920, d), 20)
      label(x, 790, 700, 'REST DAY = GAINS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feeling fiery? | *Take five.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -120 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const cool = ease.inOutCubic(prog(lt, 0.9, 1.6))
      drawBits(x, FLAME, { F: RED, Y: GOLD }, F.x + 10, F.top - 40, 16 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - cool))
      const d = ease.outCubic(prog(lt, 0.6, 1.0))
      if (lt > 0.55) drawBits(x, ICE, { C: SKYB, W: '#ffffff' }, F.x + 10, lerp(480, F.top - 18, d), 16, { rot: -0.1 })
      steam(x, t, F.x + 10, F.top - 40, clamp((lt - 0.9) * 2) * (1 - clamp((lt - 1.9) * 2)))
      label(x, 820, 1080, 'COOLING DOWN…', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match loves | *slow mornings* too.', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 380, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Sitting still | *is a skill.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', star: { x: -190 }, hops: [1.7],
    front(x, t, lt, P) {
      stopwatch(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(4, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4)))
      label(x, 790, 1080, 'PERSONAL BEST', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 840, P.t0 + 1.75, 8, 200, 0.3)
    } },
  { sign: S, cap: 'Let someone else | *go first.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P, F) {
      sign(x, F.x + 120, F.cy - 190, pop01(t, P.t0 + 0.2, 0.35, 2), 'AFTER YOU')
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', lerp(960, 820, ease.outCubic(prog(lt, 0.5, 1.4))), 1000, 200 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 820, 760, 'aww, thanks!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Slow burn | *still keeps you warm.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, FIRE, FIRE_C, 790, 980, 22 * k * (1 + 0.03 * Math.sin(t * 9)))
      // a marshmallow on a stick, toasting
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(560, 856, 210, 10); x.fillStyle = '#c98f2a'; x.fillRect(562, 858, 206, 6)
      x.fillStyle = INK; x.fillRect(762, 836, 50, 50); x.fillStyle = lt > 1.4 ? '#f2d8a8' : '#ffffff'; x.fillRect(766, 840, 42, 42); x.restore()
      label(x, 790, 650, 'SLOW BURN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a081', key: 'D', accent: RED, solo: S, ending: 'lesson',
  title: 'Aries, you’re allowed | *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Fastest at | *slowing down.*', mood: 'happy' },
  lesson: { text: 'Rest isn’t quitting. | It’s *reloading.*', chip: 'ENERGY: RESTORED' },
  last: {
    text: 'The snail says | *you’re doing great.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2.2)
      drawBits(x, SNAIL, SNAIL_C, 760, 1170, 16 * k)
      drawBits(x, MEDAL, MEDAL_C, 734, 1070, 11 * k)
    },
  },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'Aries,you'
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
