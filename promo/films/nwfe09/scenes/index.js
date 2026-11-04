// nwfe09: WAIT FOR IT, "Found yours." (20 s vertical trial reel, Wait for It Vol. 2 ep 9, music: screwed · Bbm)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Aquarius is staring | *at the sky.*" + "wait for it…". ♒ Aquarius, mid-squint, at a telescope on a
//             tripod; ♊ Gemini waits on the right.
//   3.95–9.3  "It forgot | *the date…*"  Stickers: "twenty minutes: *still looking*" · "it's *muttering numbers*" ·
//             "…did it forget *the date?!*". Little number bubbles float up from Aquarius.
//   9.45      card cut.
//   9.5–13.4  "What's up there? | *Your stars.*"  On the drop the eyepiece view opens over the sky: two bright stars,
//             Castor and Pollux, the Twins of Gemini. ♒ AQUARIUS: "those two? the *Twins*. your stars."
//   13.45–15.5 "Found *yours*."  Hearts, Pisces fountains.
// Astronomy: Castor and Pollux are Gemini's two brightest stars (real). No dates on screen.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall, MONO } from '../../nwfe01/scenes/wait.js'
import { drawPixelStar } from '../../sky.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const SCOPE = { x: 420, y: 1210 }            // tripod foot centre
const VIEW = { x: 560, y: 690, r: 170 }

function telescope(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  const { x: sx, y: sy } = SCOPE
  // tripod
  for (const d of [-1, 0, 1]) { x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(sx, sy - 170); x.lineTo(sx + d * 80, sy); x.stroke(); x.strokeStyle = '#8a8aa8'; x.lineWidth = 8; x.beginPath(); x.moveTo(sx, sy - 170); x.lineTo(sx + d * 80, sy); x.stroke() }
  // the tube, tilted up-right
  x.translate(sx, sy - 180); x.rotate(-0.62 + 0.02 * Math.sin(t * 0.8))
  R(x, INK, -90, -34, 270, 68); R(x, '#5a6ad8', -84, -28, 258, 56); R(x, '#8a9af0', -84, -28, 258, 12)
  R(x, INK, 170, -44, 40, 88); R(x, '#3a3a6a', 176, -38, 28, 76)
  R(x, INK, -110, -18, 30, 36); R(x, '#3a3a6a', -106, -14, 22, 28)
  R(x, GOLD, 30, -28, 14, 56)
  x.restore()
}

function eyepieceView(x, t, T) {
  const a = pop01(t, T.reveal + 0.02, 0.45, 1.8) * outK(t, T.out)
  if (a <= 0.01) return
  const { x: cx, y: cy, r } = VIEW
  x.save(); x.translate(cx, cy); x.scale(a, a)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9ccd8'; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0b0a24'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  for (let i = 0; i < 40; i++) { const px = ((i * 71) % 320) - 160, py = ((i * 113) % 320) - 160; R(x, i % 3 ? '#8a8ab8' : '#ffffff', px, py, 4, 4) }
  // the Twins: two bright stars (Pollux a touch brighter and warmer), and a faint stick figure
  x.strokeStyle = 'rgba(199,166,255,0.45)'; x.lineWidth = 4
  x.beginPath(); x.moveTo(-50, -70); x.lineTo(-80, 40); x.lineTo(-60, 120); x.moveTo(40, -50); x.lineTo(30, 60); x.lineTo(70, 130); x.stroke()
  const tw = 1 + 0.12 * Math.sin(t * 6)
  drawPixelStar(x, -50, -70, 110 * tw, 2, '#dfe8ff')
  drawPixelStar(x, 40, -50, 130 * tw, 2, '#ffd59a')
  x.restore()
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE
  const lk = clamp(prog(t, T.reveal + 0.6, T.reveal + 0.9))
  x.globalAlpha = lk
  x.fillText('CASTOR', -60, -116); x.fillText('POLLUX', 70, -96)
  x.restore()
  const pk = pop01(t, T.reveal + 0.9, 0.3, 2.4) * outK(t, T.out)
  if (pk > 0.01) plate(x, 'GEMINI · THE TWINS', cx, cy + r + 40, { size: 26, bg: GOLD, alpha: clamp(pk), scale: 0.8 + 0.2 * clamp(pk) })
}

function numbers(x, t, T, ctx) {
  if (t < T.stk[1] - 0.2 || t > T.reveal) return
  const H = ctx.P.hero
  const ns = ['4.2', '12°', '0.7', '31', '88°', '2.9']
  for (let i = 0; i < 6; i++) {
    const ph = (t * 0.7 + i / 6) % 1
    x.save(); x.globalAlpha = 0.9 * Math.sin(Math.PI * ph)
    x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'
    x.fillText(ns[i], H.x - 40 + (i % 3) * 50, H.y - 150 - ph * 140)
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'nwfe09', key: 'Bbm', seed: 4709,
  hero: { sign: 'aquarius', lineColor: '#9fd8ff' },
  date: { sign: 'gemini' },
  pos: { hero: { x: 200, y: 1080, s: 225 }, date: { x: 900, y: 1090, s: 205 }, pis: { x: 990, y: 640, s: 110 } },
  h0: 'Aquarius is staring | *at the sky.*', h0Accent: '#9fd8ff',
  h1: 'It forgot | *the date…*',
  h2: 'What’s up there? | *Your stars.*', h2Accent: PINK,
  last: 'Found *yours*.', lastAccent: GOLD,
  stickers: ['twenty minutes: *still looking*', 'it’s *muttering numbers*', '…did it forget *the date?!*'],
  line: { who: 'hero', text: 'those two? the *Twins*. your stars.' },
  focus: { x: 560, y: 900 },
  glow: { x: VIEW.x, y: VIEW.y },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: 'squint', look: [1, -1] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'build') return { mood: t > T.stk[2] ? 'eyeroll' : 'neutral', look: [-1, 0] }
    if (ph === 'reveal') return { mood: t > T.reveal + 0.6 ? 'sparkle' : 'wide', look: [-1, -1] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 16, seed: 14, alpha: 0.35 * clamp(popOut(t, T.out)), y1: 940, speed: 0.5 }) },
  mid(x, t, T) { telescope(x, t, T) },
  front(x, t, T, ctx) {
    numbers(x, t, T, ctx)
    eyepieceView(x, t, T)
    sparkles(x, t, VIEW.x, VIEW.y, T.reveal + 0.1, 12, 220, 1, [GOLD, '#dfe8ff', PINK])
  },
  cues: T => [
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.stk[1] - 0.2 + i * 0.4), 0.012]).filter(c => c[1] < T.reveal),
    ['bell', r3(T.reveal + 0.1), 1567.98, 0.03, 1.6, -0.2], ['bell', r3(T.reveal + 0.3), 1760, 0.03, 1.6, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [lerp, ease]
