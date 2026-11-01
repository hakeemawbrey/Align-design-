// trwaitaqua: WAIT FOR IT, "Invented for you." (20 s vertical, Star Talk Trends §12.4, music: screwed · Abm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./wait.js (identical in all five episodes).
//   0.0–3.8   "Aquarius is | *building something.*"  + "wait for it…". ♒ Aquarius bolts a box together; a big gear, a
//             second gear, a chimney. The plate on it reads PROJECT: ???. ♍ Virgo, the date, watches, one eyebrow up.
//   3.95–9.3  "It's getting | *weirder.*"  An antenna with a blinking light, a coil, then a whole flurry of tiny gears,
//             a crane arm with something hidden under a sheet. Smoke puffs, rattles, CLANK / BZZT. Stickers:
//             "gear one: *fine*" · "gear forty: *concerning*" · "…it's *making noises* now". The bar stalls at 99%.
//   9.45      card cut.
//   9.5–13.4  "It makes… | *tea.*"  On the drop the sheet whips off: a teapot. It tips, pours one neat stream into a
//             cup, and the cup rides a little conveyor across to Virgo. The plate flips to PROJECT: YOUR TEA.
//             ♒ AQUARIUS: "it does one thing: make *your tea*."
//   13.45–15.5 "*Invented* for you."  Virgo goes heart-eyed, hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, MONO, HEART, drawBits, pop01, outK, popOut, r3, plate, sparkles } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const TEAL = '#4fc3c8', TEAL_D = '#2e8a95', BRASS = '#e3b55a', BRASS_D = '#a8782f', STEEL = '#c9c2d8', STEEL_D = '#8a83a0'
const PART = { base: 0.9, g1: 1.6, g2: 2.3, chim: 3.0, ant: 4.6, coil: 5.1, arm: 7.0 }
const TINY = Array.from({ length: 7 }, (_, i) => ({ t: r3(5.85 + i * 0.09), x: 470 + ((i * 97) % 260), y: 610 + ((i * 53) % 120), r: 14 + (i % 3) * 5 }))
const NOISE = [{ t: 7.75, w: 'CLANK', x: 330, y: 560, r: -0.12 }, { t: 8.2, w: 'BZZT', x: 790, y: 560, r: 0.1 }, { t: 8.6, w: 'WHIRR', x: 560, y: 520, r: -0.05 }]
const POUR = [10.0, 10.9], RIDE = [11.05, 11.75]
const CUPA = { x: 636, y: 905 }, CUPB = { x: 672, y: 1085 }

function gear(x, cx, cy, r, ang, col = BRASS, dark = BRASS_D) {
  x.save(); x.translate(cx, cy); x.rotate(ang)
  const n = Math.max(6, Math.round(r / 6))
  x.fillStyle = INK
  for (let i = 0; i < n; i++) { x.save(); x.rotate(i / n * Math.PI * 2); x.fillRect(-r * 0.16 - 3, -r - 9, r * 0.32 + 6, 16); x.restore() }
  x.beginPath(); x.arc(0, 0, r + 3, 0, Math.PI * 2); x.fill()
  x.fillStyle = col
  for (let i = 0; i < n; i++) { x.save(); x.rotate(i / n * Math.PI * 2); x.fillRect(-r * 0.16, -r - 6, r * 0.32, 12); x.restore() }
  x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = dark; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.22, 0, Math.PI * 2); x.fill()
  x.restore()
}

function machine(x, t, T, ctx) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0) return
  const rev = t >= T.reveal
  // the rattle grows through the build and stops dead on the reveal
  const rat = rev ? 0 : clamp(prog(t, T.stk[1], T.stall)) * 1 + clamp(prog(t, T.stk[2], T.stk[2] + 0.2)) * 1.5
  const jx = rat * 4 * Math.sin(t * 47), jy = rat * 3 * Math.sin(t * 61 + 1)
  const spin = rev ? 1.6 : 0.6 + rat * 2
  const ang = t * spin
  x.save(); x.translate(560, 930); x.scale(1.2, 1.2); x.translate(-560, -930)
  x.save(); x.globalAlpha = k; x.translate(jx, jy)
  const P = (at) => pop01(t, at, 0.3, 2.4)
  // chimney + smoke
  const ck = P(PART.chim)
  if (ck > 0.01) {
    x.save(); x.translate(380, 800); x.scale(ck, ck)
    R(x, INK, -26, -250, 52, 250); R(x, STEEL, -20, -244, 40, 244); R(x, STEEL_D, 8, -244, 12, 244)
    R(x, INK, -36, -262, 72, 24); R(x, STEEL, -30, -256, 60, 12)
    x.restore()
    if (t > T.build && !rev) for (let i = 0; i < 4; i++) {
      const ph = ((t * (0.7 + rat * 0.4)) + i / 4) % 1, r = 16 + ph * 30
      x.save(); x.globalAlpha *= (1 - ph) * 0.85; x.fillStyle = i % 2 ? '#d8d0e8' : '#b9b0cc'
      x.fillRect(380 - r / 2 + Math.sin(i * 2 + t) * 20, 530 - ph * 140 - r / 2, r, r); x.restore()
    }
  }
  // antenna + blinking light
  const ak = P(PART.ant)
  if (ak > 0.01) {
    R(x, INK, 716, 800 - 200 * ak, 10, 200 * ak)
    const blink = Math.floor(t * (rat > 0.5 ? 8 : 3)) % 2 === 0
    const lc = rev ? '#7fe08a' : blink ? '#ff4f6e' : '#7a2a3a'
    x.save(); x.translate(721, 800 - 200 * ak - 10); x.scale(ak, ak); R(x, INK, -14, -14, 28, 28); R(x, lc, -10, -10, 20, 20); R(x, '#fff', -8, -8, 6, 6); x.restore()
  }
  // the gears
  if (P(PART.g1) > 0.01) gear(x, 470, 720, 62 * P(PART.g1), ang)
  if (P(PART.g2) > 0.01) gear(x, 585, 680, 42 * P(PART.g2), -ang * 1.45 + 0.2, STEEL, STEEL_D)
  for (const g of TINY) { const gk = P(g.t); if (gk > 0.01) gear(x, g.x, g.y, g.r * gk, (g.r % 2 ? 1 : -1) * ang * 3, g.r > 20 ? STEEL : BRASS, g.r > 20 ? STEEL_D : BRASS_D) }
  // the coil
  const sk = P(PART.coil)
  if (sk > 0.01) for (let i = 0; i < 6; i++) { const yy = 800 - i * 16 * sk - (rat ? 4 * Math.sin(t * 30 + i) : 0); R(x, INK, 640, yy - 8, 50, 10); R(x, BRASS, 644, yy - 6, 42, 6) }
  // the base (with the PROJECT plate)
  const bk = P(PART.base)
  if (bk > 0.01) {
    x.save(); x.translate(560, 930); x.scale(bk, bk)
    R(x, INK, -200, -136, 400, 136); R(x, TEAL, -194, -130, 388, 124); R(x, TEAL_D, -194, -30, 388, 24)
    for (const rx of [-176, 168]) for (const ry of [-112, -48]) R(x, '#bfeff2', rx, ry, 8, 8)
    const flip = prog(t, T.reveal + 0.1, T.reveal + 0.4)
    const sy = Math.abs(Math.cos(Math.PI * flip)), face = flip >= 0.5
    x.save(); x.translate(0, -78); x.scale(1, Math.max(0.05, sy))
    plate(x, face ? 'PROJECT: YOUR TEA' : 'PROJECT: ???', 0, 0, { size: 26, bg: face ? GOLD : BONE })
    x.restore()
    x.restore()
  }
  // the conveyor (appears with the arm)
  const armk = P(PART.arm)
  if (armk > 0.01) {
    R(x, INK, 600, 920, 220 * armk, 18); R(x, STEEL_D, 604, 924, 212 * armk, 10)
    for (let i = 0; i < 7; i++) R(x, INK, 610 + ((i * 32 + (rev ? t * 120 : 0)) % 210) * armk, 926, 6, 6)
  }
  x.restore()
  // the crane arm + the teapot (under a sheet until the reveal)
  if (armk > 0.01) {
    x.save(); x.globalAlpha = k; x.translate(jx, jy)
    R(x, INK, 772, 800 - 230 * armk, 18, 230 * armk); R(x, STEEL, 776, 800 - 226 * armk, 10, 226 * armk)
    R(x, INK, 690, 566, 100 * armk, 16); R(x, STEEL, 694, 570, 92 * armk, 8)
    const tilt = rev ? -0.75 * ease.inOutCubic(prog(t, POUR[0] - 0.3, POUR[0])) * (1 - ease.inOutCubic(prog(t, POUR[1], POUR[1] + 0.3))) : 0
    x.save(); x.translate(720, 640); x.scale(armk, armk); x.rotate(tilt)
    // teapot
    R(x, INK, -54, -40, 108, 84); R(x, '#ff9db0', -50, -36, 100, 76); R(x, '#d86d86', -50, 22, 100, 18)
    R(x, INK, -26, -56, 52, 20); R(x, '#ff9db0', -22, -52, 44, 12); R(x, INK, -6, -66, 12, 12)
    R(x, INK, -86, -22, 36, 14); R(x, INK, -96, -32, 16, 14)                                         // spout
    R(x, '#ff9db0', -84, -18, 32, 6)
    R(x, INK, 50, -24, 26, 52); R(x, '#1b1236', 54, -18, 14, 40)                                     // handle
    drawBits(x, HEART, { H: BONE }, 0, -2, 4, { outline: null })
    x.restore()
    // the sheet over it (until the reveal), then it whips off up and away
    const off = prog(t, T.reveal, T.reveal + 0.5)
    if (off < 1) {
      x.save(); x.translate(720 + off * 260, 630 - off * 420); x.rotate(off * 1.2 + (rat ? 0.04 * Math.sin(t * 40) : 0)); x.scale(armk, armk); x.globalAlpha *= 1 - off
      R(x, INK, -78, -70, 156, 140); R(x, '#e9e4f5', -72, -64, 144, 128); R(x, '#c9c2d8', -72, 40, 144, 24)
      x.font = `800 72px ${MONO}`; x.fillStyle = '#8a83a0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -6)
      x.restore()
    }
    // the pour
    const pk = prog(t, POUR[0], POUR[1])
    if (pk > 0 && pk < 1) { const a = Math.sin(Math.PI * pk); x.save(); x.globalAlpha *= a; R(x, INK, CUPA.x - 8, 684, 16, CUPA.y - 46 - 684); R(x, '#c58a5a', CUPA.x - 4, 684, 8, CUPA.y - 46 - 684); x.restore() }
    x.restore()
  }
  // the cup: appears under the spout, fills, rides the conveyor to the date
  if (rev && t > POUR[0] - 0.2) {
    const ride = ease.inOutCubic(prog(t, ...RIDE))
    const cx = lerp(CUPA.x, CUPB.x, ride), cy = lerp(CUPA.y, CUPB.y, ride) - 30 * Math.sin(Math.PI * ride)
    const fillP = prog(t, POUR[0] + 0.1, POUR[1])
    x.save(); x.globalAlpha = k; x.translate(cx, cy); x.scale(pop01(t, POUR[0] - 0.2, 0.25, 2), pop01(t, POUR[0] - 0.2, 0.25, 2))
    R(x, INK, -34, -46, 68, 58); R(x, '#f4ecdc', -30, -42, 60, 50)
    R(x, '#c58a5a', -30, -42 + 40 * (1 - fillP), 60, 40 * fillP + 2)
    R(x, INK, 26, -34, 20, 30); R(x, '#f4ecdc', 30, -30, 10, 22)
    R(x, INK, -44, 8, 88, 10); R(x, '#d9cfbd', -40, 10, 80, 6)
    if (fillP >= 1) for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * 0.8; R(x, BONE, -14 + i * 12 + Math.sin(t * 4 + i) * 5, -58 - ph * 50, 6, 10); x.restore() }
    x.restore()
    sparkles(x, t, CUPB.x, CUPB.y - 30, RIDE[1], 8, 90, 3, [GOLD, PINK, BONE])
  }
  x.restore()
}

function noises(x, t, T) {
  for (const n of NOISE) {
    const nk = pop01(t, n.t, 0.2, 2.8) * outK(t, [T.reveal - 0.15, T.reveal])
    if (nk > 0.01) plate(x, n.w, n.x, n.y, { size: 30, font: "Inter, 'Helvetica Neue', Arial, sans-serif", weight: 800, bg: '#ffe27a', rot: n.r, scale: nk })
  }
}

const EP = makeEpisode({
  id: 'trwaitaqua', key: 'Abm', seed: 1204,
  hero: { sign: 'aquarius', lineColor: '#7fe0ff' },
  date: { sign: 'virgo', lineColor: '#c9e6a0' },
  h0: 'Aquarius is | *building something.*', h0Accent: '#7fe0ff',
  h1: "It's getting | *weirder.*",
  h2: 'It makes… | *tea.*', h2Accent: PINK,
  last: '*Invented* for you.', lastAccent: GOLD,
  stickers: ['gear one: *fine*', 'gear forty: *concerning*', '…it’s *making noises* now'],
  line: { who: 'hero', text: 'it does one thing: make *your tea*.' },
  focus: { x: 560, y: 820 },
  glow: { x: 660, y: 780 },
  heroHops: [PART.base, PART.g1, PART.g2, PART.chim, PART.ant, PART.coil, PART.arm].map(v => r3(v + 0.02)),
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, -0.6] }
    if (ph === 'build') return t > T.stk[2] ? { mood: 'sparkle', look: [1, -0.8] } : { mood: 'happy', look: [1, -0.6] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'neutral', look: [-1, -0.5] }
    if (ph === 'build') return t > T.stk[1] ? { mood: 'wide', look: [-1, -0.6], squash: t > T.stk[2] ? 0.05 : 0 } : { mood: 'squint', look: [-1, -0.6] }
    if (ph === 'reveal') return t < RIDE[1] ? { mood: 'wide', look: [-1, 0.4] } : { mood: 'heart', look: [-1, 0.3] }
    return null
  },
  back: machine,
  front(x, t, T) { noises(x, t, T) },
  cues: T => [
    ...[PART.base, PART.g1, PART.g2, PART.chim, PART.ant, PART.coil, PART.arm].flatMap(v => [['tick', r3(v + 0.05), 0.04], ['pop', r3(v + 0.1), 659.25, 0.025, 0.1]]),
    ...TINY.map((g, i) => ['pop', r3(g.t + 0.05), [1318.51, 1567.98, 1760][i % 3], 0.02, (i % 2 ? 0.3 : -0.3)]),
    ...NOISE.map((n, i) => ['tom', n.t, [140, 180, 120][i], { gain: 0.14, decay: 0.15 }]),
    ...NOISE.map(n => ['tick', r3(n.t + 0.04), 0.05]),
    ['whoosh', r3(T.reveal + 0.02), 0.5, 0.045],
    ...Array.from({ length: 8 }, (_, i) => ['pluck', r3(POUR[0] + 0.1 + i * 0.1), 1046.5 + i * 60, 0.012, 0.25, 0.3]),
    ['tick', RIDE[0], 0.03], ['bell', RIDE[1], 1567.98, 0.03, 1.0, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
