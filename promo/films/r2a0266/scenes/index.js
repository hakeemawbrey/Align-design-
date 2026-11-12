// r2a0266: star_advice, ADVICE SOLO, "Dear Capricorn: | call home." (topic: "Capricorn, this is your sign to call home") (~46 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole way through (solo mode, 9 cards): Capricorn's work-first life, gently reframed
// toward the people who love them.
//   0.0–3.6    "Dear Capricorn: | *call home.*"
//   3.6–37.8   nine cards (3.8 s each):
//              six missed calls from Mom, she just misses you · carrying everyone's boxes, let someone carry you
//              · emails at 11 p.m., the inbox can wait · home isn't a five-year plan · the group chat misses your jokes
//              · rest is maintenance (cocoa) · climbed the mountain, wave down at us · you don't have to earn a hug
//              · let them in (the door opens)
//  37.8        "Busy goat. | *Big heart.*"
//  41.2        callback: "Capricorn | *called back.*"  the phone from card one, connected: MOM · 3 HRS.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, laptop, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'capricorn'
const ST = { x: -190 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const CUP = ['WWWWWWWWW...', 'WTTTTTTTW.WW', 'WTTTTTTTWW.W', 'WTTTTTTTW..W', 'WTTTTTTTWWW.', '.WTTTTTW....', '..WWWWW.....']
const CUP_C = { W: CREAM, T: '#8a4a2e' }
const MALLOW = ['WW', 'WW']

/** a squiggle of steam */
function steam(x, cx, cy, len, t, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath()
  for (let i = 0; i <= 12; i++) { const yy = cy - i * len / 12, xx = cx + Math.sin(i * 0.9 + t * 4) * 9; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke(); x.restore()
}
/** a cardboard box with a word on it */
function box(x, cx, cy, w, h, s, k = 1) {
  if (k <= 0.01) return
  card(x, cx, cy, w, h, k, { bg: '#c98f5a', rot: 0, border: 5 }, () => {
    x.fillStyle = '#a8703f'; x.fillRect(-w / 2, -6, w, 12)
    txt(x, s, 0, 0, { size: 22, font: MONO, weight: 700, color: INK })
  })
}
/** the call screen used in card one and the callback */
function callScreen(x, cx, cy, k, t, { head, line, sub, col }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = DEEP; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = col; x.beginPath(); x.arc(0, -70, 62, 0, Math.PI * 2); x.fill()
  txt(x, head, 0, -70, { size: 40, color: INK })
  txt(x, line, 0, 30, { size: 32, color: BONE })
  txt(x, sub, 0, 80, { size: 24, color: col, font: MONO, weight: 700 })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Six missed calls? | *She just misses you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ring = lt < 1.3, sh = ring ? Math.sin(t * 40) * 5 : 0
      callScreen(x, 790 + sh, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t, { head: 'MOM', line: 'calling…', sub: 'MISSED: 6', col: PINK })
      tag(x, 790, 1110, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'TOPIC: NOTHING. JUST HI', BONE, 0.04, 28)
      if (lt > 1.4) hearts(x, t, 790, 760, P.t0 + 1.4 * 1.29, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Carrying everyone’s stuff? | *Let someone help.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), help = ease.inOutCubic(prog(lt, 0.9, 1.5))
      const W = ['WORK', 'FAMILY', 'FRIENDS', 'TAXES']
      W.forEach((s, i) => { const off = i === 0 ? help : 0; box(x, lerp(F.x, 800, off), lerp(F.top - 40 - i * 70, 960, off), 190, 66, s, k) })
      const h = pop01(t, P.t0 + 0.9 * 1.29, 0.4, 2)
      if (h > 0.01) signChar(x, t, 'taurus', 800, 1080, 170 * h, { mood: 'happy', seed: 61, glyph: false })
      bubble(x, 790, 700, 'got it!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Emails at 11 p.m.? | *The inbox can wait.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const closed = lt > 1.2
      laptop(x, 780, 940, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        if (closed) { txt(x, 'zzz', 0, -10, { size: 56, color: LAV }); txt(x, 'back at 9', 0, 46, { size: 24, color: GREY, font: MONO, weight: 700 }); return }
        txt(x, 'INBOX (212)', 0, -40, { size: 32, color: BONE, font: MONO, weight: 700 })
        for (let i = 0; i < 2; i++) { x.fillStyle = [RED, ORANGE][i]; x.fillRect(-100, 0 + i * 34, 200 - i * 50, 20) }
      })
      tag(x, 790, 620, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'INBOX: TUCKED IN', LAV, -0.04, 34)
    } },
  { sign: S, cap: 'Home isn’t a | *five-year plan.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), cross = ease.outCubic(prog(lt, 0.8, 1.2))
      card(x, 790, 860, 360, 380, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'HOME: THE PLAN', 0, -150, { size: 28, font: MONO, weight: 700 })
        ;['Yr 1: save', 'Yr 2: save more', 'Yr 3: spreadsheet'].forEach((s, i) => txt(x, s, -150, -80 + i * 56, { size: 28, weight: 700, color: BROWN, align: 'left' }))
        if (cross > 0) { x.fillStyle = RED; for (let i = 0; i < 3; i++) x.fillRect(-156, -82 + i * 56, 300 * cross, 6) }
        if (lt > 1.2) { txt(x, 'now: people', 0, 112, { size: 36, color: RED }) }
      })
      if (lt > 1.3) hearts(x, t, 380, 1000, P.t0 + 1.3 * 1.29, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'The group chat | *misses your jokes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'THE GROUP (9)', headCol: MINT, size: 24, lines: [['where’s cap??', PINK, pop01(t, P.t0 + 0.5, 0.3, 2)], ['send a joke', SKYB, pop01(t, P.t0 + 0.9, 0.3, 2)], ['even a bad one', GOLD, pop01(t, P.t0 + 1.3, 0.3, 2)]] })
    } },
  { sign: S, cap: 'Rest isn’t slacking. | *It’s maintenance.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CUP, CUP_C, 790, 920, 22 * k)
      for (let i = 0; i < 2; i++) drawBits(x, MALLOW, { W: '#ffffff' }, 740 + i * 60, 840 - 4 * Math.sin(t * 3 + i), 16 * k)
      for (let i = 0; i < 3; i++) steam(x, 730 + i * 50, 800, 120, t + i, k * 0.8)
      tag(x, 790, 1110, pop01(t, P.t0 + 1.2, 0.3, 2.2), 'SERVICE: COCOA', MINT, 0.04, 34)
      tag(x, 790, 640, pop01(t, P.t0 + 0.6, 0.3, 2.2), 'SCHEDULED UPKEEP', BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Reached the top? | *Wave down at us.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: 170, y: -150, s: 220 }, hops: [1.0, 1.6],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0, 0.4))
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.beginPath(); x.moveTo(300, 1180); x.lineTo(710, 760); x.lineTo(1000, 1180); x.closePath(); x.fill()
      x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(320, 1170); x.lineTo(710, 776); x.lineTo(980, 1170); x.closePath(); x.fill()
      x.fillStyle = CREAM; x.beginPath(); x.moveTo(710, 776); x.lineTo(650, 838); x.lineTo(690, 830); x.lineTo(710, 850); x.lineTo(740, 826); x.lineTo(768, 836); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      ;['pisces', 'leo', 'cancer'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.6 + i * 0.25, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 210 + i * 110, 1120, 110 * k, { mood: 'happy', seed: 70 + i, hops: [t - ((t * 1.5 + i * 0.3) % 1) / 1.5], glyph: false, tears: id === 'pisces' ? 1 : 0 })
      })
      bubble(x, 330, 900, 'hi!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
      bubble(x, 870, 560, 'hi!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'You don’t have to | *earn a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'INVOICE', 0, -140, { size: 30, font: MONO, weight: 700 })
        txt(x, '1 × hug', -140, -60, { size: 32, weight: 700, align: 'left' })
        txt(x, 'cost:', -140, 0, { size: 32, weight: 700, align: 'left', color: BROWN })
        txt(x, '$0.00', 0, 80, { size: 60, color: RED })
      })
      tag(x, 790, 1090, pop01(t, P.t0 + 1.3, 0.3, 2.4), 'PAID IN FULL: ALWAYS', MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Let them in. | *You’re worth knowing.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), op = ease.inOutCubic(prog(lt, 0.7, 1.3))
      if (k <= 0.01) return
      x.save(); x.translate(790, 880); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-130, -230, 260, 420)
      x.fillStyle = '#fff1b0'; x.fillRect(-118, -218, 236, 408)
      x.fillStyle = WOOD; x.fillRect(-118, -218, 236 * (1 - 0.75 * op), 408)
      x.fillStyle = GOLD; x.fillRect(-118 + 236 * (1 - 0.75 * op) - 30, -20, 14, 14)
      x.restore()
      tag(x, 790, 1130, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'WELCOME', PINK, 0.02, 40)
    } },
]

const F = makeFilm({
  id: 'r2a0266', key: 'D', accent: '#9aa5c4', solo: S, ending: 'callback',
  title: 'Dear Capricorn: | *call home.*',
  cameos: CAMEOS,
  group: { cap: 'Busy goat. | *Big heart.*', mood: 'heart' },
  last: {
    text: 'Capricorn | *called back.*',
    draw(x, t, lt) {
      callScreen(x, 540, 1060, pop01(t, t - lt + 0.6, 0.4, 2), t, { head: 'MOM', line: 'connected', sub: '3 HRS 12 MIN', col: MINT })
      hearts(x, t, 540, 1240, t - lt + 1.0, { n: 10, life: 2.2, spread: 520, cell: 8, seed: 3 })
      label(x, 540, 1340, 'SHE’S TELLING EVERYONE', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
