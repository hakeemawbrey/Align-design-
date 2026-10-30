// guidetaurus1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♉ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.80  "*Taurus,* your star has a note."  The ♉ guide, lantern lit, big and centred.
//   2.80–7.00  The guide drifts up. Below, tiny Taurus and the other star; as YOUR STAR says "you dug in. we saw. it's cute.
//              it's a wall.", a pixel brick wall stacks up between them, row by row (thunk, thunk). Taurus folds into a squint.
//              Chip: ★ ASTROLOGY SAYS · TAURUS: FIXED EARTH, RULED BY VENUS.
//   7.00–10.6  YOUR STAR: "try 'you might be right' once."  Taurus wiggles one brick loose (POP): a window. "you might be
//              right." in a tiny bubble; the other star lights up; a heart floats through the gap.
//   10.6–15.6  card flip · "Steady, not *stuck*."  The wall stays (steady), the window stays open (not stuck).
// One canvas (sky + wall + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, INTER,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('taurus'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.2, 1.6], lift: 1.25, hookOut: [2.55, 2.85], rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, rows: [3.7, 4.05, 4.4, 4.75, 5.1, 5.45], chip: 5.6,
  l2: 7.25, wiggle: [8.5, 9.1], pull: 9.1, say: 9.35, heart: 9.8,
  close: 10.7, h2: 10.85, h2Land: 11.25, glint: 13.4, out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you dug in. we saw. it's cute. it's a *wall*.", color: COL },
  { t: T.l2, speaker: SPEAK, text: "try '*you might be right*' once.", color: '#ffd38a' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }
const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 600, size: 280 }
const GROUND = 1270, ARI_X = 285, THEM_X = 795, SM = 190, STAR_Y = GROUND - 110
const WALL = { x: 540, bw: 72, bh: 46, cols: 4, rows: 6 }
const HOLE = { r: 3, c: 1 }          // the brick Taurus pulls (row from the bottom, column)
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 1, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: '*Taurus,* your star | has a note.', accentColor: COL, top: 220, size: 104, out: T.hookOut })
  const H2 = popText(root, 'Steady, | not *stuck.*', { top: 1420, size: 124, accentSize: 176, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, accentColor: COL, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function brick(bx, by, w, h, a, tone = 0) {
    x.save(); x.globalAlpha *= a
    x.fillStyle = INK; x.fillRect(Math.round(bx - 3), Math.round(by - 3), w + 6, h + 6)
    x.fillStyle = tone ? '#c25a3c' : '#b04a34'; x.fillRect(Math.round(bx), Math.round(by), w, h)
    x.fillStyle = '#e07a54'; x.fillRect(Math.round(bx), Math.round(by), w, 6)
    x.fillStyle = '#7a2e22'; x.fillRect(Math.round(bx), Math.round(by + h - 6), w, 6)
    x.restore()
  }

  function drawWall(t, a) {
    const { bw, bh, cols, rows } = WALL
    for (let r = 0; r < rows; r++) {
      const tr = T.rows[r]
      if (t < tr) continue
      const drop = ease.outCubic(prog(t, tr, tr + 0.22))
      const off = r % 2 ? bw / 2 : 0
      for (let c = 0; c < cols + (r % 2 ? -1 : 0); c++) {
        const bx = WALL.x - (cols * bw) / 2 + off + c * bw, by = GROUND + 30 - (r + 1) * bh - (1 - drop) * 120
        if (r === HOLE.r && c === HOLE.c && t > T.pull) {
          // the pulled brick: pops out toward Taurus and lands on the ground beside it
          const p = prog(t, T.pull, T.pull + 0.6)
          const px = lerp(bx, ARI_X + 120, ease.outCubic(p)), py = lerp(by, GROUND + 30 - bh, p) - Math.sin(Math.PI * p) * 120
          brick(px, py, bw - 4, bh - 4, a, 1)
          continue
        }
        const wig = r === HOLE.r && c === HOLE.c && t > T.wiggle[0] && t < T.pull ? Math.sin(t * 40) * 4 : 0
        brick(bx + 2 + wig, by + 2, bw - 4, bh - 4, a * clamp(drop * 3), (r + c) % 2)
      }
    }
  }

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(540, GROUND, 30, 540, GROUND, 520)
    g0.addColorStop(0, 'rgba(255,200,110,0.2)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
    x.fillStyle = g0; x.fillRect(0, GROUND - 520, 1080, 900)
    x.fillStyle = 'rgba(46,30,24,0.8)'; x.fillRect(100, GROUND + 30, 880, 14)
    x.restore()
    const k1 = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out), k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const dug = t > T.rows[0] && t < T.wiggle[0]
    const tMood = t > T.heart ? 'heart' : t > T.pull ? 'happy' : t > T.l2 + 0.6 ? 'neutral' : dug ? 'squint' : 'neutral'
    const peek = t > T.pull ? 12 * ease.outCubic(prog(t, T.pull, T.pull + 0.5)) : 0
    drawStarChar(x, ARI_X + peek, STAR_Y, SM, t, { color: COL, glyph: S.glyph, mood: tMood, look: [1, 0], seed: 4, glow: 0.85, pop: k1, squash: dug ? 0.12 : 0, hops: [T.wiggle[0], T.pull, T.say] })
    drawStarChar(x, THEM_X - peek, STAR_Y, SM, t, { color: THEM, mood: t > T.pull + 0.3 ? 'sparkle' : dug ? 'neutral' : 'neutral', look: t > T.rows[0] && t < T.pull ? [-1, -1] : [-1, 0], seed: 9, glow: 0.7, pop: k2, hops: [T.pull + 0.3] })
    drawWall(t, a)
    drawBurst(x, WALL.x - 40, GROUND - 230, 72, t, T.pull, { word: 'POP!', color: '#ffd34d', size: 34, life: 0.6 })
    // "you might be right." from Taurus
    if (t > T.say && t < T.close + 0.2) {
      const p = pop01(t, T.say, 0.3, 2.4) * (1 - prog(t, T.close - 0.1, T.close + 0.2))
      const cx = ARI_X + 90, cy = STAR_Y - 230, w = 420, h = 88
      x.save(); x.globalAlpha = a * p; x.fillStyle = '#f5eedf'; x.strokeStyle = INK; x.lineWidth = 6
      x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 24); x.fill(); x.stroke()
      x.beginPath(); x.moveTo(cx - 40, cy + h / 2 - 3); x.lineTo(cx - 60, cy + h / 2 + 40); x.lineTo(cx - 10, cy + h / 2 - 3); x.fill()
      x.fillStyle = INK; x.font = `italic 500 48px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('you might be right.', cx, cy + 2)
      x.restore()
    }
    // a heart floats through the window
    if (t > T.heart && t < T.heart + 2.6) {
      const p = pop01(t, T.heart, 0.4, 3), q = 1 - prog(t, T.heart + 2.0, T.heart + 2.6)
      const hy = GROUND + 30 - (HOLE.r + 0.5) * WALL.bh - (t - T.heart) * 40
      drawBits(x, HEART, HEART_C, WALL.x - WALL.cols * WALL.bw / 2 + WALL.bw / 2 + HOLE.c * WALL.bw + WALL.bw / 2, hy, 8 * p, { alpha: q * a })
    }
    sparkles(x, t, WALL.x - 30, GROUND - 60, T.pull + 0.1, 8, 110, 2, [GOLD, BONE, COL])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t > T.pull ? 'sparkle' : t > T.rows[2] && t < T.l2 ? 'eyeroll' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
    sparkles(x, t, r.lx, r.ly, T.glint, 8, 80, 2, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawScene(t)
      drawTheGuide(t)
      factChip(x, t, { text: 'TAURUS: FIXED EARTH,|RULED BY VENUS', at: T.chip, dur: 2.6, x: 540, y: 900, color: GOLD })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.024 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, -0.3], ['pop', T.scene + 0.22, 659.25, 0.035, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...T.rows.map((tr, i) => ['boom', tr + 0.2, 0.06 + i * 0.01]), ...T.rows.map(tr => ['tick', tr + 0.2, 0.035]),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['tick', T.wiggle[0], 0.03], ['tick', T.wiggle[0] + 0.2, 0.03], ['tick', T.wiggle[0] + 0.4, 0.03],
  ['pop', T.pull, 1567.98, 0.05, 0], ['whoosh', T.pull, 0.3, 0.03], ['boom', T.pull + 0.6, 0.06],
  ['pluck', T.say, 880, 0.035, 0.5, -0.2], ['pop', T.heart, 1318.51, 0.04, 0], ['glitter', T.heart, T.heart + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...guideCues(T.glint, { gain: 0.018 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
