// st9capcrew (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E49) · story 0–20.6, then the end card.
//   THE CREW: Capricorn with its earth-trio friends, Taurus and Virgo, on a rainy Saturday (../../st9caphome.js,
//   ep 'crew', the window room with rain on the glass).
//   0.00  Frame 0 / thumbnail: Capricorn under a big umbrella it holds over BOTH friends, three tote bags on its arms,
//         a game-style INVENTORY HUD (SNACKS ×3 ✓ UMBRELLA ✓ BAND-AIDS ✓ CHARGER ✓ WATER ×3 ✓).
//         Hook: "Capricorn: the friend who's *basically* a parent."
//   2.80  TAURUS: "got a snack?" → a granola bar flies over. VIRGO: "band-aid?" → one flies over.
//   6.80  CAP: "i'm not your dad. *drink water.*" → two water bottles fly. (the friends crack up)
//   9.60  It hefts the bags: *CREAK* (punch-in on the knees). ★ ASTROLOGY SAYS — in traditional astrology, Capricorn
//         rules the knees and bones.  (the ghost rises from behind the Saturn clock)
//  12.70  TAURUS: "give us *those.*"  The bags fly to the friends; whip.
//  15.00  Rhymes with frame 0: same three, same umbrella, now Virgo holds it over Capricorn and Taurus has the bags.
//         The HUD flips: BAGS CARRIED ✓ · UMBRELLA HELD ✓ · CAP: OFF DUTY ✓.  LAST: "Let them carry *you* for once."
// Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { R, blk, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'
import { CAP, drawCapHome, drawCapHomeFront, drawCap } from '../../st9caphome.js'

export const DURATION = 25
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const MINT = '#7fe8c4', GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = { ...signStar('taurus'), tag: '♉ TAURUS' }, VIR = { ...signStar('virgo'), tag: '♍ VIRGO' }

const T = {
  hookOut: 2.6, snack: 4.5, aid: 6.4, water: 8.4, creak: 9.7, ghost: 11.0, give: 12.7, toss: 14.45, flip: 15.0,
  last: 17.6, out: [20.15, 20.55],
}
const POS = { cap: { x: 540, y: 1110 }, tau: { x: 290, y: 1150 }, vir: { x: 800, y: 1150 } }
const B = [
  { at: 2.8, out: 4.4, x: 290, y: 1010, text: 'got a *snack?*', tag: TAU.tag, tagColor: TAU.color, w: 360, tailX: 0.25 },
  { at: 4.8, out: 6.3, x: 800, y: 1010, text: 'band-*aid?*', tag: VIR.tag, tagColor: VIR.color, w: 340, tailX: 0.75 },
  { at: 6.8, out: 9.4, x: 560, y: 960, text: 'i’m not your dad. *drink water.*', tag: CAP.tag, tagColor: CAP.color, w: 560 },
  { at: 12.7, out: 14.4, x: 290, y: 1010, text: 'give us *those.*', tag: TAU.tag, tagColor: TAU.color, w: 380, tailX: 0.25 },
]
const STAMPS = [
  { at: 0.9, out: 3.6, time: 'SAT 1:58 PM', text: 'leaving in *2 min*' },
  { at: 15.3, out: 17.4, time: 'SAT 2:00 PM', text: 'off duty (they *insisted*)' },
]
const FACT = { at: 10.0, dur: 2.5, text: 'In traditional astrology, Capricorn rules the knees and bones.', label: '★ ASTROLOGY SAYS', y: 1320 }
const LAST = 'Let them carry | *you* for once.'
const CLOCK = [
  { t: 0, from: '1:58 PM', to: '1:58 PM', at: 0, dur: 0.1 },
  { t: T.flip, from: '1:58 PM', to: '2:00 PM', at: T.flip + 0.05, dur: 0.4 },
]
export const GHOST = { at: T.ghost, x: 900, y: 1184, from: 'below', where: 'rising from behind the Saturn clock on the side table in the window room' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

function umbrella(x, cx, top, w, hx, hy) {
  // the shaft + a J handle
  for (let s = 0; s <= 1; s += 0.03) { R(x, INK, lerp(cx, hx, s) - 5, lerp(top + 20, hy, s) - 5, 10, 10); R(x, '#8a6a4a', lerp(cx, hx, s) - 2, lerp(top + 20, hy, s) - 2, 4, 4) }
  R(x, INK, hx - 5, hy, 10, 26); R(x, INK, hx - 25, hy + 20, 26, 10)
  // the canopy: stepped half-dome, red/bone panels
  const rows = 9, rh = 16
  for (let j = 0; j < rows; j++) {
    const k = (j + 1) / rows, hw = w / 2 * Math.sqrt(1 - (1 - k) * (1 - k))
    R(x, INK, cx - hw - 6, top + j * rh - 6, hw * 2 + 12, rh + 6)
  }
  for (let j = 0; j < rows; j++) {
    const k = (j + 1) / rows, hw = w / 2 * Math.sqrt(1 - (1 - k) * (1 - k))
    const n = 6
    for (let i = 0; i < n; i++) R(x, i % 2 ? BONE : '#c94a4a', cx - hw + (2 * hw) * i / n, top + j * rh, 2 * hw / n + 1, rh)
  }
  for (let i = 0; i <= 6; i++) R(x, INK, cx - w / 2 + w * i / 6 - 5, top + rows * rh - 2, 10, 10)    // the scalloped rim tips
  R(x, INK, cx - 4, top - 18, 8, 20)
}
function tote(x, cx, cy, col) { blk(x, cx - 26, cy, 52, 50, col, { o: 5, hi: '#ffffff33' }); R(x, INK, cx - 16, cy - 20, 6, 22); R(x, INK, cx + 10, cy - 20, 6, 22); R(x, INK, cx - 16, cy - 22, 32, 6) }
const TOTES = ['#e9b24a', '#7fd0ff', '#ff9db8']
function hud(x, t) {
  const after = t >= T.flip
  const rows = after
    ? [['BAGS', 'CARRIED ✓'], ['UMBRELLA', 'HELD ✓'], ['CAP', 'OFF DUTY ✓']]
    : [['SNACKS', t < T.snack + 0.3 ? '×3 ✓' : '×2 ✓'], ['UMBRELLA', '✓'], ['BAND-AIDS', t < T.aid + 0.3 ? '×5 ✓' : '×4 ✓'], ['CHARGER', '✓'], ['WATER', t < T.water + 0.3 ? '×3 ✓' : '×1 ✓']]
  const k = after ? popIn(t, T.flip + 0.1, 0.35, 2) : 1
  const x0 = 70, y0 = 586, w = 400, h = 44 + rows.length * 38
  x.save(); x.translate(x0 + w / 2, y0); x.scale(k, k); x.translate(-(x0 + w / 2), -y0)
  R(x, 'rgba(8,6,22,0.86)', x0, y0, w, h); R(x, GOLD, x0, y0, w, 4); R(x, GOLD, x0, y0 + h - 4, w, 4)
  x.font = `700 24px ${MONO}`; x.textBaseline = 'middle'; x.fillStyle = GOLD
  x.fillText(after ? '◆ INVENTORY (FRIENDS’)' : '◆ INVENTORY', x0 + 14, y0 + 22)
  rows.forEach(([a, b], i) => { x.fillStyle = BONE; x.fillText(a, x0 + 14, y0 + 62 + i * 38); x.fillStyle = MINT; x.textAlign = 'right'; x.fillText(b, x0 + w - 14, y0 + 62 + i * 38); x.textAlign = 'left' })
  x.restore(); x.textBaseline = 'alphabetic'
}
/** an item arcing from Capricorn to a friend */
function fly(x, t, t0, to, draw) {
  const p = prog(t, t0, t0 + 0.45)
  if (p <= 0 || p >= 1) return
  const fx = lerp(POS.cap.x, to.x, ease.inOutQuad(p)), fy = lerp(POS.cap.y - 60, to.y - 80, p) - Math.sin(Math.PI * p) * 160
  draw(fx, fy, p)
}
const bar = (x) => (fx, fy) => { blk(x, fx - 26, fy - 10, 52, 20, '#c98a4a', { o: 4 }); R(x, '#ffd27a', fx - 10, fy - 10, 20, 20) }
const aid = (x) => (fx, fy) => { blk(x, fx - 26, fy - 9, 52, 18, '#f2c9a0', { o: 4 }); R(x, '#e8a878', fx - 8, fy - 9, 16, 18) }
const bottle = (x) => (fx, fy) => { blk(x, fx - 10, fy - 26, 20, 52, '#7fd0ff', { o: 4, hi: '#c9ecff' }); R(x, '#2f6e9a', fx - 6, fy - 34, 12, 8) }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Capricorn: the friend who’s *basically* a parent.', at: 0, out: T.hookOut, accentColor: MINT, size: 76, accentSize: 112, top: 250 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: MINT }))
  const last = popText(root, LAST, { top: 262, size: 96, accentSize: 150, at: T.last, gap: 0.08, accentColor: MINT, wobble: true, late: 3, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out), after = t >= T.flip
      drawSky(x, t); daySky(x, t, { hour: 13.9 + t * 0.01, alpha: 0.85 })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.creak, dur: 1.3, x: POS.cap.x, y: 1200, amount: 0.35, follow: 0.4 })
      const z2 = gaspZoom(t, { at: T.flip + 0.2, dur: 1.2, x: POS.cap.x, y: 1060, amount: 0.15, follow: 0.3 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      drawCapHome(x, t, { room: 'window', ep: 'crew', rain: 1, clock: after ? '2:00' : '1:58', lamp: 0, noChair: true })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      drawCapHomeFront(x, t, { room: 'window', noChair: true })
      // the umbrella: over all three (Capricorn holds it) → over Capricorn (Virgo holds it)
      if (!after) umbrella(x, 545, 800, 820, POS.cap.x + 30, 1040)
      else umbrella(x, 640, 820, 560, POS.vir.x - 70, 1080)
      const laugh = t > 9.0 && t < 9.7
      const giving = t > T.give && t < T.flip
      drawStarChar(x, POS.tau.x, POS.tau.y, 200, t, { color: TAU.color, glyph: TAU.glyph, mood: laugh || after ? 'happy' : giving ? 'squint' : 'neutral', look: [1, -0.5], seed: 11, glow: 0.8, hops: [0.2, 2.9, T.snack + 0.45, 9.1, 9.4, T.give, T.toss + 0.4] })
      drawStarChar(x, POS.vir.x, POS.vir.y, 200, t, { color: VIR.color, glyph: VIR.glyph, mood: laugh || after ? 'happy' : 'neutral', look: [-1, -0.5], seed: 12, glow: 0.8, hops: [0.35, 4.9, T.aid + 0.45, 9.2, 9.5, T.toss + 0.5] })
      const capMood = t > T.creak && t < T.creak + 1.3 ? 'wide' : t > T.toss && t < T.flip + 0.8 ? 'wide' : after ? 'sparkle' : t > 6.8 && t < 9.4 ? 'squint' : 'neutral'
      drawCap(x, POS.cap.x, POS.cap.y, 230, t, { mood: capMood, look: t < T.flip ? [0, 0] : [0, -1], blink: capMood === 'wide' ? false : undefined, seed: 6, hops: [0.1, T.snack, T.aid, 7.0, T.creak, T.flip + 0.1, T.last + 0.35], squash: t > T.creak && t < T.creak + 0.4 ? 0.12 : 0 })
      // the bags: on Capricorn → flying → on Taurus
      const tp = prog(t, T.toss, T.toss + 0.5)
      TOTES.forEach((c, i) => {
        const a = { x: POS.cap.x + [-130, 130, -110][i], y: POS.cap.y + [10, 10, 70][i] }, b = { x: POS.tau.x + [-90, 90, 0][i], y: POS.tau.y + [20, 20, 76][i] }
        const p = ease.inOutQuad(tp)
        tote(x, lerp(a.x, b.x, p), lerp(a.y, b.y, p) - Math.sin(Math.PI * p) * 140, c)
      })
      // CREAK
      const ck = prog(t, T.creak, T.creak + 1.2)
      if (ck > 0 && ck < 1) {
        x.save(); x.globalAlpha = 1 - ease.inQuad(ck); x.font = `800 ${54 + 10 * Math.sin(ck * 20)}px Inter`; x.fillStyle = GOLD; x.textAlign = 'center'
        x.fillText('*creak*', POS.cap.x + 170, 1250 - ck * 30); x.fillText('*creak*', POS.cap.x - 170, 1280 - ck * 20); x.restore()
      }
      fly(x, t, T.snack, POS.tau, bar(x)); fly(x, t, T.aid, POS.vir, aid(x)); fly(x, t, T.water, POS.tau, bottle(x)); fly(x, t, T.water + 0.1, POS.vir, bottle(x))
      hud(x, t)
      for (const b of B) bubble(x, t, b)
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.flip, { dir: 1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'cap' })
      drawRecFrame(x, t, { battery: 0.9, time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.flip, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E49' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [CAP.tag]: 523.25, [TAU.tag]: 440, [VIR.tag]: 880 } }),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ['whoosh', T.snack + 0.2, 0.3, 0.025], ['pop', T.snack + 0.45, NOTE[2], 0.045, -0.4],
  ['whoosh', T.aid + 0.2, 0.3, 0.025], ['pop', T.aid + 0.45, NOTE[4], 0.045, 0.4],
  ['whoosh', T.water + 0.2, 0.3, 0.025], ['pop', T.water + 0.45, NOTE[3], 0.045, -0.4], ['pop', T.water + 0.55, NOTE[5], 0.045, 0.4],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(9.0 + i * 0.12), NOTE[(i * 2) % 7] * 2, 0.02, (i % 2 ? 0.4 : -0.4)]),
  ['tick', T.creak, 0.08], ['tick', T.creak + 0.12, 0.07], ['tick', T.creak + 0.3, 0.06], ['boom', T.creak, 0.1],
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['whoosh', T.toss + 0.25, 0.4, 0.03], ['pop', T.toss + 0.5, NOTE[1], 0.04, -0.4],
  ...whipCues(T.flip), ...clockCues(CLOCK[1].at, CLOCK[1].dur),
  ['bell', T.flip + 0.2, 1567.98, 0.04, 1.4, 0],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 1046.5, 0.05, 0], ['pluck', r3(T.last + 0.35), 783.99, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1567.98, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
