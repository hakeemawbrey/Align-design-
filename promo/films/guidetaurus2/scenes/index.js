// guidetaurus2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♉ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.40  "What you *need,* Taurus."  The ♉ guide, lantern lit, big and centred.
//   2.40–5.80  The guide drifts up; its lantern lights a pixel month calendar. A rubber stamp thunks the same heart onto
//              every Friday, week after week.  YOUR STAR: "someone who shows up the same way twice."
//              Chip: ★ ASTROLOGY SAYS · IN TRADITIONAL ASTROLOGY, TAURUS RULES THE THROAT.
//   5.80–8.50  A flashy firework rockets onto a random Tuesday: BANG… then FZZT, it fizzles to smoke. The four Friday hearts
//              glow on, steady.  YOUR STAR: "steady is your love language."
//   8.50–10.6  card flip · "Pick *consistent* over exciting."  The Friday hearts pulse together.
// One canvas (sky + calendar + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, MONO,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const S = guideSign('taurus'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)

const T = {
  wink: [1.0, 1.4], lift: 1.05, hookOut: [2.15, 2.45], rise: [2.2, 2.95], scene: 2.4,
  open: 2.62, l1: 2.8, stamps: [3.2, 3.65, 4.1, 4.55], chip: 4.4,
  l2: 5.85, rocket: 5.95, bang: 6.35, fizz: 6.95, steady: 7.4,
  close: 8.5, h2: 8.62, h2Land: 8.98, out: [10.1, 10.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'someone who shows up the *same* way twice.', color: COL },
  { t: T.l2, speaker: SPEAK, text: 'steady is your *love language*.', color: '#ffd38a' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }
const STAMP = ['..HH..', '..HH..', '.HHHH.', 'BBBBBB', 'PPPPPP']
const STAMP_C = { H: '#7a4a2a', B: '#c08a52', P: '#ff5c8e' }
const ROCKET = ['..R..', '.RRR.', '.RWR.', '.RRR.', 'RRRRR', '.Y.Y.']
const ROCKET_C = { R: '#e163d6', W: '#fffbea', Y: '#ffd34d' }

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 560, size: 270 }
const CAL = { x: 540, y: 1040, w: 760, h: 440, cols: 7, rows: 4 }
const FRI = 4, TUE = 1
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}
const cellXY = (c, r) => {
  const cw = CAL.w / CAL.cols, ch = (CAL.h - 120) / CAL.rows
  return [CAL.x - CAL.w / 2 + cw * (c + 0.5), CAL.y - CAL.h / 2 + 120 + ch * (r + 0.5), cw, ch]
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 2, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: 'What you *need,* | Taurus.', accentColor: COL, top: 220, size: 112, out: T.hookOut })
  const H2 = popText(root, 'Pick *consistent* | over exciting.', { top: 1420, size: 108, accentSize: 150, at: T.h2, gap: 0.07, accentColor: COL, lineHeight: 1.04 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawCalendar(t) {
    const a = pop01(t, T.scene, 0.45, 1.8) * popOut(t, T.out)
    if (a <= 0.01) return
    x.save(); x.globalAlpha = clamp(a); x.translate(CAL.x, CAL.y); x.scale(a, a); x.translate(-CAL.x, -CAL.y)
    const L = CAL.x - CAL.w / 2, Tp = CAL.y - CAL.h / 2
    // paper + ink border + a binding strip
    x.fillStyle = INK; x.fillRect(L - 8, Tp - 8, CAL.w + 16, CAL.h + 16)
    x.fillStyle = '#f5eedf'; x.fillRect(L, Tp, CAL.w, CAL.h)
    x.fillStyle = COL; x.fillRect(L, Tp, CAL.w, 64)
    for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(L + 70 + i * 124, Tp - 22, 14, 40) }
    x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('EVERY FRIDAY', CAL.x, Tp + 34)
    x.font = `700 26px ${MONO}`
    'MTWTFSS'.split('').forEach((d, c) => { const [cx] = cellXY(c, 0); x.fillStyle = c === FRI ? '#c2304f' : '#7a6aa8'; x.fillText(d, cx, Tp + 94) })
    for (let r = 0; r < CAL.rows; r++) for (let c = 0; c < CAL.cols; c++) {
      const [cx, cy, cw, ch] = cellXY(c, r)
      x.strokeStyle = 'rgba(122,106,168,0.45)'; x.lineWidth = 2; x.strokeRect(cx - cw / 2 + 4, cy - ch / 2 + 4, cw - 8, ch - 8)
      x.fillStyle = 'rgba(122,106,168,0.7)'; x.font = `400 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'top'
      x.fillText(String(r * 7 + c + 1), cx - cw / 2 + 10, cy - ch / 2 + 8)
    }
    x.restore()
    // the Friday hearts (stamped one per week), pulsing together once it's steady
    T.stamps.forEach((ts, r) => {
      if (t < ts + 0.18) return
      const [cx, cy] = cellXY(FRI, r)
      const p = pop01(t, ts + 0.18, 0.3, 3)
      const beat = t > T.steady ? 1 + 0.12 * Math.max(0, Math.sin((t - T.steady) * 5)) : 1
      if (t > T.steady) {
        x.save(); const g = x.createRadialGradient(cx, cy, 0, cx, cy, 70); g.addColorStop(0, `rgba(255,120,160,${0.45 * a})`); g.addColorStop(1, 'rgba(255,120,160,0)')
        x.fillStyle = g; x.fillRect(cx - 70, cy - 70, 140, 140); x.restore()
      }
      drawBits(x, HEART, HEART_C, cx, cy + 6, 8 * p * beat * a, { alpha: clamp(a) })
    })
    // the stamp: hovers over each Friday and thunks down
    if (t > T.stamps[0] - 0.3 && t < T.stamps[3] + 0.6) {
      let r = 0; for (let i = 0; i < 4; i++) if (t > T.stamps[i] - 0.25) r = i
      const [cx, cy] = cellXY(FRI, r)
      const ts = T.stamps[r], d = t - ts
      const lift = d < 0 ? 90 : d < 0.18 ? lerp(90, 0, ease.inCubic(d / 0.18)) : lerp(0, 90, ease.outCubic(clamp((d - 0.18) / 0.25)))
      const out = 1 - prog(t, T.stamps[3] + 0.3, T.stamps[3] + 0.6)
      drawBits(x, STAMP, STAMP_C, cx, cy - 30 - lift, 13, { alpha: out * clamp(a) })
    }
    // the flashy firework on a random Tuesday
    const [tx, ty] = cellXY(TUE, 2)
    if (t > T.rocket && t < T.bang) {
      const p = prog(t, T.rocket, T.bang)
      drawBits(x, ROCKET, ROCKET_C, lerp(-80, tx, p), lerp(1500, ty, ease.outCubic(p)) - Math.sin(Math.PI * p) * 160, 9, { rot: lerp(0.9, 0, p) })
    }
    if (t > T.bang && t < T.fizz + 1.0) {
      const tt = t - T.bang, fz = prog(t, T.fizz, T.fizz + 0.6)
      x.save()
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2, R = (1 - Math.exp(-tt * 6)) * 170 * (1 - fz * 0.8)
        x.globalAlpha = (1 - fz) * clamp(a)
        x.fillStyle = ['#e163d6', '#ffd34d', '#3ce6cf', '#fffbea'][i % 4]
        x.fillRect(Math.round(tx + Math.cos(ang) * R - 7), Math.round(ty + Math.sin(ang) * R - 7 + fz * 60), 14, 14)
      }
      // smoke once it fizzles
      for (let i = 0; i < 5; i++) {
        const p = prog(t, T.fizz + i * 0.05, T.fizz + 0.9 + i * 0.05)
        if (p <= 0 || p >= 1) continue
        x.globalAlpha = 0.55 * (1 - p); x.fillStyle = '#aab3c8'
        const s = 16 + p * 30
        x.fillRect(Math.round(tx - 20 + i * 12 - s / 2), Math.round(ty - p * 120 - i * 8), s, s)
      }
      x.restore()
    }
    drawBurst(x, tx + 30, ty - 120, 90, t, T.bang, { word: 'BANG!', color: '#ffd34d', size: 30, life: 0.55 })
    drawBurst(x, tx + 30, ty - 110, 80, t, T.fizz, { word: 'fzzt.', color: '#aab3c8', size: 36, life: 0.8 })
    sparkles(x, t, cellXY(FRI, 1)[0], cellXY(FRI, 1)[1] + 70, T.steady, 10, 160, 1, [GOLD, BONE, '#ff8fb1'])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t > T.bang && t < T.fizz ? 'wide' : t > T.fizz && t < T.steady ? 'eyeroll' : t > T.steady ? 'heart' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawCalendar(t)
      factChip(x, t, { text: 'IN TRADITIONAL ASTROLOGY,|TAURUS RULES THE THROAT', at: T.chip, dur: 2.0, x: 540, y: 1345, color: GOLD, size: 28 })
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
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.2, 880, 0.035, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...T.stamps.flatMap((ts, i) => [['boom', ts + 0.18, 0.07], ['pop', ts + 0.2, [880, 880, 880, 1174.66][i], 0.04, 0.2]]),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['whoosh', T.rocket, 0.4, 0.04], ['boom', T.bang, 0.16], ['glitter', T.bang, T.bang + 0.3], ['pop', T.fizz, 349.23, 0.04, -0.2], ['whoosh', T.fizz, 0.5, 0.02],
  ['pluck', T.steady, 880, 0.035, 0.6, 0.2], ['pluck', T.steady + 0.2, 1174.66, 0.03, 0.6, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 4, 0.07, 1, 0.026),
  ...guideCues(T.h2 + 0.5, { gain: 0.02 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
