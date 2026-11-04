// nhve16: THEN vs NOW: HOLIDAYS, "Before the break in 2016 / 2026" (20 s, b18 #16, music: jazzy · Bb)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·19·2016"): a train platform. ♍ Virgo waves from the train window, ♐ Sag waves
//             from the platform at t = 0; the doors close, the train goes, nothing said. The calendar flips DAY 1 →
//             DAY 14 while Sag stares at a phone ("no new messages"): "were we… a thing?" ♓ Pisces on the platform
//             bench, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: the same platform, doors open. Virgo turns back: "so… what are we, over the break?" Sag: "we're
//             us." A hug; Virgo boards, beaming. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "clarity is a *holiday gift.*"  Last line: "Asked *before* the train."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { sign, beanie, scarf, mark, phone, snowfall, stringLights, RED, GREEN, CREAM } from '../../nhve01/scenes/holkit.js'

const VIR = signStar('virgo'), SAG = signStar('sagittarius')

function platform(x, t, now) {
  R(x, now ? '#3a4a7a' : '#4a3a4a', 0, 0, SW, SH)
  for (let i = 0; i < 5; i++) { R(x, INK, 60 + i * 200, 0, 14, 300); }
  R(x, now ? '#5a6a9a' : '#5a4a5a', 0, 280, SW, 30)
  R(x, INK, 0, 760, SW, 10); R(x, now ? '#9a9ab8' : '#8a7a7a', 0, 770, SW, 300); R(x, GOLD, 0, 770, SW, 12)
  sign(x, 700, 180, 'PLATFORM 2', { size: 30, col: '#fffaf0' })
  stringLights(x, t, 300, 14)
}
function train(x, dx, doorOpen) {
  x.save(); x.translate(dx, 0)
  R(x, INK, -20, 330, 520, 440); R(x, '#c94a5a', -14, 336, 508, 428); R(x, '#f4f6ff', -14, 600, 508, 20)
  for (let i = 0; i < 2; i++) { R(x, INK, 30 + i * 220, 380, 160, 150); R(x, '#a9d6ff', 36 + i * 220, 386, 148, 138) }
  R(x, INK, 380, 380, 110, 380); R(x, '#2a1a30', 386, 386, 98, 374)
  const w = 49 * (1 - doorOpen)
  R(x, '#e05a6a', 386, 386, w, 374); R(x, '#e05a6a', 484 - w, 386, w, 374)
  x.restore()
}

// ── THEN: 2016
const A = { close: 0.7, go: [1.3, 2.3], days: [2.5, 4.4], thing: 4.75 }
function sceneA(x, t) {
  platform(x, t, false)
  pisces(x, t, 800, 860, 110, 3, { mood: 'wide', look: [-1, 0], seed: 6 })
  R(x, INK, 700, 900, 200, 20); R(x, '#8a5a3a', 704, 904, 192, 12)
  // the train with Virgo in the window
  const gx = -1200 * ease.inCubic(prog(t, ...A.go))
  x.save(); x.beginPath(); x.rect(0, 0, SW, SH); x.clip()
  train(x, gx, 1 - prog(t, A.close - 0.3, A.close))
  drawStarChar(x, 110 + gx, 470, 120, t, { color: VIR.color, glyph: VIR.glyph, mood: 'happy', seed: 8, hops: [0.2, 0.5] })
  x.restore()
  // ♐ Sag on the platform, waving, then the phone vigil
  const vig = t > A.days[0]
  const sH = [0.15, 0.45, A.thing]
  drawStarChar(x, 330, 850, 220, t, { color: SAG.color, glyph: SAG.glyph, mood: t > A.thing ? 'wide' : vig ? 'sleepy' : 'happy', look: vig ? [0, 1] : [-1, -1], seed: 5, hops: sH, zzz: false })
  bangs(x, starFrame(330, 850, 220, t, { hops: sH, seed: 5 }))
  if (vig) {
    phone(x, 460, 900, { s: 0.75, text: 'no new\nmessages', rot: 0.1 })
    const d = 1 + Math.floor(prog(t, ...A.days) * 13.99)
    // the flipping calendar
    x.save(); x.translate(450, 500); x.rotate(-0.04)
    R(x, INK, -110, -90, 220, 190); R(x, '#fffaf0', -104, -84, 208, 178); R(x, RED, -104, -84, 208, 46)
    x.fillStyle = '#ffffff'; x.font = `800 30px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE BREAK', 0, -60)
    x.fillStyle = INK; x.font = `800 66px Inter, sans-serif`; x.fillText(`DAY ${d}`, 0, 24)
    x.restore()
  }
  speech(x, t, 250, 640, A.thing, 'were we…\na thing?', { size: 40, tail: -1, life: 1.7, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { turn: 7.1, ask: 7.4, us: 9.15, hug: [10.1, 10.6], board: 11.2 }
function sceneB(x, t) {
  platform(x, t, true)
  train(x, 0, 1)
  pisces(x, t, 850, 900, 90, t > B.us ? 3 : 2, { mood: t > B.us ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  const hk = Math.sin(Math.PI * prog(t, ...B.hug))
  const vx = lerp(lerp(470, 430, hk), 440, prog(t, B.board, B.board + 0.4)), sx = lerp(650, 590, hk)
  const vH = [B.turn, B.ask, B.hug[0], B.board], sH = [B.us, B.hug[0]]
  drawStarChar(x, vx, 860, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: t > B.us + 0.3 ? 'heart' : t > B.ask ? 'squint' : 'happy', look: [1, 0], seed: 8, hops: vH, blush: t > B.ask })
  scarf(x, starFrame(vx, 860, 210, t, { hops: vH, seed: 8 }), RED)
  drawStarChar(x, sx, 860, 210, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.us ? 'heart' : 'happy', look: [-1, 0], seed: 5, hops: sH })
  beanie(x, starFrame(sx, 860, 210, t, { hops: sH, seed: 5 }), GREEN)
  speech(x, t, 420, 540, B.ask, 'so… what are we,\nover the break?', { size: 36, tail: 0, life: 1.6, col: '#fffaf0' })
  speech(x, t, 640, 560, B.us, 'we’re us.', { size: 50, tail: 1, life: 1.5, col: '#ffe36a' })
  if (t > B.hug[0]) hearts(x, t, 540, 720, B.hug[0], { n: 7, life: 1.5, cell: 6, spread: 260 })
  snowfall(x, t, { n: 16, seed: 2, alpha: 0.6 })
}

const EP = makeThenNow({
  id: 'nhve16', thing: 'Before the break in', then: '2016', stamp: '12·19·2016', accent: '#9fe6b0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: two waves. *zero words.*' },
    { t: 9.9, text: 'two weeks apart. *no guessing.*' },
    { t: 12.92, text: 'clarity is a *holiday gift.*' },
  ],
  last: 'Asked *before* | the train.',
  cues: () => [
    ['pop', 0.2, 880, 0.025, -0.3], ['tick', A.close, 0.06], ['bell', r3(A.close + 0.05), 1318.51, 0.025, 0.8, -0.3],
    ['whoosh', A.go[0], 0.9, 0.05],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(A.days[0] + i * 0.32), 0.04]), ['pop', A.thing, 587.33, 0.03, -0.3],
    ['pop', B.turn, 783.99, 0.03, -0.3], ['pop', B.ask, 880, 0.03, -0.3], ['pop', B.us, 1318.51, 0.045, 0.3], ['glitter', B.us, r3(B.us + 0.4)],
    ['pluck', B.hug[0], 1567.98, 0.045, 0.5, 0.3], ['bell', B.board, 1567.98, 0.025, 0.8, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
