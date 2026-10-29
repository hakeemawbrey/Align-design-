// st9sagwork (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E42) · story 0–20.6, then the end card.
//   9 TO 5 with Sagittarius, working from the desk at home (../../st9saghome.js, ep 'work': four pins, two postcards).
//   "A Sag at work: ‘what if the office was in *Lisbon*?’"  The vlog camera is the laptop: a video call runs along the
//   floor of the set (three coworker tiles: Capricorn, Gemini, Virgo).
//   0.00  Frame 0: Sag mid-pitch, marker up, the whiteboard already says LISBON?! with a big arrow.
//   2.95  Ideas burst onto the board (4-DAY WEEK ON A BOAT · OFFSITE: THE MOON? · A PODCAST?? · LEARN PORTUGUESE BY FRI)
//         and an IDEAS / TICKETS counter climbs. 10:15 AM — 37 ideas, 0 tickets.
//   7.60  CAP (tile): "love it. what’s step *one?*"  Gasp zoom: Sag freezes. "step… *one?*"
//  10.70  ★ ASTROLOGY SAYS: Sagittarius is the natural ruler of the 9th house (travel, learning, big ideas).
//         The eraser wipes the board down to one circled idea.
//  13.60  time-skip whip → 4:58 PM: a three-line checklist, step 1 ticked (rewatch bait: "3. pack · (already packed)").
//  17.10  Rhymes with frame 0: Sag points the marker at the board again — now at STEP 1 ✓.
//         LAST: "Big ideas. *Small* steps."   (The ghost leans out past the whiteboard’s left edge at 15.0.)
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawGaspLines } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { SAG, SAG_SPOTS, drawSagHome, drawSagHomeFront, drawSag, R, blk, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'

export const DURATION = 25
const KEY = 'Bm'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', ORANGE = '#ffb36a'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAPS = signStar('capricorn'), GEM = signStar('gemini'), VIR = signStar('virgo')

const T = {
  hookOut: 2.8, ideas: 2.95, ask: 7.6, gasp: 9.25, fact: 10.7, wipe: [11.0, 12.0],
  skip: 13.6, list: 14.0, ghost: 15.0, point: 17.1, last: 17.55, out: [20.15, 20.55],
}
const B = [
  { at: 3.0, out: 5.6, x: 790, y: 870, text: 'ok. hear me *out.*', tag: SAG.tag, tagColor: SAG.color, w: 480, tailX: 0.75 },
  { at: 7.6, out: 9.9, x: 300, y: 1330, text: 'love it. what’s step *one?*', tag: '♑ CAP', tagColor: CAPS.color, w: 560, tailX: 0.2 },
  { at: 9.35, out: 10.6, x: 790, y: 870, text: 'step… *one?*', tag: SAG.tag, tagColor: SAG.color, w: 400, tailX: 0.75 },
]
const STAMPS = [
  { at: 5.8, out: 7.5, time: '10:15 AM', text: '37 ideas. *0* tickets.' },
  { at: 14.2, out: 16.9, time: '4:58 PM', text: 'one thing *shipped.*' },
]
const FACT = { at: T.fact, dur: 2.5, text: 'Sagittarius is the natural ruler of the 9th house (travel, learning, big ideas).', label: '★ ASTROLOGY SAYS', y: 1200 }
const LAST = 'Big ideas. *Small* steps.'
const CLOCK = [
  { t: 0, from: '9:00', to: '10:15', at: 2.95, dur: 2.6, ampm: 'AM' },
  { t: T.skip, from: '10:15 AM', to: '4:58 PM', at: T.skip + 0.05, dur: 0.9 },
]
// the whiteboard: ideas pop on, then the eraser wipes all but the first; the checklist replaces them
const BOARD = { x0: 120, y0: 650, x1: 720, y1: 1010 }
const IDEAS = [
  { at: -1, text: 'LISBON?!', x: 300, y: 740, size: 66, col: '#e0384f', rot: -0.06, keep: true },
  { at: 3.3, text: '4-DAY WEEK ON A BOAT', x: 330, y: 840, size: 30, col: '#2c5f9f', rot: 0.04 },
  { at: 3.85, text: 'OFFSITE: THE MOON?', x: 290, y: 900, size: 30, col: '#2f8a4f', rot: -0.05 },
  { at: 4.4, text: 'A PODCAST??', x: 590, y: 800, size: 30, col: '#7a3fd0', rot: 0.08 },
  { at: 4.9, text: 'LEARN PORTUGUESE BY FRI', x: 330, y: 960, size: 26, col: '#e0384f', rot: -0.02 },
  { at: 5.3, text: 'NAP PODS', x: 560, y: 905, size: 28, col: '#2c5f9f', rot: 0.1 },
]
const LIST = [
  { at: T.list + 0.1, text: '1. book one room', tick: T.list + 0.9 },
  { at: T.list + 0.5, text: '2. ask the team' },
  { at: T.list + 0.9, text: '3. pack  (already packed)' },
]
export const GHOST = { at: T.ghost, ...SAG_SPOTS.desk }
const TILES = [
  { x: 120, who: '♑ CAP', s: CAPS, mood: t => (t > T.ask && t < T.ask + 2.2 ? 'squint' : t > T.point ? 'happy' : 'neutral') },
  { x: 400, who: '♊ GEM', s: GEM, mood: t => (t < T.ask ? 'sparkle' : t > T.point ? 'happy' : 'wide') },
  { x: 680, who: '♍ VIRGO', s: VIR, mood: t => (t < T.ask ? 'wide' : t > T.list ? 'happy' : 'neutral') },
]

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

function marker(x, cx, cy, rot, col = '#e0384f') {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -10, -60, 20, 96); R(x, BONE, -6, -56, 12, 70); R(x, col, -6, 14, 12, 18); R(x, INK, -4, 32, 8, 10)
  x.restore()
}
function boardText(x, t, s, alpha = 1) {
  const k = popIn(t, s.at, 0.28, 2.2)
  if (k <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha = alpha; x.translate(s.x, s.y); x.rotate(s.rot); x.scale(k, k)
  x.font = `800 ${s.size}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = s.col
  x.fillText(s.text, 0, 0)
  if (s.keep) {        // the big arrow (and later the circle)
    R(x, s.col, -150, s.size * 0.62, 300, 8)
  }
  x.restore()
}
function whiteboard(x, t) {
  const wp = prog(t, ...T.wipe), { x0, y0, x1, y1 } = BOARD
  const wipeX = lerp(x0 - 40, x1 + 40, ease.inOutQuad(wp))
  if (t < T.skip) {
    for (const s of IDEAS) {
      if (!s.keep && t > T.wipe[0]) { x.save(); x.beginPath(); x.rect(wipeX, y0, x1 + 60 - wipeX, y1 - y0); x.clip(); boardText(x, t, s); x.restore() }
      else boardText(x, t, s)
    }
    // the counter in the board's corner
    const n = 1 + Math.floor(clamp((t - T.ideas) / 2.6) * 36)
    x.font = `700 22px ${MONO}`; x.fillStyle = '#555'; x.textAlign = 'right'
    x.fillText(`IDEAS: ${t < T.ideas ? 1 : n}  TICKETS: 0`, x1 - 14, y1 - 16); x.textAlign = 'left'
    if (wp > 0 && wp < 1) { blk(x, wipeX - 40, 840, 80, 50, '#3a76aa', { o: 5 }); R(x, '#cfc6b4', wipeX - 40, 878, 80, 12) }
    // the circle round LISBON?! once the board is clear
    const cp = prog(t, T.wipe[1], T.wipe[1] + 0.5)
    if (cp > 0) {
      x.save(); x.strokeStyle = '#e0384f'; x.lineWidth = 8; x.beginPath(); x.ellipse(300, 745, 190, 70, -0.06, -0.5, -0.5 + cp * Math.PI * 2.1); x.stroke(); x.restore()
    }
  } else {
    x.font = `800 40px Inter`; x.fillStyle = '#2c5f9f'; x.fillText('LISBON: STEP BY STEP', 150, 720)
    R(x, '#2c5f9f', 150, 736, 440, 6)
    for (const l of LIST) {
      const k = popIn(t, l.at, 0.25, 2)
      if (k <= 0.01) continue
      const yy = 800 + LIST.indexOf(l) * 66
      x.save(); x.globalAlpha = clamp(k); x.font = `700 32px Inter`; x.fillStyle = '#2b2440'; x.fillText(l.text, 210, yy); x.restore()
      R(x, '#2b2440', 160, yy - 30, 32, 32); R(x, BONE, 164, yy - 26, 24, 24)
      if (l.tick && t > l.tick) { const tk = popIn(t, l.tick, 0.25, 2.6); x.save(); x.translate(176, yy - 14); x.scale(tk, tk); x.font = `800 44px Inter`; x.fillStyle = '#2f8a4f'; x.textAlign = 'center'; x.fillText('✓', 0, 14); x.restore() }
    }
    const sp = popIn(t, T.point, 0.3, 2.6)
    if (sp > 0.02) { x.save(); x.translate(330, 975); x.rotate(-0.08); x.scale(sp, sp); blk(x, -110, -28, 220, 56, '#2f8a4f', { o: 5 }); x.font = `800 30px Inter`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STEP 1 ✓', 0, 2); x.restore() }
  }
  x.textAlign = 'left'; x.textBaseline = 'alphabetic'
}
/** the call strip along the floor: three coworker tiles + a MEETING bar */
function callStrip(x, t) {
  const y = 1318
  R(x, 'rgba(10,8,26,0.92)', 70, y - 34, 940, 30)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#ff5d73'; x.fillText('●', 86, y - 12); x.fillStyle = BONE
  x.fillText(t < T.skip ? 'STANDUP · 4 PEOPLE · 01:12:40' : 'WRAP-UP · 4 PEOPLE · 00:09:12', 112, y - 12)
  for (const tl of TILES) {
    const talking = tl.who === '♑ CAP' && t > T.ask && t < T.ask + 1.4
    blk(x, tl.x, y, 260, 150, '#221a3e', { o: 5, ink: talking ? '#7dffb8' : INK })
    x.save(); x.beginPath(); x.rect(tl.x, y, 260, 150); x.clip()
    drawStarChar(x, tl.x + 130, y + 92, 120, t, { color: tl.s.color, glyph: null, mood: tl.mood(t), seed: tl.x, glow: 0.5, hops: tl.who === '♑ CAP' ? [T.ask + 0.2, T.ask + 0.7] : [] })
    x.restore()
    R(x, 'rgba(10,8,26,0.85)', tl.x + 6, y + 118, 120, 26); x.font = `700 18px ${MONO}`; x.fillStyle = BONE; x.fillText(tl.who, tl.x + 14, y + 137)
  }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 66px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Sag at work: ‘what if the office was in *Lisbon?*’', at: 0, out: T.hookOut, accentColor: ORANGE, size: 76, accentSize: 116 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: ORANGE, top: 1560 }))
  const last = popText(root, LAST, { top: 290, size: 100, accentSize: 156, at: T.last, gap: 0.09, accentColor: ORANGE, wobble: true, late: 2, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: t < T.skip ? lerp(9.5, 11, t / T.skip) : 17 })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z = gaspZoom(t, { at: T.gasp, dur: 1.3, x: 790, y: 980, amount: 0.35, follow: 0.5 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z.apply(x)
      drawSagHome(x, t, { room: 'desk', ep: 'work' })
      whiteboard(x, t)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      const pitching = t < T.ask || t > T.point
      const mood = t < T.ask ? 'sparkle' : t < T.gasp ? 'neutral' : t < T.fact ? 'wide' : t < T.skip ? 'squint' : 'happy'
      const look = pitching ? [-1, -0.6] : t < T.fact ? [-0.4, 1] : [0, 0]
      const r = drawSag(x, 790, 990, 240, t, { pack: false, mood, look, blink: t > T.gasp && t < T.fact ? false : undefined, hops: [0.2, 1.1, 3.0, 3.6, 4.3, 5.0, T.gasp + 0.03, T.list + 0.9, T.point], seed: 7 })
      // the marker, raised at the board while pitching
      const up = pitching ? 1 : 0
      marker(x, r.x - 150 - up * 20, r.y - 30 - up * 60 + Math.sin(t * 6) * 6 * up, -0.7 * up - 0.2)
      drawSagHomeFront(x, t, { room: 'desk' })
      callStrip(x, t)
      for (const b of B) bubble(x, t, b)
      x.restore()
      drawGaspLines(x, t, { at: T.gasp, dur: 1.3, x: 790, y: 980, follow: 0.5, color: ORANGE })
      factChip(x, t, FACT)
      whip(x, t, T.skip, { dir: 1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { ...c, sign: 'sag' })
      drawRecFrame(x, t, { battery: lerp(0.8, 0.35, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.skip, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E42' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [493.88, 587.33, 659.25, 739.99, 880, 987.77, 1174.66]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [SAG.tag]: 740, '♑ CAP': 440 } }),
  ...IDEAS.filter(s => s.at > 0).map((s, i) => ['pop', r3(s.at + 0.03), NOTE[i % NOTE.length], 0.04, (s.x - 540) / 600]),
  ...IDEAS.filter(s => s.at > 0).map(s => ['tick', r3(s.at + 0.06), 0.03]),
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ['tick', T.ask, 0.04], ['pop', T.ask + 0.02, 440, 0.04, -0.4],
  ['whoosh', T.gasp, 0.3, 0.03], ['boom', T.gasp + 0.02, 0.12], ['pluck', T.gasp + 0.05, 246.94, 0.05, 0.6, 0],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['whoosh', T.wipe[0] + 0.4, 0.8, 0.025], ['whoosh', T.wipe[0] + 0.9, 0.5, 0.02],
  ['pluck', T.wipe[1] + 0.1, 880, 0.04, 0.5, 0],
  ...whipCues(T.skip),
  ...LIST.map((l, i) => ['pop', r3(l.at + 0.03), NOTE[i + 2], 0.035, 0]), ['bell', r3(LIST[0].tick + 0.02), 1318.51, 0.04, 1.4, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.point + 0.05, 1174.66, 0.05, 0], ['bell', T.point + 0.1, 1760, 0.03, 1.2, 0],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.09), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 1174.66, 0.05, 0], ['pluck', r3(T.last + 0.35), 987.77, 0.045, 0.6, 0], ['boom', r3(T.last + 0.36), 0.12],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
