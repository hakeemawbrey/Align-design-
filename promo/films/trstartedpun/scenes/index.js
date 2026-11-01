// trstartedpun: HOW IT STARTED vs HOW IT'S GOING, "Pun intended." (20 s vertical, Star Talk Trends §6, music: dreamy · Gb)
// The format's look lives in ./started.js (identical in all five tr-started films).
//   0–6.6     HOW IT STARTED (a rooftop, a telescope, first date): ♊ Gemini clears its throat: "I'm *Sirius*-ly into
//             you." Total silence. A cricket chirps. A tumbleweed rolls across the roof. ♑ Capricorn blinks. Gemini
//             sweats. Capricorn: "…" (and the tiniest smile). ♓ Pisces on the next roof cries from secondhand nerves.
//             THE STARS: "silence. a whole *constellation* of it."
//   6.6       card cut.
//   6.6–12.3  HOW IT'S GOING (same rooftop, a blanket, two mugs): a pun volley. "you're *stellar*." "you *Mars*-velous
//             thing." "*Orion* my way to you." and Capricorn lands the callback: "Sirius-ly." A chalk slate tallies the
//             puns. The tumbleweed rolls back in wearing a heart; the crickets chirp in rhythm. ♓ Pisces sobs happily.
//             THE STARS: "the pun is their *love language* now."
//   12.3–15.6 the two photos side by side. Last line: "Pun *intended.*"
import { lerp, prog, ease } from '../../../src/lib.js'
import {
  makeStarted, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, pop01, r3,
  INK, BONE, GOLD, PINK, MONO, INTER, HEART, HEART_BM,
} from './started.js'

const GEM = signStar('gemini'), CAP = signStar('capricorn')

function rooftop(x, t, now) {
  const g = x.createLinearGradient(0, 0, 0, 600)
  g.addColorStop(0, now ? '#2a1d5e' : '#1c1a3a'); g.addColorStop(1, now ? '#6a3f8a' : '#3a3358')
  x.fillStyle = g; x.fillRect(0, 0, 820, 600)
  for (let i = 0; i < 40; i++) {
    const sx = (i * 197) % 820, sy = (i * 113) % 420, tw = 0.5 + 0.5 * Math.sin(t * 2 + i)
    x.globalAlpha = 0.4 + 0.6 * tw; R(x, i % 5 ? BONE : GOLD, sx, sy, i % 7 ? 4 : 6, i % 7 ? 4 : 6); x.globalAlpha = 1
  }
  // the moon
  { const mc = now ? '#fff1c8' : '#d9d2c0', md = now ? '#e8d9a8' : '#bdb6a6'
    R(x, INK, 572, 60, 44, 88); R(x, INK, 556, 76, 76, 56); R(x, INK, 562, 66, 64, 76)
    R(x, mc, 576, 64, 36, 80); R(x, mc, 560, 80, 68, 48); R(x, mc, 566, 70, 56, 68); R(x, md, 580, 86, 14, 14); R(x, md, 600, 112, 10, 10) }
  // the neighbour's roof (right) for Pisces
  R(x, INK, 640, 360, 190, 260); R(x, now ? '#4a3266' : '#2f2a48', 646, 366, 180, 254)
  for (let j = 0; j < 2; j++) R(x, now ? '#ffd27a' : '#6e6a5a', 680 + j * 70, 420, 34, 44)
  // our roof
  R(x, INK, 0, 594, 820, 10); R(x, now ? '#5b3a5e' : '#3a3046', 0, 604, 820, 216)
  for (let i = 0; i < 10; i++) R(x, now ? '#6a4570' : '#443854', i * 90 + 10, 620, 70, 16)
  // the telescope
  x.save(); x.translate(80, 470); x.rotate(-0.6); R(x, INK, -14, -70, 28, 120); R(x, '#c9a6ff', -9, -66, 18, 112); R(x, INK, -20, -78, 40, 16); x.restore()
  R(x, INK, 70, 500, 6, 100); R(x, INK, 90, 500, 6, 100)
}
function tumbleweed(x, t, cx, cy, heart) {
  x.save(); x.translate(cx, cy); x.rotate(t * 6)
  for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); R(x, INK, -4, -38, 8, 40); R(x, '#b98d55', -2, -36, 4, 36) }
  R(x, INK, -16, -16, 32, 32); R(x, '#c99a5e', -12, -12, 24, 24)
  x.restore()
  if (heart) drawBits(x, HEART_BM, { H: HEART }, cx, cy - 58, 6)
}
function chirp(x, t, t0, life, cx, cy, text = '* chirp *') {
  if (t < t0 || t > t0 + life) return
  x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, t0, t0 + life))
  x.font = `700 28px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.fillText(text, cx, cy); x.restore()
}

// ── A: the pun
const A = { ahem: 0.95, pun: 1.35, chirp: 2.45, weed: [2.7, 4.4], blink: 3.4, sweat: 3.55, dots: 4.5, smile: 5.25 }
function sceneA(x, t) {
  rooftop(x, t, false)
  pisces(x, t, 735, 300, 120, t > A.chirp ? 2 : 1, { mood: 'wide', look: [-1, 0] })
  const gm = t > A.sweat ? 'squint' : t > A.pun + 1.0 ? 'neutral' : 'wink'
  drawStarChar(x, 300, 520, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: t > A.sweat ? [0, 1] : [1, 0], hops: [A.ahem, A.pun], seed: 4 })
  const cm = t > A.smile ? 'happy' : 'neutral'
  drawStarChar(x, 540, 520, 220, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: [-1, 0], blink: t > A.blink && t < A.blink + 0.14 ? 1 : t > A.blink + 0.3 && t < A.blink + 0.44 ? 1 : 0, bob: 0, seed: 9, blush: t > A.smile ? 0.6 : 0 })
  // a sweat drop
  if (t > A.sweat) { const k = pop01(t, A.sweat, 0.2, 2); drawBits(x, ['.B.', 'BBB', 'BWB', '.B.'], { B: '#8fe3ff', W: '#fff' }, 380, 430 + 20 * prog(t, A.sweat, A.sweat + 1.5), 7 * k) }
  speech(x, t, 300, 330, A.ahem, 'ahem.', { size: 28, life: 0.4, tail: -1 })
  speech(x, t, 340, 300, A.pun, 'I’m Sirius-ly into you.', { size: 34, life: 1.15, tail: -1, col: '#fff3c4' })
  chirp(x, t, A.chirp, 1.0, 420, 250)
  chirp(x, t, A.chirp + 1.3, 0.8, 470, 210)
  const w = prog(t, ...A.weed)
  if (w > 0 && w < 1) tumbleweed(x, t, lerp(-60, 880, w), 560 + 12 * Math.abs(Math.sin(w * 12)), false)
  speech(x, t, 560, 320, A.dots, '…', { size: 40, life: 0.75, tail: 1 })
}

// ── B: the volley
const B = { v1: 7.2, v2: 7.85, v3: 8.5, v4: 9.15, weed: [10.0, 10.9], beat: [11.0, 11.35, 11.7] }
const VOLLEY = [
  { t: B.v1, who: 'g', text: 'you’re stellar.' },
  { t: B.v2, who: 'c', text: 'you Mars-velous thing.' },
  { t: B.v3, who: 'g', text: 'Orion my way to you.' },
  { t: B.v4, who: 'c', text: 'Sirius-ly.' },
]
function sceneB(x, t) {
  rooftop(x, t, true)
  pisces(x, t, 735, 300, 120, 3, { mood: t > B.v4 ? 'happy' : 'sparkle', look: [-1, 0], hops: [B.v4 + 0.1] })
  // the blanket + mugs
  R(x, INK, 170, 560, 470, 70); R(x, '#ff8fb1', 176, 566, 458, 58)
  for (let i = 0; i < 8; i++) R(x, '#ffc1d6', 186 + i * 56, 576, 28, 38)
  const love = t > B.v4
  drawStarChar(x, 300, 520, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: love ? 'heart' : 'happy', look: [1, 0], hops: [B.v1, B.v3, B.v4 + 0.2, ...B.beat], seed: 4, glow: 1.2 })
  drawStarChar(x, 540, 520, 220, t, { color: CAP.color, glyph: CAP.glyph, mood: love ? 'sparkle' : 'happy', look: [-1, 0], hops: [B.v2, B.v4, ...B.beat], seed: 9, glow: 1.2 })
  for (const [mx, c] of [[190, '#ffd166'], [640, '#7fd0ff']]) { R(x, INK, mx - 22, 562, 44, 44); R(x, c, mx - 18, 566, 36, 36); R(x, INK, mx + 18, 572, 14, 22) }
  for (const v of VOLLEY) speech(x, t, v.who === 'g' ? 330 : 520, v.who === 'g' ? 300 : 260, v.t, v.text, { size: 32, life: v.who === 'c' && v.t === B.v4 ? 1.6 : 0.85, tail: v.who === 'g' ? -1 : 1, col: v.t === B.v4 ? '#ffe1ec' : '#fff3c4' })
  if (love) hearts(x, t, 420, 400, B.v4 + 0.2, { n: 7, life: 1.8, cell: 6, spread: 260 })
  sparkles(x, t, 520, 260, B.v4, 10, 120, 1, [HEART, GOLD, BONE], 22)
  // the slate tallies the puns
  x.save(); x.translate(410, 716)
  R(x, INK, -150, -50, 300, 100); R(x, '#2f3b36', -144, -44, 288, 88)
  x.font = `700 20px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.8)'; x.textAlign = 'left'; x.fillText('PUNS TONIGHT', -132, -18)
  const n = VOLLEY.filter(v => t > v.t + 0.2).length
  for (let i = 0; i < n; i++) { const k = pop01(t, VOLLEY[i].t + 0.2, 0.2, 2); x.save(); x.globalAlpha = k; R(x, BONE, -120 + i * 24, 2, 6, 34 * k); x.restore() }
  if (n > 0) { x.font = `800 22px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'right'; x.fillText(n >= 4 ? 'ALL OF THEM' : '', 136, 30) }
  x.restore()
  // the tumbleweed rolls back in, with a heart; the crickets chirp in rhythm
  const w = ease.outCubic(prog(t, ...B.weed))
  if (w > 0) tumbleweed(x, w < 1 ? t : B.weed[1], lerp(880, 710, w), 560, true)
  B.beat.forEach((b, i) => chirp(x, t, b, 0.5, 560 + i * 70, 200 + (i % 2) * 30, '* chirp *'))
}

const EP = makeStarted({
  id: 'trstartedpun', accent: '#9fe6b0',
  A: { draw: sceneA, stamp: 'DATE 1', sub: 'first date. first pun.' },
  B: { draw: sceneB, stamp: 'TONIGHT', sub: 'they speak fluent pun now.' },
  lines: [{ t: 2.95, text: 'silence. a whole *constellation* of it.' }, { t: 9.3, text: 'the pun is their *love language* now.' }],
  last: 'Pun *intended.*',
  cues: () => [
    ['pop', A.ahem, 523.25, 0.025, -0.3], ['pop', A.pun, 880, 0.04, -0.3], ['pop', A.pun + 0.1, 1046.5, 0.035, -0.3],
    ...[0, 0.09, 0.33, 0.42, 1.3, 1.39].map(d => ['pluck', r3(A.chirp + d), 2637, 0.012, 0.1, 0.3]),
    ['whoosh', A.weed[0], 1.6, 0.015], ['tick', A.blink, 0.02], ['tick', A.blink + 0.3, 0.02],
    ['pluck', A.sweat, 1567.98, 0.02, 0.3, -0.3], ['pop', A.dots, 440, 0.025, 0.3], ['pop', A.smile, 1174.66, 0.02, 0.3],
    ...VOLLEY.map((v, i) => ['pop', v.t, [880, 987.77, 1174.66, 1318.51][i], 0.04, v.who === 'g' ? -0.3 : 0.3]),
    ...VOLLEY.map((v, i) => ['tick', r3(v.t + 0.2), 0.03 + i * 0.005]),
    ['bell', B.v4 + 0.05, 1760, 0.03, 1.0, 0.3], ['glitter', B.v4, B.v4 + 0.5],
    ['whoosh', B.weed[0], 0.9, 0.015], ['pluck', B.weed[1], 1318.51, 0.025, 0.4, 0.4],
    ...B.beat.flatMap(b => [['pluck', b, 2637, 0.014, 0.1, 0.3], ['pluck', r3(b + 0.09), 2637, 0.014, 0.1, 0.3]]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void PINK
