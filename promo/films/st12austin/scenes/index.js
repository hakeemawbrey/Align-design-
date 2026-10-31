// st12austin (15 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E30) · story 0–10.6, then the shared end
// card ("SIGN UP TO VOTE YOUR CITY").
//   0.00   🔥 HOT TAKE "Austin is *overrated* for dating."  ♌ Leo, mid-smirk in pixel shades, holds up a scorecard ("2/10")
//          in front of a little live-music stage under string lights. Heat: 5 flames.
//   2.45   OBJECTION! (record scratch) The Austin star bursts in from the right, guitar first, and hits a power chord.
//          AUSTIN: "live music. every *night.*"   LEO: "and three *bad* dates here."
//   7.35   THE STARS RULE: "no city is overrated. bad dates are."
//   8.85   🔥 AGREE · 🧊 DISAGREE?
//   9.10   "No city's *overrated*. | Effort isn't."  The frame-0 pose again, changed: Leo still holds up the scorecard, but
//          it now reads "10/10" and Leo has the guitar strap over one shoulder; the Austin star leans in, grinning.
// Rewatch bait: a little flock of pixel bats crosses the moon at the start and comes back the other way at the end.
// One canvas (sky + stage + cast + sthot devices), DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 15
export const KEY = 'F#m'
const NUMERAL = 'S12 E30'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CYAN = '#7fe0ff', MAG = '#ff5fd2'
const W = 1080
const LEO = signStar('leo')

const T = {
  takeOut: [2.5, 2.65],
  obj: 2.5, atxIn: [2.5, 2.85], chord: 2.85, 
  open: 2.6, l1: 2.75, l2: 5.33, close: 7.72,
  verdict: 7.67, verdictOut: [10.4, 10.58],
  pill: 9.07, pillDur: 0.6,
  last: 9.22, lastLand: 9.47, share: 7.67, out: [10.4, 10.58],
}
const LEO_T = '♌ LEO', ATX = 'AUSTIN STAR'
const LINES = [
  { t: T.l1, speaker: ATX, text: 'live music. every *night.*', color: CYAN },
  { t: T.l2, speaker: LEO_T, text: 'and three *bad* dates here.', color: LEO.color },
]
const CPS = 28
const HEAT = 5, PICK = 'disagree'
const VERDICT = 'no city is overrated. | bad dates *are.*'

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

const GUITAR = [
  '..................KK',
  '.................KKK',
  '................KK..',
  '...............nn...',
  '..............nn....',
  '.............nn.....',
  '..BBBB......nn......',
  '.BbbbbB....nn.......',
  'BbbbbbbBBBnn........',
  'BbbHHbbbbnB.........',
  'BbHkkHbbbbB.........',
  'BbHkkHbbbbB.........',
  'BbbHHbbbbB..........',
  '.BbbbbbbB...........',
  '..BBBBBB............',
]
const GUITAR_C = { K: '#2a2156', n: '#8a5a2a', B: '#2a8a9a', b: '#3fc8c0', H: '#ffd166', k: '#1b1236' }
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const BAT = ['B...B', 'BB.BB', '.BBB.']
const SHADES = ['KKKKKKKKKKKKKK', 'KggKK..KKggKK.', '.KKK....KKKK..']

const LEO_P = { x: 320, y: 1250, s: 370 }, ATX_P = { x: 790, y: 1250, s: 350 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: 'Austin is *overrated* | for dating.', at: 0, out: T.takeOut, accentColor: CYAN })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut, dim: 0.35 })
  const LAST = popText(root, "No city's *overrated*. | Effort isn't.", { top: 200, size: 84, accentSize: 124, fit: true, at: T.last, late: 0, wobble: true, gap: 0.06, accentColor: GOLD, lineHeight: 1.0 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const LEO_HOPS = [0.3, ...talkHops(LINES, LEO_T, { cps: CPS }), T.lastLand]
  const ATX_HOPS = [T.atxIn[1], T.chord, ...talkHops(LINES, ATX, { cps: CPS }), T.lastLand + 0.1]

  function stringLights(t) {
    for (const [y0, sag, s] of [[700, 110, 0], [830, 80, 1]]) {
      x.strokeStyle = '#140c2c'; x.lineWidth = 4; x.beginPath()
      for (let xx = -20; xx <= 1100; xx += 20) { const u = (xx + 20) / 1120, y = y0 + sag * 4 * u * (1 - u); xx === -20 ? x.moveTo(xx, y) : x.lineTo(xx, y) }
      x.stroke()
      for (let i = 0; i < 15; i++) {
        const xx = -10 + i * 76 + s * 38, u = (xx + 20) / 1120, y = y0 + sag * 4 * u * (1 - u)
        const tw = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.7 + s)
        const g = x.createRadialGradient(xx, y + 12, 0, xx, y + 12, 30)
        g.addColorStop(0, `rgba(255,217,138,${0.4 * tw})`); g.addColorStop(1, 'rgba(255,217,138,0)')
        x.fillStyle = g; x.fillRect(xx - 30, y - 18, 60, 60)
        x.fillStyle = ['#ffd98a', '#ff9f6b', '#fff1c8', '#ffb3cc'][(i + s) % 4]; x.fillRect(xx - 6, y + 4, 12, 14)
      }
    }
  }
  function stageSet(t) {
    // the little stage + amp behind the cast, and the floor
    x.fillStyle = '#140c2c'; x.fillRect(90, 1060, 900, 96)
    x.fillStyle = '#6b4024'; x.fillRect(96, 1066, 888, 14); x.fillStyle = '#4a2a18'; x.fillRect(96, 1080, 888, 70)
    // the amp, pumping after the power chord
    const bk = t > T.chord ? Math.exp(-((t - T.chord) % 0.47) * 7) : 0
    x.fillStyle = INK; x.fillRect(820, 904, 150, 156); x.fillStyle = '#2a2156'; x.fillRect(826, 910, 138, 144)
    x.fillStyle = '#4b3f80'; x.beginPath(); x.arc(895, 990, 40 + bk * 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#140c2c'; x.beginPath(); x.arc(895, 990, 13, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#100a24'; x.fillRect(0, 1156, W, 900)
    x.strokeStyle = 'rgba(255,95,210,0.22)'; x.lineWidth = 3
    for (let k = 0; k < 9; k++) { const y = 1176 + k * k * 9; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke() }
    for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(540 + k * 40, 1156); x.lineTo(540 + k * 260, 1920); x.stroke() }
  }
  function bats(t, t0, dir) {
    const p = prog(t, t0, t0 + 1.6)
    if (p <= 0 || p >= 1) return
    for (let i = 0; i < 5; i++) {
      const bx = dir > 0 ? lerp(760, 1120, p) - i * 26 : lerp(1120, 760, p) + i * 26
      const by = 150 + Math.sin(p * 9 + i) * 10 + (i % 2) * 16
      drawBits(x, BAT, { B: '#0b0820' }, Math.round(bx), Math.round(by), 4, { outline: null, flip: Math.floor(t * 10 + i) % 2 === 0 })
    }
  }
  function scorecard(cx, cy, label, k, a) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(0.12); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-74, -54, 148, 108); x.fillStyle = BONE; x.fillRect(-66, -46, 132, 92)
    x.fillStyle = label === '10/10' ? '#2a8a4a' : '#c8352c'
    x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 2)
    x.fillStyle = '#6b4024'; x.fillRect(-6, 54, 12, 70)
    x.restore()
  }
  function notes(t, cx, cy, t0, t1) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.3
      if (t < born || t > t1) continue
      const p = ((t - born) % 1.8) / 1.8
      drawBits(x, NOTE, { X: [CYAN, MAG, BONE, GOLD][i % 4] }, Math.round(cx + (i % 3 - 1) * 80 + Math.sin(p * 6 + i) * 20), Math.round(cy - p * 160), 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      bats(t, 0, 1); bats(t, 8.7, -1)
      stringLights(t)
      stageSet(t)
      const ok = outK(t, T.out)
      const sharing = t > T.share
      const leoMood = sharing ? 'happy' : t > T.l2 ? 'squint' : t > T.obj ? 'wide' : 'wink'
      const rl = drawStarChar(x, LEO_P.x, LEO_P.y, LEO_P.s, t, { color: LEO.color, glyph: LEO.glyph, mood: leoMood, look: t > T.obj ? [1, 0] : [0, 0], hops: LEO_HOPS, seed: 5, glow: 1.1, alpha: ok })
      // pixel shades on Leo until the objection knocks them up onto its head
      const up = ease.outBack(prog(t, T.obj, T.obj + 0.3))
      if (!sharing) drawBits(x, SHADES, { K: INK, g: '#ff5fd2' }, Math.round(rl.x), Math.round(rl.y - LEO_P.s * 0.04 - up * LEO_P.s * 0.2), 6, { outline: null, alpha: ok })
      scorecard(rl.x + 200, rl.y - 160, sharing ? '10/10' : '2/10', sharing ? pop01(t, T.share + 0.1, 0.3) : 1, ok)
      // the Austin star bursts in, guitar first
      if (t > T.atxIn[0]) {
        const ai = ease.outBack(prog(t, ...T.atxIn))
        const ax = sharing ? lerp(ATX_P.x, 700, ease.inOutCubic(prog(t, T.share, T.share + 0.35))) : lerp(1320, ATX_P.x, ai)
        const atxMood = sharing ? 'happy' : t > T.l2 ? 'wide' : 'sparkle'
        const strum = t > T.chord && t < T.chord + 0.5 ? 0.12 * Math.sin((t - T.chord) * 40) : 0
        const ra = cityStar(x, ax, ATX_P.y, ATX_P.s, t, { city: 'ATX', prop: sharing ? false : 'guitar', mood: atxMood, look: [-1, 0], hops: ATX_HOPS, seed: 9, alpha: ok, squash: strum })
        notes(t, ra.x, ra.top, T.chord, T.l2 + 1.5)
      }
      // sharing: the guitar strap is over Leo's shoulder now
      if (sharing) drawBits(x, GUITAR, GUITAR_C, Math.round(rl.x + 30), Math.round(rl.y + LEO_P.s * 0.16), 10 * pop01(t, T.share, 0.3), { rot: -0.25, alpha: ok })

      take.update(t)
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.out))
      ox.clearRect(0, 0, W, 1920)
      heatMeter(ox, t, { level: HEAT, at: -1, out: [T.verdict - 0.2, T.verdict] })
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      agreePill(ox, t, { at: T.pill, dur: T.pillDur, pick: PICK })
      drawGrain(gx, t)
    },
  }
}

const CUTS = []
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' })]

const NOTE_HZ = [739.99, 830.61, 880, 987.77, 1108.73, 1174.66, 1479.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.atxIn[0], 0.35, 0.03],
  ['pluck', T.chord, 369.99, 0.06, 1.2, 0.3], ['pluck', T.chord + 0.02, 554.37, 0.05, 1.2, 0.3], ['pluck', T.chord + 0.04, 739.99, 0.05, 1.2, 0.3],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEO_T]: 659.25, [ATX]: 987.77 } }),
  ['pop', T.share + 0.1, 1108.73, 0.04, -0.3],
  ...wordPops(T.last, 5, 0.06, 0, 0.026),
  ['tick', 8.9, 0.015],
  ...endcardCues(STORY_END),
]
