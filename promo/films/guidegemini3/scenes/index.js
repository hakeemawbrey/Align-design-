// guidegemini3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♊ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.80  "Try this week, *Gemini.*"  The ♊ guide, lantern lit, big and centred.
//   2.80–7.20  The guide drifts up. Below, a little café table: tiny Gemini and the other star sit across it; a phone on the
//              table buzzes with pings. YOUR STAR: "one date. phone face down. whole time."  Gemini flips it face down: FLIP.
//              Chip: ★ ASTROLOGY SAYS · GEMINI: NATURAL RULER OF THE 3RD HOUSE (COMMUNICATION).
//   7.20–10.6  YOUR STAR: "watch what happens. (it's good.)"  Sparkles and little pixel flowers bloom around the table,
//              a candle lights, the two stars lean in.
//   10.6–15.6  card flip · "Be *here.* They'll notice."  The other star notices ("!") and a heart floats up.
// One canvas (sky + table + stars + blooms), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, INTER,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('gemini'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.2, 1.6], lift: 1.25, hookOut: [2.55, 2.85], rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, pings: [3.5, 3.9, 4.3, 4.7], flip: 5.15, chip: 5.6,
  l2: 7.3, blooms: [7.6, 7.9, 8.2, 8.5, 8.8, 9.1, 9.4, 9.7], candle: 8.0, lean: [9.0, 9.6],
  close: 10.7, h2: 10.85, h2Land: 11.2, notice: 12.3, heart: 12.7, out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'one date. phone *face down*. whole time.', color: COL },
  { t: T.l2, speaker: SPEAK, text: "watch what happens. (it's *good*.)", color: '#ffe48a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const FLOWER_CS = [{ P: '#ff8fb1', Y: '#ffd34d', G: '#5ec46a' }, { P: '#7fd4ff', Y: '#fffbea', G: '#5ec46a' }, { P: '#e163d6', Y: '#ffd34d', G: '#5ec46a' }]
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }
const CUP = ['WWWWW.', 'WCCCWW', 'WWWWW.', '.WWW..']
const CUP_C = { W: '#f5eedf', C: '#7a4a2a' }

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 580, size: 280 }
const TABLE_Y = 1230, GX = 290, THEM_X = 790, SM = 180, STAR_Y = TABLE_Y - 70
const BLOOM_AT = [[150, 1290], [930, 1290], [380, 1000], [700, 1000], [80, 1100], [1000, 1100], [250, 900], [830, 900]]
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
  const HOOK = guideHook(root, { text: 'Try this week, | *Gemini.*', accentColor: COL, top: 220, size: 112, accentSize: 150, out: T.hookOut })
  const H2 = popText(root, 'Be *here.* | They’ll notice.', { top: 1420, size: 120, accentSize: 170, at: T.h2, gap: 0.08, accentColor: COL, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawPhone(t, a) {
    // a phone lying on the table: screen up (lit, buzzing) → FLIP → face down (dark back)
    const cx = 540, cy = TABLE_Y - 18
    const f = prog(t, T.flip, T.flip + 0.35)
    const sy = Math.abs(Math.cos(Math.PI * f)), up = f < 0.5
    const lift = Math.sin(Math.PI * f) * 70
    const buzz = up && t < T.flip ? T.pings.reduce((m, p) => m + (t > p && t < p + 0.35 ? Math.sin((t - p) * 70) * 5 : 0), 0) : 0
    x.save(); x.globalAlpha = a; x.translate(cx + buzz, cy - lift); x.scale(1, Math.max(0.08, sy))
    x.fillStyle = INK; x.fillRect(-66, -30, 132, 60)
    x.fillStyle = up ? '#7fd4ff' : '#3a2a6c'; x.fillRect(-58, -23, 116, 46)
    if (up) { x.fillStyle = '#fffbea'; x.fillRect(-46, -12, 70, 8); x.fillRect(-46, 4, 50, 8) }
    else { x.fillStyle = '#5a4a9c'; x.fillRect(30, -14, 14, 14) }
    x.restore()
    // the pings: little red badges popping off the screen
    T.pings.forEach((p, i) => {
      if (t < p || t > p + 0.8 || t > T.flip) return
      const q = prog(t, p, p + 0.8)
      x.save(); x.globalAlpha = a * (1 - q); x.fillStyle = '#e8414f'
      const bx = cx + (i % 2 ? 60 : -60) + (i % 2 ? 1 : -1) * q * 40, by = cy - 50 - q * 90
      x.beginPath(); x.arc(bx, by, 18, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff'; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('!', bx, by + 1)
      x.restore()
    })
  }

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    const warm = clamp(prog(t, T.candle, T.candle + 0.8))
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(540, TABLE_Y - 60, 30, 540, TABLE_Y - 60, 520 + warm * 120)
    g0.addColorStop(0, `rgba(255,200,110,${0.18 + warm * 0.2})`); g0.addColorStop(1, 'rgba(255,200,110,0)')
    x.fillStyle = g0; x.fillRect(0, TABLE_Y - 640, 1080, 1000)
    x.restore()
    // blooms around the table
    T.blooms.forEach((tb, i) => {
      if (t < tb) return
      const p = pop01(t, tb, 0.4, 2.6) * a
      const [bx, by] = BLOOM_AT[i]
      if (i % 3 !== 2) drawBits(x, FLOWER, FLOWER_CS[i % 3], bx, by + Math.sin(t * 2 + i) * 4, 10 * p)
      else { x.save(); x.globalAlpha = p; drawPixelStar(x, bx, by + Math.sin(t * 2 + i) * 6, 30 + 6 * Math.sin(t * 4 + i), 2, [GOLD, BONE, '#ff8fb1'][i % 3]); x.restore() }
    })
    const k1 = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out), k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const lean = 40 * ease.inOutCubic(prog(t, ...T.lean))
    const phoneTime = t < T.flip
    const gMood = phoneTime ? 'neutral' : t > T.lean[0] ? 'sparkle' : 'happy'
    drawStarChar(x, GX + lean, STAR_Y, SM, t, { color: COL, glyph: S.glyph, mood: gMood, look: phoneTime ? [1, 1] : [1, 0], seed: 4, glow: 0.85, pop: k1, hops: [T.flip - 0.05] })
    const themMood = phoneTime ? 'neutral' : t > T.heart ? 'heart' : t > T.notice ? 'wide' : t > T.blooms[2] ? 'happy' : 'neutral'
    drawStarChar(x, THEM_X - lean, STAR_Y, SM, t, { color: THEM, mood: themMood, look: phoneTime ? [-1, 0] : [-1, 0], seed: 9, glow: 0.7, pop: k2, hops: [T.notice] })
    // the table: a round café top on a stem
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(522, TABLE_Y, 36, 130); x.fillRect(470, TABLE_Y + 120, 140, 16)
    x.fillStyle = '#c08a52'; x.beginPath(); x.ellipse(540, TABLE_Y, 260, 42, 0, 0, Math.PI * 2); x.fill()
    x.lineWidth = 6; x.strokeStyle = INK; x.stroke()
    x.fillStyle = '#e0a860'; x.beginPath(); x.ellipse(540, TABLE_Y - 6, 240, 28, 0, Math.PI, Math.PI * 2); x.fill()
    x.restore()
    drawBits(x, CUP, CUP_C, 380, TABLE_Y - 28, 8 * a)
    drawBits(x, CUP, CUP_C, 700, TABLE_Y - 28, 8 * a, { flipX: true })
    drawPhone(t, a)
    // the candle (lights at T.candle)
    if (t > T.candle - 0.4) {
      const p = pop01(t, T.candle - 0.4, 0.3, 2) * a
      x.save(); x.globalAlpha = p; x.fillStyle = INK; x.fillRect(612, TABLE_Y - 84, 24, 64); x.fillStyle = '#f5eedf'; x.fillRect(616, TABLE_Y - 80, 16, 58)
      if (t > T.candle) { const fl = 0.85 + 0.15 * Math.sin(t * 19); x.fillStyle = '#ffd34d'; x.fillRect(616, TABLE_Y - 106 * fl, 16, 22); x.fillStyle = '#fffbea'; x.fillRect(620, TABLE_Y - 96, 8, 10) }
      x.restore()
    }
    drawBurst(x, 540, TABLE_Y - 150, 70, t, T.flip + 0.15, { word: 'FLIP', color: '#ffe48a', size: 30, life: 0.6 })
    sparkles(x, t, 540, TABLE_Y - 80, T.flip + 0.3, 10, 160, 1, [GOLD, BONE, COL])
    // "!" then a heart: they noticed
    if (t > T.notice && t < T.notice + 0.8) {
      const q = pop01(t, T.notice, 0.25, 3) * (1 - prog(t, T.notice + 0.5, T.notice + 0.8))
      x.save(); x.globalAlpha = q * a; x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 8; x.font = `800 ${Math.round(70 * q)}px ${INTER}`; x.textAlign = 'center'
      x.strokeText('!', THEM_X - lean + 60, STAR_Y - 110); x.fillText('!', THEM_X - lean + 60, STAR_Y - 110); x.restore()
    }
    if (t > T.heart) {
      const p = pop01(t, T.heart, 0.4, 3), q = 1 - prog(t, T.out[0] - 0.4, T.out[0])
      drawBits(x, HEART, HEART_C, 540, TABLE_Y - 230 - Math.min(1.2, t - T.heart) * 30 + Math.sin(t * 2) * 6, 10 * p, { alpha: q * a })
    }
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t > T.blooms[0] ? 'sparkle' : t < T.flip ? 'eyeroll' : 'happy'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawScene(t)
      factChip(x, t, { text: 'GEMINI: NATURAL RULER OF THE|3RD HOUSE (COMMUNICATION)', at: T.chip, dur: 1.75, x: 540, y: 810, color: GOLD, size: 28 })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const NOTES = [880, 987.77, 1174.66, 1318.51, 1479.98, 1567.98, 1760, 1975.53]
export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.024 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, -0.3], ['pop', T.scene + 0.22, 659.25, 0.035, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...T.pings.flatMap(p => [['pop', p, 1567.98, 0.03, 0.3], ['tick', p + 0.05, 0.03]]),
  ['whoosh', T.flip, 0.25, 0.035], ['tick', T.flip + 0.35, 0.05], ['glitter', T.flip + 0.3, T.flip + 0.6],
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ...T.blooms.map((tb, i) => ['pluck', tb, NOTES[i], 0.028, 0.5, (i % 2 ? 0.3 : -0.3)]),
  ['bell', T.candle, 1318.51, 0.02, 1.2, 0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 4, 0.08, 1, 0.026),
  ['pop', T.notice, 1567.98, 0.04, 0.3], ['pop', T.heart, 1318.51, 0.04, 0], ...guideCues(T.heart + 0.2, { gain: 0.02 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
