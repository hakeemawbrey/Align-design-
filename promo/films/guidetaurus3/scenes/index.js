// guidetaurus3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♉ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.80  "Try this week, *Taurus.*"  The ♉ guide, lantern lit, big and centred.
//   2.80–7.10  The guide drifts up. Below, tiny Taurus hands the other star a pixel cookie… then a sandwich… then a whole
//              pie: a wobbly snack tower.  YOUR STAR: "you show love with snacks. we know."
//              Chip: ★ ASTROLOGY SAYS · TAURUS: NATURAL RULER OF THE 2ND HOUSE (VALUES).
//   7.10–10.6  YOUR STAR: "say it out loud too. just once."  Taurus gulps (squint, a sweat drop)… then a speech bubble pops
//              with a big pixel heart in it. The other star lights up, sparkles.
//   10.6–15.6  card flip · "Feed them. Then *tell* them."  The other star munches the cookie, happy; crumbs.
// One canvas (sky + stars + snacks + bubble), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('taurus'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.2, 1.6], lift: 1.25, hookOut: [2.55, 2.85], rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, snacks: [3.9, 4.6, 5.3], chip: 5.75,
  l2: 7.2, gulp: 8.35, say: 9.0, light: 9.25,
  close: 10.6, h2: 10.75, h2Land: 11.15, munch: [11.6, 12.4, 13.2], out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you show love with *snacks*. we know.', color: COL },
  { t: T.l2, speaker: SPEAK, text: 'say it *out loud* too. just once.', color: '#ffd38a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const COOKIE = ['..CCCC..', '.CCDCCC.', 'CCCCCDCC', 'CDCCCCCC', 'CCCCDCCC', '.CCCCCD.', '..CCCC..']
const COOKIE_C = { C: '#d9a05b', D: '#5a3220' }
const SANDWICH = ['.BBBBBBBBBB.', 'BBBBBBBBBBBB', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e9b96a', G: '#5ec46a', R: '#e8414f', Y: '#ffd34d' }
const PIE = ['....WWWWWW....', '..CCCCCCCCCC..', '.CPCPCPCPCPCPC.', 'CCCCCCCCCCCCCC', 'TTTTTTTTTTTTTT', '.TTTTTTTTTTTT.']
const PIE_C = { W: '#fffbea', C: '#e9b96a', P: '#c2304f', T: '#b07a3a' }
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 590, size: 280 }
const GROUND = 1260, TAU_X = 310, THEM_X = 770, SM = 190, STAR_Y = GROUND - 110
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 3, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: 'Try this week, | *Taurus.*', accentColor: COL, top: 220, size: 112, accentSize: 150, out: T.hookOut })
  const H2 = popText(root, 'Feed them. | Then *tell* them.', { top: 1420, size: 118, accentSize: 168, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, accentColor: COL, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(540, GROUND, 30, 540, GROUND, 520)
    g0.addColorStop(0, 'rgba(255,200,110,0.2)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
    x.fillStyle = g0; x.fillRect(0, GROUND - 520, 1080, 900)
    x.fillStyle = 'rgba(16,10,38,0.7)'; x.fillRect(120, GROUND + 70, 840, 12)
    x.restore()
    const k1 = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out), k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const nervous = t > T.gulp && t < T.say
    const tMood = t < T.l2 ? 'happy' : nervous ? 'squint' : t > T.say ? 'heart' : 'neutral'
    const shake = nervous ? Math.sin(t * 50) * 3 : 0
    drawStarChar(x, TAU_X + shake, STAR_Y, SM, t, { color: COL, glyph: S.glyph, mood: tMood, look: [1, 0], seed: 4, glow: 0.85, pop: k1, hops: [...T.snacks, T.say], squash: nervous ? 0.1 : 0 })
    // sweat drop
    if (nervous) { x.save(); x.globalAlpha = a; x.fillStyle = '#7fd4ff'; const sy = STAR_Y - 70 + (t - T.gulp) * 40; x.fillRect(TAU_X + 70, sy, 12, 18); x.fillRect(TAU_X + 73, sy - 8, 6, 8); x.restore() }
    const buried = t > T.snacks[2] && t < T.light
    const tm = t > T.light ? 'sparkle' : buried ? 'wide' : t > T.snacks[0] ? 'happy' : 'neutral'
    const chew = t > T.munch[0] ? 0.06 * Math.max(0, Math.sin((t - T.munch[0]) * 14)) : 0
    drawStarChar(x, THEM_X, STAR_Y, SM, t, { color: THEM, mood: t > T.munch[0] ? 'happy' : tm, look: [-1, 0], seed: 9, glow: 0.7, pop: k2, squash: chew, hops: [T.light] })
    // the snack tower, stacked in the other star's arms (cookie on top of it all, wobbling)
    const wob = t > T.snacks[2] && t < T.light ? Math.sin(t * 7) * 0.08 : 0
    const handX = THEM_X - 30, handY = STAR_Y + 20
    const pieP = t > T.snacks[2] ? pop01(t, T.snacks[2], 0.35, 2.4) : 0
    const sandP = t > T.snacks[1] ? pop01(t, T.snacks[1], 0.35, 2.4) : 0
    const cookieP = t > T.snacks[0] ? pop01(t, T.snacks[0], 0.35, 2.4) : 0
    // fly-in from Taurus for each
    const fly = (ts) => ease.outCubic(prog(t, ts, ts + 0.35))
    // after "light", the tower goes down to the ground (set aside), the cookie stays in hand
    const aside = ease.inOutCubic(prog(t, T.light, T.light + 0.5))
    x.save(); x.globalAlpha = a
    if (pieP > 0) drawBits(x, PIE, PIE_C, lerp(lerp(TAU_X, handX, fly(T.snacks[2])), THEM_X + 150, aside), lerp(lerp(STAR_Y, handY - 10, fly(T.snacks[2])), GROUND + 40, aside), 9 * pieP, { rot: wob * (1 - aside) })
    if (sandP > 0) drawBits(x, SANDWICH, SANDWICH_C, lerp(lerp(TAU_X, handX, fly(T.snacks[1])), THEM_X + 150, aside), lerp(lerp(STAR_Y, handY - (t > T.snacks[2] ? 64 : 10), fly(T.snacks[1])), GROUND - 18, aside), 9 * sandP, { rot: wob * 1.4 * (1 - aside) })
    if (cookieP > 0) {
      const bites = T.munch.filter(m => t > m).length
      const bm = COOKIE.map((row, j) => row.split('').map((ch, i) => (i >= 8 - bites * 2 && j < 4 + bites ? '.' : ch)).join(''))
      const cy0 = handY - (t > T.snacks[2] ? 118 : t > T.snacks[1] ? 64 : 10)
      drawBits(x, bites >= 3 ? bm : bm, COOKIE_C, lerp(TAU_X, handX, fly(T.snacks[0])) - aside * 30, lerp(lerp(STAR_Y, cy0, fly(T.snacks[0])), STAR_Y + 10, aside), 9 * cookieP, { rot: wob * 2 * (1 - aside) })
    }
    x.restore()
    // crumbs while munching
    T.munch.forEach(m => {
      if (t < m || t > m + 0.6) return
      const p = prog(t, m, m + 0.6)
      x.save(); x.globalAlpha = (1 - p) * a; x.fillStyle = '#d9a05b'
      for (let i = 0; i < 5; i++) x.fillRect(Math.round(handX - 40 + i * 16), Math.round(STAR_Y + 10 + p * 90 + (i % 2) * 14), 8, 8)
      x.restore()
    })
    drawBurst(x, TAU_X + 40, STAR_Y - 190, 70, t, T.snacks[0], { word: 'here!', color: '#ffd34d', size: 30, life: 0.6 })
    drawBurst(x, THEM_X + 90, STAR_Y - 210, 70, t, T.snacks[2], { word: 'oh!', color: '#ffd34d', size: 34, life: 0.7 })
    // the speech bubble heart
    if (t > T.say) {
      const p = pop01(t, T.say, 0.4, 2.6) * (1 - prog(t, T.out[0], T.out[1]))
      const cx = TAU_X + 70, cy = STAR_Y - 230, w = 190, h = 150
      x.save(); x.globalAlpha = p; x.translate(cx, cy); x.scale(p, p)
      x.fillStyle = '#f5eedf'; x.strokeStyle = INK; x.lineWidth = 7
      x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.fill(); x.stroke()
      x.beginPath(); x.moveTo(-40, h / 2 - 4); x.lineTo(-70, h / 2 + 46); x.lineTo(-6, h / 2 - 4); x.closePath(); x.fill()
      x.beginPath(); x.moveTo(-40, h / 2); x.lineTo(-70, h / 2 + 46); x.lineTo(-6, h / 2); x.stroke()
      x.restore()
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.say) * 6))
      drawBits(x, HEART, HEART_C, cx, cy + 4, 14 * p * beat)
    }
    sparkles(x, t, THEM_X, STAR_Y - 40, T.light, 10, 150, 2, [GOLD, BONE, '#ff8fb1'])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t > T.snacks[2] && t < T.l2 ? 'wide' : t > T.say ? 'sparkle' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawScene(t)
      drawTheGuide(t)
      factChip(x, t, { text: 'TAURUS: NATURAL RULER OF|THE 2ND HOUSE (VALUES)', at: T.chip, dur: 2.0, x: 540, y: 875, color: GOLD })
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
  ...T.snacks.flatMap((ts, i) => [['whoosh', ts, 0.25, 0.03], ['pop', ts + 0.3, [880, 987.77, 1174.66][i], 0.04, 0.3]]),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['tick', T.gulp, 0.04], ['pop', T.gulp + 0.1, 293.66, 0.04, -0.2],
  ['pop', T.say, 1318.51, 0.05, -0.2], ['pluck', T.say + 0.05, 880, 0.04, 0.6, -0.2], ['glitter', T.light, T.light + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...T.munch.map(m => ['tick', m, 0.04]),
  ...guideCues(T.munch[2] + 0.4, { gain: 0.018 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
