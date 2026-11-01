// trlittlehome: LITTLE THINGS, "Text me when you get home." (20 s vertical, Star Talk Trends §18.1, music: dreamy · C)
// The format's look lives in ./little.js (identical in all five tr-little films).
//   0–3.4     the doorstep, 11:00 PM: ♑ Capricorn waves ♊ Gemini off: "text me when you get home!" "will do!"
//             Gemini skips away down the street. ♓ Pisces watches from behind the hedge, already sniffling.
//   3.4–7.2   inside, "totally chill": Capricorn on the couch, the phone face-up beside it. Rule of three as the clock
//             ticks (11:02 · 11:09 · 11:14): whistles at the ceiling → scoots closer, peeks, snaps away → nose to the
//             screen. THE STARS: "capricorn is *totally* not waiting up."  Pisces at the window, streaming.
//   7.2       card cut (time skip).
//   7.2–12.2  11:26 PM, blanket on, eyelids losing, the phone propped on a pillow like a TV. BZZ BZZ: "home! ♥" with a
//             little house. Heart eyes, "goodnight!"… and Capricorn is asleep before the bubble fades. Lamp off.
//             THE STARS: "asleep in *one second flat.*"
//   12.2–15.6 the patch shrinks up. Last line: "*Home* safe."
import {
  makeLittle, drawStarChar, signStar, R, S, speech, sfx, hearts, sparkles, drawBits, pisces, drawPhoneMini, room, pop01,
  outK, r3, crescent, clamp, lerp, prog, ease, INK, BONE, GOLD, PINK, HEART, INTER, MONO, HEART_BM, CREAM,
} from './little.js'

const CAP = signStar('capricorn'), GEM = signStar('gemini')

// ── A: the doorstep
const A = { bye: 1.15, willdo: 2.05, walk: [2.35, 3.25], fade: [3.15, 3.5] }
function street(x, t) {
  // night sky + a house front on the left, a hedge on the right
  const g = x.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, '#191444'); g.addColorStop(1, '#3a2c6e')
  x.fillStyle = g; x.fillRect(0, 0, S, 560)
  for (let i = 0; i < 14; i++) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.3); R(x, BONE, (i * 137) % S, 20 + (i * 59) % 300, 4, 4); x.globalAlpha = 1 }
  crescent(x, 470, 90, 7)                                                                               // moon
  R(x, '#5b3f6e', 0, 120, 330, 440); R(x, INK, 330, 120, 8, 440)                                          // house wall
  for (let j = 0; j < 9; j++) R(x, '#674a7c', 0, 140 + j * 48, 330, 6)                                    // siding
  R(x, INK, 0, 108, 350, 16)                                                                              // roof edge
  R(x, INK, 120, 250, 150, 310); R(x, '#8a4f5e', 130, 260, 130, 300); R(x, GOLD, 236, 410, 12, 12)       // door
  // porch light glow
  const pl = x.createRadialGradient(290, 230, 4, 290, 230, 260); pl.addColorStop(0, 'rgba(255,214,140,0.55)'); pl.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = pl; x.fillRect(0, 0, 600, 560)
  R(x, INK, 280, 210, 24, 34); R(x, '#ffe2a0', 284, 214, 16, 26)
  // sidewalk
  R(x, '#2c2350', 0, 560, S, 240); R(x, INK, 0, 554, S, 8)
  for (let i = 0; i < 6; i++) R(x, '#3a2d62', i * 150 + 40, 560, 6, 240)
  R(x, '#3a2d62', 0, 660, S, 4)
}
function hedge(x) {
  R(x, INK, 560, 410, 250, 160)
  for (let i = 0; i < 6; i++) R(x, i % 2 ? '#2f7a55' : '#3a8f63', 566 + i * 40, 420 + (i % 2) * 10, 40, 150)
  R(x, '#4aa676', 570, 418, 230, 10)
}
function sceneA(x, t) {
  street(x, t)
  // ♓ Pisces peeks over the hedge, sniffling at the goodbye
  const pk = ease.outBack(prog(t, 0.9, 1.3))
  if (pk > 0.01) pisces(x, t, 690, lerp(520, 420, pk), 150, t > A.bye + 0.4 ? 2 : 1, { mood: 'sparkle', look: [-1, 0], seed: 6 })
  hedge(x)
  const w = ease.inOutQuad(prog(t, ...A.walk))
  const gx = lerp(430, 900, w)
  const gHops = [A.willdo, A.walk[0] + 0.05, A.walk[0] + 0.35, A.walk[0] + 0.65]
  drawStarChar(x, gx, 520, 200, t, { color: GEM.color, glyph: GEM.glyph, mood: t > A.willdo ? 'happy' : 'neutral', look: [-1, 0], hops: gHops, seed: 4, glow: 1.1 })
  drawStarChar(x, 200, 510, 210, t, { color: CAP.color, glyph: CAP.glyph, mood: t > A.walk[0] ? 'sparkle' : 'happy', look: t > A.walk[0] ? [1, 0] : [1, 0], hops: [A.bye, A.bye + 0.4], seed: 9, glow: 1.1 })
  speech(x, t, 330, 300, A.bye, 'text me when you get home!', { size: 32, tail: -1, life: 1.95, col: CREAM })
  speech(x, t, Math.min(gx, 700), 380, A.willdo, 'will do!', { size: 34, tail: 0, life: 1.3, col: '#fff7c8' })
  // Capricorn's little wave: motion ticks next to it
  if (t > A.walk[0] && t < A.fade[1]) for (let i = 0; i < 3; i++) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 14 + i); R(x, BONE, 300 + i * 12, 400 - i * 16, 8, 8); x.globalAlpha = 1 }
}

// ── B: inside (before the cut: "totally chill")
const B = { sit: 3.45, a: [3.6, 4.85], b: [4.95, 6.15], c: [6.25, 7.15] }
// after the cut
const C = { buzz: 8.55, read: 8.95, gn: 9.35, sleep: 10.05, lamp: 10.35 }
function couch(x) {
  R(x, INK, 120, 470, 560, 200)
  R(x, '#d9668f', 130, 480, 540, 70); R(x, '#c4547c', 130, 550, 540, 110)
  R(x, '#e57ea2', 130, 480, 540, 12)
  R(x, INK, 110, 520, 50, 150); R(x, '#d9668f', 116, 526, 38, 138)
  R(x, INK, 640, 520, 50, 150); R(x, '#d9668f', 646, 526, 38, 138)
  R(x, INK, 140, 670, 20, 30); R(x, INK, 640, 670, 20, 30)
}
function lamp(x, on) {
  R(x, INK, 46, 300, 10, 300); R(x, INK, 20, 596, 62, 12)
  R(x, INK, 4, 236, 94, 76); R(x, on ? '#ffe2a0' : '#8a7aa8', 10, 242, 82, 64)
}
function homeBubble(x, sx, sy, sw, sh, t, k) {
  // the incoming message: "home!" + a heart + a tiny house
  R(x, '#2a2058', sx, sy, sw, 40)
  x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${GEM.glyph}︎ gemini`, sx + sw / 2, sy + 21)
  if (k <= 0.01) return
  x.save(); x.translate(sx + 10, sy + 58); x.scale(k, k)
  R(x, '#4f8df0', 0, 0, sw - 20, 64)
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.fillStyle = BONE; x.fillText('home!', 12, 34)
  drawBits(x, HEART_BM, { H: HEART }, sw - 38, 32, 4, { outline: null })
  x.restore()
  const hk = pop01(t, C.buzz + 0.25, 0.3, 2.4)
  if (hk > 0.01) drawBits(x, ['....R....', '...RRR...', '..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', '.WWWWWWW.', '.WGWWDDW.', '.WWWWDDW.', '.WWWWDDW.'], { R: '#ff7a8a', W: CREAM, G: GOLD, D: '#8a4f5e' }, sx + sw / 2, sy + 150, 7 * hk)
}
function sceneB(x, t) {
  const after = t >= T_CUT
  room(x, t, { window: [500, 130, 230, 200], lamp: [50, 270] })
  // ♓ Pisces outside the window, pressed to the glass
  x.save(); x.beginPath(); x.rect(500, 130, 230, 200); x.clip()
  const ptear = !after ? (t > B.c[0] ? 3 : 2) : t > C.buzz ? 3 : 2
  pisces(x, t, 620, 265, 150, ptear, { mood: after && t > C.buzz ? 'happy' : 'wide', look: [-1, 1], seed: 6 })
  x.restore()
  R(x, INK, 500 + 115 - 4, 130, 8, 200); R(x, INK, 500, 130 + 100 - 4, 230, 8)
  lamp(x, !(after && t > C.lamp))
  couch(x)
  if (!after) {
    // the phone face-up on the cushion; Capricorn "not looking"
    const pa = ease.inOutCubic(prog(t, B.b[0], B.b[0] + 0.4)), pc = ease.inOutCubic(prog(t, B.c[0], B.c[0] + 0.35))
    const cx = lerp(lerp(280, 380, pa), 500, pc), cy = lerp(450, 410, pc)
    drawPhoneMini(x, 590, 490, 104, 50, { rot: 0.05, body: '#6b5bb0', screen: (q, sx, sy, sw, sh) => { R(q, '#2a2058', sx, sy, sw, sh); R(q, '#4a3d8a', sx + 6, sy + 4, sw * 0.4, 6) } })
    let mood = 'squint', look = [-1, -1]
    if (t > B.b[0] + 0.2 && t < B.b[0] + 0.75) { mood = 'wide'; look = [1, 1] }
    if (t > B.b[0] + 0.75) { mood = 'squint'; look = [-1, -1] }
    if (t > B.c[0]) { mood = 'wide'; look = [1, 1] }
    const hops = [B.sit, B.b[0] + 0.05, B.b[0] + 0.75, B.c[0] + 0.05]
    drawStarChar(x, cx, cy, 230, t, { color: CAP.color, glyph: CAP.glyph, mood, look, hops, seed: 9, glow: 1.1, blink: mood === 'wide' ? false : undefined })
    // whistling notes (beat a)
    if (t > B.a[0] && t < B.b[0] + 0.2) for (let i = 0; i < 3; i++) {
      const tt = (t - B.a[0] - i * 0.4) % 1.2
      if (tt < 0) continue
      x.globalAlpha = 1 - tt / 1.2
      drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: GOLD }, cx - 110 - tt * 30, cy - 130 - tt * 90, 5)
      x.globalAlpha = 1
    }
    if (t > B.b[0] + 0.2 && t < B.b[0] + 0.75) sfx(x, t, cx + 40, cy - 170, B.b[0] + 0.2, 'peek', { size: 40, life: 0.55, col: '#ffe2a0' })
    if (t > B.b[0] + 0.75) sfx(x, t, cx - 90, cy - 160, B.b[0] + 0.75, 'nope', { size: 38, life: 0.55, col: BONE, rot: 0.1 })
    if (t > B.c[0]) sfx(x, t, 400, 270, B.c[0] + 0.25, '…', { size: 70, life: 0.85, col: BONE, rot: 0 })
    return
  }
  // after the cut: blanket, the phone propped on a pillow like a TV
  const sl = ease.inOutCubic(prog(t, C.sleep, C.sleep + 0.3))
  // pillow + propped phone
  R(x, INK, 490, 500, 180, 60); R(x, '#f4e8cc', 496, 506, 168, 48)
  const buzzing = t > C.buzz && t < C.buzz + 0.6
  const jig = buzzing ? 4 * Math.sin(t * 70) : 0
  const lit = t > C.buzz
  drawPhoneMini(x, 585 + jig, 385, 180, 250, {
    rot: 0.06 + (buzzing ? 0.03 * Math.sin(t * 50) : 0), glow: lit ? (t > C.sleep ? 0.4 : 1) : 0,
    screen: (q, sx, sy, sw, sh) => homeBubble(q, sx, sy, sw, sh, t, pop01(t, C.buzz, 0.25, 2.4)),
  })
  if (buzzing) { sfx(x, t, 470, 250, C.buzz, 'BZZ', { size: 50, life: 0.55, col: '#9fe6ff', rot: -0.2 }); sfx(x, t, 700, 230, C.buzz + 0.2, 'BZZ', { size: 44, life: 0.45, col: '#9fe6ff', rot: 0.2 }) }
  // Capricorn in a blanket, eyelids losing… then BZZ, then out cold
  const cx = 290, cy = lerp(425, 490, sl)
  let mood = 'neutral', look = [1, 0], blink = 0.45 + 0.25 * Math.sin(t * 2.2)
  if (t > C.buzz) { mood = 'wide'; blink = false; look = [1, -1] }
  if (t > C.read) { mood = 'heart'; blink = undefined }
  if (t > C.sleep) { mood = 'sleepy'; blink = undefined }
  const hops = [C.buzz + 0.05, C.read, C.gn]
  drawStarChar(x, cx, cy, 240, t, { color: CAP.color, glyph: CAP.glyph, mood, look, blink, hops, seed: 9, glow: 1.1, squash: 0.12 * sl })
  // the blanket (over the lower half)
  const by = cy + 62
  R(x, INK, cx - 150, by - 6, 300, 140); R(x, '#7fb6ff', cx - 144, by, 288, 128)
  for (let i = 0; i < 6; i++) R(x, '#a9d0ff', cx - 144 + i * 50, by, 20, 128)
  R(x, '#5e93e0', cx - 144, by, 288, 12)
  if (t > C.read) hearts(x, t, cx + 40, cy - 110, C.read, { n: 4, life: 1.2, cell: 6, spread: 120 })
  sparkles(x, t, 580, 380, C.buzz, 10, 150, 1, ['#9fe6ff', BONE, GOLD], 22)
  speech(x, t, cx + 60, 250, C.gn, 'goodnight!', { size: 34, tail: -1, life: 0.95, col: '#ffe1ec' })
  // lamp click → the room dims to moonlight
  const dim = ease.outCubic(prog(t, C.lamp, C.lamp + 0.25))
  if (dim > 0) { x.fillStyle = `rgba(10,8,40,${0.42 * dim})`; x.fillRect(0, 0, S, S) }
  if (t > C.lamp) sfx(x, t, 80, 200, C.lamp, 'click', { size: 34, life: 0.7, col: BONE, rot: 0.1 })
}
const T_CUT = 7.2

function draw(x, t) {
  if (t < B.sit - 0.05) sceneA(x, t)
  else sceneB(x, t)
  // a quick dip to dark between the doorstep and the living room
  const d = Math.sin(Math.PI * prog(t, ...A.fade))
  if (d > 0) { x.fillStyle = `rgba(8,6,24,${d})`; x.fillRect(0, 0, S, S) }
}

const EP = makeLittle({
  id: 'trlittlehome', accent: '#9fd8ff',
  tag: '“Text me when you get *home.*”',
  draw,
  clock: [{ at: 0.7, text: '11:00 PM' }, { at: B.sit, text: '11:02 PM' }, { at: B.b[0], text: '11:09 PM' }, { at: B.c[0], text: '11:14 PM' }, { at: 7.25, text: '11:26 PM' }, { at: C.buzz, text: '11:27 PM' }],
  lines: [{ t: 3.75, text: 'capricorn is *totally* not waiting up.' }, { t: 9.8, text: 'asleep in *one second flat.*' }],
  last: '*Home* safe.',
  cues: () => [
    ['pop', A.bye, 783.99, 0.035, -0.3], ['pop', A.bye + 0.1, 880, 0.03, -0.3], ['pop', A.willdo, 1046.5, 0.035, 0.3],
    ...[0, 0.3, 0.6].map(d => ['tick', r3(A.walk[0] + d + 0.05), 0.025]),
    ['whoosh', A.fade[0], 0.3, 0.025],
    ...[0, 0.4, 0.8].map((d, i) => ['pluck', r3(B.a[0] + d + 0.1), [1046.5, 1174.66, 1318.51][i], 0.022, 0.3, -0.3]),
    ['whoosh', B.b[0], 0.15, 0.02], ['pop', B.b[0] + 0.2, 1318.51, 0.03, 0.2], ['whoosh', B.b[0] + 0.75, 0.15, 0.02],
    ['whoosh', B.c[0], 0.25, 0.025], ['pluck', B.c[0] + 0.3, 523.25, 0.02, 0.6, 0],
    ...[0, 0.07, 0.14, 0.21, 0.3, 0.37, 0.44].map(d => ['tom', r3(C.buzz + d), 70, { gain: 0.12, decay: 0.05 }]),
    ['pop', C.buzz, 1567.98, 0.04, 0.3], ['glitter', C.buzz, C.buzz + 0.4],
    ['pluck', C.read, 1318.51, 0.04, 0.5, 0], ['pluck', C.read + 0.12, 1567.98, 0.035, 0.5, 0],
    ['pop', C.gn, 1046.5, 0.03, -0.2], ['pop', C.gn + 0.1, 880, 0.03, -0.2],
    ['whoosh', C.sleep, 0.3, 0.02], ['tick', C.lamp, 0.06], ['tick', C.lamp + 0.04, 0.04],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
