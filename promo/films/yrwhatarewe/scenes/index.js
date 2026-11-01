// yrwhatarewe: THEN vs NOW, "The “what are we?” talk in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §15, music: lofi · Eb)
// The format's look lives in ./thennow.js (identical in all five Block C films).
//   0–6.85    2016 (old phone video, "02·14·2016"): a couch, a laptop on the coffee table with a "status update" box
//             ("relationship status: ???"), a wall calendar. MONTH 3: ♏ Scorpio "so… what are w—" → "…want pizza?"
//             (♉ Taurus: "always."). MONTH 7: "hey. are we…" → "…out of chips?" MONTH 11: both start at once,
//             "so what a—" "so what a—" → "NEVERMIND!" ♓ Pisces in the armchair can't take it.
//   6.85      card cut; the year sticker flips to 2026.
//   6.85–12.3 2026: a café, two coffees. Scorpio, calm: "hey. what are we?" A beat. Taurus: "I was hoping you'd ask."
//             → "yours. if you want." The steam from both cups twists into a heart. Scorpio: "…ok. good. cool."
//             Pisces at the next table, happy-sobbing.
//   12.3–15.6 THE STARS: "one question. *zero* panic."  Last line: "Ask. It's *allowed*."
import {
  makeThenNow, star, pisces, speech, sfxWord, hearts, sparkles, drawBits, R, r3, lerp, prog, ease, clamp, pop01,
  INK, BONE, GOLD, PINK, HEART, INTER, MONO,
} from './thennow.js'

const SCO = 'scorpio', TAU = 'taurus'
const SX = 330, TX = 760

// ── A: 2016, the couch
function livingRoom(x, t) {
  R(x, '#3a2e4a', 0, 0, 1080, 1920)
  for (let i = 0; i < 18; i++) R(x, '#42344f', 0, 440 + i * 40, 1080, 4)       // wallpaper stripes
  R(x, '#2a2034', 0, 1180, 1080, 740); R(x, INK, 0, 1176, 1080, 6)
  // the TV glow from the front
  const g = x.createRadialGradient(540, 1500, 40, 540, 1300, 900); g.addColorStop(0, 'rgba(140,190,255,0.22)'); g.addColorStop(1, 'rgba(140,190,255,0)')
  x.fillStyle = g; x.fillRect(0, 400, 1080, 1520)
}
function calendar(x, t, flips) {
  const cx = 170, cy = 590
  let n = 0; for (const f of flips) if (t >= f.at) n++
  const label = flips[Math.max(0, n - 1)].label
  R(x, INK, cx - 104, cy - 120, 208, 240); R(x, '#fffaf0', cx - 98, cy - 114, 196, 228); R(x, '#d6334e', cx - 98, cy - 114, 196, 56)
  R(x, INK, cx - 60, cy - 132, 10, 30); R(x, INK, cx + 50, cy - 132, 10, 30)
  x.font = `800 30px ${INTER}`; x.fillStyle = '#fffaf0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MONTH', cx, cy - 86)
  x.font = `800 110px ${INTER}`; x.fillStyle = INK; x.fillText(label, cx, cy + 40)
  // the page flipping away
  const last = flips[n - 1]
  if (last && n > 1) {
    const p = prog(t, last.at, last.at + 0.35)
    if (p < 1) {
      x.save(); x.translate(cx, cy - 114); x.scale(1, 1 - p); x.globalAlpha = 1 - p * 0.5
      R(x, '#fffaf0', -98, 0, 196, 228); x.font = `800 110px ${INTER}`; x.fillStyle = INK; x.fillText(flips[n - 2].label, 0, 154)
      x.restore()
    }
  }
}
function couch(x, back) {
  if (back) { R(x, INK, 110, 880, 860, 230); R(x, '#5a3a6a', 118, 888, 844, 214); R(x, '#6a4880', 118, 888, 844, 20); return }
  R(x, INK, 70, 1080, 940, 190); R(x, '#5a3a6a', 78, 1088, 924, 174); R(x, '#6a4880', 78, 1088, 924, 22)
  R(x, INK, 70, 960, 90, 310); R(x, '#4f3260', 78, 968, 74, 294); R(x, INK, 920, 960, 90, 310); R(x, '#4f3260', 928, 968, 74, 294)
}
function laptop(x, t) {
  // the coffee table + a laptop with a generic "status update" box
  R(x, INK, 220, 1440, 640, 30); R(x, '#8a5a3a', 226, 1444, 628, 18); R(x, INK, 260, 1470, 18, 120); R(x, INK, 802, 1470, 18, 120)
  R(x, INK, 380, 1250, 320, 196); R(x, '#2a2a34', 388, 1258, 304, 180); R(x, '#e8eef6', 400, 1270, 280, 156)
  R(x, INK, 350, 1440, 380, 14)
  x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('status update', 414, 1294)
  R(x, INK, 412, 1314, 256, 90); R(x, '#ffffff', 415, 1317, 250, 84)
  x.font = `600 20px ${INTER}`; x.fillStyle = '#6a5a7a'; x.fillText('relationship status:', 426, 1342)
  x.font = `800 34px ${INTER}`; x.fillStyle = '#d6334e'; x.fillText('???', 426, 1380)
  if (Math.floor(t * 2.5) % 2 === 0) R(x, '#3b49c8', 486, 1364, 3, 32)
}
const A = {
  m3: 0.3, ask1: 0.75, pizza: 1.65, always: 2.35,
  m7: 2.95, ask2: 3.15, chips: 3.95,
  m11: 4.6, both: 4.85, never: 5.55,
}
function sceneA(x, t) {
  livingRoom(x, t)
  calendar(x, t, [{ at: 0, label: '3' }, { at: A.m7, label: '7' }, { at: A.m11, label: '11' }])
  couch(x, true)
  // Pisces in the armchair-corner: worrying, then sobbing
  pisces(x, t, 960, 760, 120, t > A.never ? 3 : t > A.m7 ? 2 : 1, { mood: 'wide', look: [-1, 1], hops: [A.never + 0.05] })
  let sm = 'neutral', sl = [1, 0], tm = 'happy', tl = [-1, 0]
  if (t > A.ask1) { sm = 'wide'; sl = [1, 0] }
  if (t > A.pizza) { sm = 'squint'; sl = [-1, 0] }
  if (t > A.ask2) { sm = 'wide'; sl = [1, 0] }
  if (t > A.chips) { sm = 'squint'; sl = [-1, 1] }
  if (t > A.both) { sm = 'wide'; tm = 'wide'; sl = [1, 0]; tl = [-1, 0] }
  if (t > A.never) { sm = 'squint'; tm = 'squint'; sl = undefined; tl = undefined }
  const lean = Math.sin(Math.PI * prog(t, A.never, A.never + 0.5))
  star(x, t, SX - 30 * lean, 1000, 240, SCO, { mood: sm, look: sl, seed: 5, hops: [A.ask1, A.ask2, A.both, A.never] })
  star(x, t, TX + 30 * lean, 1000, 240, TAU, { mood: tm, look: tl, seed: 9, hops: [A.always, A.both + 0.02, A.never] })
  couch(x, false)
  laptop(x, t)
  speech(x, t, 400, 760, A.ask1, 'so… what are w—', { size: 46, tail: -1, life: 0.85 })
  speech(x, t, 400, 760, A.pizza, '…want pizza?', { size: 46, tail: -1, life: 0.75 })
  speech(x, t, 700, 760, A.always, 'always.', { size: 46, tail: 1, life: 0.6 })
  speech(x, t, 400, 760, A.ask2, 'hey. are we…', { size: 46, tail: -1, life: 0.75 })
  speech(x, t, 400, 760, A.chips, '…out of chips?', { size: 46, tail: -1, life: 0.65 })
  speech(x, t, 330, 700, A.both, 'so what a—', { size: 44, tail: 0, life: 0.7 })
  speech(x, t, 760, 700, A.both + 0.04, 'so what a—', { size: 44, tail: 0, life: 0.66 })
  sfxWord(x, t, 540, 760, A.never, 'NEVERMIND!', { size: 72, col: GOLD, rot: -0.05, life: 1.2 })
}

// ── B: 2026, the café
function cafe(x, t) {
  R(x, '#2e2552', 0, 0, 1080, 1920)
  for (let i = 0; i < 10; i++) R(x, '#352b5e', i * 110 + 30, 0, 10, 1120)
  // big window with the moon + hanging lamps
  R(x, INK, 90, 470, 900, 360); R(x, '#16123c', 98, 478, 884, 344)
  for (let i = 0; i < 16; i++) R(x, '#cfc6ff', 120 + (i * 113) % 840, 500 + (i * 61) % 300, 5, 5)
  R(x, INK, 536, 478, 8, 344)
  for (const lx of [300, 780]) { R(x, INK, lx - 2, 0, 4, 420); R(x, INK, lx - 40, 420, 80, 40); R(x, '#ffd88a', lx - 34, 426, 68, 30)
    const g = x.createRadialGradient(lx, 460, 10, lx, 460, 380); g.addColorStop(0, 'rgba(255,214,150,0.22)'); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(lx - 380, 300, 760, 760) }
  // the next table (Pisces)
  R(x, INK, 820, 960, 220, 16); R(x, '#8a6a9a', 824, 956, 212, 12)
  R(x, '#231b40', 0, 1300, 1080, 620); R(x, INK, 0, 1296, 1080, 6)
}
function cafeTable(x) {
  R(x, INK, 120, 1110, 840, 40); R(x, '#c99c72', 126, 1114, 828, 26); R(x, INK, 520, 1150, 40, 300); R(x, INK, 420, 1440, 240, 20)
}
function cup(x, cx, cy, col) {
  R(x, INK, cx - 40, cy - 74, 80, 80); R(x, col, cx - 34, cy - 68, 68, 68); R(x, INK, cx + 36, cy - 56, 22, 36); R(x, col, cx + 40, cy - 50, 10, 24)
  R(x, '#6a4429', cx - 28, cy - 62, 56, 10)
}
function steam(x, t, heartK) {
  // two wiggly steam ribbons that twist into a heart
  for (const [cx, dir] of [[470, 1], [620, -1]]) {
    for (let i = 0; i < 7; i++) {
      const ph = (t * 0.6 + i / 7) % 1
      const fx = cx + Math.sin(ph * 7 + i) * 14 + dir * heartK * ph * 40, fy = 1030 - ph * 240
      x.save(); x.globalAlpha = 0.55 * Math.sin(Math.PI * ph) * (1 - heartK * 0.7); R(x, BONE, fx - 5, fy, 10, 18); x.restore()
    }
  }
  if (heartK > 0.01) drawBits(x, ['.WW.WW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '..WWW..', '...W...'], { W: '#ffe1ec' }, 540, 820 - 10 * Math.sin(t * 2), 13 * heartK, { outline: null, alpha: 0.85 })
}
const B = { sip: 7.15, ask: 7.55, beat: 8.55, hope: 8.9, yours: 10.0, heart: [10.6, 11.1], cool: 11.15 }
function sceneB(x, t) {
  cafe(x, t)
  pisces(x, t, 930, 890, 120, t > B.yours ? 3 : 2, { mood: t > B.yours ? 'happy' : 'wide', look: [-1, 0], hops: [B.yours + 0.1] })
  let sm = 'happy', sl = [1, 0], tm = 'happy', tl = [-1, 0]
  if (t > B.ask) { sm = 'neutral'; sl = [1, 0] }
  if (t > B.beat) { tm = 'wide' }
  if (t > B.hope) { tm = 'sparkle' }
  if (t > B.yours) { sm = 'sparkle' }
  if (t > B.heart[1]) { sm = 'heart'; tm = 'heart'; sl = undefined; tl = undefined }
  star(x, t, SX, 1000, 240, SCO, { mood: sm, look: sl, seed: 5, glow: 1.2, hops: [B.ask, B.cool, B.cool + 0.3], blush: t > B.yours ? 1 : undefined })
  star(x, t, TX, 1000, 240, TAU, { mood: tm, look: tl, seed: 9, glow: 1.2, hops: [B.hope, B.yours], blush: t > B.hope ? 1 : undefined })
  cafeTable(x)
  cup(x, 470, 1110, '#9fe6ff'); cup(x, 620, 1110, '#ffb3c8')
  steam(x, t, ease.inOutCubic(prog(t, ...B.heart)))
  if (t > B.heart[1]) hearts(x, t, 540, 800, B.heart[1] + 0.1, { n: 7, life: 1.8, cell: 6, spread: 360 })
  sparkles(x, t, 540, 820, B.heart[1], 10, 130, 1, [HEART, GOLD, BONE], 22)
  // the beat of silence: a tiny clock tick
  if (t > B.beat && t < B.hope) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, B.beat, B.hope)); x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('…', 760, 760); x.restore() }
  speech(x, t, 380, 760, B.ask, 'hey. what are we?', { size: 48, tail: -1, life: 1.0 })
  speech(x, t, 660, 760, B.hope, 'I was hoping you’d ask.', { size: 42, tail: 1, life: 1.05, col: '#fff1c8' })
  speech(x, t, 700, 680, B.yours, 'yours. if you want.', { size: 46, tail: 1, life: 1.05, col: '#ffe1ec' })
  speech(x, t, 360, 680, B.cool, '…ok. good. cool.', { size: 46, tail: -1, life: 1.15 })
}

const EP = makeThenNow({
  id: 'yrwhatarewe', thing: 'The “what are we?” talk', then: 2016, date: '02·14·2016', accent: GOLD,
  A: { draw: sceneA }, B: { draw: sceneB },
  line: 'one question. *zero* panic.',
  last: 'Ask. It’s *allowed*.',
  cues: () => [
    ['pop', A.ask1, 784, 0.035, -0.3], ['tick', r3(A.ask1 + 0.6), 0.04], ['pop', A.pizza, 659.25, 0.03, -0.3], ['pop', A.always, 1046.5, 0.03, 0.3],
    ['whoosh', A.m7, 0.2, 0.025], ['tick', A.m7, 0.05], ['pop', A.ask2, 784, 0.035, -0.3], ['pop', A.chips, 659.25, 0.03, -0.3],
    ['whoosh', A.m11, 0.2, 0.025], ['tick', A.m11, 0.05], ['pop', A.both, 784, 0.035, -0.3], ['pop', r3(A.both + 0.04), 784, 0.035, 0.3],
    ['tom', A.never, 120, { gain: 0.2, decay: 0.2 }], ['pop', A.never, 1318.51, 0.045, 0], ['pluck', r3(A.never + 0.15), 1046.5, 0.03, 0.4, 0],
    ['tick', B.sip, 0.03], ['pop', B.ask, 880, 0.035, -0.3], ['tick', B.beat, 0.03], ['tick', r3(B.beat + 0.18), 0.025],
    ['pop', B.hope, 1046.5, 0.035, 0.3], ['pop', B.yours, 1174.66, 0.04, 0.3],
    ['riser', B.heart[0], B.heart[1], 0.02], ['pluck', B.heart[1], 1567.98, 0.04, 0.5, 0], ['glitter', B.heart[1], r3(B.heart[1] + 0.4)],
    ['pop', B.cool, 880, 0.03, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void clamp; void lerp; void PINK
