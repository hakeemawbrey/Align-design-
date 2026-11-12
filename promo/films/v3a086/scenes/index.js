// v3a086: zodiac.advice444, ADVICE SOLO, "What Tauruses need | in love." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Taurus needs from love, warm, one gag each.
//   0.0–3.6    "What Tauruses need | *in love.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a phone: "home safe? ♡" · a dessert menu with ALL OF IT circled · a ten-second hug from Cancer, counted
//              down · a road sign: SLOW · two tickets: ADMIT TWO, FRIDAY · a pizza slice with a heart pepperoni
//              · a match "looking for: something real": KEEPER · a letter with a heart seal: "you've got this"
//              · two mugs, MINE and YOURS
//  37.8        GROUP ENDING: "Basically: | *snacks and loyalty.*"  Taurus comes back, heart-eyed.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7bd36a', ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'taurus'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const PIZZA = [
  'CCCCCCCCCCCC',
  'CYYYYYYYYYYC',
  '.YYRR.YYYYY.',
  '.YRRRRYYYY..',
  '..YRRYYYRY..',
  '..YYYYYYY...',
  '...YYYYY....',
  '....YYY.....',
  '.....Y......',
]
const MUG = ['.WWWWWW...', 'WCCCCCCW..', 'WCCCCCCWWW', 'WCCCCCCW.W', 'WCCCCCCWWW', 'WCCCCCCW..', '.WWWWWW...']

function phone(x, cx, cy, k, text, head) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = head ? GREEN : LAV; x.fillRect(-98, -110, 196, 140)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.font = `700 22px ${MONO}`; x.fillText(head, 0, -86) }
  text.forEach((s, i) => { x.font = `800 25px ${INTER}`; x.fillText(s, 0, (head ? -42 : -40) + i * 36) })
  x.restore()
}
function menu(x, cx, cy, k, circle) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -190, 296, 396)
  x.fillStyle = INK; x.fillRect(-152, -202, 304, 404); x.fillStyle = '#fff4e2'; x.fillRect(-144, -194, 288, 388)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DESSERTS', 0, -150)
  x.font = `700 24px ${MONO}`; ['tiramisu', 'lava cake', 'cheesecake', 'crème brûlée', 'gelato'].forEach((s, i) => x.fillText(s, 0, -90 + i * 46))
  x.font = `800 30px ${INTER}`; x.fillStyle = RED; x.fillText('ALL OF IT', 0, 150)
  if (circle > 0.01) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 150, 110, 34, -0.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * circle); x.stroke() }
  x.restore()
}
function slowSign(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 60, 24, 220); x.fillStyle = '#c9c9d8'; x.fillRect(-6, 60, 12, 216)
  x.rotate(Math.PI / 4)
  x.fillStyle = INK; x.fillRect(-120, -120, 240, 240); x.fillStyle = GOLD; x.fillRect(-110, -110, 220, 220)
  x.rotate(-Math.PI / 4)
  x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SLOW', 0, 2)
  x.restore()
}
function tickets(x, cx, cy, k) {
  if (k <= 0.01) return
  for (const [dx, dy, r] of [[-30, -30, -0.12], [30, 30, 0.08]]) {
    x.save(); x.translate(cx + dx * k, cy + dy * k); x.rotate(r); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-170, -76, 340, 152); x.fillStyle = ORANGE; x.fillRect(-162, -68, 324, 136)
    x.fillStyle = INK; x.beginPath(); x.arc(-162, 0, 22, 0, Math.PI * 2); x.arc(162, 0, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff4e2'; x.fillRect(-90, -52, 4, 104)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `800 34px ${INTER}`; x.fillText('ADMIT TWO', 30, -16); x.font = `700 24px ${MONO}`; x.fillText('FRIDAY · 7PM', 30, 26)
    x.restore()
  }
}
function letter(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  if (open > 0.01) {
    const up = 120 * ease.outCubic(open)
    x.fillStyle = INK; x.fillRect(-130, -70 - up, 260, 150); x.fillStyle = '#fff4e2'; x.fillRect(-122, -62 - up, 244, 136)
    x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('you’ve got this.', 0, -24 - up); x.fillText('♡', 0, 22 - up)
  }
  x.fillStyle = INK; x.fillRect(-170, -20, 340, 200); x.fillStyle = '#f2d8c8'; x.fillRect(-162, -12, 324, 184)
  x.fillStyle = '#e0bfae'; x.beginPath(); x.moveTo(-162, -12); x.lineTo(0, 90); x.lineTo(162, -12); x.closePath(); x.fill()
  x.restore()
  drawBits(x, HEART, { H: RED }, cx, cy + 80 * k, 8 * k)
}

const CAMEOS = [
  { sign: S, cap: 'Texts that say | *“home safe?”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['home safe? ♡'], null)
      label(x, 790, 1090, 'SWOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Dates with | *a real dessert menu.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      menu(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.5)))
      bubble(x, 400, 620, 'one of each', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'A hug that lasts | *ten seconds. Minimum.*', mood: 'heart', star: { x: -120 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', lerp(980, F.x + 170, ease.outCubic(prog(lt, 0.3, 0.9))), F.cy + 10, 230 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
      const n = Math.max(1, 10 - Math.floor(clamp((lt - 0.8) / 1.4) * 9))
      label(x, 790, 640, `HUG: ${n}…`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No rushing. | *Slow is the point.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      slowSign(x, 800, 780, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1110, 'SPEED: CUDDLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans that | *actually happen.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      tickets(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'NOT CANCELLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
      sparkles(x, t, 790, 840, P.t0 + 1.4, 8, 220, 0.2)
    } },
  { sign: S, cap: 'Pizza. Couch. | *You.* Perfect.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PIZZA, { C: '#c98f2a', Y: '#ffd27a', R: RED }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 790, 1100, 'FRIDAY: SORTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04 })
    } },
  { sign: S, cap: 'A match who’s | *in it for real.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['looking for:', 'something real'], '✦ NEW MATCH')
      label(x, 790, 1090, 'KEEPER', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 44, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'Kind words | *on a hard day.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      letter(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.3))
    } },
  { sign: S, cap: 'Someone who stays | *on boring Tuesdays.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), k2 = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, MUG, { W: '#fff4e2', C: GREEN }, 720, 900, 18 * k)
      drawBits(x, MUG, { W: '#fff4e2', C: PINK }, 880, 900, 18 * k2)
      if (k > 0.5) label(x, 720, 1030, 'MINE', 1, { size: 28, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
      if (k2 > 0.5) label(x, 880, 1030, 'YOURS', 1, { size: 28, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'v3a086', key: 'D', accent: GREEN, solo: S, ending: 'group',
  title: 'What Tauruses need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Basically: | *snacks and loyalty.*', mood: 'heart' },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush / trs3newmatch do) if the hook is
// wider than the measure, so it stays on its two lines, clear of the stage card's name tab
const HOOK_START = 'WhatTauruses'
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
