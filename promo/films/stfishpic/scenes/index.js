// stfishpic — "The stars rated your profile." (60 s vertical Align ad, Star Talk season 3 #9, music: funk, Bb).
// Story 0–55.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "The stars rated | your *profile.*"  Your dating profile SLAPS on: you, beaming, holding a huge pixel fish
//              (bio: "your going to love me"). Eight judges pop up behind a long judges' desk, name plates, score paddles up.
//   2.82       DROP. The camera zooms down the panel, judge by judge (whip pans), one line + one paddle each:
//              ♓ PISCES (pearls): "that's my cousin. 0/10." (clutches its pearls, starts crying: it never stops)
//              ♉ TAURUS (bib, fork + salt): "is the fish dinner? 10/10."  Pisces slowly turns to stare. Taurus: sweat.
//              ♍ VIRGO (glasses): "'your/you're' typo in line one. 4."  Red marker: the typo gets circled.
//              ♌ LEO (crown): "where's the selfie? we want YOU. 6."  Holds up a mirror… and admires itself in it.
//              ♎ LIBRA: "lighting? 10. fish? 2. so... 6?"  The paddle flips 10 → 2 → 6?. Next door, Aries bounces, then bolts.
//              ♈ ARIES: an empty seat, a star-shaped dust cloud, a ✕ paddle. "too much bio. I swiped already."
//              ♒ AQUARIUS floats in sideways with a picket: "fish rights though?"  Pull back: everyone turns. Slowly.
//              Record stop, crickets. Pisces nods through tears.   ♐ SAG: "where was this taken. I'm going." Sun hat,
//              backpack, a ✈ paddle — gone.   Headlines: "The panel is divided." → "…shrinking." → "…floating." → "Bon voyage."
//  26.7–35.0   The swipe: "Photo 2: bigger fish." (it doesn't fit) → "Photo 3: more fish." (four of you; LEO: "which one is
//              you??") → "Photo 4: fish in a seatbelt." (riding shotgun, matching shades) → "Photo 5: a sunset…" (aww)
//              …the fish rises into the sun. Record scratch: "with a *fish.*" Synced eye-roll; every paddle wilts. Womp.
//  35.0–41.0   "Real *talk.*"  The camera leans into the photo; THE STARS (gold) slide in: "honestly? the fish isn't the
//              problem." → "we just want to know who's holding it."  The photo blurs out.
//  41.0–46.1   "Card first. | Face *last.*"  The mystery card deals in face-down and flips: no photo, just WHO YOU ARE —
//              "makes soup for sick friends" (Taurus melts) · "knows every constellation" (the whole sky gasps) ·
//              "always throws the fish back" (Pisces wails). Aries and Sag zoom back in; every paddle flips to 10 (hit).
//  46.16–50.95 ★ LESSON UNLOCKED: "Lead with who you are, | not what you *caught.*"  (+1 PERSONALITY)
//  51.1–55.5   "Lead with the *person,* | not the fish."  Taurus quietly raises a fork; Pisces glares; the fork goes away.
//              Everything pops out by 55.5; the end card takes over at 55.6.
// One canvas (sky + a camera-moved world: the profile card, the panel, the desk; screen-space overlays), low-res canvases for
// the photos, DOM headlines + dialogue boxes + the shared lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame, cutPlays } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, pearlsCells, bibCells, glassesCells, crownCells, sunhatCells, backpackCells, sweatCells, blinkersCells,
  drawPaddle, drawFork, drawShaker, drawPen, drawMirror, drawDesk, drawPlate, drawDustStar, drawHand, drawVibeMeter, confetti } from './props.js'
import { PHOTOS, paintVeil, LW, LH } from './photos.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const KEY = 'Bb'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#e8344e', CYAN = '#7fe0ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)             // 108 bpm grid

// ── the cast: eight judges on one bench, left → right in speaking order
const J = [
  ['pisces', 'PISCES', '#aaa4ff'], ['taurus', 'TAURUS', '#ffd27a'], ['virgo', 'VIRGO', '#ff94bd'], ['leo', 'LEO', '#ffb35c'],
  ['libra', 'LIBRA', '#f59ae8'], ['aries', 'ARIES', '#ff8a6a'], ['aquarius', 'AQUARIUS', '#7fe0ff'], ['sagittarius', 'SAG', '#c9a6ff'],
].map(([id, name, tag], i) => ({ id, name, tag, i, ...signStar(id), x: Math.round(540 + (i - 3.5) * 127) }))
const TAG = i => `${J[i].glyph}︎ ${J[i].name}`
const JY = 1294, JS = 120                                 // judge centre y + sprite size (cell 3 → 108 px)
const PAD = { y: 1188, w: 84, h: 68, pivotY: 1320 }      // raised paddle head centre, size; the handle's base (desk top)
const DESK = { y: 1342, h: 640 }
const CARD = { x: 206, y: 362, w: 668, h: 752, r: 32 }
const PHOTO = { x: 222, y: 378, w: 636, h: 504 }
const PS = PHOTO.w / LW                                   // 6 px per photo pixel
const MC = { cx: 540, cy: 728, w: 470, h: 750 }           // the mystery card

// ── the timeline
const T = {
  black: [0, 0.3],
  slap: 0.05, h0: 0.15, h0Land: 0.85, h0Out: [5.25, 5.42],
  jIn: 0.5, padUp: BEAT(2), squint: 2.2,
  drop: BEAT(4),                                          // 2.822 the zoom to Pisces
  lPis: 3.0, gasp: 3.12,
  lTau: BEAT(9), horror: 6.95, caught: 7.5,               // 5.6
  lVir: BEAT(14), ink: [9.05, 9.45],                      // 8.378
  lLeo: BEAT(20), mirror: 12.3, admire: [12.95, 14.3],    // 11.711
  lLib: BEAT(26), ariX: 17.32, ariGo: 17.5,               // 15.044
  lAri: BEAT(33), streak: 19.8,                           // 18.933
  lAqu: BEAT(38), aquFloat: 21.25, aquWide: 22.45, slowTurn: [22.6, 23.45], nod: [23.0, 23.32], tape: 22.36,   // 21.711
  lSag: BEAT(42), travel: 24.12, sagPlane: 24.6, sagGo: 25.4,   // 23.933
  esc: 26.5, sw: [BEAT(47), BEAT(50), BEAT(55), BEAT(58)],      // 26.711 28.378 31.156 32.822
  lGroup: 28.62, aww: 33.0, rise: [33.48, 33.86], scratch: BEAT(60), late4: 34.02, roll: 34.1, wilt: [34.14, 34.8],   // 33.933
  turn: 35.0, starsIn: [35.0, 35.45], lS1: 35.4, lS2: 38.4, blur: [39.2, 40.2], starsOut: [40.72, 41.02],
  pay: 41.0, deal: [40.86, BEAT(73)], h6: 41.22, h6Land: 41.62, flip: [41.8, 42.1],      // 41.156 the card lands
  f: [42.3, 42.86, 43.42], ariBack: 43.42, sagBack: 43.52, aquDown: 43.5,
  casc: BEAT(78),                                         // 43.933 every paddle → 10 (hit)
  lessonAt: BEAT(82), lessonOut: [50.75, 50.95],          // 46.156
  h8: 51.2, h8Late: 51.95, fork: 53.05, glare: 53.5, forkDown: 54.05, unglare: 54.55,
  out: [55.05, 55.5],
}
const LESSON = { at: T.lessonAt, out: T.lessonOut, text: 'Lead with who you are, | not what you *caught*.', chip: '+1 PERSONALITY', accentColor: GOLD, dim: 0.6 }

// ── dialogue
const CPS = 30
const LINES_A = [
  { t: T.lPis, speaker: TAG(0), color: J[0].tag, text: "that's my *cousin.* 0/10." },
  { t: T.lTau, speaker: TAG(1), color: J[1].tag, text: 'is the fish *dinner?* 10/10.' },
  { t: T.lVir, speaker: TAG(2), color: J[2].tag, text: "'your/you're' typo in line one. *4.*" },
  { t: T.lLeo, speaker: TAG(3), color: J[3].tag, text: "where's the selfie? we want *YOU.* 6." },
  { t: T.lLib, speaker: TAG(4), color: J[4].tag, text: 'lighting? 10. fish? 2. so... *6?*' },
  { t: T.lAri, speaker: TAG(5), color: J[5].tag, text: 'too much bio. I *swiped* already.' },
  { t: T.lAqu, speaker: TAG(6), color: J[6].tag, text: 'fish *rights* though?' },
  { t: T.lSag, speaker: TAG(7), color: J[7].tag, text: "where was this taken. I'm *going.*" },
]
const LINES_B = [{ t: T.lGroup, speaker: TAG(3), color: J[3].tag, text: 'which one is *you??*' }]
const LINES_C = [
  { t: T.lS1, speaker: 'THE STARS', color: GOLD, text: "honestly? the fish isn't the *problem.*" },
  { t: T.lS2, speaker: 'THE STARS', color: GOLD, text: "we just want to know who's *holding it.*" },
]
const ALL = [...LINES_A, ...LINES_B, ...LINES_C]
const LT = lineTimes(ALL, { cps: CPS })
const plain = s => s.replace(/\*/g, '')
const charT = (L, sub) => LT[ALL.indexOf(L)].chars[plain(L.text).indexOf(sub)]
const doneT = L => LT[ALL.indexOf(L)].done
const CLOSE_A = +(doneT(LINES_A[7]) + 1.6).toFixed(3), CLOSE_B = +(doneT(LINES_B[0]) + 1.6).toFixed(3), CLOSE_C = +(doneT(LINES_C[1]) + 1.55).toFixed(3)

// ── the paddles: what each one shows, when (a change flips the board over)
const GLY = i => ({ kind: 'glyph', glyph: J[i].glyph })
const SC = text => ({ kind: 'score', text })
const CASC = i => +(T.casc + [0, 0, 0, 1, 2, 3, 4, 5][i] * 0.139).toFixed(3)       // Virgo → Sag, on 16ths
const FACES = [
  [[0, GLY(0)], [charT(LINES_A[0], '0/10') - 0.04, SC('0')], [T.f[2] + 0.32, SC('10')]],
  [[0, GLY(1)], [charT(LINES_A[1], '10/10') - 0.04, SC('10')], [T.f[0] + 0.3, SC('10')]],
  [[0, GLY(2)], [charT(LINES_A[2], '4.') - 0.04, SC('4')], [CASC(2), SC('10')]],
  [[0, GLY(3)], [charT(LINES_A[3], '6.') - 0.04, SC('6')], [CASC(3), SC('10')]],
  [[0, GLY(4)], [charT(LINES_A[4], '10.') - 0.04, SC('10')], [charT(LINES_A[4], '2.') - 0.04, SC('2')], [charT(LINES_A[4], '6?') - 0.04, SC('6?')], [CASC(4), SC('10')]],
  [[0, GLY(5)], [T.ariX, { kind: 'x' }], [CASC(5), SC('10')]],
  [[0, GLY(6)], [charT(LINES_A[6], 'rights') - 0.12, { kind: 'picket' }], [CASC(6), SC('10')]],
  [[0, GLY(7)], [T.sagPlane, { kind: 'plane' }], [CASC(7), SC('10')]],
]
const FLIP_D = 0.2
function faceAt(i, t) {
  const F = FACES[i]
  let k = 0
  for (let n = 1; n < F.length; n++) if (t >= F[n][0]) k = n
  if (k > 0 && t < F[k][0] + FLIP_D) return { front: F[k - 1][1], back: F[k][1], flip: ease.inOutQuad(prog(t, F[k][0], F[k][0] + FLIP_D)) }
  return { front: F[k][1], back: F[k][1], flip: 0 }
}

// ── card cuts: every beat change; the default selection keeps 4 (11.56 → Leo, 23.78 → Sag, 35.0 → the turn, 46.1 → LESSON)
export const CUTS = [5.45, 11.56, 18.78, 23.78, 26.5, T.turn, T.pay, 46.1, 51.08]

// ── the camera: a shot = { s, fx, fy, ax, ay } (world point fx, fy lands on screen ax, ay at scale s)
const WIDE = { s: 1, fx: 540, fy: 960, ax: 540, ay: 960 }
const CLOSE = i => ({ s: 2, fx: J[i].x, fy: JY, ax: 540, ay: 1120 })
const TURN_A = { s: 1.06, fx: 540, fy: 900, ax: 540, ay: 905 }, TURN_B = { s: 1.14, fx: 540, fy: 850, ax: 540, ay: 860 }
const REACT = { s: 1.75, fx: 300, fy: JY, ax: 540, ay: 1120 }            // the reverse shot: Pisces → Libra stare at Aquarius
const move = (tc, shot, dur = 0.22) => cutPlays(CUTS, tc) ? [tc, shot, 0] : [tc - dur / 2, shot, dur]
const CAMS = [
  [0, WIDE, 0],
  [T.drop - 0.04, CLOSE(0), 0.3],
  move(5.45, CLOSE(1)), move(8.23, CLOSE(2)), move(11.56, CLOSE(3)), move(14.9, CLOSE(4)),
  move(18.78, CLOSE(5)), move(21.56, CLOSE(6)),
  [T.aquWide, REACT, 0],
  move(23.78, CLOSE(7)),
  move(26.5, WIDE, 0.34),
  move(T.turn, TURN_A, 0.5), [T.turn + 0.1, TURN_B, 5.6],
  [T.pay - 0.16, WIDE, 0.36],
]
const mixShot = (a, b, p) => ({ s: lerp(a.s, b.s, p), fx: lerp(a.fx, b.fx, p), fy: lerp(a.fy, b.fy, p), ax: lerp(a.ax, b.ax, p), ay: lerp(a.ay, b.ay, p) })
function camAt(t) {
  let cur = CAMS[0][1]
  for (let k = 1; k < CAMS.length; k++) {
    const [t0, shot, dur] = CAMS[k]
    if (t < t0) break
    cur = mixShot(cur, shot, dur > 0 ? ease.inOutCubic(prog(t, t0, t0 + dur)) : 1)
  }
  return cur
}
// who's talking during the judging (−2 = everyone looks at Aquarius)
const SPK = [[T.drop, 0], [5.45, 1], [8.23, 2], [11.56, 3], [14.9, 4], [18.78, 5], [21.56, 6], [T.aquWide, -2], [23.78, 7], [T.esc, -1]]
function speakerAt(t) { let s = -1; for (const [t0, i] of SPK) if (t >= t0) s = i; return s }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// talk hops (+ a few extra)
const HOPS = J.map((_, i) => talkHops(ALL, TAG(i), { cps: CPS }))
HOPS[5].push(15.3, 15.75, 16.2, 16.62, 17.02)                       // Aries can't sit still through Libra's line
HOPS[0].push(T.f[2] + 0.1, T.f[2] + 0.45, T.f[2] + 0.8)             // Pisces' happy wail
HOPS[7].push(T.travel - 0.05)
const STARS_HOPS = talkHops(ALL, 'THE STARS', { cps: CPS })
const CELEB = [0, 1, 2, 3, 4, 5, 6, 7].map(i => [T.casc + 0.3 + i * 0.05, T.casc + 0.86 + i * 0.05, T.casc + 1.42 + i * 0.05])

// ── per-judge state at t: mood, look, squash, tears, offsets, costume flags (pure)
function judgeState(i, t) {
  const s = { mood: 'neutral', look: [0, -1], squash: 0, blink: undefined, tears: 0, jig: 0, sweat: 0, dx: 0, dy: 0, rot: 0, gone: false, travel: false, hops: [...HOPS[i], ...(t > T.casc ? CELEB[i] : [])] }
  const spk = speakerAt(t)
  // ── defaults by phase
  if (t < T.drop) { if (inR(t, T.squint, T.squint + 0.55)) s.mood = 'squint' }
  else if (t < T.esc) { if (spk >= 0 && spk !== i) s.look = [Math.sign(spk - i), 0]; if (spk === -2 && i !== 6) s.look = [Math.sign(6 - i), -1] }
  else if (t < T.turn) {
    s.mood = t < T.sw[0] + 0.25 ? 'neutral' : t < T.sw[1] + 0.25 ? 'wide' : t < T.sw[2] + 0.25 ? 'squint' : t < T.sw[3] + 0.25 ? 'wide' : t < T.aww ? 'neutral' : t < T.scratch ? 'sparkle' : t < T.roll ? 'wide' : t < T.roll + 0.85 ? 'eyeroll' : 'neutral'
    if (inR(t, T.roll, T.roll + 0.85)) s.blink = false
  } else if (t < T.pay) { s.mood = t > T.blur[0] ? 'sparkle' : 'neutral' }
  else if (t < T.casc) { s.look = [0, -1]; s.mood = t < T.f[1] ? 'neutral' : t < T.f[1] + 0.45 ? 'wide' : 'sparkle'; if (inR(t, T.f[1], T.f[1] + 0.45)) s.blink = false }
  else if (t < T.out[1]) { s.mood = 'heart'; s.look = [0, 0] }
  // the slow turn toward Aquarius (everyone, at once, slowly)
  if (inR(t, T.slowTurn[0], T.lSag - 0.2) && i !== 6) {
    const p = ease.inOutQuad(prog(t, ...T.slowTurn)), d = Math.sign(6 - i)
    s.rot = d * 0.26 * p; s.dx = d * 8 * p; s.look = p > 0.4 ? [d, 0] : [0, -1]; s.mood = 'neutral'; s.blink = false
  }
  switch (i) {
    case 0: {                                             // ♓ PISCES: the fish is family
      if (inR(t, T.drop, T.lTau - 0.3)) {
        s.look = [0, 0]; s.mood = t < T.gasp ? 'neutral' : t < 4.5 ? 'wide' : 'sparkle'
        s.jig = t >= T.gasp ? clamp(1 - (t - T.gasp) / 1.1) : 0
        s.squash = 0.14 * bump(t, T.gasp, 0.3)
        s.tears = t > 3.85 ? 2 : t > 3.45 ? 1 : 0
      } else if (inR(t, T.lTau - 0.3, T.esc)) { s.tears = 2; s.mood = s.mood === 'neutral' ? 'sparkle' : s.mood }
      if (inR(t, T.horror, T.lVir - 0.2)) { s.look = [1, 0]; s.mood = 'wide'; s.tears = 3; s.blink = false }
      if (inR(t, ...T.nod)) { s.squash = 0.16 * (bump(t, T.nod[0], 0.16) + bump(t, T.nod[0] + 0.16, 0.16)); s.mood = 'sparkle' }
      if (inR(t, T.esc, T.turn)) { s.tears = inR(t, T.sw[0] + 0.25, T.sw[0] + 1.4) || t > T.scratch ? 3 : 2; if (t > T.aww && t < T.scratch) s.tears = 1 }
      if (inR(t, T.turn, T.pay)) s.tears = 1
      if (inR(t, T.pay, T.f[2])) s.tears = 1
      if (inR(t, T.f[2], T.casc)) { s.mood = 'happy'; s.tears = 3; s.squash = 0.06 * Math.sin(t * 24) }
      if (t >= T.casc) { s.tears = t < T.lessonAt ? 3 : 2 }
      if (inR(t, T.glare, T.unglare)) { s.mood = 'squint'; s.look = [1, 0]; s.tears = 0; s.blink = false }
      break
    }
    case 1: {                                             // ♉ TAURUS: is it dinner?
      if (inR(t, T.lTau - 0.24, T.caught)) { s.mood = 'heart'; s.look = [0, 0] }
      if (inR(t, T.caught, T.lVir - 0.2)) { s.mood = 'wide'; s.look = [-1, 0]; s.sweat = 1 }
      if (inR(t, T.sw[0] + 0.35, T.sw[1] - 0.1)) s.mood = 'heart'                 // a BIGGER dinner
      if (inR(t, T.f[0] + 0.1, T.casc)) s.mood = 'heart'                         // soup!
      if (inR(t, T.fork, T.glare + 0.12)) { s.mood = 'heart'; s.look = [0, -1] }
      if (inR(t, T.glare + 0.12, T.unglare)) { s.mood = 'wide'; s.look = [-1, 0]; s.sweat = 1 }
      break
    }
    case 2: {                                             // ♍ VIRGO: the editor
      if (t < T.drop) s.mood = 'squint'
      if (inR(t, T.lVir - 0.24, T.lLeo - 0.4)) { s.mood = t < T.ink[1] + 0.4 ? 'squint' : 'neutral'; s.look = t < T.ink[1] + 0.4 ? [1, -1] : [0, 0] }
      break
    }
    case 3: {                                             // ♌ LEO: we want YOU (and me)
      if (inR(t, T.lLeo - 0.24, T.mirror)) { s.look = [0, 0]; s.mood = 'neutral' }
      if (inR(t, T.mirror, T.admire[0])) { s.look = [0, 0]; s.mood = 'wide' }
      if (inR(t, ...T.admire)) { s.look = [1, -1]; s.mood = 'sparkle'; s.blink = false }
      if (inR(t, T.lGroup - 0.1, T.sw[2])) { s.mood = 'squint'; s.look = [0, -1] }
      break
    }
    case 4: {                                             // ♎ LIBRA: can't decide
      if (inR(t, T.lLib - 0.24, T.ariGo + 0.4)) {
        const flips = [charT(LINES_A[4], '10.'), charT(LINES_A[4], '2.'), charT(LINES_A[4], '6?')]
        s.look = t < flips[0] ? [0, 0] : t < flips[1] ? [-1, 0] : t < flips[2] ? [1, 0] : [Math.floor(t * 5) % 2 ? 1 : -1, 0]
        s.mood = t < flips[2] ? 'neutral' : 'wide'
        if (t > flips[2] + 0.2) s.sweat = 1
      }
      if (inR(t, T.ariGo, T.ariGo + 0.5)) { s.look = [1, 0]; s.mood = 'wide' }
      break
    }
    case 5: {                                             // ♈ ARIES: already gone
      if (t < T.drop) s.mood = 'squint'
      if (inR(t, T.lLib, T.ariGo)) { s.mood = t < 16.3 ? 'squint' : 'eyeroll'; s.look = [-1, 0] }
      if (t >= T.ariGo && t < T.ariBack + 0.35) {
        const go = ease.inCubic(prog(t, T.ariGo, T.ariGo + 0.26)), back = ease.outCubic(prog(t, T.ariBack, T.ariBack + 0.3))
        s.dx = t < T.ariBack ? 1500 * go : 1500 * (1 - back)
        s.squash = t < T.ariBack ? -0.18 * go : 0.22 * bump(t, T.ariBack + 0.28, 0.3)
        if (t >= T.ariGo + 0.26 && t < T.ariBack) s.gone = true
        s.mood = 'squint'; s.look = [1, 0]
      }
      break
    }
    case 6: {                                             // ♒ AQUARIUS: floating, principled
      s.look = spk === -2 ? [0, -1] : [-1, -1]
      if (t < T.drop && inR(t, T.squint, T.squint + 0.55)) s.mood = 'neutral'
      const fk = ease.inOutCubic(prog(t, T.aquFloat, T.aquFloat + 0.7)) * (1 - ease.inOutCubic(prog(t, T.aquDown, T.aquDown + 0.4)))
      s.rot = fk * 1.5; s.dy = -46 * fk + 8 * fk * Math.sin(t * 1.7); s.dx = 6 * fk * Math.sin(t * 1.1)
      if (inR(t, T.lAqu - 0.3, T.aquWide + 1.4)) { s.look = [0, 0]; s.mood = 'neutral' }
      if (fk > 0.5 && t > T.esc && t < T.pay) s.mood = 'neutral'
      break
    }
    case 7: {                                             // ♐ SAG: wanderlust
      if (t < T.drop) s.mood = 'sparkle'
      if (inR(t, T.lSag - 0.24, T.sagGo)) { s.look = [0, 0]; s.mood = t < 24.7 ? 'sparkle' : 'happy' }
      s.travel = t >= T.travel
      if (t >= T.sagGo && t < T.sagBack + 0.35) {
        const go = ease.inCubic(prog(t, T.sagGo + 0.12, T.sagGo + 0.45)), back = ease.outCubic(prog(t, T.sagBack, T.sagBack + 0.32))
        s.dx = t < T.sagBack ? 1500 * go : 1500 * (1 - back)
        s.squash = t < T.sagGo + 0.12 ? 0.2 * bump(t, T.sagGo, 0.12) : t < T.sagBack ? -0.12 : 0.2 * bump(t, T.sagBack + 0.3, 0.3)
        if (t >= T.sagGo + 0.45 && t < T.sagBack) s.gone = true
        s.mood = 'happy'; s.look = [1, 0]
      }
      break
    }
  }
  return s
}

// ── the VIBE METER: how the panel feels about you right now
const VIBE = [[0, 0.5], [0.6, 0.55], [T.sw[0] + 0.3, 0.38], [T.sw[1] + 0.3, 0.25], [T.sw[2] + 0.3, 0.13], [T.aww + 0.1, 0.62], [T.scratch, 0.02],
  [T.f[0] + 0.1, 0.3], [T.f[1] + 0.1, 0.55], [T.f[2] + 0.1, 0.8], [T.casc, 1]]
function vibeAt(t) {
  let v = 0
  for (const [t0, val] of VIBE) if (t >= t0) v = lerp(v, val, ease.outCubic(prog(t, t0, t0 + 0.35)))
  return clamp(v + (v > 0.2 && v < 0.97 ? 0.025 * Math.sin(t * 7) : 0))
}

// ── paddle droop: the photos wear the panel down (absent judges + the activist don't droop)
function droopAt(i, t) {
  if (t < T.sw[0] || i >= 5) return 0
  let d = Math.max(0.26 * ease.outCubic(prog(t, T.sw[0] + 0.3, T.sw[0] + 0.9)), 0.5 * ease.outCubic(prog(t, T.sw[1] + 0.3, T.sw[1] + 0.9)), 0.72 * ease.outCubic(prog(t, T.sw[2] + 0.3, T.sw[2] + 0.9)))
  if (t >= T.aww) d = lerp(0.72, 0.3, ease.outBack(prog(t, T.aww, T.aww + 0.4)))
  if (t >= T.wilt[0]) d = lerp(0.3, 1, ease.outQuad(prog(t, ...T.wilt))) + 0.05 * Math.sin((t - T.wilt[0]) * 18) * Math.exp(-(t - T.wilt[0]) * 4)
  const restore = i === 0 ? T.f[2] + 0.2 : i === 1 ? T.f[0] + 0.15 : CASC(i) - 0.12
  return d * (1 - ease.outBack(prog(t, restore, restore + 0.3)))
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "900 60px Inter", "500 34px Inter", "italic 500 140px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 18px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 620)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const mk = () => { const c = document.createElement('canvas'); c.width = LW; c.height = LH; return c }
  const lowA = mk(), lowB = mk(), lowV = mk()
  const la = lowA.getContext('2d'), lb = lowB.getContext('2d'), lv = lowV.getContext('2d')

  // ── type (headlines: the season's popText)
  const HL = (text, at, land, out, o = {}) => [popText(root, text, { top: o.top ?? 118, size: o.size ?? 96, accentSize: o.acc ?? 138, at, late: o.late ?? 1, lateAt: land, lateGap: o.lateGap ?? 0.1, wobble: true, gap: o.gap ?? 0.08, accentColor: o.col ?? GOLD, lineHeight: 1.0, fit: !!o.fit }), out]
  const HEADS = [
    HL('The stars rated | your *profile.*', T.h0, T.h0Land, T.h0Out, { col: GOLD }),
    HL('The panel is | *divided.*', 5.62, 6.02, [18.55, 18.72], { col: PINK }),
    HL('The panel is | *shrinking.*', 18.95, 19.35, [21.36, 21.52], { col: '#ff9a7a' }),
    HL('The panel is | *floating.*', 21.75, 22.15, [23.58, 23.74], { col: CYAN }),
    HL('Bon *voyage.*', 24.0, 24.35, [26.34, 26.5], { col: LAV, size: 112, acc: 160, top: 150 }),
    HL('Photo 2: | *bigger fish.*', 26.82, 27.12, [28.22, 28.37], { col: '#9cf08a' }),
    HL('Photo 3: | *more fish.*', 28.48, 28.78, [31.0, 31.15], { col: '#9cf08a' }),
    HL('Photo 4: fish | in a *seatbelt.*', 31.26, 31.62, [32.66, 32.81], { col: '#9cf08a' }),
    HL('Photo 5: a sunset… | with a *fish.*', 32.93, T.late4, [34.86, 35.0], { col: '#ffb35c', late: 3, lateGap: 0.14, size: 88, acc: 128 }),
    HL('Real *talk.*', 35.15, 35.45, [40.72, 40.9], { col: GOLD, size: 112, acc: 160, top: 150 }),
    HL('Card first. | Face *last.*', T.h6, T.h6Land, [45.86, 46.04], { col: GOLD }),
    HL('Lead with the *person,* | not the fish.', T.h8, T.h8Late, [55.05, 55.3], { col: GOLD, late: 3, lateGap: 0.12, size: 92, acc: 128, fit: true }),
  ]
  const BOX = { y: 1500, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.lPis - 0.24, close: CLOSE_A }),
    dialogueBox(root, { ...BOX, lines: LINES_B, open: T.lGroup - 0.22, close: CLOSE_B }),
    dialogueBox(root, { ...BOX, lines: LINES_C, open: T.lS1 - 0.24, close: CLOSE_C }),
  ]
  // ── LESSON UNLOCKED (shared), then grain + the black open
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = document.createElement('div'); Object.assign(black.style, { position: 'absolute', inset: '0', background: '#000' }); root.appendChild(black)

  // measured once: the bio's first word (Virgo circles it)
  x.font = `500 36px ${INTER}`
  const YOUR_W = x.measureText('your').width
  const BIO = { x: 242, y: 1014 }

  // ═══════════════════════ the profile card ═══════════════════════
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function photoState(t) {
    let idx = 0
    for (let k = 0; k < 4; k++) if (t >= T.sw[k]) idx = k + 1
    const k = idx - 1, p = k >= 0 ? ease.inOutCubic(prog(t, T.sw[k], T.sw[k] + 0.3)) : 1
    return { idx, prev: Math.max(0, idx - 1), p: k >= 0 ? p : 1, lift: ease.outBack(prog(t, ...T.rise)) }
  }
  function drawPhoto(t, blur, base = 'none') {
    const st = photoState(t)
    la.setTransform(1, 0, 0, 1, 0, 0); la.clearRect(0, 0, LW, LH)
    PHOTOS[st.idx](la, t, { lift: st.lift })
    x.save(); rr(PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h, 20); x.clip()
    x.imageSmoothingEnabled = false
    if (st.p < 1) {
      lb.setTransform(1, 0, 0, 1, 0, 0); lb.clearRect(0, 0, LW, LH)
      PHOTOS[st.prev](lb, t, { lift: 0 })
      const off = -PHOTO.w * st.p
      x.drawImage(lowB, PHOTO.x + off, PHOTO.y, PHOTO.w, PHOTO.h)
      x.drawImage(lowA, PHOTO.x + off + PHOTO.w, PHOTO.y, PHOTO.w, PHOTO.h)
    } else {
      x.filter = blur > 0 ? `blur(${(blur * 16).toFixed(1)}px)` : base
      x.drawImage(lowA, PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h)
      x.filter = base
      if (blur > 0) { x.fillStyle = `rgba(40,22,70,${0.45 * blur})`; x.fillRect(PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h) }
    }
    x.imageSmoothingEnabled = true
    // photo-flash on the slap
    const fl = 1 - prog(t, T.slap, T.slap + 0.35)
    if (fl > 0 && t >= T.slap) { x.fillStyle = `rgba(255,255,255,${0.7 * fl})`; x.fillRect(PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h) }
    // the carousel bars
    const cur = st.p < 0.5 ? st.prev : st.idx
    for (let k = 0; k < 5; k++) {
      const bw = (PHOTO.w - 32 - 4 * 8) / 5, bx = PHOTO.x + 16 + k * (bw + 8)
      x.fillStyle = 'rgba(10,6,24,0.35)'; x.fillRect(bx - 1, PHOTO.y + 13, bw + 2, 9)
      x.fillStyle = k === cur ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.42)'; x.fillRect(bx, PHOTO.y + 14, bw, 7)
    }
    // the "?" once it's blurred out
    if (blur > 0.3) {
      const q = clamp((blur - 0.3) / 0.7)
      x.save(); x.globalAlpha = q; x.font = `800 ${Math.round(150 + 20 * q)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText('?', PHOTO.x + PHOTO.w / 2, PHOTO.y + PHOTO.h / 2 + 6); x.restore()
    }
    x.restore()
    return st
  }
  function drawProfileCard(t, k, sc, rot, blur, closeK) {
    if (k <= 0.01) return
    const sharp = inR(t, 8.0, 11.3)                       // Virgo's beat: the bio has to be readable
    const cardBlur = closeK > 0.02 && !sharp ? `blur(${(3.5 * closeK).toFixed(2)}px)` : 'none'
    x.save(); x.globalAlpha = k; x.filter = cardBlur
    x.translate(CARD.x + CARD.w / 2, CARD.y + CARD.h / 2); x.rotate(rot); x.scale(sc, sc); x.translate(-(CARD.x + CARD.w / 2), -(CARD.y + CARD.h / 2))
    x.save(); x.shadowColor = 'rgba(3,1,12,0.7)'; x.shadowBlur = 50; x.shadowOffsetY = 18
    rr(CARD.x, CARD.y, CARD.w, CARD.h, CARD.r); x.fillStyle = '#171030'; x.fill(); x.restore()
    rr(CARD.x, CARD.y, CARD.w, CARD.h, CARD.r); x.lineWidth = 3; x.strokeStyle = 'rgba(239,230,214,0.28)'; x.stroke()
    const st = drawPhoto(t, blur, cardBlur)
    x.filter = cardBlur
    // name + bio + interests
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `800 58px ${INTER}`; x.fillStyle = BONE; x.fillText('You, 27', BIO.x, 954)
    x.font = `500 36px ${INTER}`; x.fillStyle = '#d6cde6'; x.fillText('your going to love me', BIO.x, BIO.y)
    x.font = `700 19px ${MONO}`
    let cx0 = BIO.x
    for (const chip of ['FISHING', 'ALSO FISHING']) {
      const w = x.measureText(chip).width + 32
      rr(cx0, 1044, w, 38, 19); x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 2; x.stroke()
      x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillText(chip, cx0 + 16, 1070); cx0 += w + 12
    }
    // close-up depth: the card falls back behind the judge
    x.filter = 'none'
    if (closeK > 0) { rr(CARD.x, CARD.y, CARD.w, CARD.h, CARD.r); x.fillStyle = `rgba(6,4,16,${(sharp ? 0.32 : 0.6) * closeK})`; x.fill() }
    // Virgo's red marker: circle "your", write "you're" above it
    const ip = prog(t, ...T.ink)
    if (ip > 0) {
      const cx = BIO.x + YOUR_W / 2, cy = BIO.y - 11
      x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.lineCap = 'round'
      x.beginPath()
      const a0 = -2.4, a1 = a0 + Math.PI * 2.15 * ease.inOutQuad(clamp(ip / 0.75))
      for (let a = a0; a <= a1; a += 0.06) { const rx = YOUR_W / 2 + 16 + 3 * Math.sin(a * 3), ry = 27 + 2 * Math.cos(a * 2); const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; a === a0 ? x.moveTo(px, py) : x.lineTo(px, py) }
      x.stroke()
      const q = easeOutBack(prog(t, T.ink[0] + 0.32, T.ink[1] + 0.1), 2.4)
      if (q > 0) {
        x.translate(cx + YOUR_W / 2 + 64, cy - 30); x.rotate(-0.12); x.scale(q, q)
        x.font = `italic 700 36px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.lineWidth = 6; x.strokeStyle = 'rgba(14,8,30,0.85)'; x.strokeText("you're", 0, 0); x.fillStyle = '#ff5a6a'; x.fillText("you're", 0, 0)
      }
      x.restore()
    }
    x.restore()
    return st
  }

  // ═══════════════════════ the mystery card ═══════════════════════
  const FACTS = ['makes soup for sick friends', 'knows every constellation', 'always throws the fish back']
  function mysteryFace(t, w, h) {
    x.save(); x.shadowColor = 'rgba(255,122,217,0.55)'; x.shadowBlur = 46
    rr(-w / 2, -h / 2, w, h, 30); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#26133f'); g.addColorStop(1, '#120a26'); x.fillStyle = g; x.fill(); x.restore()
    const bg = x.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); bg.addColorStop(0, '#ff7ad9'); bg.addColorStop(0.5, '#a46bff'); bg.addColorStop(1, '#7fd0f0')
    x.lineWidth = 6; x.strokeStyle = bg; rr(-w / 2, -h / 2, w, h, 30); x.stroke()
    x.lineWidth = 1.5; x.strokeStyle = 'rgba(242,199,92,0.35)'; rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 20); x.stroke()
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `italic 500 42px ${SERIF}`; x.fillStyle = BONE; x.fillText('Mystery card', -w / 2 + 32, -h / 2 + 66)
    drawPixelStar(x, w / 2 - 50, -h / 2 + 52, 34, 2, GOLD)
    // the veiled photo slot
    const vx = -w / 2 + 26, vy = -h / 2 + 92, vw = w - 52, vh = 252
    lv.setTransform(1, 0, 0, 1, 0, 0); paintVeil(lv, t)
    x.save(); rr(vx, vy, vw, vh, 18); x.clip(); x.imageSmoothingEnabled = false; x.drawImage(lowV, vx, vy, vw, vh); x.imageSmoothingEnabled = true
    const sh = ((t * 0.45) % 1.6) - 0.3, sg = x.createLinearGradient(vx + vw * sh - 70, vy, vx + vw * sh + 70, vy + vh); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, 'rgba(255,255,255,0.2)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = sg; x.fillRect(vx, vy, vw, vh)
    x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.78)'; x.fillText('?', 0, vy + vh * 0.47)
    x.font = `700 17px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = 'rgba(239,230,214,0.78)'; x.fillText('NO PHOTO YET', vx + 16, vy + vh - 16)
    x.restore()
    x.lineWidth = 2; x.strokeStyle = 'rgba(255,143,177,0.6)'; rr(vx, vy, vw, vh, 18); x.stroke()
    // who you are
    x.font = `700 18px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.fillText('W H O   Y O U   A R E', -w / 2 + 32, -h / 2 + 390)
    FACTS.forEach((f, n) => {
      const p = prog(t, T.f[n], T.f[n] + 0.32)
      if (p <= 0) return
      const y = -h / 2 + 452 + n * 70, k = easeOutBack(p, 2.2)
      x.save(); x.translate(-w / 2 + 36, y); x.scale(k, k); x.globalAlpha *= clamp(p * 3)
      drawPixelStar(x, 8, -12, 26, 1, n === 2 ? CYAN : GOLD)
      x.font = `italic 500 34px ${SERIF}`
      const maxW = w - 36 - 32 - 30, tw = x.measureText(f).width
      if (tw > maxW) x.font = `italic 500 ${Math.floor(34 * maxW / tw)}px ${SERIF}`
      x.fillStyle = BONE; x.fillText(f, 30, 0)
      x.restore()
      const fl = 1 - prog(t, T.f[n], T.f[n] + 0.5)
      if (fl > 0 && fl < 1) { x.fillStyle = `rgba(242,199,92,${0.22 * fl})`; x.fillRect(-w / 2 + 20, y - 44, w - 40, 60) }
    })
    x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillText('CARD FIRST  ·  FACE LAST', 0, h / 2 - 30)
  }
  function drawMystery(t, k) {
    if (t < T.deal[0] || k <= 0.01) return
    const p = prog(t, ...T.deal), e = ease.outCubic(p)
    const cx = lerp(1180, MC.cx, e), cy = lerp(1900, MC.cy, e) - Math.sin(p * Math.PI) * 120, rot = lerp(0.9, 0, e) + 0.03 * bump(t, T.deal[1], 0.3)
    const land = 1 + 0.05 * bump(t, T.deal[1], 0.22)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI) * land
    x.save(); x.globalAlpha = k; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.03, Math.abs(sx)) * k, land * k)
    if (sx >= 0) {
      if (BACK) { const w = MC.w / BACK_BODY, h = w * BACK.height / BACK.width; x.drawImage(BACK, -w / 2, -h / 2, w, h) }
    } else mysteryFace(t, MC.w, MC.h)
    x.restore()
    if (f > 0.4 && f < 1) sparkleRing(t, MC.cx, MC.cy, T.flip[0] + 0.15, 12, 330, 2)
    if (p >= 1 && t < T.deal[1] + 0.4) sparkleRing(t, MC.cx, MC.cy + MC.h / 2 - 20, T.deal[1], 8, 220, 4, [GOLD, BONE])
  }

  // ═══════════════════════ the panel ═══════════════════════
  function drawJudgePaddle(i, t, kOut) {
    const j = J[i]
    const up = easeOutBack(prog(t, T.padUp + i * 0.035, T.padUp + i * 0.035 + 0.34), 1.8)
    if (up <= 0) return
    const d = droopAt(i, t), fa = faceAt(i, t)
    const cele = t > T.casc ? 10 * bump(t, CASC(i) + 0.05, 0.3) : 0
    const px = j.x + 4, py = PAD.y + (1 - up) * 190 + d * 30 - cele
    drawPaddle(x, { x: px, y: py, w: PAD.w, h: PAD.h, pivot: [px, PAD.pivotY + 40], rot: d * 0.62 + (i === 4 && t > charT(LINES_A[4], '6?') && t < T.ariGo + 0.5 ? 0.12 * Math.sin(t * 16) : 0), flip: fa.flip, front: fa.front, back: fa.back, color: j.color, alpha: kOut })
  }
  function costume(i, t, st) {
    if (i === 0) { pearlsCells(x, t, st.jig); tearsCells(x, t, st.tears) }
    if (i === 1) bibCells(x)
    if (i === 2) glassesCells(x)
    if (i === 3) crownCells(x)
    if (i === 6) blinkersCells(x)
    if (i === 7 && st.travel) { backpackCells(x); sunhatCells(x) }
    if (st.sweat) sweatCells(x, t, st.sweat)
  }
  function drawJudge(i, t, kOut) {
    const j = J[i], st = judgeState(i, t)
    if (st.gone) return
    const t0 = T.jIn + i * 0.09, popK = pop01(t, t0, 0.36, 2.2) * kOut
    if (popK <= 0.01) return
    const rise = (1 - ease.outCubic(prog(t, t0, t0 + 0.36))) * 150
    const x0 = j.x + st.dx, y0 = JY + rise + st.dy
    // a little spotlight on whoever has the floor
    const spk = speakerAt(t)
    if (spk === i && t > T.drop) { const g = x.createRadialGradient(x0, y0, 10, x0, y0, 150); g.addColorStop(0, 'rgba(255,236,170,0.22)'); g.addColorStop(1, 'rgba(255,236,170,0)'); x.fillStyle = g; x.fillRect(x0 - 150, y0 - 150, 300, 300) }
    x.save()
    if (st.rot) { x.translate(x0, y0 + 36); x.rotate(st.rot); x.translate(-x0, -(y0 + 36)) }
    const opts = { color: j.color, glyph: j.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: st.hops, seed: 3 + i * 5, pop: popK, bob: 2.5, glow: 0.8 }
    drawStarChar(x, x0, y0, JS, t, opts)
    const F = starFrame(x0, y0, JS, t, opts)
    inSprite(x, F, () => costume(i, t, st))
    x.restore()
    // speed streak behind a dash
    if ((i === 5 || i === 7) && Math.abs(st.dx) > 20 && !st.gone) {
      const g = x.createLinearGradient(x0 - 420, 0, x0, 0); g.addColorStop(0, rgba(j.color, 0)); g.addColorStop(1, rgba(j.color, 0.6))
      x.fillStyle = g; x.fillRect(x0 - 420, y0 - 26, 420, 52)
    }
  }
  function handProps(t) {
    // Taurus: fork + salt shaker up, ready
    const tk = pop01(t, T.lTau - 0.2, 0.3, 2.4) * (1 - prog(t, T.lVir - 0.3, T.lVir - 0.15))
    if (tk > 0.02) { const s = 1.0 * tk, wob = 0.08 * Math.sin(t * 9); drawFork(x, J[1].x - 66, JY - 50 - 6 * bump((t * 1.8) % 1, 0, 1), s, -0.2 + wob); drawShaker(x, J[1].x + 64, JY - 56, s, 0.25 - wob, t, inR(t, T.lTau + 0.3, T.caught) ? 1 : 0) }
    // Virgo: the red pen
    const vk = pop01(t, T.lVir + 0.05, 0.3, 2.4) * (1 - prog(t, T.lLeo - 0.4, T.lLeo - 0.25))
    if (vk > 0.02) { const sc = inR(t, T.ink[0], T.ink[1] + 0.2) ? 0.35 * Math.sin(t * 40) : 0; drawPen(x, J[2].x + 62, JY - 68, vk, -0.55 + sc) }
    // Leo: the hand mirror
    const mk2 = pop01(t, T.mirror, 0.3, 2.4) * (1 - prog(t, T.lLib - 0.4, T.lLib - 0.25))
    if (mk2 > 0.02) {
      const adm = prog(t, T.admire[0] - 0.2, T.admire[0] + 0.15)
      drawMirror(x, J[3].x + lerp(70, 78, adm), JY - 86, 0.85 * mk2, lerp(0.15, -0.35, adm), t, c => {
        // the reflection: a tiny Leo, heart-eyed at itself
        drawStarChar(c, 0, 4, 54, t, { color: J[3].color, mood: adm > 0.5 ? 'heart' : 'neutral', look: [0, 0], bob: 0, glow: 0.3, tips: false })
      })
    }
    // Taurus' last word: a quiet fork
    const fk = pop01(t, T.fork, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.forkDown, T.forkDown + 0.3)))
    if (fk > 0.02) drawFork(x, J[1].x + 70, JY - 70 + (1 - fk) * 60, 2.1 * fk, 0.28 + 0.08 * Math.sin(t * 7))
    // Pisces' glare: an anger mark over its head
    const ak = pop01(t, T.glare + 0.05, 0.25, 3) * (1 - prog(t, T.unglare - 0.15, T.unglare))
    if (ak > 0.02) {
      x.save(); x.translate(J[0].x + 46, JY - 74); x.scale(ak, ak); x.rotate(0.1 * Math.sin(t * 20))
      x.fillStyle = INK; x.fillRect(-21, -21, 42, 42)
      x.fillStyle = '#ff4d5e'; for (const [a, b] of [[-15, -15], [5, -15], [-15, 5], [5, 5]]) { x.fillRect(a, b, 10, 4); x.fillRect(a + (a < 0 ? 6 : 0), b + (b < 0 ? 0 : -6) + 0, 4, 10) }
      x.restore()
    }
  }
  function drawPanel(t, closeK, kOut) {
    // Aries' dust star
    drawDustStar(x, J[5].x, JY, 128, (1 - prog(t, T.ariGo + 1.6, T.ariGo + 3.2)) * (t >= T.ariGo + 0.12 ? 1 : 0) * (t < T.ariBack ? 1 : 0))
    for (let i = 0; i < 8; i++) drawJudgePaddle(i, t, kOut)
    for (let i = 0; i < 8; i++) drawJudge(i, t, kOut)
    handProps(t)
    // Aries running laps behind the desk
    const sp = prog(t, T.streak, T.streak + 0.34)
    if (sp > 0 && sp < 1) { const sx = lerp(1250, -200, sp); const g = x.createLinearGradient(sx, 0, sx + 380, 0); g.addColorStop(0, rgba(J[5].color, 0.85)); g.addColorStop(1, rgba(J[5].color, 0)); x.fillStyle = g; x.fillRect(sx, JY - 4, 380, 30); drawStarChar(x, sx, JY + 10, 70, t, { color: J[5].color, mood: 'squint', look: [-1, 0], bob: 0, glow: 0.6 }) }
    // the desk + name plates (rises in with the judges)
    const dk = pop01(t, 0.32, 0.36, 1.8), dOut = ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))
    if (dk > 0.02 && dOut < 1) {
      x.save(); x.translate(0, (1 - dk) * 160 + dOut * 700); x.globalAlpha *= 1 - dOut
      drawDesk(x, -900, 1980, DESK.y, DESK.h)
      J.forEach(j => drawPlate(x, j.x, 1372, j.glyph, j.name, j.color, { dim: 0 }))
      const mk = 1 - clamp((camAt(t).s - 1.0) / 0.06)
      if (mk > 0.01) { x.save(); x.globalAlpha *= mk; drawVibeMeter(x, 540, 1566, t, vibeAt(t)); x.restore() }
      x.restore()
    }
  }

  // ═══════════════════════ THE STARS (gold, screen space) ═══════════════════════
  function drawNarrator(t) {
    if (t < T.starsIn[0] || t > T.starsOut[1]) return
    const pin = easeOutBack(prog(t, ...T.starsIn), 1.6), pout = ease.inCubic(prog(t, ...T.starsOut))
    const sx = lerp(1360, 958, pin) + 520 * pout, sy = 860
    const mood = t < T.lS2 - 0.3 ? 'neutral' : t < T.blur[1] ? 'sparkle' : 'happy'
    const look = t < T.lS1 + 1.6 ? [-1, 0] : t < T.lS2 ? [-1, 1] : [-1, 0]
    drawStarChar(x, sx, sy, 300, t, { color: STAR.sky, mood, look, hops: STARS_HOPS, seed: 21, glow: 1.1 })
  }

  // ═══════════════════════ sparkles ═══════════════════════
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function crickets(t) {
    if (!inR(t, T.aquWide + 0.15, T.lSag - 0.25)) return
    x.font = `700 42px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const spots = [[250, 835], [840, 830], [560, 860]]
    for (let i = 0; i < 3; i++) {
      const t0 = T.aquWide + 0.2 + i * 0.42, k = t - t0
      if (k < 0 || k > 0.75) continue
      const [cx, cy] = spots[i]
      x.globalAlpha = Math.sin(Math.PI * k / 0.75) * 0.9; x.fillStyle = '#9cf08a'; x.fillText('chirp.', cx, cy - k * 18)
    }
    x.globalAlpha = 1
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t)
      drawSky(x, t, { ...SKY_H, dx: (540 - cam.fx) * 0.12, dy: (960 - cam.fy) * 0.05 })
      const closeK = clamp((cam.s - 1.3) / 0.7)
      if (t < T.out[1] + 0.02) {
        x.save(); x.translate(cam.ax, cam.ay); x.scale(cam.s, cam.s); x.translate(-cam.fx, -cam.fy)
        // ── the profile card (slaps on), then the mystery card over it
        const slapP = prog(t, T.slap, T.slap + 0.3)
        if (t >= T.slap) {
          const sc = lerp(1.55, 1, easeOutBack(slapP, 1.5)), rot = lerp(-0.14, -0.015, ease.outCubic(slapP)) + 0.015 * Math.sin(t * 0.9)
          const ck = (1 - ease.inQuad(prog(t, T.deal[1] - 0.05, T.deal[1] + 0.25))) * clamp(slapP * 4)
          const blur = ease.inOutQuad(prog(t, ...T.blur))
          drawProfileCard(t, ck, sc, rot, blur, closeK)
          // the swiping finger
          for (const s0 of T.sw) {
            const hp = prog(t, s0 - 0.16, s0 + 0.34)
            if (hp > 0 && hp < 1) drawHand(x, lerp(720, 330, ease.inOutCubic(hp)), 600 + 30 * Math.sin(hp * Math.PI), 7, Math.sin(Math.PI * hp))
          }
          // slap shockwave
          const sw = prog(t, T.slap + 0.18, T.slap + 0.7)
          if (sw > 0 && sw < 1) { x.save(); x.globalAlpha = (1 - sw) * 0.7; x.strokeStyle = BONE; x.lineWidth = 10 * (1 - sw); rr(CARD.x - 40 * sw, CARD.y - 40 * sw, CARD.w + 80 * sw, CARD.h + 80 * sw, 40); x.stroke(); x.restore() }
        }
        const finalOut = popOut(t, [T.out[0], T.out[0] + 0.32])
        confetti(x, t, T.casc, { x0: 150, y0: 1250, n: 60, seed: 4, spread: 0.7 })
        confetti(x, t, T.casc + 0.06, { x0: 930, y0: 1250, n: 60, seed: 7, spread: 0.7 })
        confetti(x, t, T.casc + 0.5, { x0: 540, y0: 1300, n: 40, seed: 11, spread: 1.3 })
        drawMystery(t, finalOut)
        // ── the panel
        const panelK = popOut(t, [T.out[0] + 0.08, T.out[1]])
        drawPanel(t, closeK, panelK)
        x.restore()
        // ── screen-space overlays
        if (closeK > 0) { const g = x.createLinearGradient(0, 0, 0, 470); g.addColorStop(0, `rgba(6,4,16,${0.72 * closeK})`); g.addColorStop(1, 'rgba(6,4,16,0)'); x.fillStyle = g; x.fillRect(0, 0, W, 470) }
        // whip streaks
        const v = (camAt(t + 0.01).fx - camAt(t - 0.01).fx) / 0.02 * cam.s
        if (Math.abs(v) > 400) {
          const a = clamp((Math.abs(v) - 400) / 3000) * 0.5, r = rng(Math.floor(t * 30))
          x.fillStyle = `rgba(239,230,214,${a})`
          for (let k = 0; k < 14; k++) x.fillRect(r() * W, 380 + r() * 1100, 120 + r() * 260, 3)
        }
        crickets(t)
        drawNarrator(t)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

export const DEBUG = { ALL, LT, CLOSE_A, CLOSE_B, CLOSE_C, T, LESSON }
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ═══════════════════════ sound ═══════════════════════
// funk in Bb (the engine plays it as G dorian); pop / pluck / bell are moved into the key by the engine, chip / lead / brass are
// written in G dorian here.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FXO }], ['chip', t0 + 0.09, 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FXO }]]
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', +(t0 + d).toFixed(3), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, rev: 0.1, dly: 0, bus: 'fx' }])
const womp = t0 => [[293.66, 0, 0.3], [277.18, 0.34, 0.3], [261.63, 0.68, 0.3], [246.94, 1.02, 1.0]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.05, cutoff: 1300, env: 500, envDecay: 4, vib: d > 1 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, rev: 0.18, dly: 0, bus: 'fx' }])
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.035 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.11 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const flipS = (t0, f = 880, pan = 0) => [['tick', +t0.toFixed(3), 0.05], ['pop', +(t0 + 0.06).toFixed(3), f, 0.03, pan]]
const stab = (t0, g = 0.05) => [['brass', t0, [392, 466.16, 587.33, 698.46], 0.24, { gain: g, bright: 1.2, rev: 0.15, bus: 'fx' }]]
const whooshS = (t0, len = 0.3, g = 0.04) => [['whoosh', +t0.toFixed(3), len, g]]
const flipCues = () => FACES.flatMap((F, i) => F.slice(1).flatMap(([tf]) => flipS(tf + 0.02, NOTE[(i + 2) % 7], ((i - 3.5) / 3.5) * 0.6)))
const camWhips = [5.45, 8.23, 11.56, 14.9, 18.78, 21.56, 23.78].filter(tc => !cutPlays(CUTS, tc)).flatMap(tc => whooshS(tc - 0.1, 0.25, 0.035))

export const CUES = [
  // 0 · the slap + the panel
  ['pop', T.slap, 110, 0.09, 0], ['boom', T.slap + 0.01, 0.22], ['tick', T.slap, 0.07], ['whoosh', 0.0, 0.18, 0.05],
  ...head(T.h0, 5, T.h0Land, 0),
  ['pop', 0.32, 392, 0.03, 0],
  ...J.map((_, i) => ['pop', +(T.jIn + i * 0.09 + 0.1).toFixed(3), NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.028, ((i - 3.5) / 3.5) * 0.6]),
  ...stab(T.padUp), ...J.map((_, i) => ['tick', +(T.padUp + i * 0.035 + 0.05).toFixed(3), 0.03]),
  ['chip', T.squint + 0.02, 1400, 0.12, { duty: 0.25, slide: -8, gain: 0.014, decay: 0.1, sustain: 0.4, ...FXO }],
  ...whooshS(T.drop - 0.06, 0.35, 0.05),
  // 1 · the judges
  ...talkCues(ALL, { cps: CPS, pitch: { [TAG(0)]: 980, [TAG(1)]: 620, [TAG(2)]: 1180, [TAG(3)]: 760, [TAG(4)]: 1060, [TAG(5)]: 880, [TAG(6)]: 700, [TAG(7)]: 820, 'THE STARS': 900 } }),
  ...flipCues(), ...camWhips,
  ['chip', T.gasp, 700, 0.3, { duty: 0.25, slide: 14, gain: 0.022, decay: 0.2, sustain: 0.6, ...FXO }], ...[0, 1, 2, 3, 4].map(k => ['tick', +(T.gasp + 0.05 + k * 0.07).toFixed(3), 0.02]),
  ['bell', T.lTau - 0.12, 2349.32, 0.025, 0.5, 0.3], ['pluck', T.lTau + 0.1, 1174.66, 0.03, 0.4, 0], ['pluck', T.lTau + 0.22, 1318.51, 0.03, 0.4, 0],
  ['chip', T.horror, 1200, 0.45, { duty: 0.5, slide: -14, gain: 0.018, vib: 0.02, decay: 0.3, sustain: 0.7, ...FXO }],
  ['chip', T.caught + 0.05, 2400, 0.06, { wave: 'tri', gain: 0.02, decay: 0.05, sustain: 0.3, ...FXO }],
  ...Array.from({ length: 7 }, (_, k) => ['chip', +(T.ink[0] + k * 0.06).toFixed(3), 2600 + (k % 3) * 500, 0.05, { wave: 'noise', gain: 0.018, decay: 0.04, sustain: 0.3, ...FXO }]),
  ['pop', T.ink[1] + 0.05, 1318.51, 0.035, 0.2],
  ['bell', T.mirror + 0.05, 1760, 0.03, 1.2, 0.3], ['glitter', T.mirror, T.mirror + 0.6], ['pluck', T.admire[0] + 0.05, 1568, 0.025, 0.6, 0.3],
  ...[15.3, 15.75, 16.2, 16.62, 17.02].map(tt => ['tick', tt, 0.025]),
  ...whooshS(T.ariGo, 0.32, 0.06), ['chip', T.ariGo, 500, 0.3, { duty: 0.5, slide: 30, gain: 0.02, decay: 0.2, sustain: 0.5, ...FXO }],
  ...whooshS(T.streak, 0.3, 0.035),
  ['lead', T.aquFloat + 0.2, 587.33, 1.3, { wave: 'tri', gain: 0.028, vib: 0.035, vibRate: 5, attack: 0.15, decay: 0.6, sustain: 0.8, release: 0.4, rev: 0.4, dly: 0.2, bus: 'fx' }],
  ['tapeStop', T.tape, 0.5],
  ...chirp(T.aquWide + 0.25, -0.5), ...chirp(T.aquWide + 0.67, 0.5), ...chirp(T.aquWide + 1.09, -0.2),
  ['chip', T.slowTurn[0], 180, 0.85, { wave: 'saw', slide: 3, gain: 0.012, decay: 0.8, sustain: 0.9, ...FXO }],
  ['tick', T.nod[0] + 0.05, 0.03], ['tick', T.nod[0] + 0.21, 0.03],
  ['pop', T.travel, 659.25, 0.03, 0.4], ['pop', T.travel + 0.08, 880, 0.03, 0.4],
  ...whooshS(T.sagGo + 0.1, 0.35, 0.055), ['chip', T.sagGo + 0.12, 900, 0.5, { duty: 0.25, slide: 18, gain: 0.016, decay: 0.4, sustain: 0.5, ...FXO }],
  // 2 · the swipe
  ...T.sw.flatMap((s0, k) => [...whooshS(s0 - 0.04, 0.22, 0.045), ['tick', +(s0 + 0.24).toFixed(3), 0.03]]),
  ...head(26.82, 2, 27.12, 2), ...head(28.48, 2, 28.78, 3), ...head(31.26, 3, 31.62, 1), ...wordPops(32.93, 4, 0.08, 0, 0.026),
  ['chip', T.sw[0] + 0.3, 330, 0.45, { wave: 'saw', slide: -10, gain: 0.02, decay: 0.3, sustain: 0.7, ...FXO }],
  ...[0, 1, 2, 3].map(k => ['pop', +(T.sw[1] + 0.3 + k * 0.08).toFixed(3), NOTE[k + 1], 0.03, (k - 1.5) * 0.3]),
  ['chip', T.sw[2] + 0.32, 784, 0.12, { duty: 0.5, gain: 0.03, decay: 0.1, sustain: 0.8, ...FXO }], ['chip', T.sw[2] + 0.5, 784, 0.2, { duty: 0.5, gain: 0.03, decay: 0.15, sustain: 0.8, ...FXO }],
  ['glitter', T.aww, T.aww + 0.5], ['pluck', T.aww + 0.02, 880, 0.03, 0.8, -0.2], ['pluck', T.aww + 0.12, 1174.66, 0.03, 0.8, 0], ['pluck', T.aww + 0.22, 1479.98, 0.03, 0.9, 0.2],
  ['chip', T.rise[0], 300, 0.4, { duty: 0.5, slide: 20, gain: 0.02, decay: 0.3, sustain: 0.6, ...FXO }],
  ...scratch(T.scratch), ['pop', T.late4, 1174.66, 0.05, 0], ['pluck', T.late4, 1174.66, 0.04, 0.6, 0],
  ...womp(T.wilt[0]),
  // 3 · real talk
  ...whooshS(T.starsIn[0] + 0.05, 0.4, 0.04), ...head(35.15, 2, 35.45, 4),
  ['swell', T.blur[0], T.blur[1], { gain: 0.04, f0: 300, f1: 3000 }],
  ...whooshS(T.starsOut[0], 0.3, 0.03),
  // 4 · the mystery card
  ...whooshS(T.deal[0], 0.32, 0.05), ['tick', T.deal[1], 0.06], ['pop', T.deal[1], 330, 0.05, 0],
  ...head(T.h6, 4, T.h6Land, 0),
  ['tick', T.flip[0] + 0.02, 0.05], ['tick', T.flip[0] + 0.14, 0.05], ['bell', T.flip[0] + 0.15, 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[0] + 0.15, T.flip[0] + 0.75],
  ...T.f.flatMap((tf, n) => [['pop', tf, NOTE[n * 2 + 1], 0.04, 0], ['pluck', tf + 0.04, NOTE[n * 2 + 1] * 2, 0.03, 0.5, 0]]),
  ['pluck', T.f[0] + 0.15, 1567.98, 0.028, 0.4, -0.3],
  ['chip', T.f[1] + 0.02, 900, 0.28, { duty: 0.25, slide: 12, gain: 0.02, decay: 0.2, sustain: 0.6, ...FXO }],
  ['chip', T.f[2] + 0.1, 784, 1.0, { duty: 0.25, slide: -4, vib: 0.035, gain: 0.016, decay: 0.8, sustain: 0.8, pan: -0.5, rev: 0.25, dly: 0.1, bus: 'fx' }],
  ...whooshS(T.ariBack - 0.05, 0.3, 0.05), ...whooshS(T.sagBack - 0.05, 0.3, 0.045),
  ['swell', T.casc - 0.6, T.casc, { gain: 0.045, f0: 600, f1: 4000 }],
  ...stab(T.casc, 0.06), ['glitter', T.casc, T.casc + 0.9], ...claps(T.casc + 0.1, T.casc + 2.6, 13),
  // 5 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 6 · the last line
  ...head(T.h8, 4, T.h8Late, 2), ['pop', T.h8Late + 0.12, 1318.51, 0.035, 0], ['pop', T.h8Late + 0.24, 1174.66, 0.035, 0],
  ['bell', T.fork + 0.05, 2349.32, 0.022, 0.4, 0.3],
  ['chip', T.glare, 1600, 0.16, { duty: 0.5, slide: -10, gain: 0.02, decay: 0.12, sustain: 0.5, ...FXO }],
  ['chip', T.forkDown, 520, 0.3, { wave: 'saw', slide: -8, gain: 0.018, decay: 0.25, sustain: 0.6, ...FXO }],
  ...whooshS(T.out[0], 0.35, 0.03),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
