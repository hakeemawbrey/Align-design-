// trwaitleo: WAIT FOR IT, "Spotlight: you." (20 s vertical, Star Talk Trends §12.5, music: screwed · Bbm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./wait.js (identical in all five episodes).
//   0.0–3.8   "Leo has | *a speech.*"  + "wait for it…". ♌ Leo steps up on a little stage between red curtains, a
//             spotlight clunks on overhead, *tap tap* on the mic. ♐ Sagittarius, the date, sits in the one audience chair.
//   3.95–9.3  "Here it | *comes…*"  The spotlight hums brighter on Leo. AHEM. AHEM. AHEM. A stack of index cards
//             appears, then gets thicker. Stickers: "spotlight: *on*" · "throat: *cleared (3×)*" · "…there are *index
//             cards?!*" Sagittarius braces in the chair. The bar stalls at 99%.
//   9.45      card cut.
//   9.5–13.4  "The speech is | *about you.*"  On the drop the spotlight swings off Leo onto Sagittarius, and the top
//             card flips round, big: TONIGHT'S TOPIC: YOU. ♌ LEO: "tonight's topic: *you*. obviously."
//   13.45–15.5 "*Spotlight*: you."  Sagittarius glows in the light, hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, MONO, INTER, SERIF, HEART, drawBits, pop01, outK, popOut, r3, plate } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const LAMP = { x: 560, y: 580 }
const STAGE = { x0: 60, x1: 500, y: 1150 }
const MIC = { x: 440, top: 975 }
const LIGHT = 0.9, TAP = [1.7, 1.95]
const AHEM = [{ t: 5.15, x: 250, y: 840, r: -0.12 }, { t: 5.75, x: 330, y: 780, r: 0.08 }, { t: 6.35, x: 220, y: 730, r: -0.05 }]
const CARDS = { t: 7.6, thick: 8.25 }
const SWING = [9.5, 10.0]
const BIG = { x: 560, y: 760 }

function spotlight(x, t, T, ctx) {
  const k = clamp(popOut(t, T.out))
  const on = prog(t, LIGHT, LIGHT + 0.08)
  if (on <= 0 || k <= 0) return
  const sw = ease.inOutCubic(prog(t, ...SWING))
  const tx = lerp(270, 850, sw), ty = 1170
  const hum = t < T.reveal ? 0.7 + 0.3 * clamp(prog(t, T.build, T.stall)) : 1
  const flick = t < LIGHT + 0.35 ? (Math.floor(t * 20) % 2 ? 0.4 : 1) : 1
  const a = 0.26 * hum * flick * k
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(LAMP.x, LAMP.y, tx, ty)
  g.addColorStop(0, `rgba(255,236,180,${a * 1.3})`); g.addColorStop(1, `rgba(255,236,180,${a * 0.5})`)
  x.fillStyle = g
  x.beginPath(); x.moveTo(LAMP.x - 26, LAMP.y + 20); x.lineTo(LAMP.x + 26, LAMP.y + 20); x.lineTo(tx + 190, ty); x.lineTo(tx - 190, ty); x.closePath(); x.fill()
  const pg = x.createRadialGradient(tx, ty, 0, tx, ty, 200)
  pg.addColorStop(0, `rgba(255,236,180,${a * 1.4})`); pg.addColorStop(1, 'rgba(255,236,180,0)')
  x.save(); x.translate(tx, ty); x.scale(1, 0.25); x.fillStyle = pg; x.fillRect(-200, -200, 400, 400); x.restore()
  x.restore()
}

function set(x, t, T, ctx) {
  const k = clamp(popOut(t, T.out)) * clamp(prog(t, 0.15, 0.8))
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  // curtains (left wing) + valance
  for (let i = 0; i < 4; i++) { R(x, INK, 0 + i * 34, 560, 36, 590); R(x, i % 2 ? '#b02a4a' : '#d43a5e', 4 + i * 34, 560, 28, 590) }
  R(x, INK, 0, 542, 200, 40); R(x, '#d43a5e', 0, 546, 196, 30); for (let i = 0; i < 6; i++) R(x, GOLD, 8 + i * 32, 576, 14, 10)
  // the lamp rig
  R(x, INK, 330, 550, 460, 14); R(x, '#8a83a0', 334, 553, 452, 8)
  x.save(); x.translate(LAMP.x, LAMP.y)
  const sw = ease.inOutCubic(prog(t, ...SWING))
  x.rotate(lerp(0.3, -0.35, sw))
  R(x, INK, -32, -10, 64, 46); R(x, '#4a4060', -28, -6, 56, 38); R(x, prog(t, LIGHT, LIGHT + 0.08) > 0 ? '#fff1b0' : '#6b5f86', -24, 26, 48, 10)
  x.restore()
  // the audience chair behind the date
  R(x, INK, 760, 980, 180, 24); R(x, '#8a5a3a', 764, 984, 172, 16)
  R(x, INK, 760, 980, 18, 190); R(x, INK, 922, 980, 18, 190)
  // the stage
  R(x, INK, STAGE.x0, STAGE.y - 10, STAGE.x1 - STAGE.x0, 90); R(x, '#a06a42', STAGE.x0 + 4, STAGE.y - 6, STAGE.x1 - STAGE.x0 - 8, 16); R(x, '#6e4329', STAGE.x0 + 4, STAGE.y + 10, STAGE.x1 - STAGE.x0 - 8, 64)
  for (let i = 0; i < 4; i++) R(x, GOLD, STAGE.x0 + 50 + i * 110, STAGE.y + 36, 22, 8)
  x.restore()
}

function mic(x, t, T) {
  const k = clamp(popOut(t, T.out)) * pop01(t, 0.6, 0.3, 2)
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  R(x, INK, MIC.x - 5, MIC.top, 10, STAGE.y - MIC.top); R(x, '#c9c2d8', MIC.x - 2, MIC.top, 4, STAGE.y - MIC.top)
  R(x, INK, MIC.x - 40, STAGE.y - 14, 80, 12)
  x.save(); x.translate(MIC.x, MIC.top); x.rotate(-0.6)
  R(x, INK, -14, -40, 28, 46); R(x, '#4a4060', -10, -36, 20, 38); R(x, '#c9c2d8', -10, -36, 20, 16)
  for (let i = 0; i < 3; i++) R(x, '#8a83a0', -8, -32 + i * 5, 16, 2)
  x.restore()
  x.restore()
  // *tap tap*
  for (const [i, tt] of TAP.entries()) {
    const kk = pop01(t, tt, 0.2, 2.6) * outK(t, [tt + 0.7, tt + 0.9])
    if (kk > 0.01) plate(x, 'tap', MIC.x + 40 + i * 40, MIC.top - 70 - i * 34, { size: 24, font: MONO, bg: BONE, scale: kk, rot: 0.1 - i * 0.2 })
  }
}

function cards(x, t, T, ctx) {
  // the stack in Leo's hand (grows thicker), until the top card flips out on the reveal
  const ck = pop01(t, CARDS.t, 0.3, 2.4) * outK(t, T.out)
  if (ck > 0.01 && ctx.hero) {
    const n = t > CARDS.thick ? 12 : 4, nk = prog(t, CARDS.thick, CARDS.thick + 0.3)
    const cnt = t > CARDS.thick ? Math.round(lerp(4, n, nk)) : 4
    const cx = ctx.hero.x + 120, cy = ctx.hero.y + 20
    x.save(); x.translate(cx, cy); x.scale(ck, ck); x.rotate(0.12)
    R(x, INK, -44, -30 - cnt * 5, 88, 62 + cnt * 5)
    for (let i = 0; i < cnt; i++) R(x, i % 2 ? '#f4ecdc' : '#e6dcc7', -40, 26 - i * 5 - 52, 80, 52)
    R(x, '#cfe0f0', -32, -14 - cnt * 5, 64, 3); R(x, '#cfe0f0', -32, -2 - cnt * 5, 64, 3)
    x.restore()
  }
  // the big card
  const fk = ease.outBack(prog(t, T.reveal + 0.15, T.reveal + 0.6)) * outK(t, T.out)
  if (fk > 0.01) {
    const sx = Math.abs(Math.sin(Math.PI / 2 * clamp(prog(t, T.reveal + 0.15, T.reveal + 0.45))))
    x.save(); x.translate(BIG.x, BIG.y); x.rotate(0.04); x.scale(fk * Math.max(0.08, sx), fk)
    const w = 500, h = 300
    R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 16, w, h)
    R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#f4ecdc', -w / 2, -h / 2, w, h)
    R(x, '#ff9db0', -w / 2, -h / 2 + 70, w, 3)
    for (let i = 0; i < 3; i++) R(x, '#cfe0f0', -w / 2 + 20, -h / 2 + 140 + i * 50, w - 40, 2)
    x.font = `800 36px ${INTER}`; x.fillStyle = '#3b2a63'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText("TONIGHT'S TOPIC:", 0, -h / 2 + 40)
    const yk = pop01(t, T.reveal + 0.55, 0.3, 2.6)
    x.save(); x.translate(0, 40); x.scale(yk, yk); x.font = `italic 600 130px ${SERIF}`; x.fillStyle = '#e8467a'; x.fillText('you', 0, 0); x.restore()
    if (t > T.reveal + 0.9) drawBits(x, HEART, { H: '#ff4f86' }, w / 2 - 60, h / 2 - 50, 6 * pop01(t, T.reveal + 0.9, 0.3, 2.6))
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'trwaitleo', key: 'Bbm', seed: 1205,
  hero: { sign: 'leo', lineColor: '#ffd27a' },
  date: { sign: 'sagittarius', lineColor: '#c9a6ff' },
  h0: 'Leo has | *a speech.*', h0Accent: '#ffd27a',
  h1: 'Here it | *comes…*',
  h2: 'The speech is | *about you.*', h2Accent: PINK, h2Late: 2,
  last: '*Spotlight*: you.', lastAccent: GOLD,
  stickers: ['spotlight: *on*', 'throat: *cleared (3×)*', '…there are *index cards?!*'],
  line: { who: 'hero', text: "tonight's topic: *you*. obviously." },
  focus: { x: 380, y: 950 },
  glow: { x: 560, y: 760 },
  pos: { hero: { x: 270, y: 1040, s: 250 }, date: { x: 850, y: 1065, s: 205 } },
  heroHops: [LIGHT + 0.1, ...TAP, ...AHEM.map(a => a.t)],
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: t > LIGHT ? 'sparkle' : 'happy', look: [0.4, -0.3] }
    if (ph === 'build') {
      if (AHEM.some(a => t > a.t && t < a.t + 0.4)) return { mood: 'squint', look: [0, 0], squash: 0.08 }
      return { mood: 'sparkle', look: [0.3, 0] }
    }
    if (ph === 'reveal') return { mood: 'happy', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'neutral', look: [-1, -0.2] }
    if (ph === 'build') return t > CARDS.thick ? { mood: 'wide', look: [-1, 0], squash: 0.06 } : { mood: 'neutral', look: [-1, -0.2] }
    if (ph === 'reveal') return t < T.reveal + 0.8 ? { mood: 'wide', look: [0, -1] } : { mood: 'sparkle', look: [-1, 0] }
    return null
  },
  back(x, t, T, ctx) { set(x, t, T, ctx); spotlight(x, t, T, ctx) },
  mid(x, t, T) { mic(x, t, T) },
  front(x, t, T, ctx) {
    for (const a of AHEM) {
      const kk = pop01(t, a.t, 0.2, 2.8) * outK(t, [T.stkOut[0], T.stkOut[1]])
      if (kk > 0.01) plate(x, 'AHEM', a.x, a.y, { size: 32, font: INTER, weight: 800, bg: '#ffe27a', rot: a.r, scale: kk })
    }
    cards(x, t, T, ctx)
  },
  cues: T => [
    ['tom', LIGHT, 80, { gain: 0.2, decay: 0.2 }], ['tick', r3(LIGHT + 0.02), 0.06],
    ...TAP.map(v => ['tom', v, 160, { gain: 0.14, decay: 0.08 }]),
    ...AHEM.map((a, i) => ['pluck', a.t, [196, 207.65, 185][i], 0.05, 0.3, -0.2]),
    ['pop', CARDS.t, 880, 0.03, -0.2], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(CARDS.thick + i * 0.05), 0.03]),
    ['whoosh', SWING[0], 0.5, 0.05], ['tom', r3(SWING[1] - 0.05), 90, { gain: 0.16, decay: 0.2 }],
    ['pop', r3(T.reveal + 0.55), 1318.51, 0.045, 0], ['bell', r3(T.reveal + 0.6), 1760, 0.03, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
