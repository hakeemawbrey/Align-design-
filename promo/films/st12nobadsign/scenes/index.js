// st12nobadsign (25 s vertical Align ad, Star Talk season 12 "HOT TAKES", E24) · story 0–20.6, then the shared end card.
//   🔥 "No sign is *bad* at love."  Heat 3.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; THE STARS (the gold narrator star) mid-smirk at a town-hall
//              lectern, the twelve sign stars on two risers behind (a LIVE bug, "ZODIAC TOWN HALL" chyron). Heat meter → 3.
//   2.90       OBJECTION! ♈ Aries hops forward. ARIES: "what about *Scorpio*?"
//   5.36       ♏ Scorpio, offended. SCORPIO: "rude. what about *Gemini*?"
//   7.90       ♊ Gemini. GEMINI: "we both say: what about *Aries*?"
//   9.98–11.2  the whole zodiac argues: a cartoon brawl cloud of pixel stars, fists and "!?" pops over the risers.
//   11.28      the cloud clears. THE STARS: "everyone’s bad at love… at *first*."  One by one, the twelve nod and go happy.
//   14.27      THE STARS RULE: "love is a skill. every sign can learn it."
//   18.17      AGREE / DISAGREE?   18.27  "Love is a *skill*. | Practice."  The end rhymes with frame 0: the same lectern framing,
//              but the twelve now hold hands in a line across the risers, and THE STARS holds a tiny "LOVE 101" textbook.
//   Rewatch bait: Capricorn takes notes on a tiny clipboard the whole time, even during the brawl.
// No sign is a red flag: the jokes are about the memes, and the verdict lands on skill and practice. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawGaspLines } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 25
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#e2455c'

const T = {
  take: 0, takeOut: [2.7, 2.9], heat: 0.35,
  obj: 2.9, open: 3.05, l1: 3.2,
  l2: 5.45, l3: 7.95, brawl: [9.4, 10.6],
  l4: 10.75, nods: 11.2, close: 13.2,
  verdict: 13.35, verdictOut: [16.0, 16.2],
  pill: 16.15, pillDur: 0.55,
  last: 16.65, lastLand: 17.0, hands: 16.4, out: [20.1, 20.45],
}
const NA = 'THE STARS', AR = '♈ ARIES', SC = '♏ SCORPIO', GE = '♊ GEMINI'
const LINES = [
  { t: T.l1, speaker: AR, text: 'what about *Scorpio*?', color: '#ff7a6b' },
  { t: T.l2, speaker: SC, text: 'rude. what about *Gemini*?', color: '#c58cff' },
  { t: T.l3, speaker: GE, text: 'we both say: what about *Aries*?', color: '#ffe07a' },
  { t: T.l4, speaker: NA, text: 'everyone’s bad at love… at *first*.', gap: 0.7 },
]
const CPS = 29
const TAKE = 'No sign is *bad* at love.'
const VERDICT = 'love is a skill. | every sign can *learn* it.'
const LAST = 'Love is a *skill*. | Practice.'

// ── the schedule, derived: each box line reads ≥ 1.5 s after it types (+ any `gap`), the verdict holds 2.5 s after its
//    last word lands, then AGREE / DISAGREE? and the last line
const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5 + (LINES[i].gap || 0))
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.5)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 2.5), r3(VEND + 2.5 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.l2 = LINES[1].t; T.l3 = LINES[2].t; T.l4 = LINES[3].t; T.brawl = [r3(T.l4 - 1.3), r3(T.l4 - 0.1)]; T.nods = r3(T.l4 + 0.45); T.hands = r3(T.pill - 0.25)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const BACK = ['libra', 'virgo', 'scorpio', 'pisces', 'sagittarius', 'capricorn']
const FRONT = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'aquarius']
const XS = [140, 300, 460, 620, 780, 940]
const ROW = { back: 820, front: 975 }
const CAST = [
  ...BACK.map((id, i) => ({ id, x: XS[i] + 8, y: ROW.back, size: 124, seed: 40 + i })),
  ...FRONT.map((id, i) => ({ id, x: XS[i] - 8, y: ROW.front, size: 138, seed: 50 + i })),
]
const SPEAKS = { aries: T.l1, scorpio: T.l2, gemini: T.l3 }
const NARR0 = { x: 540, y: 1270, size: 270 }
const NA_HOPS = [0.25, 0.75, ...talkHops(LINES, NA, { cps: CPS }), T.last + 0.1]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#06051a' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 110, accentSize: 170, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function risers(k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const step = (y0, y1, x0, x1) => {
      x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 6)
      x.fillStyle = '#3a3358'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      x.fillStyle = '#5c5480'; x.fillRect(x0, y0, x1 - x0, 8)
    }
    step(ROW.back + 46, ROW.front + 40, 60, 1020)
    step(ROW.front + 52, ROW.front + 140, 40, 1040)
    x.restore()
  }
  function lectern(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(400, 1360, 280, 170)
    x.fillStyle = '#4a2f6a'; x.fillRect(408, 1368, 264, 156)
    x.fillStyle = '#6a4a8a'; x.fillRect(380, 1346, 320, 26)
    drawPixelStar(x, 540, 1450, 64, 2, GOLD)
    x.restore()
  }
  /** town-hall chrome: LIVE bug + chyron (kept above the dialogue box) */
  function chrome(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = RED; x.fillRect(64, 630, 120, 46); x.fillStyle = BONE
    x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('LIVE', 132, 654)
    if (Math.sin(t * 6) > 0) { x.fillStyle = BONE; x.fillRect(78, 646, 14, 14) }
    x.fillStyle = INK; x.fillRect(0, 1436, 1080, 0)
    x.restore()
  }
  /** the brawl cloud: a rolling dust ball with stars, fists and "!?" popping out */
  function brawl(t) {
    const p = prog(t, ...T.brawl)
    if (p <= 0 || p >= 1) return
    const k = Math.sin(Math.PI * p) ** 0.4
    const cx = 540, cy = 900
    x.save(); x.globalAlpha = k
    for (let i = 0; i < 26; i++) {
      const a = i * 2.399 + t * 3, r = 140 + 120 * ((i * 37) % 10) / 10 + 18 * Math.sin(t * 9 + i)
      x.fillStyle = i % 3 ? '#d9d2e8' : '#b8aed0'
      x.beginPath(); x.arc(cx + Math.cos(a) * r * 1.5, cy + Math.sin(a) * r * 0.75, 90 - (i % 4) * 12, 0, Math.PI * 2); x.fill()
    }
    for (let i = 0; i < 9; i++) {
      const a = i * 0.7 + t * 5, r = 260 + 40 * Math.sin(t * 7 + i)
      const px = cx + Math.cos(a) * r * 1.4, py = cy + Math.sin(a) * r * 0.6
      if (i % 3 === 0) { x.font = `700 64px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('!?', px + 4, py + 4); x.fillStyle = [PINK, GOLD, '#7fdcff'][i % 3]; x.fillText('!?', px, py) }
      else drawPixelStar(x, px, py, 40, i % 2, [GOLD, PINK, '#7fdcff', '#9ee6a8'][i % 4])
    }
    x.restore()
  }
  /** Capricorn's notes (the rewatch bait) */
  function capNotes(t, r, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k; x.translate(r.x + 46, r.y + 20); x.rotate(0.2)
    x.fillStyle = INK; x.fillRect(-20, -26, 40, 52); x.fillStyle = '#b8864f'; x.fillRect(-16, -22, 32, 44); x.fillStyle = '#fbf6ea'; x.fillRect(-12, -16, 24, 34)
    x.fillStyle = 'rgba(27,18,54,0.6)'; const n = Math.floor(t * 2) % 5; for (let i = 0; i <= n; i++) x.fillRect(-9, -12 + i * 6, 18, 3)
    x.restore()
  }
  function textbook(t, cx, cy, k) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.12)
    x.fillStyle = INK; x.fillRect(-70, -50, 140, 100); x.fillStyle = '#e04f8a'; x.fillRect(-64, -44, 128, 88); x.fillStyle = '#ff8fb1'; x.fillRect(-64, -44, 12, 88)
    x.font = `700 24px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff1c8'; x.fillText('LOVE', 8, -12); x.fillText('101', 8, 18)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      const brawlK = prog(t, T.brawl[0] - 0.1, T.brawl[0] + 0.2) * (1 - prog(t, T.brawl[1] - 0.25, T.brawl[1]))
      const z = gaspZoom(t, { at: T.brawl[0] - 0.05, dur: 1.4, x: 540, y: 840, amount: 0.2, follow: 0.5 })
      x.save(); z.apply(x)
      risers(ok)
      const rs = {}
      CAST.forEach((m, i) => {
        if (brawlK > 0.6) return
        const st = signStar(m.id)
        let mood = { mood: 'neutral', look: [clamp((540 - m.x) / 400, -1, 1), 1] }
        const sp = SPEAKS[m.id]
        if (t >= T.obj && t < T.brawl[0]) {
          mood = { mood: 'squint', look: [clamp((540 - m.x) / 400, -1, 1), 0] }
          if (sp !== undefined && t >= sp && t < sp + 2.5) mood = { mood: 'wide', look: [0, 0], blink: false }
          if (m.id === 'scorpio' && t >= T.l1 && t < T.l2) mood = { mood: 'eyeroll' }
          if (m.id === 'aries' && t >= T.l3) mood = { mood: 'wide', look: [1, -1], blink: false }
        }
        if (t >= T.brawl[1]) mood = t >= T.nods + i * 0.1 ? { mood: 'happy', look: [0, 1] } : { mood: 'sleepy', zzz: false }
        if (t >= T.hands) mood = { mood: 'happy', look: [0, 0] }
        const fwd = sp !== undefined ? 30 * ease.outCubic(prog(t, sp - 0.15, sp + 0.2)) * (1 - prog(t, sp + 2.2, sp + 2.5)) : 0
        const hops = [0.15 + i * 0.03, ...(sp !== undefined ? [sp + 0.05, sp + 0.6] : []), T.nods + i * 0.1, T.hands + (i % 6) * 0.05]
        rs[m.id] = drawStarChar(x, m.x, m.y + fwd, m.size * (1 + fwd / 300), t, { color: st.color, glyph: st.glyph, ...mood, pop: ok * (1 - brawlK), seed: m.seed, glow: 0.8, hops })
      })
      if (rs.capricorn) capNotes(t, rs.capricorn, ok)
      // holding hands at the end: little hand knots between neighbours in each row
      const hk = prog(t, T.hands, T.hands + 0.4) * ok
      if (hk > 0) {
        x.save(); x.globalAlpha = hk
        for (const row of [BACK, FRONT]) for (let i = 0; i < 5; i++) {
          const a = rs[row[i]], b = rs[row[i + 1]]
          if (!a || !b) continue
          const hx = (a.x + b.x) / 2, hy = (a.y + b.y) / 2 + a.size * 0.18
          x.fillStyle = INK; x.fillRect(hx - 16, hy - 10, 32, 20); x.fillStyle = '#ffe6a8'; x.fillRect(hx - 12, hy - 6, 24, 12)
        }
        x.restore()
      }
      brawl(t)
      lectern(t, ok)
      const nMood = t < T.obj ? { mood: 'wink', look: [0, 0] } : t < T.brawl[0] ? { mood: 'neutral', look: [0, -1] } : t < T.brawl[1] ? { mood: 'wide', look: [0, -1], blink: false } : t < T.verdict ? { mood: 'happy', look: [0, -1] } : { mood: 'sparkle', look: [0, 0] }
      const rn = drawStarChar(x, NARR0.x, NARR0.y, NARR0.size, t, { color: STAR.sky, ...nMood, pop: ok, seed: 1, hops: NA_HOPS, glow: 1 })
      textbook(t, rn.x + 170, rn.y + 10, pop01(t, T.hands + 0.2, 0.4, 2.4) * ok)
      x.restore()
      drawGaspLines(x, t, { at: T.brawl[0] - 0.05, dur: 1.4, x: 540, y: 840, follow: 0.5, color: PINK })
      chrome(t, ok)
      objection(x, t, { at: T.obj, x: 300, y: 1000 })
      heatMeter(x, t, { level: 3, at: T.heat })
      agreePill(x, t, { at: T.pill, dur: T.pillDur })
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// no card-motif cut: the verdict's gavel slam is this season's big transition
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E24' })]

// ── sound
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NA]: 784, [AR]: 880, [SC]: 520, [GE]: 1046.5 } }),
  ['whoosh', T.brawl[0] - 0.1, 0.4, 0.04], ['crash', T.brawl[0], { gain: 0.05, len: 1.2 }],
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.brawl[0] + 0.15 + i * 0.17), 0.04]),
  ['glitter', T.brawl[1] - 0.2, T.brawl[1] + 0.4],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.nods + i * 0.1 + 0.05), NOTE[i % NOTE.length] * 2, 0.018, (i % 6 - 2.5) / 4]),
  ['pop', T.close, 783.99, 0.03, 0],
  ['glitter', T.hands, T.hands + 0.6],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1396.91, 0.05, 0], ['pluck', T.lastLand, 1046.5, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
void lerp
export { T }
