// st8noir (35 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E16 · film noir) · story 0–30.6, then the end card.
//   "Someone liked | a photo | from *2021.*"  Black and white, rain, a streetlamp. Detective Scorpio (the season-4 trench
//   coat and fedora) holds a phone that just lit up at 2:14 a.m. Every line is Scorpio's voice-over, typed into a slanted
//   typewriter box. Only the reds stay red (the like, the string, the Orbiter's "viewed" light, the CASE CLOSED stamp).
//   0.00–3.40  frame 0: the street, the hook card, the phone glowing. V.O.: "2:14 a.m. the city was asleep…"
//   3.40–7.00  insert: the phone. The liked photo is… a sandwich, from March 2021. ♥ liked by "?". Punch-in on the heart.
//   7.00–8.40  title card: "The Deep Like · A SCORPIO MYSTERY".
//   8.40–13.2  the office, venetian-blind shadows. Three clues pin up on the corkboard; red string runs to a "?".
//              (the ghost leans out from behind the filing cabinet, 11.3)
//  13.20–20.4  the alley. The flashlight sweeps… the Orbiter, again, its red light blinking. It says "…". It starts circling
//              Scorpio's phone. V.O.: "watching isn't talking. and i'm done being *watched.*"
//  20.40–23.8  the desk: the CASE CLOSED stamp slams; BLOCK. The frosted office door slams shut.
//  23.80–30.6  the street again (frame 0's framing): the rain stops, the colour comes back, the phone reads BLOCKED, the
//              Orbiter drifts away small and far. "Case *closed.*"  (the hidden comet crosses the sky at 27.2)
// Rewatch bait: the newspaper in the gutter reads "MORNING STAR BACK" (E14), and the corkboard's corner holds last week's
// solved case, "#0007 THE KNOCK" (E02).
// One canvas (sky + world + V.O. box), DOM type (hook card, last line), grain on top. Pure f(t).
import { el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar, lineTimes } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSatellite, drawComet, drawDayChip, hookCard, hookCues, stingerCues } from '../../st8cast.js'
import { clamp, lerp, prog, ease, easeOutBack, pop01, outK, popOut, rgba, r3, BMP, bits, pixFont, punch, burst, wordPops, GOLD, BONE, INK, MONO, SERIF, INTER } from './kit.js'

export const DURATION = 35
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const RED = '#e8213f', DRED = '#b0132e', PAPER = '#efe7d4'
const SCO = signStar('scorpio')
const GROUND = 1420

// ── the timeline
const T = {
  hookOut: [3.1, 3.4],
  phone: 3.4, heart: 5.2, title: 7.0, office: 8.4, clues: [8.9, 9.9, 10.9], string: [11.6, 12.9], ghost: 11.3,
  alley: 13.2, beam: [13.3, 13.95], found: 13.95, dots: 15.5, orbit: 16.9,
  desk: 20.4, stamp: 20.95, block: 22.05, door: [22.95, 23.5], street: 23.8,
  dry: [23.9, 25.0], color: [24.3, 26.2], last: 24.7, lastLand: 25.15, comet: 27.2, out: [30.0, 30.45],
  boxOpen: 0.35, boxClose: 23.75,
}
const CPS = 26
const VO = '♏ DET. SCORPIO · V.O.'
const LINES = [
  { t: 0.5, text: '2:14 a.m. the city was asleep. my phone *wasn’t.*' },
  { t: 4.4, text: 'a like. on my lunch. from *2021.*' },
  { t: 8.9, text: 'every story viewed. not one text. i knew the *type.*' },
  { t: 13.6, text: 'the Orbiter. *again.*' },
  { t: 16.6, text: 'watching isn’t talking. and i’m done being *watched.*' },
  { t: 20.7, text: 'case closed. and so is the *door.*' },
]
const TIMES = lineTimes(LINES, { cps: CPS })
const ROWCH = 33
export const GHOST = { at: T.ghost, x: 222, y: 1150, where: 'leaning out from behind the filing cabinet in Scorpio’s office, left' }
export const COMET = { at: T.comet, where: 'tiny, across the night sky between the buildings, after the rain stops' }

// ── scene clock: which set is on screen
const scene = t => t < T.phone ? 'street' : t < T.title ? 'phone' : t < T.office ? 'title' : t < T.alley ? 'office' : t < T.desk ? 'alley' : t < T.street ? 'desk' : 'street'

// ── pixel props
const HAT = BMP(`
....HHHHHHH....
...HHHHHHHHH...
...HhhhhhhhH...
...BBBBBBBBB...
HHHHHHHHHHHHHHH
.HHHHHHHHHHHHH.`)
const COAT = BMP(`
LL.........LL
CLL.......LLC
CCLL.....LLCC
CCCLL...LLCCC
CCCCLL.LLCCCC
CCCCCCoCCCCCC
bbbbbbbbbbbbb
CCCCCCoCCCCCC
CCCCCC.CCCCCC
CCCCCC.CCCCCC`)
const SANDWICH = BMP(`
....bbbbbbbb....
..bBBBBBBBBBBb..
.bBBBwBBBBBwBBb.
gGgGgGgGgGgGgGgG
rrRRrrrRRrrrRRrr
cccccccccccccccc
mmmmmmmmmmmmmmmm
.bBBBBBBBBBBBBb.
..bbbbbbbbbbbb..`)
const SAND_C = { b: '#b9772f', B: '#e0a352', w: '#fff1c8', g: '#59c24a', G: '#8fe06a', r: '#e2483a', R: '#ff7a5c', c: '#ffd34a', m: '#a8553a' }
const HEART = BMP('.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...')
const FLASH = BMP(`
.LLL.......
LLLLGGGGGGG
LLLLGGGGGGG
.LLL.......`)

// ── deterministic noise
const h1 = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

// ── Scorpio's poses per scene
function scoState(t) {
  const sc = scene(t)
  if (sc === 'street' && t < T.street) return { mood: 'squint', look: [1, 0] }
  if (sc === 'phone') return { mood: 'squint', look: [1, 0] }
  if (sc === 'office') return { mood: t < T.clues[2] + 0.4 ? 'squint' : 'neutral', look: [-1, -1] }
  if (sc === 'alley') return t < T.found ? { mood: 'squint', look: [1, -1] } : t < T.found + 1.3 ? { mood: 'wide', look: [1, -1], blink: false } : t < T.orbit + 1.4 ? { mood: 'eyeroll' } : { mood: 'neutral', look: [1, -1] }
  if (sc === 'street') return t < T.lastLand ? { mood: 'neutral', look: [1, 0] } : { mood: 'happy', look: [0, 0] }
  return { mood: 'neutral' }
}
const SCO_HOPS = [...TIMES.map(x => x.start), T.found + 0.05, T.stamp, T.block, T.lastLand]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Someone liked | a photo | from *2021.*', at: 0, out: T.hookOut[0], size: 108, accentSize: 168, top: 170, accentColor: RED })
  const LAST = popText(root, 'Case *closed.*', { top: 236, size: 150, accentSize: 230, at: T.last, gap: 0.1, accentColor: RED, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H * 1.6), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  void el

  // the V.O. rows: words wrapped at ROWCH monospace columns, each char with its type-on time
  const ROWS = LINES.map((L, n) => {
    const cs = []; let acc = false
    for (const ch of L.text) { if (ch === '*') { acc = !acc; continue } cs.push({ ch, acc }) }
    cs.forEach((c, i) => { c.t = TIMES[n].chars[i] })
    const rows = [[]]; let word = []
    const flush = () => { const row = rows[rows.length - 1]; if (row.length && row.length + word.length > ROWCH) rows.push([]); rows[rows.length - 1].push(...word); word = [] }
    for (const c of cs) { word.push(c); if (c.ch === ' ') flush() }
    flush()
    return rows.map(r => (r.length && r[r.length - 1].ch === ' ' ? r.slice(0, -1) : r))
  })

  // ─────────── sets
  function rain(t, k, { slant = 0.14, n = 150, len = 46 } = {}) {
    if (k <= 0) return
    x.save(); x.strokeStyle = `rgba(220,226,240,${0.32 * k})`; x.lineWidth = 3
    x.beginPath()
    for (let i = 0; i < n; i++) {
      const sp = 1700 + h1(i) * 700
      const y = ((h1(i + 9) * 2200 + t * sp) % 2200) - 140
      const xx = ((h1(i + 3) * 1240 + y * slant) % 1240) - 80
      x.moveTo(xx, y); x.lineTo(xx + len * slant, y + len)
    }
    x.stroke(); x.restore()
  }
  function city(t) {
    // the buildings, back to front
    const B = [[-20, 240, 920], [200, 200, 740], [380, 260, 1000], [620, 180, 800], [780, 320, 960], [40, 210, 660], [880, 220, 700]]
    B.forEach(([bx, bw, bh], n) => {
      const top = GROUND - bh, shade = n < 5 ? '#24222c' : '#1a1920'
      x.fillStyle = shade; x.fillRect(bx, top, bw, bh)
      x.fillStyle = '#2f2c38'; x.fillRect(bx, top, bw, 10)
      for (let j = top + 40; j < GROUND - 40; j += 56) for (let i = bx + 22; i < bx + bw - 30; i += 46) {
        const on = h1(i * 3 + j * 7 + n) > 0.74
        x.fillStyle = on ? (h1(i + j) > 0.5 ? '#c9bb92' : '#9a8f72') : '#17161d'
        x.fillRect(i, j, 22, 30)
      }
    })
  }
  function street(t, colorK) {
    drawSky(x, t, { ...SKY_H, dim: 0.7 })
    drawSeedConstellation(x, t, 100, { alpha: 0.5 })
    // the hidden comet (after the rain, colour back), behind the skyline
    if (t > T.comet && t < T.comet + 1.6) {
      const p = prog(t, T.comet, T.comet + 1.6)
      drawComet(x, lerp(1000, 120, p), lerp(610, 470, p), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [1, 0.2], alpha: Math.sin(Math.PI * p) })
    }
    city(t)
    // the Orbiter, small and far, drifting off (its kind exit)
    if (t >= T.street) {
      const p = prog(t, T.street, STORY_END)
      drawSatellite(x, lerp(880, 1010, p), lerp(700, 600, p), lerp(90, 50, p), t, { aura: false, exPin: false, alpha: 0.9 * (1 - p * 0.5), look: [1, -1] })
    }
    // the street, wet
    x.fillStyle = '#16151b'; x.fillRect(0, GROUND, 1080, 1920 - GROUND)
    x.fillStyle = '#2a2833'; x.fillRect(0, GROUND, 1080, 12)
    for (let i = 0; i < 9; i++) { x.fillStyle = '#3a3846'; x.fillRect(60 + i * 130, GROUND + 180, 70, 10) }
    // reflections of the windows in the puddles
    x.save(); x.globalAlpha = 0.18; x.fillStyle = '#e8d9a8'
    for (let i = 0; i < 26; i++) x.fillRect(h1(i) * 1080, GROUND + 30 + h1(i + 40) * 140, 18, 4 + h1(i + 7) * 30)
    x.restore()
    // the newspaper in the gutter (rewatch bait)
    x.save(); x.translate(880, GROUND + 70); x.rotate(0.08)
    x.fillStyle = INK; x.fillRect(-96, -34, 192, 70); x.fillStyle = '#d8d2c2'; x.fillRect(-90, -28, 180, 58)
    x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#2a2833'
    x.fillText('THE DAILY SKY', 0, -10); x.font = `700 15px ${MONO}`; x.fillText('MORNING STAR BACK', 0, 12)
    x.fillRect(-80, 20, 160, 3); x.restore()
    // the streetlamp + its cone
    x.fillStyle = '#0d0c12'; x.fillRect(176, 640, 18, GROUND - 630); x.fillRect(150, GROUND - 4, 70, 14); x.fillRect(176, 628, 120, 14)
    x.fillStyle = '#2b2a33'; x.fillRect(268, 640, 56, 26)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 660, 0, GROUND + 20)
    g.addColorStop(0, 'rgba(255,240,200,0.32)'); g.addColorStop(1, 'rgba(255,240,200,0.06)')
    x.fillStyle = g; x.beginPath(); x.moveTo(272, 664); x.lineTo(320, 664); x.lineTo(860, GROUND + 20); x.lineTo(60, GROUND + 20); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,244,214,0.9)'; x.fillRect(276, 664, 44, 8)
    x.restore()
    // Scorpio under the lamp, the phone in hand
    const r = scorpio(t, 540, 1225, 420)
    return phoneInHand(t, r, colorK)
  }
  function scorpio(t, sx, sy, size, k = 1) {
    const st = scoState(t)
    const r = drawStarChar(x, sx, sy, size * k, t, { color: SCO.color, glyph: SCO.glyph, ...st, hops: SCO_HOPS, seed: 7, glow: 0.8 })
    const cell = size * k / 34
    bits(x, COAT, r.x, r.y + cell * 10, cell * 0.85, { C: '#c9a46a', L: '#e2c48c', b: '#7a5a2a', o: '#3a2a14' })
    bits(x, HAT, r.x, r.top + cell * 3.2, cell * 1.05, { H: '#4a4038', h: '#6b5d50', B: '#1a1410' }, { rot: -0.1 + (t > T.lastLand && t < T.lastLand + 0.5 ? -0.25 * Math.sin(Math.PI * prog(t, T.lastLand, T.lastLand + 0.5)) : 0) })
    return r
  }
  function phoneInHand(t, r, colorK) {
    const px = r.x + r.size * 0.52, py = r.y + r.size * 0.02
    x.save(); x.translate(px, py); x.rotate(-0.18)
    x.fillStyle = INK; x.fillRect(-46, -78, 92, 156); x.fillStyle = '#d8e4f0'; x.fillRect(-36, -66, 72, 128)
    x.restore()
    // the glow, more after it buzzes at 2:14
    x.save(); x.globalCompositeOperation = 'lighter'
    const gl = x.createRadialGradient(px, py, 10, px, py, 220)
    gl.addColorStop(0, 'rgba(210,230,255,0.4)'); gl.addColorStop(1, 'rgba(210,230,255,0)')
    x.fillStyle = gl; x.fillRect(px - 220, py - 220, 440, 440); x.restore()
    return { px, py }
  }
  function phoneInsert(t) {
    x.fillStyle = '#121118'; x.fillRect(0, 0, 1080, 1920)
    // rain-on-glass bokeh
    for (let i = 0; i < 24; i++) {
      x.fillStyle = `rgba(232,217,168,${0.06 + 0.08 * h1(i)})`
      const rr = 30 + h1(i + 5) * 70; x.beginPath(); x.arc(h1(i + 1) * 1080, h1(i + 2) * 1920, rr, 0, Math.PI * 2); x.fill()
    }
    const k = 1 + punch(t, T.heart, 1.2, 0.16)
    const pin = easeOutBack(prog(t, T.phone, T.phone + 0.35), 1.6)
    x.save(); x.translate(540, 960); x.scale(k * lerp(0.85, 1, pin), k * lerp(0.85, 1, pin)); x.rotate(-0.05)
    x.fillStyle = INK; x.fillRect(-300, -520, 600, 1040)
    x.fillStyle = '#0b0b10'; x.fillRect(-286, -506, 572, 1012)
    x.fillStyle = '#f4f1ea'; x.fillRect(-262, -470, 524, 940)
    pixFont(x, '2:14 AM', 0, -440, 30, '#2a2833', { shadow: null })
    pixFont(x, 'MEMORIES · MARCH 2021', 0, -380, 28, '#55505e', { shadow: null })
    // the photo: lunch
    x.fillStyle = '#d9d2c4'; x.fillRect(-220, -340, 440, 400)
    bits(x, SANDWICH, 0, -140, 22, SAND_C)
    x.restore()
    return k
  }
  function titleCard(t) {
    x.fillStyle = '#060509'; x.fillRect(0, 0, 1080, 1920)
    const p = prog(t, T.title, T.title + 0.5)
    x.save(); x.globalAlpha = ease.outCubic(p) * (1 - prog(t, T.office - 0.25, T.office))
    x.strokeStyle = '#d8d2c2'; x.lineWidth = 4; x.strokeRect(150, 640, 780, 560)
    x.strokeRect(166, 656, 748, 528)
    pixFont(x, 'The Deep', 540, 830, 150, '#efe7d4', { font: SERIF, weight: 500, italic: true, shadow: null })
    pixFont(x, 'Like', 540, 970, 170, '#efe7d4', { font: SERIF, weight: 500, italic: true, shadow: null })
    pixFont(x, 'A  SCORPIO  MYSTERY', 540, 1110, 34, '#bdb6a6', { shadow: null })
    x.restore()
  }
  function office(t) {
    x.fillStyle = '#2b2620'; x.fillRect(0, 0, 1080, 1920)
    x.fillStyle = '#211d18'; x.fillRect(0, 1380, 1080, 540)
    // the window (rain), left
    x.fillStyle = '#0f0e14'; x.fillRect(40, 300, 260, 420)
    x.save(); x.beginPath(); x.rect(40, 300, 260, 420); x.clip(); city(t); rain(t, 0.8, { n: 60 }); x.restore()
    x.fillStyle = '#4a4038'; x.fillRect(32, 292, 276, 12); x.fillRect(32, 716, 276, 12); x.fillRect(164, 300, 10, 420)
    // the corkboard
    x.fillStyle = INK; x.fillRect(342, 360, 700, 620); x.fillStyle = '#8a6a44'; x.fillRect(352, 370, 680, 600)
    for (let i = 0; i < 70; i++) { x.fillStyle = 'rgba(60,40,20,0.35)'; x.fillRect(360 + h1(i) * 660, 380 + h1(i + 30) * 580, 6, 6) }
    // last week's solved case (rewatch bait)
    card(t, 940, 900, 150, 110, 0.06, 8.4, () => { pixFont(x, '#0007', 0, -26, 20, '#2a2833', { shadow: null }); pixFont(x, 'THE KNOCK', 0, 2, 18, '#2a2833', { shadow: null }); pixFont(x, 'CLOSED', 0, 30, 18, DRED, { shadow: null }) })
    // the "?" suspect card
    const q = card(t, 700, 500, 170, 200, 0.03, T.string[0] - 0.2, () => {
      x.fillStyle = '#3a3640'; x.beginPath(); x.arc(0, -16, 38, 0, Math.PI * 2); x.fill(); x.fillRect(-56, 24, 112, 50)
      pixFont(x, '?', 0, -16, 60, '#efe7d4', { shadow: null })
    })
    const CL = [
      [470, 520, -0.07, () => { bits(x, SANDWICH, 0, -18, 6, SAND_C, { outline: null }); pixFont(x, '♥ 2:14 AM', 0, 50, 24, DRED, { shadow: null }) }],
      [520, 800, 0.05, () => { pixFont(x, 'STORIES', 0, -30, 26, '#2a2833', { shadow: null }); pixFont(x, 'VIEWED:', 0, 4, 26, '#2a2833', { shadow: null }); pixFont(x, 'ALL', 0, 44, 34, DRED, { shadow: null }) }],
      [800, 800, -0.04, () => { pixFont(x, 'TEXTS', 0, -30, 26, '#2a2833', { shadow: null }); pixFont(x, 'SENT:', 0, 4, 26, '#2a2833', { shadow: null }); pixFont(x, '0', 0, 46, 44, DRED, { shadow: null }) }],
    ]
    const pts = CL.map(([cx, cy, rot, f], i) => (card(t, cx, cy, 200, 170, rot, T.clues[i], f), [cx, cy]))
    // the red string, drawn clue → suspect
    const sp = prog(t, ...T.string)
    if (sp > 0 && q) {
      x.save(); x.strokeStyle = RED; x.lineWidth = 5
      pts.forEach(([cx, cy], i) => {
        const p = clamp(sp * 3 - i)
        if (p <= 0) return
        x.beginPath(); x.moveTo(cx, cy - 70); x.lineTo(lerp(cx, 700, p), lerp(cy - 70, 420, p)); x.stroke()
      })
      x.restore()
    }
    // the filing cabinet (the ghost's hiding spot) — the ghost after it
    x.fillStyle = INK; x.fillRect(54, 1040, 172, 360); x.fillStyle = '#5a5248'; x.fillRect(62, 1048, 156, 344)
    for (let j = 0; j < 3; j++) { x.fillStyle = '#3e3830'; x.fillRect(74, 1064 + j * 112, 132, 96); x.fillStyle = '#9a9080'; x.fillRect(122, 1104 + j * 112, 36, 10) }
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
    // the desk edge + lamp
    x.fillStyle = '#3a2e22'; x.fillRect(260, 1300, 820, 40); x.fillStyle = '#2a2018'; x.fillRect(260, 1340, 820, 80)
    // Scorpio, studying the board
    scorpio(t, 800, 1170, 350)
  }
  function card(t, cx, cy, w, h, rot, at, f) {
    const k = easeOutBack(prog(t, at, at + 0.3), 2.2)
    if (k <= 0) return null
    x.save(); x.translate(cx, cy); x.rotate(rot + (1 - k) * 0.4); x.scale(k, k)
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
    x.fillStyle = PAPER; x.fillRect(-w / 2, -h / 2, w, h)
    f()
    x.fillStyle = RED; x.fillRect(-8, -h / 2 - 6, 16, 16)
    x.restore()
    return true
  }
  function alley(t) {
    x.fillStyle = '#0c0b10'; x.fillRect(0, 0, 1080, 1920)
    drawSky(x, t, { ...SKY_H, dim: 0.45 })
    // the back wall + side walls (brick)
    const brick = (x0, y0, w, h, col, mort) => {
      x.fillStyle = mort; x.fillRect(x0, y0, w, h)
      x.fillStyle = col
      for (let j = 0; j * 34 < h; j++) for (let i = -1; i * 76 < w; i++) x.fillRect(x0 + i * 76 + (j % 2) * 38 + 3, y0 + j * 34 + 3, 70, 28)
    }
    x.save(); x.beginPath(); x.rect(0, 0, 1080, 1920); x.clip()
    brick(250, 420, 580, 920, '#2a2228', '#18141a')
    brick(0, 0, 250, 1920, '#332a30', '#1a161c'); brick(830, 0, 250, 1920, '#332a30', '#1a161c')
    x.restore()
    x.fillStyle = 'rgba(0,0,0,0.45)'; x.fillRect(250, 420, 580, 920)
    // fire escape
    x.fillStyle = '#0d0c12'; for (let j = 0; j < 3; j++) { x.fillRect(830, 520 + j * 260, 220, 10); for (let i = 0; i < 6; i++) x.fillRect(840 + i * 36, 470 + j * 260, 6, 50) }
    // the ground + a trash can
    x.fillStyle = '#121118'; x.fillRect(0, 1340, 1080, 580)
    x.fillStyle = INK; x.fillRect(600, 1180, 170, 170); x.fillStyle = '#3e3a46'; x.fillRect(608, 1188, 154, 154); x.fillStyle = '#56525e'; x.fillRect(590, 1170, 190, 22)
    rain(t, 0.7, { n: 90 })
    // the flashlight beam, sweeping onto the Orbiter
    const bp = ease.inOutCubic(prog(t, ...T.beam))
    const tx = lerp(300, 700, bp), ty = lerp(1100, 840, bp) + Math.sin(t * 2) * 6
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(tx, ty, 10, tx, ty, 220)
    g.addColorStop(0, 'rgba(255,248,220,0.55)'); g.addColorStop(1, 'rgba(255,248,220,0)')
    x.fillStyle = 'rgba(255,248,220,0.10)'; x.beginPath(); x.moveTo(330, 1200); x.lineTo(tx - 170, ty - 60); x.lineTo(tx + 170, ty + 60); x.closePath(); x.fill()
    x.fillStyle = g; x.fillRect(tx - 220, ty - 220, 440, 440)
    x.restore()
    // Scorpio, foreground left, flashlight up
    const r = scorpio(t, 230, 1240, 340)
    bits(x, FLASH, r.x + 130, r.y - 20, 8, { L: '#d8d2c2', G: '#4a4652' }, { rot: -0.5 })
    return r
  }
  function orbiterPos(t) {
    if (t < T.orbit) return { x: 700, y: 840 }
    const a = (t - T.orbit) * 2.2, k = ease.inOutQuad(prog(t, T.orbit, T.orbit + 0.8))
    return { x: lerp(700, 400 + Math.cos(a) * 250, k), y: lerp(840, 1150 + Math.sin(a) * 110, k) }
  }
  function desk(t) {
    x.fillStyle = '#2a2018'; x.fillRect(0, 0, 1080, 1920)
    for (let j = 0; j < 30; j++) { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(0, j * 66 + 20, 1080, 6) }
    // the case file
    x.save(); x.translate(470, 820); x.rotate(-0.06)
    x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(-330, -380, 680, 800)
    x.fillStyle = '#c9a86a'; x.fillRect(-340, -400, 680, 800); x.fillStyle = '#b8955a'; x.fillRect(-340, -440, 260, 50)
    pixFont(x, 'CASE #0016', -170, -416, 28, '#3a2a14', { shadow: null })
    pixFont(x, 'THE DEEP LIKE', 0, -300, 54, '#3a2a14', { shadow: null })
    x.fillStyle = PAPER; x.fillRect(-280, -220, 560, 520)
    const ln = ['SUSPECT: THE ORBITER', 'MOTIVE: BOREDOM?', 'TEXTS: 0', 'VIEWS: ALL', 'STATUS:']
    ln.forEach((s, i) => pixFont(x, s, -250, -170 + i * 70, 30, '#2a2833', { shadow: null, align: 'left' }))
    x.restore()
    // the phone, Orbiter profile + BLOCK
    x.save(); x.translate(860, 1300); x.rotate(0.12)
    x.fillStyle = INK; x.fillRect(-170, -300, 340, 600); x.fillStyle = '#f4f1ea'; x.fillRect(-150, -270, 300, 540)
    x.fillStyle = '#d9d2c4'; x.beginPath(); x.arc(0, -150, 70, 0, Math.PI * 2); x.fill()
    pixFont(x, 'the_orbiter', 0, -40, 28, '#2a2833', { shadow: null })
    x.restore()
  }
  function deskColor(t) {
    // the stamp + the BLOCK button (colour, drawn after the grey pass)
    const sk = prog(t, T.stamp - 0.12, T.stamp)
    if (t >= T.stamp - 0.12) {
      const sc = t < T.stamp ? lerp(2.2, 1, ease.inQuad(sk)) : 1 + 0.06 * Math.exp(-(t - T.stamp) * 10) * Math.cos((t - T.stamp) * 40)
      x.save(); x.translate(470, 1010); x.rotate(-0.16); x.scale(sc, sc); x.globalAlpha = t < T.stamp ? sk : 0.92
      x.strokeStyle = RED; x.lineWidth = 12; x.strokeRect(-280, -80, 560, 160)
      pixFont(x, 'CASE CLOSED', 0, 4, 76, RED, { shadow: null })
      x.restore()
    }
    const pressed = t >= T.block
    const bk = 1 - 0.12 * Math.sin(Math.PI * prog(t, T.block - 0.1, T.block + 0.1))
    x.save(); x.translate(860, 1300); x.rotate(0.12); x.translate(0, 120); x.scale(bk, bk)
    x.fillStyle = pressed ? '#2a2833' : RED; x.fillRect(-120, -40, 240, 80)
    pixFont(x, pressed ? 'BLOCKED ✓' : 'BLOCK', 0, 2, pressed ? 32 : 40, '#ffffff', { shadow: null })
    x.restore()
    burst(x, t, 860 - 14, 1418, T.block, 10, 120, [RED, '#ffffff', GOLD])
  }
  function door(t) {
    // the frosted door swings shut across the frame
    const p = ease.inQuad(prog(t, ...T.door)), wob = t > T.door[1] ? 10 * Math.exp(-(t - T.door[1]) * 9) * Math.sin((t - T.door[1]) * 50) : 0
    if (p <= 0) return
    const w = 1080 * p
    x.save(); x.translate(wob, 0)
    x.fillStyle = '#3a2e22'; x.fillRect(1080 - w, 0, w, 1920)
    x.fillStyle = '#9aa0a8'; x.fillRect(1080 - w + 90 * p, 300, 900 * p, 820)
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(1080 - w + 110 * p, 320, 860 * p, 780)
    if (p > 0.7) {
      x.save(); x.translate(1080 - w + 540 * p, 640); x.scale(p, 1)
      pixFont(x, 'S. SCORPIO', 0, 0, 70, '#1a1920', { shadow: null })
      pixFont(x, 'PRIVATE EYE', 0, 90, 46, '#1a1920', { shadow: null })
      x.restore()
    }
    x.fillStyle = '#c9a46a'; x.fillRect(1080 - w + 120 * p, 1240, 40, 40)
    x.restore()
  }
  function grey(k) {
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = k; x.fillStyle = '#808080'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }
  function vignette(k) {
    const g = x.createRadialGradient(540, 960, 500, 540, 960, 1250)
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${0.7 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  }
  function blinds(k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = 0.34 * k; x.fillStyle = '#000'
    x.translate(540, 960); x.rotate(-0.42)
    for (let i = -18; i < 18; i++) x.fillRect(-1400, i * 110, 2800, 46)
    x.restore()
  }
  // ─────────── the typewriter V.O. box
  function voBox(t) {
    const open = easeOutBack(prog(t, T.boxOpen, T.boxOpen + 0.3), 1.8), shut = 1 - ease.inCubic(prog(t, T.boxClose, T.boxClose + 0.25))
    const k = open * shut
    if (k <= 0) return
    let n = -1
    for (let i = 0; i < LINES.length; i++) if (t >= LINES[i].t) n = i
    x.save(); x.translate(540, 1600); x.rotate(-0.035); x.scale(k, k)
    x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(-462, -122, 940, 262)
    x.fillStyle = INK; x.fillRect(-476, -136, 952, 272)
    x.fillStyle = PAPER; x.fillRect(-468, -128, 936, 256)
    x.fillStyle = 'rgba(120,100,70,0.12)'; for (let j = 0; j < 6; j++) x.fillRect(-468, -96 + j * 40, 936, 2)
    // the tag
    x.fillStyle = '#1a1920'; x.fillRect(-468, -178, 420, 48)
    pixFont(x, VO, -448, -153, 26, PAPER, { align: 'left', shadow: null })
    if (n >= 0) {
      const rows = ROWS[n], cw = 25.4, rowsH = rows.length * 64
      let last = null
      rows.forEach((row, j) => {
        const y0 = -rowsH / 2 + 32 + j * 64
        row.forEach((c, i) => {
          if (t < c.t) return
          x.font = `700 42px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
          x.fillStyle = c.acc ? DRED : '#1f1b24'
          x.fillText(c.ch, -430 + i * cw, y0 + (h1(i * 7 + j + n) - 0.5) * 3)
          last = [-430 + (i + 1) * cw, y0]
        })
      })
      const done = t >= TIMES[n].done
      if (last && !done && Math.floor(t * 6) % 2 === 0) { x.fillStyle = '#1f1b24'; x.fillRect(last[0] + 2, last[1] - 20, 18, 40) }
      if (done && Math.floor(t * 2.5) % 2 === 0) pixFont(x, '▼', 430, 96, 28, DRED, { shadow: null })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sc = scene(t)
      const colorK = clamp(prog(t, ...T.color)), ok = popOut(t, T.out)
      let zoom = 0, phone = null
      x.save()
      if (sc === 'street') {
        phone = street(t, colorK)
        rain(t, 1 - prog(t, ...T.dry))
      } else if (sc === 'phone') {
        zoom = phoneInsert(t)
      } else if (sc === 'title') {
        titleCard(t); rain(t, 0.6)
      } else if (sc === 'office') {
        office(t); blinds(1)
      } else if (sc === 'alley') {
        const zk = 1 + punch(t, T.found, 1.3, 0.22)
        x.translate(700, 840); x.scale(zk, zk); x.translate(-700, -840)
        alley(t)
      } else if (sc === 'desk') {
        desk(t)
      }
      x.restore()
      if (sc === 'desk') door(t)
      grey(1 - colorK)
      if (sc === 'desk') { x.save(); x.globalAlpha = 1 - prog(t, T.door[0], T.door[0] + 0.35); deskColor(t); x.restore() }
      // colour accents, after the grey pass
      if (sc === 'phone') {
        x.save(); x.translate(540, 960); x.scale(zoom, zoom); x.rotate(-0.05)
        const hk = easeOutBack(prog(t, T.heart, T.heart + 0.35), 3)
        bits(x, HEART, -190, 150, 10 * Math.max(0.01, hk), { X: RED })
        pixFont(x, 'liked your photo', -130, 150, 32, '#2a2833', { shadow: null, alpha: clamp(hk), align: 'left' })
        x.fillStyle = '#c9c2b4'; x.beginPath(); x.arc(-180, 290, 46, 0, Math.PI * 2); x.fill()
        pixFont(x, '?', -180, 290, 52, '#f4f1ea', { shadow: null })
        pixFont(x, 'liked by ???', -110, 290, 30, '#55505e', { shadow: null, align: 'left' })
        x.restore()
      }
      if (sc === 'alley') {
        const zk = 1 + punch(t, T.found, 1.3, 0.22), o = orbiterPos(t)
        x.save(); x.translate(700, 840); x.scale(zk, zk); x.translate(-700, -840)
        const r = drawSatellite(x, o.x, o.y, 230, t, { mood: t < T.found ? 'neutral' : t < T.found + 1 ? 'wide' : 'neutral', look: [-1, 0.5] })
        if (t > T.dots && t < T.orbit) {
          const dk = easeOutBack(prog(t, T.dots, T.dots + 0.25), 2)
          x.save(); x.translate(r.x + 120, r.top - 30); x.scale(dk, dk)
          x.fillStyle = INK; x.fillRect(-74, -40, 148, 80); x.fillStyle = PAPER; x.fillRect(-66, -32, 132, 64)
          for (let i = 0; i < 3; i++) if ((t - T.dots) * 3 > i) { x.fillStyle = '#2a2833'; x.fillRect(-42 + i * 34, -6, 16, 16) }
          x.restore()
        }
        x.restore()
      }
      if (phone) {
        // the notification over the phone: a red ♥ from 2021, later BLOCKED ✓
        const after = t >= T.street, bk = after ? easeOutBack(prog(t, T.street + 0.2, T.street + 0.5), 2) : 1
        x.save(); x.translate(phone.px + 40, phone.py - 150); x.rotate(0.04); x.scale(bk, bk)
        x.fillStyle = INK; x.fillRect(-112, -42, 224, 84); x.fillStyle = after ? '#f4f1ea' : '#fff1f3'; x.fillRect(-104, -34, 208, 68)
        x.fillStyle = INK; x.fillRect(-30, 34, 24, 18); x.fillStyle = after ? '#f4f1ea' : '#fff1f3'; x.fillRect(-26, 30, 16, 16)
        if (after) pixFont(x, 'BLOCKED ✓', 0, 2, 30, '#1f9a4a', { shadow: null })
        else { bits(x, HEART, -62, 0, 6, { X: RED }); pixFont(x, '2021', 26, 2, 36, RED, { shadow: null }) }
        x.restore()
      }
      vignette(sc === 'title' ? 0.4 : 1 - 0.5 * colorK)
      x.save(); x.globalAlpha = 1 - ok
      if (ok < 1) { drawSky(x, t, SKY_H); drawSeedConstellation(x, t, 100, { alpha: 0.55 }) }
      x.restore()
      voBox(t)
      drawDayChip(x, t, { day: 26, phase: 'morning' })
      hook.update(t)
      LAST.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 13.2 (office → alley), 20.4 (alley → the desk). cardfx keeps the second.
const CUTS = [{ t: 13.2, kind: 'flip' }, { t: 20.4, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E16' }), cardCuts(CUTS)]

// ── sound: typewriter keys + a carriage-return ding per V.O. line, noir stings on the reveal and the stamp
const typeCues = () => {
  const out = []
  LINES.forEach((L, n) => {
    const cs = [...L.text.replace(/\*/g, '')]
    cs.forEach((ch, i) => { if (ch !== ' ' && i % 2 === 0) out.push(['tick', TIMES[n].chars[i], 0.022 + 0.008 * ((i * 7) % 3)]) })
    out.push(['bell', r3(TIMES[n].done + 0.05), 2093, 0.018, 0.5, 0.3])
  })
  return out
}
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['whoosh', T.phone - 0.12, 0.3, 0.04], ['pop', T.phone, 739.99, 0.04, 0],
  ['pop', T.heart, 1318.51, 0.05, 0], ['bell', T.heart + 0.03, 1760, 0.03, 1.2, 0],
  ['boom', T.title, 0.3], ['tick', T.title + 0.02, 0.05],
  ['whoosh', T.office - 0.1, 0.3, 0.03],
  ...T.clues.flatMap(c => [['tick', c, 0.09], ['pop', r3(c + 0.03), 587.33, 0.04, 0.2]]),
  ['riser', T.string[0], T.string[1], 0.05],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.beam[0], 0.6, 0.04],
  ...stingerCues(T.found, { key: KEY, kind: 'noir' }),
  ...[0, 1, 2].map(i => ['pop', r3(T.dots + i / 3), 880, 0.02, 0.3]),
  ['whoosh', T.orbit, 0.5, 0.03],
  ['tick', T.stamp - 0.02, 0.14], ['boom', T.stamp, 0.35],
  ...stingerCues(T.stamp + 0.05, { key: KEY, kind: 'noir' }),
  ['tick', T.block, 0.08], ['pop', T.block + 0.02, 1174.66, 0.05, 0.4], ['glitter', T.block, T.block + 0.5],
  ['whoosh', T.door[0], 0.5, 0.05], ['boom', T.door[1], 0.4], ['tick', T.door[1], 0.12],
  ['swell', T.color[0], T.color[1] - 0.5, { gain: 0.03 }],
  ...wordPops(T.last, 1, 0.1, 0, 0.03), ['pop', T.lastLand, 1174.66, 0.055, 0], ['bell', T.lastLand + 0.04, 1567.98, 0.03, 1.4, 0],
  ['glitter', T.comet, T.comet + 0.8],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...typeCues(),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawPixelStar; void outK; void rgba; void INTER; void BONE; void pop01
