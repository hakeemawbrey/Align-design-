// guidearies1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♈ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.80  "*Aries,* your star has a note."  The ♈ guide floats big and centred, its gold lantern already lit.
//   2.80–6.70  The guide drifts up; its lantern lights a little track below: tiny Aries revving at a starting line (VRRM!)
//              while the other star sits on the line, still tying its shoes.  YOUR STAR: "you decide in a second. they need a week."
//              Chip: ★ ASTROLOGY SAYS · ARIES: CARDINAL FIRE, RULED BY MARS.
//   6.70–10.0  The lace knots ("?!").  YOUR STAR: "that's not rejection. that's pace."  Aries stops revving, walks over,
//              kneels and holds the shoe steady while the other star ties it. A heart pops.
//   10.0–15.6  card flip · "Fast heart. *Patient* hands."  Both stars stand and jog off together, at one pace.
// One canvas (sky + track + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, LAV,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('aries'), RED = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

// ── the timeline
const T = {
  hookOut: [2.55, 2.85], wink: [1.2, 1.6], lift: 1.25, glint: 13.6, rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, vrrm: [3.7, 5.3], chip: 5.0,
  l2: 6.95, knot: 6.8, stop: 7.6, walk: [8.0, 8.9], kneel: 9.0, tied: 10.1, heart: 10.15,
  close: 10.6, h2: 10.75, h2Land: 11.15, stand: 12.0, jog: 12.4, out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you decide in a second. they need a *week*.', color: RED },
  { t: T.l2, speaker: SPEAK, text: "that's not rejection. that's *pace*.", color: '#ff9a7a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

// ── pixel props
const SHOE = ['...TTT..', '..TTSTTT', 'TTTTTTTT', 'WWWWWWWW']
const SHOE_C = { T: '#3ce6cf', S: '#ffffff', W: '#f5eedf' }
const SHOE2_C = { T: '#ff8fb1', S: '#ffffff', W: '#f5eedf' }
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }

const HERO = { x: 540, y: 880, size: 350 }          // the guide at frame 0
const UP = { x: 540, y: 600, size: 280 }            // the guide once the track lights up
const TRACK_Y = 1250
const ARI_X0 = 300, THEM_X = 760, SM = 190, STAR_Y = TRACK_Y - 110
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}
/** tiny Aries: revving on the line → walks over → kneels → stands → jogs (with them) */
function ariesX(t) {
  if (t < T.walk[0]) return ARI_X0
  if (t < T.walk[1]) return lerp(ARI_X0, THEM_X - 175, ease.inOutCubic(prog(t, ...T.walk)))
  if (t < T.jog) return THEM_X - 175
  return THEM_X - 175 + jogDX(t)
}
const jogDX = t => Math.sin((t - T.jog) * 1.1) * 30          // a gentle side-by-side jog in place (same pace)

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 1, of: 3, color: GOLD, top: 96, out: [T.out[0], T.out[1]] })
  const HOOK = guideHook(root, { text: '*Aries,* your star | has a note.', accentColor: RED, top: 220, size: 108, out: T.hookOut })
  const H2 = popText(root, 'Fast heart. | *Patient* hands.', { top: 1420, size: 118, accentSize: 168, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, accentColor: RED, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawTrack(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.45)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // a warm pool of lantern light on the track
    const g0 = x.createRadialGradient(540, TRACK_Y - 60, 40, 540, TRACK_Y - 60, 560)
    g0.addColorStop(0, 'rgba(255,200,110,0.22)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
    x.fillStyle = g0; x.fillRect(0, TRACK_Y - 620, 1080, 1100)
    const g = x.createLinearGradient(0, 0, 1080, 0)
    g.addColorStop(0, 'rgba(178,58,52,0)'); g.addColorStop(0.15, 'rgba(178,58,52,0.6)'); g.addColorStop(0.85, 'rgba(178,58,52,0.6)'); g.addColorStop(1, 'rgba(178,58,52,0)')
    x.fillStyle = g; x.fillRect(0, TRACK_Y - 26, 1080, 64)
    x.fillStyle = 'rgba(245,238,223,0.55)'
    const roll = t > T.jog ? ((t - T.jog) * 60) % 64 : 0
    for (let i = 0; i < 19; i++) x.fillRect(i * 64 - roll, TRACK_Y - 30, 36, 6)
    x.fillRect(0, TRACK_Y + 36, 1080, 6)
    // the start line, through both lanes
    for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? '#1b1236' : '#f5eedf'; x.fillRect(ARI_X0 + 110 + j * 12, TRACK_Y - 26 + i * 10.6, 12, 10.6) }
    x.restore()
  }

  function drawAries(t) {
    const p = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out)
    if (p <= 0.01) return
    const ax = ariesX(t)
    const revving = t > T.scene && t < T.stop
    const vib = revving ? Math.sin(t * 70) * 3 : 0
    const walking = t > T.walk[0] && t < T.walk[1]
    const kneel = t > T.kneel && t < T.stand ? 0.22 * ease.outCubic(prog(t, T.kneel, T.kneel + 0.3)) * (1 - prog(t, T.stand, T.stand + 0.3)) : 0
    const jog = t > T.jog ? 0.05 * Math.abs(Math.sin((t - T.jog) * 6)) : 0
    const sq = (revving ? 0.18 + 0.03 * Math.sin(t * 13) : 0) + kneel + jog
    const mood = t < T.stop ? 'squint' : t < T.kneel ? 'neutral' : t < T.heart ? 'happy' : 'heart'
    const look = t < T.stop ? [1, 0] : t < T.tied ? [1, 1] : [0, 0]
    const r = drawStarChar(x, ax + vib, STAR_Y, SM, t, { color: RED, glyph: S.glyph, mood: t > T.jog ? 'happy' : mood, look, squash: sq, seed: 4, glow: 0.9, pop: p, bob: revving ? 0 : undefined, blink: revving ? false : undefined })
    // shoes
    const cell = SM / 36, fy = STAR_Y + 15.84 * cell + 4, fx = 10.35 * cell * (1 + sq)
    const step = walking ? Math.sin(t * 16) : t > T.jog ? Math.sin((t - T.jog) * 12) : 0
    for (const s of [-1, 1]) drawBits(x, SHOE, SHOE_C, ax + vib + s * fx, fy - Math.max(0, step * s) * 12, 4.4 * p)
    // revving: exhaust puffs + speed dashes behind
    if (revving) {
      x.save()
      for (let i = 0; i < 5; i++) {
        const ph = (t * 2.6 + i / 5) % 1
        x.fillStyle = `rgba(239,230,214,${0.55 * (1 - ph)})`
        const s = 8 + ph * 22
        x.fillRect(Math.round(ax - 80 - ph * 140), Math.round(STAR_Y + 70 - ph * 40 - i * 4), s, s)
      }
      x.fillStyle = 'rgba(255,214,140,0.75)'
      for (let i = 0; i < 3; i++) if (Math.sin(t * 20 + i * 2) > 0) x.fillRect(Math.round(ax - 150 - i * 22), STAR_Y - 40 + i * 34, 50, 6)
      x.restore()
    }
    drawBurst(x, ax - 70, STAR_Y - 140, 92, t, T.vrrm[0], { word: 'VRRM!', color: '#ffd34d', size: 36, life: 0.9 })
    drawBurst(x, ax - 90, STAR_Y - 150, 92, t, T.vrrm[1], { word: 'VRRM!', color: '#ff9a7a', size: 36, life: 0.9 })
    return r
  }

  function drawThem(t) {
    const p = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    if (p <= 0.01) return
    const sitting = t < T.stand
    const tying = t < T.tied
    const sq = (sitting ? 0.2 : 0) + (t > T.jog ? 0.05 * Math.abs(Math.sin((t - T.jog) * 6 + 0.3)) : 0)
    const mood = t < T.knot ? 'neutral' : t < T.knot + 0.9 ? 'wide' : t < T.tied ? 'neutral' : 'happy'
    const tx = t > T.jog ? THEM_X + jogDX(t) : THEM_X
    drawStarChar(x, tx, STAR_Y, SM, t, { color: THEM, mood, look: tying ? [-0.3, 1] : t > T.jog ? [0, 0] : [-1, 0], squash: sq, seed: 9, glow: 0.7, pop: p, bob: sitting ? 0 : undefined })
    const cell = SM / 36, fy = STAR_Y + 15.84 * cell + 4, fx = 10.35 * cell * (1 + sq)
    const step = t > T.jog ? Math.sin((t - T.jog) * 12 + 0.4) : 0
    for (const s of [-1, 1]) drawBits(x, SHOE, SHOE2_C, tx + s * fx, fy - Math.max(0, step * s) * 12, 4.4 * p)
    // the lace on the left shoe: loops wiggling while tying, a tangle at the knot, a neat bow once tied
    const lx = tx - fx, ly = fy - 12
    x.save(); x.strokeStyle = '#fffbea'; x.lineWidth = 4; x.lineCap = 'round'
    if (tying) {
      const w = t > T.kneel ? 0.25 : 1
      const a1 = Math.sin(t * 7) * 18 * w, a2 = Math.cos(t * 5.3) * 14 * w
      x.beginPath(); x.moveTo(lx, ly); x.quadraticCurveTo(lx - 30 + a1, ly - 46, lx - 14, ly - 10 + a2 * 0.3); x.stroke()
      x.beginPath(); x.moveTo(lx, ly); x.quadraticCurveTo(lx + 30 - a2, ly - 40, lx + 16, ly - 8 - a1 * 0.3); x.stroke()
      if (t > T.knot && t < T.kneel) { x.beginPath(); for (let k = 0; k < 14; k++) { const aa = k * 0.9, rr = 6 + k * 0.6; x.lineTo(lx + Math.cos(aa) * rr, ly - 20 + Math.sin(aa) * rr) } x.stroke() }
    } else {
      // the bow
      x.beginPath(); x.ellipse(lx - 10, ly - 8, 10, 6, -0.4, 0, Math.PI * 2); x.stroke()
      x.beginPath(); x.ellipse(lx + 10, ly - 8, 10, 6, 0.4, 0, Math.PI * 2); x.stroke()
    }
    x.restore()
    // "?!" at the knot
    if (t > T.knot && t < T.knot + 1.2) {
      const q = pop01(t, T.knot, 0.3, 3) * (1 - prog(t, T.knot + 0.9, T.knot + 1.2))
      x.save(); x.globalAlpha = q; x.fillStyle = BONE; x.font = `800 ${Math.round(64 * q)}px Inter`; x.textAlign = 'center'
      x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('?!', tx + 70, STAR_Y - 120); x.fillText('?!', tx + 70, STAR_Y - 120); x.restore()
    }
    sparkles(x, t, lx, ly - 10, T.tied, 8, 70, 2, [GOLD, BONE, '#ff8fb1'])
  }

  function drawHeart(t) {
    if (t < T.heart || t > T.heart + 2.4) return
    const p = pop01(t, T.heart, 0.4, 3), a = 1 - prog(t, T.heart + 1.8, T.heart + 2.4)
    const hx = (ariesX(t) + THEM_X) / 2, hy = STAR_Y - 150 - (t - T.heart) * 26
    drawBits(x, HEART, HEART_C, hx, hy, 9 * p, { alpha: a })
  }

  function drawTheGuide(t) {
    const g = guidePos(t)
    const k = popOut(t, T.out)
    if (k <= 0) return
    const talking = t > T.l1 - 0.1 && t < T.close
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t < T.l2 ? (talking ? 'neutral' : 'happy') : t < T.heart ? 'neutral' : 'sparkle'
    const look = t < T.rise[1] ? [0, 0] : t < T.close ? [0, 1] : [0, 0.6]
    const raise = Math.exp(-Math.max(0, t - T.lift) * 4) * (t > T.lift ? 1 : 0)
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: RED, glyph: S.glyph, mood, look, hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, RED])
    sparkles(x, t, r.lx, r.ly, T.glint, 8, 80, 2, [GOLD, BONE, RED])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTrack(t)
      drawTheGuide(t)
      if (t > T.scene) { drawThem(t); drawAries(t); drawHeart(t) }
      factChip(x, t, { text: 'ARIES: CARDINAL FIRE,|RULED BY MARS', at: T.chip, dur: 4.6, x: 660, y: 905, color: GOLD })
      CHIP.update(t)
      HOOK.update(t)
      box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: 10.65, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.025 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2], ...guideCues(T.glint, { gain: 0.018 }),
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, -0.3], ['pop', T.scene + 0.22, 659.25, 0.035, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['boom', T.vrrm[0], 0.12], ['whoosh', T.vrrm[0], 0.25, 0.04], ['boom', T.vrrm[1], 0.12], ['whoosh', T.vrrm[1], 0.25, 0.04],
  ...guideCues(T.chip, { gain: 0.022, notes: [1174.66, 1318.51, 1567.98] }),
  ['pop', T.knot, 1567.98, 0.04, 0.3], ['tick', T.knot + 0.1, 0.04],
  ['tick', T.stop, 0.03], ['tick', T.walk[0] + 0.2, 0.025], ['tick', T.walk[0] + 0.5, 0.025], ['tick', T.walk[0] + 0.8, 0.025],
  ['pluck', T.kneel, 880, 0.035, 0.5, 0], ['glitter', T.tied, T.tied + 0.4], ['pop', T.heart, 1318.51, 0.04, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...guideCues(T.h2Land + 0.3, { gain: 0.02 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
