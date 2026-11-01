// hxpollen (20 s vertical Align ad, Star Talk "HOT TAKES", Houston edition) · story 0–15.6, then the shared end card.
//   🔥 "Pollen season is not a *personality*."  Heat 3.
//   0.00   frame 0 = the thumbnail: the hot-take stamp + the take; a park bench under a big oak shedding yellow pollen,
//          the Houston star (HOU badge) beside ♉ Taurus, who clutches a tissue box, eyes watering.
//   2.45   OBJECTION! TAURUS: "it’s just a little… a… *AH-CHOO!*"  The sneeze lands mid-objection: a yellow pollen
//          cloud bursts across the frame (shake + gasp zoom).
//   ~6     HOUSTON: "reschedule? *no pressure.*"
//   ~8.4   TAURUS (relieved): "yes. *thank you* for asking."
//   ~10.5  THE STARS RULE: "It’s fine to reschedule. | Just *say so*."
//   ~13.4  AGREE / DISAGREE?  "Reschedule *kindly*."  The end rhymes with frame 0: the same bench, the same two stars,
//          but LATER THAT SPRING: the pollen's gone, the oak is green, Taurus holds a little flower instead of tissues.
//   Rewatch bait: the squirrel on the oak branch sneezes at exactly the same moment as Taurus. ♓ Pisces is crying
//          behind the tree trunk (allergies. or feelings. both).
// Gentle allergy teasing; healthy advice. No card transition (a 20 s film). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts, slamShake } from '../../sthot.js'

export const DURATION = 20
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BONE = '#efe6d6', INK = '#1b1236', POLLEN = '#ffe14a', TAUC = '#a8e6a0'
const TAU = signStar('taurus'), PIS = signStar('pisces')

const T = { take: 0, takeOut: [2.6, 2.75], heat: 0.3, obj: 2.45, open: 2.6, l1: 2.72 }
const HO = 'HOUSTON STAR', TA = '♉ TAURUS'
const LINES = [
  { t: T.l1, speaker: TA, text: 'it’s just a little… a… *AH-CHOO!*', color: POLLEN },
  { t: 0, speaker: HO, text: 'reschedule? *no pressure.*', color: '#ffb08a' },
  { t: 0, speaker: TA, text: 'yes. *thank you* for asking.', color: TAUC },
]
const CPS = 30
const TAKE = 'Pollen season is not a *personality*.'
const VERDICT = 'It’s fine to reschedule. | Just *say so*.'
const LAST = 'Reschedule *kindly*.'

const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5)
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.3)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 1.6), r3(VEND + 1.6 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.pillDur = 0.6
T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.sneeze = r3(LT[0].chars[LINES[0].text.replace(/\*/g, '').indexOf('AH-CHOO')] ?? LT[0].done - 0.3)   // the moment "AH-CHOO" types
T.relief = r3(LINES[2].t)
T.later = r3(T.verdict + 0.5)                        // behind the verdict: LATER THAT SPRING
T.cal = r3(LINES[1].t + 0.35)                         // a little calendar page pops up between them: LATER?

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HO_P = { x: 420, y: 1170 }, TA_P = { x: 760, y: 1170 }
const HO_HOPS = [0.25, ...talkHops(LINES, HO, { cps: CPS }), T.last + 0.1]
const TA_HOPS = [T.obj + 0.05, ...talkHops(LINES, TA, { cps: CPS }), T.sneeze, T.last + 0.2]
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#1a2a20' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ffe98a' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 260, size: 116, accentSize: 176, at: T.last, gap: 0.08, accentColor: '#9ee6a8', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  function tears(cx, cy, size, t) {
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.6 + i / 3 + (side > 0 ? 0.17 : 0)) % 1)
      x.globalAlpha = 1 - ph; R('#8fd6ff', cx + side * size * 0.17 + side * ph * size * 0.08 - 3, cy + size * 0.02 + ph * size * 0.5, 6, 8)
    }
    x.globalAlpha = 1
  }
  function sky(later) {
    const bands = later ? ['#1c3a6a', '#24508a', '#2e64a0', '#4a86b8', '#6aa6c8', '#8cc4d4'] : ['#3a3a1c', '#5a5424', '#7a7030', '#9a8a3a', '#b8a44a', '#cfbc5c']
    bands.forEach((c, i) => R(c, 0, i * 170, 1080, 172))
  }
  function park(t, later) {
    // grass
    R(later ? '#2f7a3a' : '#5a7a2a', 0, 1000, 1080, 920)
    for (let i = 0; i < 60; i++) R(later ? '#3f9a4a' : '#6e8a30', (i * 173) % 1080, 1010 + (i * 97) % 880, 10, 18)
    // a path
    R(later ? '#c9b48a' : '#b8a46a', 0, 1330, 1080, 140)
    // the oak: trunk + canopy (yellow catkins in pollen season)
    R(INK, 120, 640, 120, 400); R('#6a4a2e', 128, 640, 104, 400)
    R(INK, 230, 760, 260, 26); R('#6a4a2e', 230, 764, 256, 18)           // the branch the squirrel sits on
    const cols = later ? ['#2e8a3e', '#3fa24e', '#5fc06a'] : ['#6a8a2a', '#8aa02e', POLLEN]
    for (let i = 0; i < 26; i++) { const cx = 60 + (i * 79) % 420, cy = 520 + (i * 53) % 220, r = 50 + (i * 13) % 40; R(INK, cx - r - 6, cy - r * 0.7 - 6, r * 2 + 12, r * 1.4 + 12); R(cols[i % 3], cx - r, cy - r * 0.7, r * 2, r * 1.4) }
    // Pisces peeking from behind the trunk, crying
    const pis = drawStarChar(x, 280, 1000, 100, t, { ...PIS, glyph: null, mood: later ? 'happy' : 'squint', look: [1, 0], seed: 21, glow: 0.5, bob: 1 })
    tears(pis.x, pis.y, 100, t)
    R(INK, 120, 900, 120, 140); R('#6a4a2e', 128, 900, 104, 140)          // the trunk in front of Pisces' lower half
  }
  /** the squirrel on the branch: sneezes exactly with Taurus (the rewatch bait) */
  function squirrel(t, sx, sy) {
    const sn = t >= T.sneeze && t < T.sneeze + 0.35
    const pre = t >= T.sneeze - 0.5 && t < T.sneeze
    x.save(); x.translate(sx, sy + (sn ? 6 : 0)); x.scale(sn ? 1.15 : pre ? 0.92 : 1, sn ? 0.85 : pre ? 1.1 : 1)
    const S = ['...TT...', '..TTTT..', '.TTWT...', 'BBBTT...', 'BBTTTTT.', '.BTTTTTT', '..TTTTT.', '..T..T..']
    S.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(ch === 'W' ? (sn ? INK : '#ffffff') : ch === 'B' ? '#9a6a3e' : '#7a5232', (i - 4) * 8, (j - 8) * 8, 8, 8) }))
    x.restore()
  }
  /** drifting pollen motes; burst = the sneeze cloud (0…1) */
  function pollen(t, burst, alpha) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha = alpha
    for (let i = 0; i < 90; i++) {
      const sx = (hash(i) * 1200 + t * (30 + hash(i + 3) * 50)) % 1200 - 60
      const sy = (hash(i + 7) * 1100 + 450 + t * (20 + hash(i + 9) * 30)) % 1100 + 450
      R(i % 4 ? POLLEN : '#fff6a8', sx + Math.sin(t * 2 + i) * 10, sy, i % 3 ? 6 : 10, i % 3 ? 6 : 10)
    }
    if (burst > 0 && burst < 1) {
      const e = ease.outCubic(burst)
      for (let i = 0; i < 60; i++) {
        const an = hash(i + 20) * Math.PI * 2, d = e * (180 + hash(i + 30) * 380)
        x.globalAlpha = alpha * (1 - burst)
        R(i % 3 ? POLLEN : '#fff6a8', TA_P.x - 80 + Math.cos(an) * d * 1.2, TA_P.y - 60 + Math.sin(an) * d * 0.7, 14, 14)
      }
      x.globalAlpha = alpha * 0.5 * (1 - burst)
      x.fillStyle = POLLEN; x.beginPath(); x.ellipse(TA_P.x - 80, TA_P.y - 60, 140 + 300 * e, 90 + 160 * e, 0, 0, Math.PI * 2); x.fill()
    }
    x.restore()
  }
  function bench() {
    R(INK, 220, 1180, 700, 30); R('#8a5a3a', 226, 1184, 688, 22)
    R(INK, 220, 1230, 700, 30); R('#8a5a3a', 226, 1234, 688, 22)
    R(INK, 250, 1260, 26, 90); R(INK, 864, 1260, 26, 90)
  }
  function tissues(tx, ty, k) {
    if (k <= 0) return
    x.save(); x.translate(tx, ty); x.scale(k, k)
    R(INK, -56, -30, 112, 64); R('#ffb8d0', -50, -24, 100, 52); R('#ff8fb1', -50, 8, 100, 8)
    R(INK, -20, -28, 40, 10); R('#ffffff', -16, -56, 32, 32); R('#ffffff', -26, -44, 20, 16)
    x.restore()
  }
  function flower(fx, fy, k) {
    if (k <= 0) return
    x.save(); x.translate(fx, fy); x.scale(k, k)
    R(INK, -5, -10, 10, 80); R('#3fa24e', -2, -8, 4, 76)
    for (const [dx, dy] of [[-18, -24], [18, -24], [0, -42], [0, -6]]) { R(INK, dx - 16, dy - 16, 32, 32); R('#ff8fb1', dx - 12, dy - 12, 24, 24) }
    R(INK, -12, -36, 24, 24); R(POLLEN, -8, -32, 16, 16)
    x.restore()
  }
  /** a little calendar page: LATER? → LATER ✓ once Taurus says yes */
  function calendar(t, k) {
    if (k <= 0) return
    const yes = t >= T.relief + 0.3
    x.save(); x.translate(590, 900 + Math.sin(t * 3) * 6); x.rotate(0.06); x.scale(k * (yes ? 1 + 0.12 * Math.max(0, 1 - (t - T.relief - 0.3) / 0.25) : 1), k)
    R(INK, -110, -80, 220, 160); R('#fff8e6', -104, -74, 208, 148); R('#ff5d73', -104, -74, 208, 40)
    R(INK, -70, -96, 14, 34); R(INK, 56, -96, 14, 34)
    x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = yes ? '#2f8a4a' : INK; x.fillText(yes ? 'LATER ✓' : 'LATER?', 0, 22)
    x.restore()
  }
  function laterTag(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText('LATER THAT SPRING').width + 48
    R(INK, 540 - w / 2 - 4, 896, w + 8, 64); R('#1d3a5a', 540 - w / 2, 900, w, 56)
    x.fillStyle = '#9fe0ff'; x.fillText('LATER THAT SPRING', 540, 929)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const later = t >= T.later
      const sh = slamShake(t, T.sneeze, 16, 0.45)
      const z = t < T.relief - 0.05 ? gaspZoom(t, { at: T.sneeze, dur: 1.4, x: TA_P.x, y: TA_P.y - 60, amount: 0.2, follow: 0.5 }) : gaspZoom(t, { at: T.relief, dur: 1.3, x: TA_P.x, y: TA_P.y - 40, amount: 0.16, follow: 0.5 })
      x.save(); x.translate(sh, 0); z.apply(x)
      sky(later)
      // a dark band behind the take so it reads on the pollen-yellow sky (fades with the stamp)
      { const k = 1 - prog(t, T.takeOut[0], T.takeOut[1] + 0.2); if (k > 0) { const g = x.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, `rgba(20,24,10,${0.85 * k})`); g.addColorStop(0.7, `rgba(20,24,10,${0.6 * k})`); g.addColorStop(1, 'rgba(20,24,10,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 700) } }
      park(t, later)
      squirrel(t, 400, 760)
      bench()
      const hMood = t < T.obj ? { mood: 'neutral', look: [1, 0] } : t < LINES[1].t ? { mood: 'wide', look: [1, 0], blink: false } : t < T.verdict ? { mood: 'happy', look: [1, 0] } : { mood: 'happy', look: [1, 0] }
      cityStar(x, HO_P.x, HO_P.y, 260, t, { city: 'HOU', ...hMood, pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      const preSneeze = t >= T.sneeze - 0.6 && t < T.sneeze
      const tMood = later ? { mood: 'heart', look: [-1, 0] } : t < T.obj ? { mood: 'squint', look: [-1, 0] } : preSneeze ? { mood: 'wide', look: [0, -1], blink: false } : t < T.sneeze + 0.4 ? { mood: 'squint', look: [0, 0] } : t < T.relief ? { mood: 'sleepy', zzz: false, look: [-1, 0] } : { mood: 'sparkle', look: [-1, 0] }
      const tSq = preSneeze ? -0.12 * prog(t, T.sneeze - 0.6, T.sneeze) : t >= T.sneeze && t < T.sneeze + 0.3 ? 0.25 : 0
      drawStarChar(x, TA_P.x, TA_P.y, 260, t, { ...TAU, ...tMood, squash: tSq, pop: ok, seed: 11, hops: TA_HOPS, glow: 0.9 })
      if (!later) tissues(TA_P.x + 140, TA_P.y + 30, ok); else flower(TA_P.x + 150, TA_P.y + 10, pop01(t, T.later, 0.4, 2.4) * ok)
      pollen(t, prog(t, T.sneeze, T.sneeze + 1.1), later ? 0 : ok)
      calendar(t, t < T.verdict ? pop01(t, T.cal, 0.35, 2.4) * ok : 0)
      laterTag(t, later ? pop01(t, T.verdictOut[0], 0.3, 2) * ok : 0)
      x.restore()
      objection(x, t, { at: T.obj, x: 620, y: 860 })
      x.save(); x.beginPath(); x.rect(0, 0, 1080, 124); x.clip(); heatMeter(x, t, { level: 3, at: T.heat }); x.restore()   // its n/5 score line is clipped: no numbers on screen
      agreePill(x, t, { at: T.pill, dur: T.pillDur })
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// no card-motif cut (a 20 s film may have zero): the verdict's gavel slam is the big transition
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

// ── sound
const NOTE = [783.99, 880, 987.77, 1046.5, 1174.66, 1318.51, 1479.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 987.77, 0.04, 0], ['pop', T.open + 0.06, 1174.66, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [TA]: 880 } }),
  ['pluck', T.sneeze - 0.5, 587.33, 0.03, 0.3, 0.2], ['pluck', T.sneeze - 0.25, 659.25, 0.03, 0.3, 0.2],
  ['boom', T.sneeze, 0.08], ['whoosh', T.sneeze, 0.8, 0.06], ['pop', T.sneeze + 0.02, 1975.53, 0.03, -0.5],
  ['bell', T.relief + 0.1, 1567.98, 0.025, 1.0, 0.2],
  ['pop', T.close, 1174.66, 0.03, 0],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1567.98, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void lerp; void BONE
export { T }
