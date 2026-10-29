// st9leowork (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E22: Leo · 9 TO 5) · story 0–20.6, then the
// shared end card.
//   0.00  frame 0: Leo's desk (working from home), 8:58 AM, ring light on, Leo already bowing into a spotlight in front of
//         the laptop. Hook: "A Leo presents the report like it's the *Oscars*."
//   2.70  the clock rolls to 9:00; the meeting grid pops up (five coworkers, sleepy). "9:00 AM — the quarterly *report*."
//   5.00  it becomes an awards show: red curtains drop on the grid, the spotlight, a drumroll, a gold envelope.
//   8.10  the envelope opens: "THE TEAM". LEO: "and this award goes to… the *team.*"  Then the thank-you speech actually names
//         everyone; each coworker's tile lights gold as Leo names them (Virgo, Cap, Gemini, Taurus, Pisces).
//  11.20  ★ ASTROLOGY SAYS: Leo is the natural ruler of the 5th house (creativity, play, romance).
//  17.90  the last line, back on frame 0's bow, but now every tile has its own spotlight: "Lead *warm*."
//   The ghost leans out from behind the LEO LIVE poster (6.2). Rewatch bait: Taurus is asleep in its tile until named,
//   and the sunflower on the desk is taller than this morning's bud.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawLeoHome, leoSpots, drawLeoStar } from '../../st9leohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, cheers, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 25
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const LEON = '♌ LEO'
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.6, ff1: [2.3, 0.4], grid: 2.75, st1: 2.95, st1Out: 4.85,
  curtain: [5.0, 5.5], spot: 5.3, env: 6.1, roll: [6.4, 8.0], open: 8.05, card: 8.1,
  box: 8.2, l1: 8.35, l2: 11.1, l3: 14.7, close: 17.75,
  fact: 11.2, factDur: 3.3, ghost: 6.2,
  ff2: [17.8, 0.5], last: 17.95, lastOut: [20.25, 20.55], spots: 17.9,
}
const LINES = [
  { t: T.l1, speaker: LEON, text: 'and this award goes to… the *team.*', color: '#ffc27a' },
  { t: T.l2, speaker: LEON, text: 'Virgo fixed my slides. Cap kept us on *time.*', color: '#ffc27a' },
  { t: T.l3, speaker: LEON, text: 'Gemini, Taurus, Pisces: you made it *fun.*', color: '#ffc27a' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
/** when a word starts typing in line n */
function wordAt(n, word) { const plain = LINES[n].text.replace(/\*/g, ''); const i = plain.indexOf(word); return LT[n].chars[Math.max(0, i)] }
const TEAM = [
  { id: 'virgo', name: 'VIRGO', at: wordAt(1, 'Virgo') },
  { id: 'capricorn', name: 'CAP', at: wordAt(1, 'Cap') },
  { id: 'gemini', name: 'GEMINI', at: wordAt(2, 'Gemini') },
  { id: 'taurus', name: 'TAURUS', at: wordAt(2, 'Taurus') },
  { id: 'pisces', name: 'PISCES', at: wordAt(2, 'Pisces') },
]
const HOPS = [...talkHops(LINES, LEON, { cps: CPS }), 0.15, T.spot, T.card]

const GRID = { x: 90, y: 400, w: 900, h: 560 }
const TILES = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]].map(([c, r]) => ({ x: GRID.x + 18 + c * 292, y: GRID.y + 64 + r * 244, w: 276, h: 228 }))
const LEO0 = { x: 540, y: 1215, size: 330 }
const HIDE = leoSpots('desk').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where }
const SHOTS = [
  { t: 0, x: 540, y: 1000, s: 1.06 },
  { t: T.grid, x: 540, y: 960, s: 1 },
  { t: T.spot, x: 540, y: 1000, s: 1.05 },
  { t: T.card, x: 560, y: 1040, s: 1.08 },
  { t: T.l2 - 0.1, x: 540, y: 940, s: 1.03 },
  { t: T.l3 - 0.1, x: 540, y: 920, s: 1.06 },
  { t: T.spots, x: 540, y: 1000, s: 1.06 },
]

function leoState(t) {
  if (t < T.grid) return { mood: 'happy', look: [0, 1], squash: 0.1 * Math.sin(Math.PI * clamp(t / 1.2)) }
  if (t < T.curtain[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.card) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.l1 + 1.6) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.last) return { mood: 'happy', look: [0, -1] }
  return { mood: 'happy', look: [0, 1], squash: 0.1 * Math.sin(Math.PI * clamp((t - T.last) / 1.2)) }
}
function mateState(m, t) {
  if (t >= m.at) return { mood: t < m.at + 1.6 ? 'heart' : 'happy' }
  if (t >= T.curtain[0]) return { mood: 'wide', blink: false }
  if (m.id === 'taurus') return { mood: 'sleepy' }
  return { mood: 'neutral', look: [0, 0] }
}

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
function spotCone(x, cx, top, bot, w0, w1, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a
  const g = x.createLinearGradient(0, top, 0, bot); g.addColorStop(0, 'rgba(255,240,200,0.55)'); g.addColorStop(1, 'rgba(255,240,200,0.08)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - w0 / 2, top); x.lineTo(cx + w0 / 2, top); x.lineTo(cx + w1 / 2, bot); x.lineTo(cx - w1 / 2, bot); x.closePath(); x.fill()
  x.restore()
}
function drawGrid(x, t, k) {
  if (k <= 0) return
  x.save(); x.translate(540, GRID.y + GRID.h / 2); x.scale(k, k); x.translate(-540, -(GRID.y + GRID.h / 2))
  R(x, GRID.x - 8, GRID.y - 8, GRID.w + 16, GRID.h + 16, INK)
  R(x, GRID.x, GRID.y, GRID.w, GRID.h, '#16122a')
  R(x, GRID.x, GRID.y, GRID.w, 48, '#2b2440')
  x.font = `700 24px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillStyle = '#ff3b4f'; x.fillRect(GRID.x + 18, GRID.y + 18, 14, 14)
  x.fillStyle = BONE; x.fillText('Q3 REVIEW · 6 IN CALL', GRID.x + 44, GRID.y + 26)
  TILES.forEach((tl, i) => {
    const lit = i < 5 && t >= TEAM[i].at
    R(x, tl.x - 4, tl.y - 4, tl.w + 8, tl.h + 8, lit ? GOLD : '#3a3358')
    R(x, tl.x, tl.y, tl.w, tl.h, '#231c3c')
    if (i === 5) {   // the shared slide: a bar chart that only goes up (no numbers)
      R(x, tl.x + 16, tl.y + 16, tl.w - 32, tl.h - 32, '#f4ecd6')
      x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('Q3 REPORT', tl.x + tl.w / 2, tl.y + 40)
      ;[0.3, 0.45, 0.62, 0.85].forEach((h, j) => R(x, tl.x + 46 + j * 48, tl.y + tl.h - 30 - h * 120, 32, h * 120, ['#ef5c94', '#2fc79a', '#38c4ec', '#f39a3a'][j]))
      return
    }
    const m = TEAM[i], st = signStar(m.id)
    if (lit) spotCone(x, tl.x + tl.w / 2, tl.y, tl.y + tl.h, 40, tl.w * 0.9, 0.9)
    x.save(); x.beginPath(); x.rect(tl.x, tl.y, tl.w, tl.h); x.clip()
    drawStarChar(x, tl.x + tl.w / 2, tl.y + tl.h / 2 + 4, 136, t, { color: st.color, glyph: null, ...mateState(m, t), seed: 11 + i, glow: 0.6, hops: [m.at] })
    x.restore()
    R(x, tl.x + 8, tl.y + tl.h - 34, 22 + m.name.length * 14, 28, 'rgba(10,6,24,0.8)')
    x.fillStyle = lit ? GOLD : BONE; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillText(`${st.glyph} ${m.name}`, tl.x + 14, tl.y + tl.h - 19)
  })
  // the awards-show curtains drop over the grid's sides and top
  const cp = ease.outBounce ? ease.outCubic(prog(t, ...T.curtain)) : prog(t, ...T.curtain)
  if (cp > 0) {
    const drop = lerp(-GRID.h, 0, cp)
    for (const side of [0, 1]) {
      const cx0 = side ? GRID.x + GRID.w - 6 : GRID.x - 78
      R(x, cx0 - 6, GRID.y + drop - 6, 96, GRID.h + 12, INK); R(x, cx0, GRID.y + drop, 84, GRID.h, '#c8363f')
      for (let i = 0; i < 84; i += 24) R(x, cx0 + i + 8, GRID.y + drop, 8, GRID.h, '#8c2232')
    }
    R(x, GRID.x - 30, GRID.y - 30 + drop * 0.3, GRID.w + 60, 50, INK); R(x, GRID.x - 24, GRID.y - 24 + drop * 0.3, GRID.w + 48, 38, '#c8363f')
    for (let i = 0; i < GRID.w + 48; i += 36) R(x, GRID.x - 24 + i, GRID.y + 8 + drop * 0.3, 18, 10, GOLD)
  }
  x.restore()
}
function envelope(x, t, cx, cy) {
  const p = pop01(t, T.env, 0.35, 2.2)
  if (p <= 0 || t > T.l2) return
  const out = 1 - prog(t, T.l2 - 0.4, T.l2)
  const open = prog(t, T.card - 0.1, T.card + 0.3)
  x.save(); x.translate(cx, cy + Math.sin(t * 4) * 4); x.scale(p * out, p * out); x.rotate(-0.06)
  if (open > 0) {    // the card slides up
    const cyc = -215 * ease.outBack(open)
    R(x, -126, cyc - 76, 252, 150, INK); R(x, -120, cyc - 70, 240, 138, '#fff6e0')
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AND THE WINNER IS', 0, cyc - 40)
    x.fillStyle = '#c8363f'; x.font = `700 40px ${MONO}`; x.fillText('THE TEAM', 0, cyc + 10)
  }
  R(x, -136, -86, 272, 172, INK); R(x, -130, -80, 260, 160, GOLD)
  x.fillStyle = '#c98a1f'; x.beginPath(); x.moveTo(-130, -80); x.lineTo(0, open > 0 ? -150 : 10); x.lineTo(130, -80); x.closePath(); x.fill()
  R(x, -16, -14, 32, 32, '#c8363f')
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Leo presents the report like it’s the *Oscars*.', at: 0, out: T.hookOut, top: 270, size: 90, accentSize: 132 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '9:00 AM', text: 'the quarterly *report.*' })
  const box = dialogueBox(root, { lines: LINES, y: 1540, width: 960, height: 250, open: T.box, close: T.close, cps: CPS })
  const last = lastLine(root, 'Lead *warm.*', { at: T.last, lateAt: T.last + 0.35, top: 300, size: 140, accentSize: 210, late: 1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawLeoHome(x, t, { room: 'desk', ep: 'work', sky: skyIn(t, 9), light: 0.4, ring: 1 })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 4 })
      const endK = ease.inOutCubic(prog(t, T.last - 0.2, T.last + 0.3))
      const gk = t < T.grid ? 0 : pop01(t, T.grid, 0.35, 1.8) * lerp(1, 0.78, endK)
      x.save(); x.translate(0, 80 * endK); drawGrid(x, t, gk); x.restore()
      // the spotlight on Leo (frame 0 and the awards show) — and at the end, on everyone
      const sp = t < T.grid ? 1 : t < T.spot ? 0 : clamp((t - T.spot) / 0.3)
      spotCone(x, LEO0.x, 0, LEO0.y + 200, 120, 520, sp * 0.8)
      const ok = popOut(t, [20.2, 20.55])
      const r = drawLeoStar(x, LEO0.x, LEO0.y, LEO0.size, t, { ...leoState(t), hops: HOPS, seed: 4, pop: ok })
      envelope(x, t, LEO0.x + 190, LEO0.y - 150)
      sparkles(x, t, LEO0.x + 190, LEO0.y - 280, T.card + 0.05, 12, 150, 0.6)
      for (const m of TEAM) { const i = TEAM.indexOf(m), tl = TILES[i]; sparkles(x, t, tl.x + tl.w / 2, tl.y + tl.h / 2, m.at, 8, 90, i) }
      if (t > T.grid + 0.6 && t < T.curtain[0]) pixelBubble(x, r.x - 210, r.top - 30, 'slide 1 of 1', { size: 26, alpha: pop01(t, T.grid + 0.6, 0.25) })
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.74 })
      if (t < T.ff2[0]) drawClock(x, t, { from: '8:58', to: '9:00', at: T.ff1[0], dur: T.ff1[1], sign: 'leo' })
      else drawClock(x, t, { from: '9:00', to: '9:30', at: T.ff2[0], dur: T.ff2[1], sign: 'leo' })
      factChip(x, t, { text: 'Leo is the natural ruler of the 5th house: creativity, play, romance.', at: T.fact, dur: T.factDur, y: 1040, label: '★ ASTROLOGY SAYS', w: 820, size: 32 })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.grid, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E22' }), cardCuts(CUTS)]

const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66]
const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
const roll = []
for (let tt = T.roll[0]; tt < T.roll[1]; tt += lerp(0.12, 0.05, (tt - T.roll[0]) / (T.roll[1] - T.roll[0]))) roll.push(['tom', r3(tt), 140, { ...FX, gain: 0.12, decay: 0.12 }])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(T.ff1[0], T.ff1[1]),
  ['pop', T.grid, 880, 0.045, 0], ['tick', T.grid + 0.05, 0.05],
  ...stampCues(T.st1),
  ['whoosh', T.curtain[0], 0.4, 0.04], ['boom', T.curtain[1], 0.06], ['tick', T.spot, 0.1], ['crash', T.spot, { gain: 0.04, len: 1.6 }],
  ['pop', T.env, 987.77, 0.04, 0.3],
  ...roll, ['crash', T.card, { gain: 0.07, len: 2.2 }], ['boom', T.card, 0.08], ['glitter', T.card, T.card + 0.8],
  ...cheers(T.card + 0.05, T.card + 1.3, 0.05),
  ['pop', T.box, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 740 } }),
  ...TEAM.map((m, i) => ['bell', r3(m.at), NOTE[(i + 2) % NOTE.length] * 2, 0.025, 0.8, (i - 2) * 0.3]),
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['tick', T.ghost + 0.05, 0.015],
  ...clockCues(T.ff2[0], T.ff2[1]),
  ['pop', T.last, 880, 0.04, 0], ['pop', r3(T.last + 0.35), 1174.66, 0.05, 0], ['pluck', r3(T.last + 0.35), 1174.66, 0.045, 0.6, 0],
  ...cheers(T.last + 0.4, T.last + 1.6, 0.045),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE
