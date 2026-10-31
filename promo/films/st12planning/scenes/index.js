// st12planning (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E10) · story 0–15.6, then the end card.
//   🔥 HOT TAKE: "Planning a date is the *most* romantic thing." (heat 3). ♑ CAPRICORN (pro) with the planner page
//   (SAT · 7:30 · a circled heart) vs ♐ SAGITTARIUS ("spontaneity!!"), who loops a paper plane through the set and
//   brings a surprise snack bag. THE STARS RULE: effort is the romance; plans and surprises both count.
//   Last line (Capricorn): "Effort is the *romance*."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { bitmap, drawPixelHeart } from './props.js'
import { makeEpisode, R, INK, BONE, pop01, r3 } from './hotkit.js'

const CAP = signStar('capricorn'), SAG = signStar('sagittarius')

function planner(x, t, T) {
  const cx = 540, cy = 790, w = 250, h = 220
  const x0 = cx - w / 2, y0 = cy - h / 2
  R(x, INK, x0 - 8, y0 - 8, w + 16, h + 16); R(x, '#fffaf0', x0, y0, w, h); R(x, '#e8344e', x0, y0, w, 52)
  for (const rx of [0.25, 0.75]) R(x, INK, x0 + w * rx - 6, y0 - 22, 12, 34)
  x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = "700 30px 'Space Mono', monospace"; x.fillStyle = '#fff1ea'; x.fillText('SATURDAY', cx, y0 + 27)
  x.font = "700 56px 'Space Mono', monospace"; x.fillStyle = INK; x.fillText('7:30', cx - 26, y0 + 112)
  x.font = "700 22px 'Space Mono', monospace"; x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillText('DINNER · BOOKED', cx, y0 + 176)
  x.restore()
  drawPixelHeart(x, cx + 82, y0 + 112, 6)
  const c = prog(t, T.lines[1].t + 0.4, T.lines[1].t + 1.0)
  if (c > 0) {
    x.strokeStyle = '#ff2e4f'; x.lineWidth = 7; x.lineCap = 'round'
    x.beginPath(); x.ellipse(cx + 82, y0 + 108, 36, 30, -0.1, -1.9, -1.9 + Math.PI * 2.15 * clamp(c)); x.stroke()
  }
}
function plane(x, t, T) {
  // Sagittarius's paper plane: launched with the OBJECTION!, one loop over the set, gone
  const p = prog(t, T.obj + 0.15, T.obj + 2.2)
  if (p <= 0 || p >= 1) return
  const a = p * Math.PI * 2
  const px = lerp(900, 120, p) + Math.sin(a) * 80, py = 1000 - Math.sin(a) * 160 - p * 120
  x.save(); x.translate(px, py); x.rotate(Math.PI + Math.cos(a) * 0.6)
  bitmap(x, ['WW.......', 'WWWW.....', '.WWWWWW..', '.SSWWWWWW', 'SSSS.....'], { W: '#ffffff', S: '#c9c2e0' }, -27, -15, 6)
  x.restore()
}
function snacks(x, r, t, T) {
  const at = T.lines[2].t + 0.3, p = pop01(t, at, 0.35, 2.6)
  if (p <= 0 || t >= T.verdict) return
  x.save(); x.translate(r.x + 130, r.y + 40); x.scale(p, p); x.rotate(0.12)
  bitmap(x, ['.YY.Y.Y.', 'YWYYWYYY', 'RRRRRRRR', 'RWRRWRRW', 'RRRRRRRR', 'RWRRWRRW', '.RRRRRR.'], { Y: '#ffe9a8', W: '#ffffff', R: '#e2334c' }, -24, -28, 6)
  x.restore()
}

const EP = makeEpisode({
  id: 'st12planning', numeral: 'S12 E10', duration: 20, key: 'C',
  take: 'Planning a date is the *most* romantic thing.', takeAccent: '#8ff0cf', heat: 3,
  pro: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 392 },
  con: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, accent: '#d6b3ff', pitch: 740, prop: snacks },
  lines: [
    ['con', 'spontaneity!! just *show up!*'],
    ['pro', 'i booked the table. *that’s* romance.'],
    ['con', 'fine. i’m bringing *surprise* snacks.'],
  ],
  verdict: 'effort is the romance. plans and surprises both count.',
  last: 'Effort is the *romance*.', lastWho: 'pro',
  moods(ph) {
    if (ph === 'take') return [{ mood: 'squint', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (ph === 1) return [{ mood: 'happy', look: [1, 0] }, { mood: 'eyeroll' }]
    if (ph === 2) return [{ mood: 'wide', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'heart', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  },
  set(x, t, T) { planner(x, t, T); plane(x, t, T) },
  cues: T => [
    ['whoosh', r3(T.obj + 0.15), 0.9, 0.03],
    ['pluck', r3(T.lines[1].t + 0.4), 1318.51, 0.035, 0.6, 0.2],
    ['pop', r3(T.lines[2].t + 0.3), 1174.66, 0.045, 0.4],
  ],
})
void BONE; void ease

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
