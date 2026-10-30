// srhtxloops · "Inside the Loop." (Star Talk Remix of htxloops, 30 s vertical) · story 0–25.6, then the shared END CARD
// (default CTA). Two sign stars on a map of Houston's three ring roads (the 610 Loop, Beltway 8, the Grand Parkway):
// ♌ Leo lives inside the Loop (Montrose) and won't leave it; ♐ Sagittarius lives out past the Beltway (Cypress) and will
// drive anywhere. ♓ Pisces is lost in a tiny car, looping the Beltway all film, missing its exit (the running gag).
// THE STARS (the gold narrator) reads both charts. Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556).
//   0.00–5.40   HOOK "Inside the *Loop.* | Outside the Beltway." — the three rings draw in, pins pop, Leo pops in
//               inside the Loop, Sag out in Cypress. LEO: "I don't go *outside* the Loop." SAG: "I'll drive *anywhere.*"
//   5.60–10.30  "Same city. | Different *orbits.*" — Leo circles the 610, Sag circles the Grand Parkway, never crossing.
//               Pisces' car joins the Beltway, crying: "which exit?!"
//  10.35        card cut (shuffle)
//  10.45–15.90 "Someone's sky | lines up | with *yours.*" — the rings spin and morph into the zodiac wheel; Leo and Sag land
//               beside their glyphs; a gold line draws between them (120° · EASY FLOW). THE STARS pops in at the hub:
//               "both fire signs. 120°. *easy* flow."  Pisces, still driving the inner ring: "is this still the Beltway?"
//  16.30–21.70 "Read both charts | *before* you meet." — LEO: "wait. do I need a *passport?*" (a passport pops up) —
//               THE STARS: "babe. it's the *same city.*" (the passport drops; Leo blushes)
//  21.90       card cut (flip)
//  22.00–25.30 "Whatever side | of the *Loop* | you’re on…" — the wheel turns back into the map; Leo and Sag drive to the
//               middle and meet (a pixel heart); Pisces finally finds its exit and pulls up, happy-crying.
//  25.33–25.60 plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
// One canvas, DOM type + dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, BLUE, ROSE, LAV, INTER, MONO, rgba, ink, sparkle, orb, chip, starFrame, inSprite, tearsCells, aside, toyCar, passport } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

const LEO = signStar('leo'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const TAG_L = '♌ LEO STAR', TAG_S = '♐ SAG STAR', TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [
  { t: 2.15, speaker: TAG_L, color: LEO.color, text: "I don't go *outside* the Loop." },
  { t: 4.95, speaker: TAG_S, color: '#c9a6ff', text: "I'll drive *anywhere.*" },
]
const BOX2 = [{ t: 12.2, speaker: TAG_N, text: 'both fire signs. 120°. *easy* flow.' }]
const BOX3 = [
  { t: 16.55, speaker: TAG_L, color: LEO.color, text: 'wait. do I need a *passport?*' },
  { t: 19.15, speaker: TAG_N, color: PINK, text: "babe. it's the *same city.*" },
]
const BOXES = [[BOX1, 1.95, 7.4], [BOX2, 12.0, 15.62], [BOX3, 16.35, 21.82]]

// ── timeline
const T = {
  ring: [0.4, BEAT(2), BEAT(3)], pins: BEAT(4), leoIn: 0.95, sagIn: 1.85, h0: 0.3, h0Late: BEAT(2), h0Out: 5.3,
  orbit: [5.6, 10.3], h1: 5.6, h1Late: BEAT(10), h1Out: 10.05, pisIn: 5.9, exit1: [7.7, 9.4],
  morph: [10.45, 11.75], spin: [10.35, 11.9], h2: 10.45, h2Late: BEAT(21), line: [BEAT(21), BEAT(22)], chip: BEAT(22) + 0.1, narrIn: 11.75, h2Out: 15.85,
  exit2: [14.2, 15.75],
  h3: 16.3, h3Late: 16.75, pass: 17.62, passDrop: 20.15, h3Out: 21.6,
  back: [21.95, 22.95], h4: 22.05, meet: [22.9, 23.95], kiss: 23.95, pisOut: [23.0, 24.0], found: [24.05, 25.15], fade: [24.95, 25.3],
}

// ── geometry: the map and the wheel share a centre
const CX = 540, CY = 1010
const RM = [215, 320, 425]          // map: the 610 Loop, Beltway 8, the Grand Parkway
const RW = [150, 368, 460]          // wheel: hub, band inner, band outer
const RING_COL = [GOLD, BLUE, ROSE]
const polar = (a, r) => ({ x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r })
const mIn = t => easeOutBack(prog(t, ...T.morph), 1.3)
const mOut = t => ease.inOutCubic(prog(t, ...T.back))
const morphAt = t => clamp(mIn(t), 0, 1.2) * (1 - mOut(t))
const spinAt = t => -TAU * ease.inOutCubic(prog(t, ...T.spin)) + TAU * 0.5 * ease.inOutCubic(prog(t, ...T.back))
const ringR = (i, t) => lerp(RM[i], RW[i], morphAt(t))

const P = (dx, dy) => ({ x: CX + dx, y: CY + dy })
const PINS = [
  { name: 'the Heights', ...P(-70, -140) }, { name: 'EaDo', ...P(130, -30) }, { name: 'Midtown', ...P(40, 120) },
  { name: 'Katy', ...P(-385, 120), out: true }, { name: 'Kingwood', ...P(250, -300), out: true }, { name: 'Pearland', ...P(50, 382), out: true },
  { name: 'Sugar Land', ...P(-250, 290), out: true },
]
const SHIELDS = [{ ring: 0, ang: -38 * D2R, num: '610' }, { ring: 1, ang: 22 * D2R, num: '8' }, { ring: 2, ang: 62 * D2R, num: '99' }]
const CARS = (() => { const r = rng(7), out = []; [4, 5, 6].forEach((n, ring) => { for (let i = 0; i < n; i++) out.push({ ring, ph: (i / n) * TAU + r() * 0.5, sp: (0.22 + r() * 0.08) * (ring % 2 ? -1 : 1), col: [GOLD, BLUE, ROSE, PINK][Math.floor(r() * 4)] }) }); return out })()
const carBoost = t => 8 * ease.inOutCubic(prog(t, 10.3, 11.6))
const carAng = (c, t) => c.ph + c.sp * t + Math.sign(c.sp) * carBoost(t)

// ── where the stars are
const LEO_HOME = { a: Math.atan2(26, -140), r: 142 }, SAG_HOME = { a: Math.atan2(-283, -238), r: 370 }
const LEO_W = { a: Math.PI / 4, r: 262 }, SAG_W = { a: -75 * D2R, r: 262 }          // beside ♌ (lon 135) and ♐ (lon 255)
const MEET_L = { x: 468, y: 1050 }, MEET_S = { x: 616, y: 1030 }
const W_L = 0.85, W_S = -0.62                                                      // orbit speeds (rad/s)
const nearest = (from, to) => to + TAU * Math.round((from - to) / TAU)
function orbiter(t, home, ring, w, tgt) {
  if (t < T.orbit[0]) return polar(home.a, home.r)
  const tt = Math.min(t, T.orbit[1])
  const a = home.a + w * (tt - T.orbit[0]), r = lerp(home.r, RM[ring], ease.inOutCubic(prog(t, T.orbit[0], T.orbit[0] + 0.6)))
  if (t < T.orbit[1]) return polar(a, r)
  const k = ease.inOutCubic(prog(t, T.orbit[1], T.morph[1]))
  return polar(lerp(a, nearest(a, tgt.a), k), lerp(r, tgt.r, k))
}
function leoAt(t) {
  const p = orbiter(t, LEO_HOME, 0, W_L, LEO_W)
  const s = t < T.h3 ? 130 : lerp(130, 170, ease.inOutCubic(prog(t, T.h3, T.h3 + 0.5)))
  const k = ease.inOutCubic(prog(t, ...T.meet))
  return [lerp(p.x, MEET_L.x, k), lerp(p.y, MEET_L.y, k) - Math.sin(Math.PI * k) * 120, lerp(s, 160, k)]
}
function sagAt(t) {
  const p = orbiter(t, SAG_HOME, 2, W_S, SAG_W)
  const s = t < T.h3 ? 120 : lerp(120, 150, ease.inOutCubic(prog(t, T.h3, T.h3 + 0.5)))
  const k = ease.inOutCubic(prog(t, T.meet[0] + 0.1, T.meet[1]))
  return [lerp(p.x, MEET_S.x, k), lerp(p.y, MEET_S.y, k) - Math.sin(Math.PI * k) * 100, lerp(s, 150, k)]
}
const NARR = { x: 400, y: 1000, s: 130 }
function narrAt(t) {
  const k = ease.inOutCubic(prog(t, T.back[0], T.back[1]))
  return [lerp(NARR.x, 540, k), lerp(NARR.y, 700, k), lerp(NARR.s, 120, k)]
}
// Pisces' car: loops the Beltway (counter-clockwise on screen) until it finds its exit
const PIS_W = -1.05, PIS_A0 = Math.PI * 0.95
const pisAng = t => PIS_A0 + PIS_W * (Math.min(t, T.pisOut[0]) - T.pisIn)
function pisCar(t) {
  const a = pisAng(t), r = ringR(1, t)
  const p = polar(a, r)
  const rot = Math.atan2(-Math.cos(a), Math.sin(a))
  if (t < T.pisOut[0]) return { x: p.x, y: p.y, rot }
  const k = ease.inOutCubic(prog(t, ...T.pisOut))
  return { x: lerp(p.x, 540, k), y: lerp(p.y, 1250, k), rot: lerp(rot, nearest(rot, 0), k) }
}

/** a little pixel heart (cells) centred at (x, y) */
function pixelHeart(x, cx, cy, cell, col, a = 1) {
  if (a <= 0) return
  const H = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  x.save(); x.globalAlpha *= a; x.shadowColor = col; x.shadowBlur = 24
  H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { x.fillStyle = (i + j) % 5 === 1 ? '#fff3e0' : col; x.fillRect(Math.round(cx + (i - 3.5) * cell), Math.round(cy + (j - 3) * cell), cell, cell) } }))
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const H0 = popText(root, 'Inside the *Loop.* | Outside | the Beltway.', { top: 205, size: 104, accentSize: 140, at: T.h0, gap: 0.1, late: 3, lateAt: T.h0Late, lateGap: 0.16, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'Same city. | Different *orbits.*', { top: 205, size: 108, accentSize: 150, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: BLUE })
  const H2 = popText(root, "Someone's sky | lines up | with *yours.*", { top: 190, size: 100, accentSize: 140, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Late, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H3 = popText(root, 'Read both charts | *before* you meet.', { top: 205, size: 96, accentSize: 132, at: T.h3, gap: 0.08, late: 3, lateAt: T.h3Late, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Whatever side | of the *Loop* | you’re on…', { top: 190, size: 104, accentSize: 140, at: T.h4, gap: 0.09, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, 24.95]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the map (rings, shields, pins, cars, a tiny downtown) → the wheel
  function drawMap(t, fadeAll) {
    const m = morphAt(t), mk = clamp(1 - m) * fadeAll, sp = spinAt(t)
    // the zodiac wheel fades in as the rings morph
    if (m > 0.01) {
      x.save(); x.translate(CX, CY); x.rotate(sp); x.translate(-CX, -CY)
      drawWheelH(x, { k: clamp(m) * fadeAll, glyphK: clamp(prog(m, 0.6, 1)) })
      x.restore()
    }
    // the ring roads
    RM.forEach((_, i) => {
      const sw = ease.inOutCubic(prog(t, T.ring[i], T.ring[i] + 0.6))
      if (sw <= 0) return
      const r = ringR(i, t), a0 = -Math.PI / 2 + sp
      x.save(); x.globalAlpha = lerp(1, 0.25, clamp(m)) * fadeAll
      x.beginPath(); x.arc(CX, CY, r, a0, a0 + TAU * sw)
      x.strokeStyle = 'rgba(16,10,40,0.92)'; x.lineWidth = lerp(30, 6, clamp(m)); x.stroke()
      for (const d of [-13, 13]) { x.beginPath(); x.arc(CX, CY, r + d * (1 - clamp(m)), a0, a0 + TAU * sw); ink(x, RING_COL[i], { w: 4, fa: 0, glow: 14 }) }
      x.setLineDash([16, 18]); x.lineDashOffset = -t * 60 * (i % 2 ? -1 : 1)
      x.beginPath(); x.arc(CX, CY, r, a0, a0 + TAU * sw); x.strokeStyle = rgba(RING_COL[i], 0.55 * mk); x.lineWidth = 3; x.stroke()
      x.setLineDash([])
      x.restore()
    })
    if (mk <= 0.01) return
    x.save(); x.globalAlpha = mk
    // downtown (inside the Loop)
    const dk = pop01(t, 1.0, 0.45, 1.8)
    if (dk > 0) {
      ;[[-48, 60], [-24, 96], [0, 120], [24, 84], [48, 66]].forEach(([dx, h], i) => {
        const hh = h * clamp(pop01(t, 1.0 + i * 0.05, 0.4, 1.8))
        x.beginPath(); x.rect(CX + dx - 10, CY + 30 - hh, 20, hh); ink(x, GOLD, { w: 3, fa: 0.35, glow: 10 })
      })
    }
    // cars on the rings
    for (const c of CARS) {
      const k = clamp((t - T.ring[c.ring] - 0.4) * 3)
      if (k <= 0) continue
      const a = carAng(c, t) + spinAt(t), p = polar(a, ringR(c.ring, t))
      x.save(); x.translate(p.x, p.y); x.rotate(a + Math.PI / 2); x.globalAlpha = mk * k
      x.fillStyle = c.col; x.shadowColor = c.col; x.shadowBlur = 10; x.fillRect(-7, -11, 14, 22); x.restore()
    }
    // pins + labels
    PINS.forEach((L, i) => {
      const k = pop01(t, T.pins + i * 0.1, 0.34, 2.4)
      if (k <= 0) return
      x.save(); x.globalAlpha = mk; orb(x, L.x, L.y, 9 * k, L.out ? PINK : BLUE, 1, 2.6); x.restore()
      chip(x, L.x, L.y + 30, L.name, k * mk * (1 - 0.6 * ease.inOutQuad(prog(t, T.meet[0], T.meet[0] + 0.5))), { size: 24, col: BONE, edge: L.out ? PINK : BLUE })
    })
    // ring shields
    SHIELDS.forEach((S, i) => {
      const k = pop01(t, T.ring[i] + 0.45, 0.36, 2.4)
      if (k <= 0) return
      const p = polar(S.ang, RM[S.ring])
      x.save(); x.translate(p.x, p.y); x.scale(k, k); x.globalAlpha = mk
      x.beginPath(); x.moveTo(-32, -30); x.lineTo(32, -30); x.lineTo(32, 8); x.quadraticCurveTo(32, 30, 0, 38); x.quadraticCurveTo(-32, 30, -32, 8); x.closePath()
      ink(x, RING_COL[i], { w: 4, fa: 0.9, fill: '#140e30', glow: 12 })
      x.fillStyle = BONE; x.font = `800 ${S.num.length > 2 ? 26 : 34}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.num, 0, 2)
      x.restore()
    })
    x.restore()
  }

  // ── the gold reading line + its chip (beats 3–4)
  function drawReading(t, fadeAll) {
    const lk = ease.inOutCubic(prog(t, ...T.line)) * outK(t, T.back[0], 0.35) * fadeAll
    if (lk <= 0) return
    const [lx, ly] = leoAt(t), [sx, sy] = sagAt(t)
    const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - T.line[1]) * 4)
    x.save(); x.beginPath(); x.moveTo(lx, ly); x.lineTo(lerp(lx, sx, ease.inOutCubic(prog(t, ...T.line))), lerp(ly, sy, ease.inOutCubic(prog(t, ...T.line))))
    x.globalAlpha = outK(t, T.back[0], 0.35) * fadeAll; ink(x, GOLD, { w: 10 * pulse, fa: 0, glow: 30 }); x.restore()
    sparkle(x, sx, sy, t, T.line[1], { n: 10, R: 140, seed: 23, size: 24 })
    chip(x, 760, 975, '120° · EASY FLOW', pop01(t, T.chip, 0.36, 2.6) * outK(t, T.back[0], 0.3) * fadeAll, { size: 30, col: GOLD, edge: GOLD })
  }

  // ── the stars
  const L_HOPS = [T.leoIn + 0.3, ...talkHops([...BOX1, ...BOX3], TAG_L, { cps: CPS }), T.passDrop + 0.1, T.kiss]
  const S_HOPS = [T.sagIn + 0.3, ...talkHops(BOX1, TAG_S, { cps: CPS }), T.line[1], T.kiss + 0.1]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops([...BOX2, ...BOX3], TAG_N, { cps: CPS }), T.kiss + 0.2]
  const P_HOPS = [T.pisIn + 0.3, T.exit1[0], T.exit2[0], T.found[0], T.found[0] + 0.5]
  function leoState(t) {
    if (t < 2.15) return { mood: 'happy', look: [0, 0] }
    if (t < 3.6) return { mood: 'squint', look: [-1, -0.3] }                // snooty
    if (t < 4.95) return { mood: 'neutral', look: [-1, -1] }
    if (t < 6.3) return { mood: 'eyeroll' }                                 // "anywhere?" ugh
    if (t < T.orbit[1]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.morph[1] + 0.2) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < T.line[1]) return { mood: 'wide', look: [-1, -1], blink: false }
    if (t < T.h3) return { mood: 'heart', look: [-1, -1] }
    if (t < 17.4) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < 19.15) return { mood: 'sparkle', look: [1, -1] }                // the passport
    if (t < T.passDrop) return { mood: 'wide', look: [-1, -0.5], blink: false }
    if (t < 21.9) return { mood: 'happy', look: [0, 0], blush: 1 }
    if (t < T.kiss) return { mood: 'happy', look: [1, 0] }
    return { mood: 'heart', look: [1, 0] }
  }
  function sagState(t) {
    if (t < 4.95) return { mood: t < 2.15 ? 'happy' : 'neutral', look: [1, 1] }
    if (t < 6.4) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.orbit[1]) return { mood: 'happy' }
    if (t < T.line[1]) return { mood: 'wide', look: [0, 1], blink: false }
    if (t < T.h3) return { mood: 'heart', look: [0, 1] }
    if (t < 19.15) return { mood: 'happy', look: [-1, 1] }
    if (t < 21.9) return { mood: 'wink', look: [-1, 1] }
    if (t < T.kiss) return { mood: 'happy', look: [-1, 0] }
    return { mood: 'heart', look: [-1, 0] }
  }
  function narrState(t) {
    if (t < 12.2) return { mood: 'wide', look: [1, 0] }
    if (t < 16.3) return { mood: 'happy', look: [1, 0.3] }
    if (t < 19.15) return { mood: 'squint', look: [1, 0.6] }                 // …a passport?
    if (t < 20.6) return { mood: 'eyeroll' }
    if (t < 22.9) return { mood: 'wink', look: [0, 0] }
    if (t < T.kiss) return { mood: 'happy', look: [0, 1] }
    return { mood: 'sparkle', look: [0, 1] }
  }
  function drawStars(t, a) {
    // THE STARS (from the morph on)
    if (t >= T.narrIn) {
      const [nx, ny, ns] = narrAt(t), st = narrState(t)
      drawStarChar(x, nx, ny, ns, t, { color: STARC.sky, mood: st.mood, look: st.look, hops: N_HOPS, seed: 3, pop: pop01(t, T.narrIn, 0.5, 2.2), alpha: a, glow: 1.1 })
    }
    if (t >= T.sagIn) {
      const [sx, sy, ss] = sagAt(t), st = sagState(t)
      drawStarChar(x, sx, sy, ss, t, { color: SAG.color, glyph: SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, hops: S_HOPS, seed: 7, pop: pop01(t, T.sagIn, 0.45, 2.2), alpha: a })
    }
    if (t >= T.leoIn) {
      const [lx, ly, ls] = leoAt(t), st = leoState(t)
      drawStarChar(x, lx, ly, ls, t, { color: LEO.color, glyph: LEO.glyph, mood: st.mood, look: st.look, blink: st.blink, blush: st.blush, hops: L_HOPS, seed: 5, pop: pop01(t, T.leoIn, 0.45, 2.2), alpha: a })
    }
    // name chips on the hook map
    const hk = (t0) => pop01(t, t0, 0.3, 2.4) * outK(t, T.orbit[0] - 0.3, 0.3) * a
    if (t >= T.leoIn + 0.3 && t < T.orbit[0]) { const [lx, ly] = leoAt(t); chip(x, lx, ly + 100, 'MONTROSE', hk(T.leoIn + 0.3), { size: 26, col: LEO.color, edge: LEO.color }) }
    if (t >= T.sagIn + 0.3 && t < T.orbit[0]) { const [sx, sy] = sagAt(t); chip(x, sx, sy + 94, 'CYPRESS', hk(T.sagIn + 0.3), { size: 26, col: '#c9a6ff', edge: '#c9a6ff' }) }
  }
  function drawPisces(t, a) {
    if (t < T.pisIn) return
    const k = pop01(t, T.pisIn, 0.45, 2.2)
    const C = pisCar(t)
    toyCar(x, C.x, C.y, 96 * k, C.rot, '#7c74f0', t, { a, flip: Math.cos(C.rot) < 0 })
    let mood = 'squint', tears = 2, look = [0, 0]
    if (t < T.exit1[0]) { tears = 1 }
    else if (t < T.exit1[1]) { mood = 'wide'; tears = 2; look = [1, -1] }
    else if (t < T.exit2[0]) { tears = 2 }
    else if (t < T.exit2[1]) { mood = 'wide'; tears = 1; look = [-1, -1] }
    else if (t < T.pisOut[0]) { tears = 3 }
    else if (t < T.found[0]) { mood = 'wide'; tears = 0; look = [0, -1] }
    else { mood = 'happy'; tears = 3 }
    const sx = C.x, sy = C.y - 62 * k
    const opts = { color: PIS.color, mood, look, hops: P_HOPS, seed: 11, bob: 2, pop: k, alpha: a, glow: 0.8 }
    drawStarChar(x, sx, sy, 84, t, opts)
    if (tears) { const F = starFrame(sx, sy, 84, t, opts); x.save(); x.globalAlpha = a; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
  }
  function drawAsides(t, a) {
    const one = (txt, [a0, a1], dy = -140) => {
      const C = pisCar(t)
      const hw = txt.length * 10.5 + 30, ax = clamp(C.x, hw + 40, 1040 - hw), ay = clamp(C.y + dy, 600, 1500)
      aside(x, ax, ay, txt, pop01(t, a0, 0.3, 2.4) * outK(t, a1 - 0.2, 0.2) * a, { size: 34, edge: PIS.color, tx: C.x, ty: C.y - 60 })
    }
    if (t >= T.exit1[0] && t < T.exit1[1]) one('which exit?!', T.exit1)
    if (t >= T.exit2[0] && t < T.exit2[1]) one('is this still the Beltway?', T.exit2)
    if (t >= T.found[0] && t < T.found[1]) one('found my exit!!', T.found, 190)
  }
  function drawProps(t, a) {
    // the passport
    if (t >= T.pass && t < T.passDrop + 0.8) {
      const [lx, ly, ls] = leoAt(t)
      const k = pop01(t, T.pass, 0.36, 2.6), dp = prog(t, T.passDrop, T.passDrop + 0.7)
      const px = lx + ls * 0.95 + 40 * dp, py = ly - ls * 0.55 + 700 * dp * dp, rot = -0.18 + 0.12 * Math.sin((t - T.pass) * 3) + 2.4 * dp
      passport(x, px, py, 0.95 * k, rot, a * (1 - ease.inQuad(dp)))
      sparkle(x, px, py, t, T.pass, { n: 8, R: 110, seed: 33, size: 22 })
    }
    // the meeting: a pixel heart between Leo and Sag
    if (t >= T.kiss) {
      const k = pop01(t, T.kiss, 0.4, 2.8) * a, beat = 1 + 0.12 * Math.max(0, Math.sin((t - T.kiss) * 9))
      pixelHeart(x, 542, 880 - 20 * ease.outCubic(prog(t, T.kiss, T.kiss + 0.6)), Math.round(12 * k * beat), PINK, clamp(k * 2))
      sparkle(x, 542, 900, t, T.kiss, { n: 18, R: 360, seed: 61, size: 32, dur: 0.9 })
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fadeAll = 1 - ease.inQuad(prog(t, ...T.fade))
        drawMap(t, fadeAll)
        drawReading(t, fadeAll)
        drawPisces(t, fadeAll)
        drawStars(t, fadeAll)
        drawProps(t, fadeAll)
        drawAsides(t, fadeAll)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, 0.08, 0.4)) * outK(t, T.h0Out))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine moves pitched cues into the key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // hook
  ...wordPops(T.h0, 3, 0.1, 0),
  ...T.ring.map((s, i) => ['whoosh', r3(s), 0.6, 0.035]),
  ...T.ring.map((s, i) => ['pluck', r3(s + 0.6), [587.33, 739.99, 880][i], 0.045, 0.6, (i - 1) * 0.3]),
  ['pop', r3(T.h0Late), 987.77, 0.04, -0.1], ['pop', r3(T.h0Late + 0.16), 1174.66, 0.04, 0.1], ['pop', r3(T.h0Late + 0.32), 1318.51, 0.045, 0],
  ['pop', T.leoIn, 739.99, 0.04, -0.3], ['pop', T.sagIn, 987.77, 0.04, -0.3],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', r3(T.pins + i * 0.1), NOTE[i % 7] * 2, 0.014, (i % 2 ? 0.4 : -0.4)]),
  // orbits
  ...wordPops(T.h1, 3, 0.1, 1, 0.026), ['pluck', r3(T.h1Late), 880, 0.05, 0.6, 0], ['pop', r3(T.h1Late), 1174.66, 0.045, 0],
  ['whoosh', T.pisIn, 0.5, 0.04], ['pop', r3(T.pisIn + 0.2), 659.25, 0.035, 0.4],
  ['pop', T.exit1[0], 880, 0.035, 0.3], ['pop', r3(T.exit1[0] + 0.12), 739.99, 0.03, 0.3],
  // the wheel
  ['riser', 10.0, T.morph[0], 0.04], ['whoosh', T.spin[0], 1.4, 0.06], ['boom', T.morph[1], 0.11], ['glitter', T.morph[1], r3(T.morph[1] + 0.7)],
  ...wordPops(T.h2, 5, 0.09, 2, 0.026), ['pluck', r3(T.h2Late), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.h2Late), 1318.51, 0.045, 0],
  ['pop', T.narrIn, 1174.66, 0.04, -0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, -0.4],
  ['whoosh', T.line[0], 0.5, 0.04], ['bell', T.line[1], 880, 0.05, 2.0, 0.2], ['bell', r3(T.line[1] + 0.06), 1318.51, 0.04, 2.0, 0.2], ['glitter', T.line[1], r3(T.line[1] + 0.6)],
  ['pop', r3(T.chip), 1318.51, 0.035, 0.3],
  ['pop', T.exit2[0], 880, 0.03, -0.3], ['pop', r3(T.exit2[0] + 0.12), 659.25, 0.03, -0.3],
  // passport
  ...wordPops(T.h3, 3, 0.08, 3, 0.026), ['pluck', r3(T.h3Late), 1318.51, 0.05, 0.6, 0],
  ['pop', T.pass, 1318.51, 0.045, 0.3], ['bell', r3(T.pass + 0.04), 1975.53, 0.025, 1.0, 0.3],
  ['whoosh', T.passDrop, 0.5, 0.035], ['tick', r3(T.passDrop + 0.6), 0.04],
  // finale
  ['riser', 21.6, T.back[0], 0.04], ['whoosh', T.back[0], 1.0, 0.05],
  ...wordPops(T.h4, 7, 0.09, 0, 0.026),
  ['whoosh', T.meet[0], 0.8, 0.04], ['boom', T.kiss, 0.1], ['bell', T.kiss, 880, 0.05, 2.2, -0.2], ['bell', r3(T.kiss + 0.06), 1174.66, 0.045, 2.2, 0.2], ['glitter', T.kiss, r3(T.kiss + 0.9)],
  ['whoosh', T.pisOut[0], 0.6, 0.035], ['pop', T.found[0], 1318.51, 0.04, 0], ['pop', r3(T.found[0] + 0.12), 1567.98, 0.035, 0],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_N]: 739.99, [TAG_L]: 587.33, [TAG_S]: 880 } })),
]

// card-motif candidate cuts (cardfx keeps 10.35 + 21.9):
//   5.45  "Inside the Loop" out (5.3–5.52), box 1 open across it → "Same city." (5.6)
//  10.35  "Same city" out (10.27), box 1 shut (7.4) → the rings spin into the wheel (10.45)
//  16.10  box 2 shut (15.62), H2 out (16.07) → "Read both charts before you meet." (16.3)
//  21.90  box 3 shut (21.8), H3 out (21.82) → the wheel turns back into the map, "Whatever side…" (22.05)
const CUTS = [{ t: 5.45, kind: 'flip' }, { t: 10.35, kind: 'shuffle' }, { t: 16.1, kind: 'deal' }, { t: 21.9, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
export { T, BOXES as ALL_BOXES }
