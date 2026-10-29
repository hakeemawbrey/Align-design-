// st9saglove (30 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E43) · story 0–25.6, then the end card.
//   DATE NIGHT with Sagittarius and Gemini (its season-4/5 partner) in Sag's home (../../st9saghome.js, ep 'love': five
//   pins on the map, three postcards on the fridge).  "Dating a Sag: *passport* required."
//   0.00  Frame 0: the kitchen at dusk, Sag holding its passport up high, Gemini beside it; a paper map already open over
//         the window with flight arcs drawing out from HOME. SAG: "date ideas: Iceland. Patagonia. the *Moon.*"
//         (rewatch bait: the Moon pin is labelled PENDING)
//   5.40  GEMINI: "or… what if the date is *here?*"  Gemini’s phone (st9day phoneScreen 'map'): HOME → ROOF, 2 min.
//  10.10  whip → the window seat, 9:12 PM: the blanket, the telescope. "staycation, *technically.*"
//  11.80  The telescope finds a glow just past the window frame: ★ REAL SKY — the centre of our galaxy lies in the
//         direction of Sagittarius.
//  15.20  SAG: "we didn’t go anywhere and i feel *far away.*"  GEMINI: "that’s called *being here.*"  (ghost at 16.4,
//         rising over the sill beside the telescope)
//  20.30  Rhymes with frame 0: the passport goes up again, opens, and a stamp slams in: HOME ♥.
//  21.60  LAST: "Staying is an *adventure,* too."
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { SAG, SAG_SPOTS, drawSagHome, drawSagHomeFront, drawSag, R, blk, bubble, bubbleCues, whip, whipCues, popIn, drawHeart } from '../../st9saghome.js'

export const DURATION = 30
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', ORANGE = '#ffb36a', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const GEM = signStar('gemini'), GEMT = '♊ GEMINI'

const T = {
  hookOut: 2.8, arcs: [0, 4.6], mapOut: 5.3, gem: 5.4, phone: 6.0, phoneOut: 9.7,
  seat: 10.1, scope: 11.8, fact: 12.2, far: 15.2, here: 17.7, ghost: 16.4,
  pass: 20.3, open: 20.7, stamp: 21.05, last: 21.6, out: [25.15, 25.55],
}
const B = [
  { at: 0.5, out: 5.1, x: 470, y: 980, text: 'date ideas: Iceland. Patagonia. the *Moon.*', tag: SAG.tag, tagColor: SAG.color, w: 560, tailX: 0.35 },
  { at: 5.4, out: 9.6, x: 790, y: 1000, text: 'or… what if the date is *here?*', tag: GEMT, tagColor: GEM.color, w: 520, tailX: 0.75 },
  { at: T.far, out: 17.55, x: 380, y: 875, text: 'we didn’t go anywhere and i feel *far away.*', tag: SAG.tag, tagColor: SAG.color, w: 560, tailX: 0.3 },
  { at: T.here, out: 20.1, x: 640, y: 885, text: 'that’s called *being here.*', tag: GEMT, tagColor: GEM.color, w: 480, tailX: 0.7 },
]
const STAMPS = [
  { at: 2.95, out: 5.2, time: '7:00 PM', text: 'date planning, *Sag-style*' },
  { at: 10.45, out: 12.0, time: '9:12 PM', text: 'staycation, *technically*' },
]
const FACT = { at: T.fact, dur: 2.8, text: 'The centre of our galaxy lies in the direction of Sagittarius.', label: '★ REAL SKY', y: 1320 }
const LAST = 'Staying is an | *adventure,* too.'
const CLOCK = [
  { t: 0, from: '6:58', to: '7:00', at: 2.9, dur: 0.4, ampm: 'PM' },
  { t: T.seat, from: '7:00', to: '9:12', at: T.seat + 0.05, dur: 0.9, ampm: 'PM' },
]
const PHONE = [
  { at: T.phone + 0.4, text: 'HOME' },
  { at: T.phone + 1.3, text: 'ROOF · 2 MIN' },
]
export const GHOST = { at: T.ghost, ...SAG_SPOTS.window }
const GLOW = { x: 640, y: 770 }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const hour = t => (t < T.seat ? lerp(18.6, 19.2, t / T.seat) : lerp(21, 22, (t - T.seat) / (STORY_END - T.seat)))

/** the paper map over the kitchen window: arcs draw out from HOME to three pins (already drawing at frame 0) */
const DEST = [{ x: 330, y: 700, name: 'ICELAND' }, { x: 520, y: 900, name: 'PATAGONIA' }, { x: 880, y: 660, name: 'THE MOON (PENDING)' }]
function paperMap(x, t) {
  const k = t < T.mapOut ? 1 : 1 - ease.inCubic(prog(t, T.mapOut, T.mapOut + 0.3))
  if (k <= 0.01) return
  x.save(); x.translate(560, 790); x.scale(k, k); x.rotate(-0.025); x.translate(-560, -790)
  blk(x, 170, 620, 780, 340, '#efe0bf', { o: 8, lo: '#d6c49c' })
  for (let i = 0; i < 6; i++) R(x, '#e3d1a8', 170 + i * 130, 620, 4, 340)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#8a6a3a'; x.fillText('THE WORLD (AND ABOVE)', 192, 650)
  const H = { x: 600, y: 820 }
  R(x, INK, H.x - 12, H.y - 12, 24, 24); R(x, PINK, H.x - 8, H.y - 8, 16, 16)
  x.fillStyle = '#7a1f2b'; x.fillText('HOME', H.x - 26, H.y + 38)
  DEST.forEach((d, i) => {
    const p = prog(t, T.arcs[0] + i * 1.1 - 1.0, T.arcs[0] + i * 1.1 + 0.7)
    if (p <= 0) return
    for (let s = 0; s < p; s += 0.05) { const px = lerp(H.x, d.x, s), py = lerp(H.y, d.y, s) - Math.sin(Math.PI * s) * 110; R(x, '#c94a4a', px - 3, py - 3, 7, 7) }
    if (p >= 1) {
      R(x, INK, d.x - 10, d.y - 10, 20, 20); R(x, ORANGE, d.x - 6, d.y - 6, 12, 12)
      x.fillStyle = '#5a3a20'; x.font = `700 20px ${MONO}`; x.textAlign = d.x > 800 ? 'right' : 'left'; x.fillText(d.name, d.x + (d.x > 800 ? 20 : -20), d.y - 18); x.textAlign = 'left'
    }
    // a little pixel plane rides the newest arc
    if (p > 0 && p < 1) { const px = lerp(H.x, d.x, p), py = lerp(H.y, d.y, p) - Math.sin(Math.PI * p) * 110; R(x, INK, px - 12, py - 4, 24, 8); R(x, BONE, px - 10, py - 2, 20, 4) }
  })
  x.restore()
}
function passport(x, t, cx, cy, open, stampK) {
  if (open <= 0) {
    blk(x, cx - 56, cy - 76, 112, 152, '#2a2f6a', { o: 6, hi: '#3a4090' })
    x.save(); x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy - 10, 26, 0, Math.PI * 2); x.stroke()
    x.beginPath(); x.moveTo(cx - 26, cy - 10); x.lineTo(cx + 26, cy - 10); x.moveTo(cx, cy - 36); x.lineTo(cx, cy + 16); x.stroke(); x.restore()
    x.font = `700 16px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('PASSPORT', cx, cy + 50); x.textAlign = 'left'
    return
  }
  const w = lerp(112, 260, open)
  blk(x, cx - w / 2, cy - 80, w, 160, '#f4ecdc', { o: 6 }); R(x, '#2a2f6a', cx - 3, cy - 80, 6, 160)
  // old stamps (left page)
  x.globalAlpha = open
  x.save(); x.translate(cx - 70, cy - 30); x.rotate(-0.2); x.strokeStyle = '#3a76aa'; x.lineWidth = 3; x.strokeRect(-36, -16, 72, 32); x.font = `700 14px ${MONO}`; x.fillStyle = '#3a76aa'; x.textAlign = 'center'; x.fillText('LIMA', 0, 5); x.restore()
  x.save(); x.translate(cx - 60, cy + 36); x.rotate(0.15); x.strokeStyle = '#3f9a58'; x.lineWidth = 3; x.strokeRect(-36, -16, 72, 32); x.font = `700 14px ${MONO}`; x.fillStyle = '#3f9a58'; x.textAlign = 'center'; x.fillText('OSLO', 0, 5); x.restore()
  x.globalAlpha = 1
  if (stampK > 0) {        // HOME ♥ slams in on the right page
    const s = lerp(2.4, 1, ease.outCubic(clamp(stampK)))
    x.save(); x.translate(cx + 62, cy); x.rotate(-0.12); x.scale(s, s); x.globalAlpha = clamp(stampK * 3)
    x.strokeStyle = '#e0384f'; x.lineWidth = 5; x.strokeRect(-52, -30, 104, 60)
    x.font = `800 26px Inter`; x.fillStyle = '#e0384f'; x.textAlign = 'center'; x.fillText('HOME', 0, 2); x.font = `700 13px ${MONO}`; x.fillText('♥ ARRIVED', 0, 20)
    x.restore()
  }
  x.textAlign = 'left'
}
/** the glow just past the telescope's aim: the direction of the galaxy's centre */
function galacticGlow(x, t, k) {
  if (k <= 0) return
  x.save(); x.beginPath(); x.rect(150, 620, 780, 510); x.clip()
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(GLOW.x, GLOW.y, 0, GLOW.x, GLOW.y, 220)
  g.addColorStop(0, `rgba(255,214,170,${0.55 * k})`); g.addColorStop(0.4, `rgba(220,160,255,${0.25 * k})`); g.addColorStop(1, 'rgba(160,120,255,0)')
  x.fillStyle = g; x.fillRect(GLOW.x - 240, GLOW.y - 240, 480, 480)
  // the Milky Way band through it
  for (let i = 0; i < 70; i++) { const s = (i * 37.3) % 1, px = lerp(160, 920, s), py = GLOW.y + (px - GLOW.x) * -0.35 + Math.sin(i * 7.1) * 40; drawPixelStar(x, px, py, 8 + (i % 3) * 5, i % 3, i % 2 ? '#ffe2c0' : '#d9c6ff') }
  x.restore()
  const lk = popIn(Math.min(t, T.far + 99), T.scope + 0.3, 0.3, 2)
  if (lk > 0.02) {
    x.save(); x.translate(GLOW.x, GLOW.y - 120); x.scale(lk, lk)
    x.font = `700 22px ${MONO}`; const w = x.measureText('GALAXY’S CENTRE ↓').width + 24
    R(x, INK, -w / 2, -22, w, 36); x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('GALAXY’S CENTRE ↓', 0, 4); x.restore(); x.textAlign = 'left'
  }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 26px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Dating a Sag: *passport* required.', at: 0, out: T.hookOut, accentColor: ORANGE, size: 86, accentSize: 128 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: ORANGE, top: 1545 }))
  const last = popText(root, LAST, { top: 262, size: 100, accentSize: 156, at: T.last, gap: 0.09, accentColor: ORANGE, wobble: true, late: 2, lateAt: T.last + 0.4, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: hour(t) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.scope, dur: 1.4, x: 700, y: 840, amount: 0.25, follow: 0.35 })
      const z2 = gaspZoom(t, { at: T.stamp, dur: 1.0, x: 300, y: 860, amount: 0.22, follow: 0.3 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      if (t < T.seat) {
        drawSagHome(x, t, { room: 'kitchen', ep: 'love' })
        paperMap(x, t)
        const r = drawSag(x, 470, 1150, 250, t, { pack: false, mood: t < T.gem ? 'sparkle' : t < T.phone + 1.3 ? 'neutral' : 'happy', look: t < T.gem ? [0, -1] : [1, 0], hops: [0.2, 1.4, 2.6, 3.8, T.phone + 1.4], seed: 9 })
        passport(x, t, r.x - 150, r.y - 70 + Math.sin(t * 5) * 8, 0, 0)
        drawStarChar(x, 800, 1160, 220, t, { color: GEM.color, glyph: GEM.glyph, mood: t < T.gem ? 'happy' : 'sparkle', look: t < T.gem ? [-1, -1] : [-1, 0], hops: [1.0, T.gem + 0.1, T.gem + 0.6, T.phone + 0.2], seed: 4 })
        const pk = popIn(t, T.phone, 0.35, 1.8) * (1 - ease.inCubic(prog(t, T.phoneOut, T.phoneOut + 0.3)))
        if (pk > 0.02) phoneScreen(x, t, { x: 790, y: 760, w: 280, h: 420, app: 'map', title: 'DATE: ROUTE', lines: PHONE, pop: pk, rot: 0.06, size: 22 })
      } else {
        drawSagHome(x, t, { room: 'window', ep: 'love', lamp: 0.6, noPack: true })
        galacticGlow(x, t, prog(t, T.scope, T.scope + 0.8))
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        const passUp = t > T.pass
        const r = drawSag(x, 380, 995, 220, t, { pack: false, mood: t < T.scope ? 'happy' : t < T.far ? 'wide' : t < T.here + 0.8 ? 'sparkle' : 'happy', look: t < T.far ? [1, -1] : [1, 0], blink: t > T.scope && t < T.far ? false : undefined, hops: [T.seat + 0.15, T.far + 0.1, T.far + 0.7, T.far + 1.3, T.pass + 0.05, T.stamp + 0.05], seed: 9 })
        drawStarChar(x, 640, 1005, 200, t, { color: GEM.color, glyph: GEM.glyph, mood: t < T.here ? 'happy' : 'heart', look: t < T.far ? [1, -1] : [-1, 0], hops: [T.here + 0.1, T.here + 0.6], seed: 4 })
        drawSagHomeFront(x, t, { room: 'window' })
        // their blanket across both laps
        blk(x, 260, 1110, 500, 50, '#f08a3c', { o: 6, hi: '#ffb36a' })
        if (passUp) {
          const lift = popIn(t, T.pass, 0.35, 2)
          passport(x, t, r.x - 110, lerp(r.y + 60, r.y - 170, clamp(lift)), clamp(prog(t, T.open, T.open + 0.25)), prog(t, T.stamp, T.stamp + 0.18))
          if (t > T.stamp + 0.15) for (let i = 0; i < 3; i++) { const p = ((t - T.stamp) * 0.7 + i / 3) % 1; drawHeart(x, r.x - 60 + i * 90, r.y - 260 - p * 120, 6, Math.sin(Math.PI * p)) }
        }
      }
      for (const b of B) bubble(x, t, b)
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.seat, { dir: 1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { ...c, sign: 'sag' })
      drawRecFrame(x, t, { battery: lerp(0.6, 0.4, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.seat, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E43' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [369.99, 440, 493.88, 554.37, 659.25, 739.99, 880]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [SAG.tag]: 740, [GEMT]: 987.77 } }),
  ...DEST.map((d, i) => ['whoosh', r3(Math.max(0.05, T.arcs[0] + i * 1.1 - 0.2)), 0.6, 0.018]),
  ...DEST.map((d, i) => ['pop', r3(T.arcs[0] + i * 1.1 + 0.7), NOTE[i + 2], 0.04, (d.x - 540) / 600]),
  ['whoosh', T.mapOut, 0.3, 0.02],
  ...phoneCues(PHONE, { app: 'map' }), ['pop', T.phone + 0.05, 987.77, 0.04, 0.4],
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...whipCues(T.seat),
  ['riser', T.scope - 0.6, T.scope + 0.1, 0.05], ['glitter', T.scope, T.scope + 0.8], ['bell', T.scope + 0.1, 1479.98, 0.04, 2, 0],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.pass + 0.05, 739.99, 0.04, -0.3], ['tick', T.open, 0.03],
  ['boom', T.stamp, 0.2], ['tick', T.stamp, 0.08], ['bell', T.stamp + 0.1, 1479.98, 0.035, 1.6, 0], ['glitter', T.stamp + 0.1, T.stamp + 0.7],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.09), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.4), 1108.73, 0.05, 0], ['pluck', r3(T.last + 0.4), 880, 0.045, 0.6, 0], ['bell', r3(T.last + 0.5), 1760, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
