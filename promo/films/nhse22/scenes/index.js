// nhse22: HOLIDAY SURVIVAL GUIDE No. 22, "The New Year's plan" (30 s vertical, star_advice post, music: house · F).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "Big party or | *pajamas?*" Frame 0: a split set. PARTY: ♈ Aries in a party hat mid-blow on a
//              noisemaker, a disco ball glinting. COZY: ♉ Taurus in pajamas under a blanket, tea steaming. ♓ Pisces in
//              the middle on the line, crying, one half of its face lit by each side. SITUATION: "two ideas of a good
//              night."
//   5.4–9.4    1 "Say what you *actually* want." Aries: "I want to see everyone." Taurus: "I want cozy, with you."
//   9.4–13.4   2 "Find the *overlap.*" Two circles slide together: FRIENDS + COZY → the middle: "friends early, cozy late".
//   13.4–17.4  3 "Both can be true: early party, *cozy midnight.*" (card cut) A clock spins 8 PM → 11:30; Aries keeps its
//              party hat on with pajamas.
//   17.4–25.6  THE STARS: "*both* of you should like the plan." Midnight on the couch: both in pajamas, one party hat
//              each, a little 3 · 2 · 1 and a gentle shower of sparkles; Pisces happy-cries at the countdown.
//              endHead "Party at 8. | *Couch* at 12."  Last line: "Meet in the *middle* | of the night."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, sofa, mug, clockFace, windowPane, starFrame, inSprite, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const ARI = 'aries', TAU = 'taurus'
const MID = 540
const SEEDS = { aries: 3, taurus: 9 }

function partyHat(x, t, sign, o, k = 1) {
  if (k <= 0.01) return
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: SEEDS[sign], squash: o.squash ?? 0 })
  inSprite(x, F, () => {
    x.save(); x.translate(20, 3 - (1 - k) * 12); x.rotate(0.25); x.scale(1.4, 1.4)
    const H = ['...G...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPPY.', 'PPPPPPP']
    H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(-3.5 + i - 0.3, -6 + j - 0.3, 1.6, 1.6) }))
    H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'G' ? GOLD : ch === 'Y' ? '#fff1a8' : '#e163d6'; x.fillRect(-3.5 + i, -6 + j, 1, 1) }))
    x.restore()
  })
}
function pjs(x, t, sign, o) {
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: SEEDS[sign], squash: o.squash ?? 0 })
  inSprite(x, F, () => { for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(9 + i * 3.4, 25 + (i % 2) * 2, 1.2, 1.2) } })
}
function noisemaker(x, cx, cy, ext, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -10, -8, 30, 16, GOLD, { b: 4 })
  const L = lerp(20, 120, ext)
  if (ext < 0.3) { x.fillStyle = INK; x.beginPath(); x.arc(30, 0, 18, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(30, 0, 13, 0, Math.PI * 2); x.fill() }
  else { R(x, INK, 18, -10, L, 20); R(x, RED, 18, -6, L - 4, 12); for (let i = 0; i < L / 20; i++) R(x, '#fff1a8', 22 + i * 20, -4, 6, 8) }
  x.restore()
}
function partySide(x, t, w0, w1) {
  R(x, '#3a1a5a', w0, P.y, w1 - w0, P.h)
  // disco lights
  for (let i = 0; i < 12; i++) { const a = t * 1.5 + i; x.save(); x.globalAlpha = 0.25 + 0.2 * Math.sin(a * 2); R(x, ['#ff7eb6', '#7fd0ff', GOLD][i % 3], w0 + 20 + ((i * 97 + Math.floor(t * 4) * 31) % (w1 - w0 - 40)), P.y + 120 + ((i * 53) % 500), 16, 16); x.restore() }
  // the disco ball
  const bx = (w0 + w1) / 2
  R(x, INK, bx - 2, P.y, 4, 60)
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 10) R(x, ((i + j + Math.floor(t * 6)) % 3) ? '#c8d0e0' : '#ffffff', bx + i * 12 - 6, P.y + 100 + j * 12 - 6, 11, 11)
  R(x, '#2a1240', w0, FLOOR, w1 - w0, P.y + P.h - FLOOR)
}
function cozySide(x, t, w0, w1) {
  R(x, '#2a3a4a', w0, P.y, w1 - w0, P.h)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,214,160,0.05)', w0 + i * 84, P.y, 38, P.h)
  windowPane(x, (w0 + w1) / 2, 600, 160, 150, t)
  R(x, '#4a3a4a', w0, FLOOR, w1 - w0, P.y + P.h - FLOOR)
}
function blanket(x, cx, cy, w = 260) { box(x, cx - w / 2, cy, w, 110, '#4a7ac8', { b: 6 }); for (let i = 0; i < w / 40; i++) R(x, '#7fa8e8', cx - w / 2 + 10 + i * 40, cy + 10, 18, 90) }

function set(x, t, S) {
  if (!S.end) {
    partySide(x, t, P.x, MID); cozySide(x, t, MID, P.x + P.w)
    R(x, INK, MID - 6, P.y, 12, P.h); R(x, GOLD, MID - 2, P.y, 4, P.h)
    label(x, 'PARTY', 300, 480, { size: 30, col: PINK, font: MONO, weight: 700 })
    label(x, 'COZY', 780, 480, { size: 30, col: '#7fd0ff', font: MONO, weight: 700 })
    const ao = { x: 280, y: 960, s: 210, mood: 'sparkle', look: [1, 0], hops: [0.25, 0.75, 1.25, 1.75, 2.25, 2.75, 3.25, 3.75, 4.25] }
    star(x, t, ARI, ao); partyHat(x, t, ARI, ao)
    noisemaker(x, 360, 990, 0.5 + 0.5 * Math.sin(t * 6), -0.1)
    const to = { x: 800, y: 960, s: 210, mood: 'sleepy', look: [0, 0], zzz: false }
    star(x, t, TAU, to); pjs(x, t, TAU, to)
    blanket(x, 800, 1000)
    mug(x, 960, 1060, '#e8b24a', 1, t)
    pisces(x, t, { x: MID, y: 1090, s: 120, tears: 2, mood: 'wide', look: [Math.sin(t * 2) > 0 ? 1 : -1, -1] })
    return
  }
  // midnight on the couch
  const u = S.u
  room(x, { wall: '#2a2a4e', floor: '#4a3a5e', floorY: FLOOR })
  windowPane(x, 540, 600, 240, 190, t)
  sofa(x, 540, FLOOR + 10, 480, '#7a5aa8')
  const ao = { x: 430, y: 960, s: 200, mood: 'happy', look: [1, 0], hops: [17.8, 21.5, 22.0] }
  const to = { x: 650, y: 960, s: 200, mood: 'happy', look: [-1, 0], hops: [17.9, 21.55, 22.05] }
  star(x, t, ARI, ao); pjs(x, t, ARI, ao); partyHat(x, t, ARI, ao)
  star(x, t, TAU, to); pjs(x, t, TAU, to); partyHat(x, t, TAU, to)
  blanket(x, 540, 1000, 440)
  pisces(x, t, { x: 880, y: 1040, s: 130, tears: 3, mood: 'happy', look: [-1, -1] })
  // a little 3 · 2 · 1 and a gentle shower of sparkles
  const n = u < 0.8 ? 3 : u < 1.6 ? 2 : u < 2.4 ? 1 : 0
  if (u < 2.4) label(x, String(n), 540, 600, { size: 90 * pop01(u, [0, 0.8, 1.6][3 - n], 0.25, 2.4), col: GOLD })
  else {
    label(x, 'HAPPY NEW YEAR', 540, 600, { size: 46 * pop01(u, 2.4, 0.3, 2), col: GOLD })
    for (let i = 0; i < 18; i++) { const p = ((u - 2.4) * 0.35 + i / 18) % 1; drawPixelStar(x, P.x + 40 + ((i * 113) % (P.w - 80)), P.y + p * (P.h - 200), 18, 1 + (i % 2), [GOLD, PINK, '#7fd0ff', BONE][i % 4]) }
  }
}

// ── step 1: say what you actually want
function step1(x, t, S) {
  const u = S.u
  partySide(x, t, P.x, MID); cozySide(x, t, MID, P.x + P.w)
  R(x, INK, MID - 6, P.y, 12, P.h); R(x, GOLD, MID - 2, P.y, 4, P.h)
  const ao = { x: 280, y: 1000, s: 210, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.3] }
  star(x, t, ARI, ao); partyHat(x, t, ARI, ao)
  const to = { x: 800, y: 1000, s: 210, mood: u > 1.6 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.5] }
  star(x, t, TAU, to); pjs(x, t, TAU, to)
  bubble(x, t, 290, 700, S.t0 + 0.3, S.t1, 'I want to see everyone.', { size: 30, col: '#ffd6f4', maxW: 380 })
  bubble(x, t, 790, 700, S.t0 + 1.5, S.t1, 'I want cozy, with you.', { size: 30, col: '#c8ecff', maxW: 380 })
}

// ── step 2: find the overlap
function step2(x, t, S) {
  const u = S.u
  R(x, '#24204a', P.x, P.y, P.w, P.h)
  const sl = ease.inOutCubic(prog(u, 0.4, 1.3))
  const r = 210, ax = lerp(240, 400, sl), bx = lerp(840, 680, sl), cy = 760
  for (const [cx, col] of [[ax, '#e163d6'], [bx, '#4a7ac8']]) {
    x.save(); x.globalAlpha = 0.5; x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
    x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  }
  label(x, 'FRIENDS', ax - 70, cy - 120, { size: 34, col: BONE })
  label(x, 'COZY', bx + 80, cy - 120, { size: 34, col: BONE })
  const mk = pop01(u, 1.5, 0.35, 2)
  if (mk > 0.01) { x.save(); x.translate(540, cy + 10); x.scale(mk, mk); box(x, -120, -70, 240, 140, PAPER, { b: 6 }); x.font = `italic 600 34px ${SERIF}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('friends early,', 0, -20); x.fillText('cozy late', 0, 24); x.restore() }
  const ao = { x: 200, y: 1080, s: 160, mood: u > 1.6 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 1.6] }
  star(x, t, ARI, ao); partyHat(x, t, ARI, ao)
  const to = { x: 880, y: 1080, s: 160, mood: u > 1.6 ? 'heart' : 'happy', look: [-1, -1], hops: [S.t0 + 1.65] }
  star(x, t, TAU, to); pjs(x, t, TAU, to)
  sparkles(x, t, 540, cy, S.t0 + 1.5, 10, 160, 1)
}

// ── step 3: both can be true
function step3(x, t, S) {
  const u = S.u
  const late = u > 1.6
  if (!late) partySide(x, t, P.x, P.x + P.w); else { room(x, { wall: '#2a2a4e', floor: '#4a3a5e', floorY: FLOOR }); windowPane(x, 300, 600, 200, 170, t) }
  const hh = late ? 11 : 8, mm = late ? 30 : 0
  const spin = prog(u, 1.2, 1.6)
  clockFace(x, 820, 600, 80, spin > 0 && spin < 1 ? 8 + 3.5 * spin : hh, spin > 0 && spin < 1 ? (spin * 210) % 60 : mm)
  label(x, late ? '11:30 PM' : '8 PM', 820, 720, { size: 30, col: GOLD, font: MONO, weight: 700 })
  if (!late) {
    const ao = { x: 330, y: 1000, s: 210, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.2, S.t0 + 0.6, S.t0 + 1.0, S.t0 + 1.4] }
    star(x, t, ARI, ao); partyHat(x, t, ARI, ao)
    const to = { x: 600, y: 1000, s: 200, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 1.2] }
    star(x, t, TAU, to); partyHat(x, t, TAU, to)
  } else {
    sofa(x, 480, FLOOR + 10, 420, '#7a5aa8')
    const ao = { x: 380, y: 960, s: 200, mood: 'happy', look: [1, 0], hops: [S.t0 + 1.7] }
    star(x, t, ARI, ao); pjs(x, t, ARI, ao); partyHat(x, t, ARI, ao)
    const to = { x: 590, y: 960, s: 200, mood: 'heart', look: [-1, 0], hops: [S.t0 + 1.75] }
    star(x, t, TAU, to); pjs(x, t, TAU, to)
    blanket(x, 480, 1000, 400)
    if (u > 2.2) label(x, 'hat stays on.', 380, 760, { size: 32, col: PINK, alpha: pop01(u, 2.2, 0.25, 2), rot: -0.06 })
  }
}

const EP = makeSurvival({
  no: 22,
  accent: '#ff9ad8',
  hook: 'Big party or | *pajamas?*',
  situation: 'two ideas of a good night.',
  guide: 'How to survive: | *the big night.*',
  endHead: 'Party at 8. | *Couch* at 12.',
  line: '*both* of you should like the plan.',
  last: 'Meet in the *middle* | of the night.',
  set,
  steps: [
    { text: 'Say what you *actually* want.', draw: step1, cues: [['pop', 0.3, 987.77, 0.035, -0.3], ['pop', 1.5, 659.25, 0.035, 0.3]] },
    { text: 'Find the *overlap.*', draw: step2, cues: [['whoosh', 0.4, 0.9, 0.03], ['tick', 1.3, 0.06], ['pop', 1.5, 1174.66, 0.045, 0], ['glitter', 1.5, 1.9]] },
    { text: 'Both can be true: early party, *cozy midnight.*', draw: step3, cues: [['riser', 1.0, 1.6, 0.02], ...Array.from({ length: 6 }, (_, i) => ['tick', +(1.2 + i * 0.07).toFixed(2), 0.03]), ['whoosh', 1.6, 0.25, 0.03], ['pop', 1.7, 880, 0.035, 0], ['pop', 2.2, 1318.51, 0.03, -0.3]] },
  ],
  cues: [...Array.from({ length: 6 }, (_, i) => ['pop', +(0.3 + i * 0.75).toFixed(2), 1760, 0.02, -0.4]), ['bell', 18.2, 1046.5, 0.03, 0.8, 0], ['bell', 19.0, 1046.5, 0.03, 0.8, 0], ['bell', 19.8, 1046.5, 0.03, 0.8, 0], ['glitter', 19.8, 20.8], ['bell', 19.85, 2093, 0.03, 1.2, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [snow, MINT, hearts, clamp]
