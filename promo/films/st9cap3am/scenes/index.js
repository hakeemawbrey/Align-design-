// st9cap3am (33 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E50) · story 0–28.6, then the end card.
//   3 AM with Capricorn: the soft part it doesn't post (../../st9caphome.js, ep '3am': the same desk room, dark; the goat
//   pin sits on the poster's summit, resting).
//   0.00  Frame 0 / thumbnail: the dark desk, Capricorn lit by its monitors, tie still on, ME.xlsx open:
//         fx WORTH = OUTPUT. Hook: "A Capricorn at 3 AM: am I enough if I *stop?*"  CAP: "just one more *row.*"
//   6.00  Punch-in on the BOOKED TILL 2031 calendar (season 4): one Friday, free and glowing. Capricorn pencils "MTG?"
//         into it… stops… and erases it. "…no. friday *stays free.*"
//  12.60  whip → the window room, dark: the real Capricornus draws itself in the window over the mountains.
//         ★ REAL SKY — the sea-goat goes back to Babylon's god Ea: one of the oldest constellations we know.
//         CAP: "it’s been up there for *ages.* it doesn’t *do* anything."  "it just *shines.*"
//  21.80  whip → the desk again (rhymes with frame 0): the formula backspaces to WORTH = ✓ ALWAYS, the laptop closes,
//         the tie goes on its hook, Capricorn hops off to bed (z's drift in from the right). The chair is empty, Friday
//         glows. 3:33 AM — logged off. *on purpose.*  LAST: "You're enough *off* the clock."
//   Ghost: leans out from behind the right-hand monitor in the final shot.
// Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { R, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'
import { CAP, CAP_SPOTS, drawCapHome, drawCapHomeFront, drawCap, drawSheet, wallCalendar } from '../../st9caphome.js'

export const DURATION = 33
const KEY = 'Dbm'
const STORY_END = DURATION - ENDCARD_LEN       // 28.6
const MINT = '#7fe8c4', GOLD = '#f2c75c', BONE = '#efe6d6'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  hookOut: 2.8, cal: 6.0, mtg: 7.0, erase: 9.9, window: 12.6, goat: [12.9, 14.6], desk: 21.8,
  formula: 22.1, close: 23.7, hop: 24.0, ghost: 24.1, last: 25.6, out: [28.15, 28.55],
}
const B = [
  { at: 3.0, out: 5.6, x: 560, y: 930, text: 'just one more *row.*', tag: CAP.tag, tagColor: CAP.color, w: 440, tailX: 0.5 },
  { at: 7.2, out: 9.6, x: 520, y: 930, text: 'friday’s free. i could fit a *meeting…*', tag: CAP.tag, tagColor: CAP.color, w: 460, tailX: 0.08 },
  { at: 10.2, out: 12.3, x: 520, y: 930, text: '…no. friday *stays free.*', tag: CAP.tag, tagColor: CAP.color, w: 460, tailX: 0.08 },
  { at: 16.6, out: 19.1, x: 680, y: 1040, text: 'it’s been up there for *ages.* it doesn’t *do* anything.', tag: CAP.tag, tagColor: CAP.color, w: 300, size: 34, tail: 'left' },
  { at: 19.3, out: 21.5, x: 680, y: 1040, text: 'it just *shines.*', tag: CAP.tag, tagColor: CAP.color, w: 300, size: 34, tail: 'left' },
]
const STAMPS = [
  { at: 3.2, out: 5.8, time: '3:04 AM', text: '*still* online' },
  { at: 23.0, out: 25.4, time: '3:33 AM', text: 'logged off. *on purpose.*' },
]
const FACT = { at: 13.6, dur: 2.8, text: 'The sea-goat goes back to Babylon’s god Ea: one of the oldest constellations we know.', label: '★ REAL SKY', y: 1310 }
const LAST = 'You’re enough | *off* the clock.'
const CLOCK = [
  { t: 0, from: '3:02', to: '3:04', at: 0.1, dur: 0.6 },
  { t: T.window, from: '3:04', to: '3:18', at: T.window + 0.05, dur: 0.6 },
  { t: T.desk, from: '3:18', to: '3:33', at: T.desk + 0.05, dur: 0.6 },
]
export const GHOST = { at: T.ghost, ...CAP_SPOTS.desk3am }

// the real Capricornus (RA h, Dec °, mag): α² Algedi, β Dabih, ψ, ω, ζ, ε, δ Deneb Algedi, γ Nashira, ι, θ
const RAW = [[20.30, -12.54, 3.6], [20.35, -14.78, 3.1], [20.77, -25.27, 4.1], [20.86, -26.92, 4.1], [21.44, -22.41, 3.7],
  [21.62, -19.47, 4.5], [21.78, -16.13, 2.8], [21.67, -16.66, 3.7], [21.37, -16.83, 4.3], [21.10, -17.23, 4.1]]
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 1]]
const GOAT = (() => {
  const ra0 = 21.04 * 15, de0 = -19.7, cosd = Math.cos(de0 * Math.PI / 180), k = 25, cx = 640, cy = 820
  return RAW.map(([ra, de, mag]) => ({ x: Math.round(cx - (ra * 15 - ra0) * cosd * k), y: Math.round(cy - (de - de0) * k), mag }))
})()

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const scene = t => (t < T.window ? 'desk1' : t < T.desk ? 'win' : 'desk2')

function formula(t) {
  if (t < T.formula) return 'WORTH = OUTPUT'
  const A = 'WORTH = OUTPUT', keep = 'WORTH = ', Bt = '✓ ALWAYS'
  const del = Math.floor((t - T.formula) * 18)
  if (del < A.length - keep.length) return A.slice(0, A.length - del)
  return keep + Bt.slice(0, Math.floor((t - T.formula - (A.length - keep.length) / 18) * 12))
}
function sea(x, t) {
  const p = prog(t, ...T.goat)
  x.save()
  x.globalAlpha = 0.75
  LINKS.forEach(([a, b], i) => {
    const q = clamp(p * LINKS.length - i)
    if (q <= 0) return
    const A = GOAT[a], Bp = GOAT[b]
    for (let s = 0; s <= q; s += 0.04) R(x, '#bfe8ff', lerp(A.x, Bp.x, s) - 2, lerp(A.y, Bp.y, s) - 2, 4, 4)
  })
  x.restore()
  GOAT.forEach((s, i) => { const k = popIn(t, T.goat[0] + i * 0.12, 0.3, 2); if (k > 0.02) drawPixelStar(x, s.x, s.y, (46 - s.mag * 6) * k, i === 6 ? 2 : 1, i === 6 ? '#fff1c8' : '#dff3ff') })
  if (p > 0.6) { x.save(); x.globalAlpha = clamp((p - 0.6) * 3); x.font = `700 22px ${MONO}`; x.fillStyle = '#bfe8ff'; x.fillText('CAPRICORNUS · THE SEA-GOAT', 330, 660); x.fillText('DENEB ALGEDI', GOAT[6].x - 70, GOAT[6].y + 40); x.restore() }
}
function zzz(x, t) {
  if (t < T.hop + 0.4) return
  for (let i = 0; i < 3; i++) {
    const ph = ((t - T.hop) * 0.5 + i / 3) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9; x.font = `800 ${40 + i * 10}px Inter`; x.fillStyle = BONE
    x.fillText('z', 990 - ph * 40 + i * 8, 1150 - ph * 220 - i * 30); x.restore()
  }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Capricorn at 3 AM: am I enough if I *stop?*', at: 0, out: T.hookOut, accentColor: MINT, size: 76, accentSize: 112, top: 250 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: MINT }))
  const last = popText(root, LAST, { top: 262, size: 100, accentSize: 158, at: T.last, gap: 0.08, accentColor: MINT, wobble: true, late: 3, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out), sc = scene(t)
      drawSky(x, t); daySky(x, t, { hour: 3 + t / 120 })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.cal, dur: 6.0, x: 360, y: 830, amount: 0.12, follow: 0 })
      const z2 = gaspZoom(t, { at: T.close, dur: 1.2, x: 560, y: 1060, amount: 0.12, follow: 0.2 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      if (sc === 'win') {
        drawCapHome(x, t, { room: 'window', ep: '3am', dark: 0.8, lamp: 0.35, clock: '3:18' })
        sea(x, t)
        drawCap(x, 570, 1080, 230, t, { mood: t < 16.6 ? 'sparkle' : 'neutral', look: [0.6, -1], seed: 6, hops: [T.window + 0.1, 16.7, 19.4], tie: 'loose' })
        drawCapHomeFront(x, t, { room: 'window', dark: 0.5 })
      } else {
        const fri = sc === 'desk1' && t >= T.mtg && t < T.erase ? 'mtg' : 'free'
        const lit = sc === 'desk1' ? 1 : 1 - prog(t, T.close, T.close + 0.3)
        drawCapHome(x, t, { room: 'desk', ep: '3am', dark: 0.8, friday: fri, tieOnHook: sc === 'desk2' && t > T.close })
        // the free Friday stays lit through the dark (it's the point of the scene)
        x.save(); x.beginPath(); x.rect(330, 800, 64, 60); x.clip(); x.globalAlpha = sc === 'desk1' ? 1 : 0.85
        wallCalendar(x, 100, 650, 300, 260, t, { friday: fri }); x.restore()
        // the eraser sparkle when "MTG?" goes
        const ep = prog(t, T.erase, T.erase + 0.5)
        if (ep > 0 && ep < 1) for (let i = 0; i < 8; i++) { const a = i * 0.785; drawPixelStar(x, 340 + Math.cos(a) * 50 * ep, 820 + Math.sin(a) * 40 * ep, 20 * (1 - ep), 1, GOLD) }
        const gone = sc === 'desk2' ? prog(t, T.hop, T.hop + 0.5) : 0
        if (gone < 1) {
          const capMood = sc === 'desk1' ? (t > T.mtg && t < T.erase ? 'wide' : t >= T.erase ? 'neutral' : 'squint') : 'happy'
          drawCap(x, lerp(560, 1060, ease.inQuad(gone)), 1050 - Math.sin(Math.PI * gone) * 120, 250, t, { mood: capMood, look: sc === 'desk1' && t > 6.4 && t < 12.3 ? [-1, -1] : [0, 1], seed: 6, hops: [0.15, 3.1, T.mtg, T.erase + 0.2, 10.3, T.formula, T.close + 0.1], tie: sc === 'desk2' && t > T.close ? false : sc === 'desk2' && t > T.formula ? 'loose' : true })
        }
        drawCapHomeFront(x, t, { room: 'desk', dark: 0.8, screen: lit })
        if (sc === 'desk2') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        const sp = sc === 'desk1' ? 1 : 1 - ease.inCubic(prog(t, T.close - 0.2, T.close + 0.15))
        if (sp > 0.02) drawSheet(x, t, { x: 650, y: 790, w: 440, h: 250, title: 'ME.xlsx', cols: ['', ''], widths: [160, 236], formula: formula(t), rows: [{ at: -2, cells: ['TODAY', '41 TASKS'] }, { at: -2, cells: ['WORTH', sc === 'desk2' && t > T.formula + 1.2 ? '✓' : '41'] }], pop: sp, size: 26 })
        if (sc === 'desk2') zzz(x, t)
      }
      for (const b of B) bubble(x, t, b)
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.window, { dir: 1 }); whip(x, t, T.desk, { dir: -1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'cap', ampm: 'AM' })
      drawRecFrame(x, t, { battery: lerp(0.3, 0.15, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.window, kind: 'flip' }, { t: T.desk, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E50' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [277.18, 311.13, 329.63, 369.99, 415.3, 440, 493.88]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [CAP.tag]: 523.25 } }),
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ['whoosh', T.cal + 0.05, 0.3, 0.02],
  ...[0, 1, 2, 3].map(i => ['tick', r3(T.mtg + i * 0.12), 0.03]),
  ['whoosh', T.erase + 0.1, 0.3, 0.02], ['glitter', T.erase, T.erase + 0.5], ['bell', T.erase + 0.3, 1108.73, 0.03, 1.6, 0],
  ...whipCues(T.window), ...whipCues(T.desk),
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ['bell', r3(T.goat[0] + i * 0.12), NOTE[i % 7] * 4, 0.014, 1.4, -0.4 + i * 0.08]),
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.formula + i * 0.06), 0.02]),
  ['pluck', r3(T.formula + 1.3), 554.37, 0.04, 0.6, 0],
  ['tick', T.close, 0.06], ['boom', T.close + 0.05, 0.08],
  ['whoosh', T.hop + 0.2, 0.4, 0.02],
  ['tick', T.ghost + 0.05, 0.015],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 2] * 2, 0.024, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 830.61, 0.045, 0], ['pluck', r3(T.last + 0.35), 554.37, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1108.73, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
