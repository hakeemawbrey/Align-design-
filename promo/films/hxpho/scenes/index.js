// hxpho (20 s vertical Align ad, Star Talk "HOT TAKES", Houston edition) · story 0–15.6, then the shared end card.
//   🔥 "65 degrees is *soup* weather in Houston."  Heat 2 (a cozy take).
//   0.00   frame 0 = the thumbnail: the hot-take stamp + the take; the Houston star (HOU badge) bundled in a beanie,
//          hugging a giant steaming bowl of noodle soup at a little soup-shop table on a cool night.
//   2.45   OBJECTION! The New York star (NYC badge, coffee cup) bursts in, laughing (HA HA): "sixty-five? that’s *shorts* weather!"
//   ~5     HOUSTON: "it’s *cold* to me, okay?"  (the steam curls up into a question mark)
//   ~7.5   NYC sniffs the steam, softens (gasp zoom): "that smells amazing. *scoot over.*"
//   ~10    THE STARS RULE: "Let people have their *cozy*. | Then pull up a chair."
//   ~13    AGREE / DISAGREE?  "Share the *bowl*."  The end rhymes with frame 0: the same table and bowl, but NYC sits
//          beside Houston with a second spoon, and the steam curls into a heart.
//   Rewatch bait: the window behind says SOUP WEATHER with a little check mark that flickers on when NYC sits down;
//          ♓ Pisces is at the counter in the back, crying into its bowl (it's the onions. probably).
// Friendly city teasing only. No card transition (a 20 s film). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 20
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BONE = '#efe6d6', INK = '#1b1236', NYCC = '#c9d2e8'
const PIS = signStar('pisces')

const T = { take: 0, takeOut: [2.6, 2.75], heat: 0.3, obj: 2.45, open: 2.6, l1: 2.72 }
const HO = 'HOUSTON STAR', NY = 'NEW YORK STAR'
const LINES = [
  { t: T.l1, speaker: NY, text: 'sixty-five? that’s *shorts* weather!', color: '#9fe0ff' },
  { t: 0, speaker: HO, text: 'it’s *cold* to me, okay?', color: '#ffb08a' },
  { t: 0, speaker: NY, text: 'that smells amazing. *scoot over.*', color: '#9fe0ff' },
]
const CPS = 30
const TAKE = '65 degrees is *soup* weather in Houston.'
const VERDICT = 'Let people have their *cozy*. | Then pull up a chair.'
const LAST = 'Share the *bowl*.'

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
T.laugh = [T.obj, r3(LT[0].done + 0.4)]               // HA HA bubbles
T.sniff = r3(LINES[2].t - 0.3)                        // NYC catches the steam (gasp zoom)
T.sit = r3(LT[2].done + 0.2)                          // NYC slides in beside Houston, second spoon
T.end = r3(T.pill + 0.15)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HO_P = { x: 360, y: 1150 }, NY_A = { x: 820, y: 1120 }, NY_B = { x: 700, y: 1160 }
const BOWL = { x: 460, y: 1350 }
const HO_HOPS = [0.25, ...talkHops(LINES, HO, { cps: CPS }), T.last + 0.1]
const NY_HOPS = [T.obj + 0.1, T.obj + 0.4, T.obj + 0.7, ...talkHops(LINES, NY, { cps: CPS }), T.last + 0.2]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#2a1620' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ffcf8a' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 260, size: 120, accentSize: 180, at: T.last, gap: 0.08, accentColor: '#ffcf8a', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  function tears(cx, cy, size, t) {
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.6 + i / 3 + (side > 0 ? 0.17 : 0)) % 1)
      x.globalAlpha = 1 - ph; R('#8fd6ff', cx + side * size * 0.17 + side * ph * size * 0.08 - 3, cy + size * 0.02 + ph * size * 0.5, 6, 8)
    }
    x.globalAlpha = 1
  }
  /** the soup shop: warm wall, a window on a cool blue night with SOUP WEATHER lettering, lanterns, the back counter */
  function shop(t) {
    R('#5a2a2a', 0, 0, 1080, 1920)
    for (let i = 0; i < 12; i++) R(i % 2 ? '#5f2e2c' : '#552827', i * 90, 0, 90, 1000)
    // the window
    R(INK, 120, 600, 840, 330)
    R('#1d2b52', 132, 612, 816, 306)
    for (let i = 0; i < 26; i++) { const sx = 140 + ((i * 197) % 800), sy = 620 + ((i * 89) % 120); R(Math.floor(t * 2 + i) % 5 ? '#c9d2ff' : '#ffffff', sx, sy, 4, 4) }
    R('#14203e', 132, 820, 816, 98)                                           // the street outside
    for (let i = 0; i < 6; i++) R('#2a3a66', 150 + i * 140, 790 - (i % 3) * 40, 90, 40 + (i % 3) * 40)  // a low skyline
    R(INK, 536, 612, 8, 306)
    // window lettering: SOUP WEATHER + a check that flickers on once NYC sits
    x.font = `700 40px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(255,214,140,0.9)'; x.fillText('SOUP', 334, 660); x.fillText('WEATHER', 746, 660)
    if (t >= T.sit + 0.3 && (Math.floor(t * 8) % 7 || t > T.sit + 0.9)) { x.fillStyle = '#9ee6a8'; x.font = `700 46px 'Space Mono', monospace`; x.fillText('✓', 908, 662) }
    // lanterns
    for (const lx of [220, 540, 860]) {
      R(INK, lx - 2, 470, 4, 60)
      R(INK, lx - 40, 526, 80, 64); R('#ff5d4a', lx - 34, 532, 68, 52); R('#ff8a6a', lx - 34, 532, 68, 12)
      x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, 560, 0, lx, 560, 140); g.addColorStop(0, 'rgba(255,140,90,0.25)'); g.addColorStop(1, 'rgba(255,140,90,0)'); x.fillStyle = g; x.fillRect(lx - 140, 420, 280, 280); x.restore()
    }
    // the back counter + Pisces crying into its bowl
    R(INK, 0, 990, 1080, 30); R('#8a4a32', 0, 994, 1080, 22)
    R('#3a1c22', 0, 1020, 1080, 900)
    const pis = drawStarChar(x, 980, 950, 96, t, { ...PIS, glyph: null, mood: 'squint', look: [0, 1], seed: 21, glow: 0.5, bob: 1 })
    tears(pis.x, pis.y, 96, t)
    R(INK, 940, 984, 80, 10); R('#efe6d6', 944, 976, 72, 14)
  }
  /** steam: three wiggling pixel ribbons; shape: 0 = wisps, 'q' = a question mark, 'h' = a heart */
  function steam(t, cx, cy, shape) {
    x.save(); x.globalAlpha = 0.8
    for (let k = 0; k < 3; k++) for (let i = 0; i < 14; i++) {
      const u = (i / 14 + t * 0.35 + k * 0.3) % 1
      R('rgba(255,255,255,0.7)', cx - 80 + k * 80 + Math.sin(u * 8 + t * 3 + k) * 16, cy - u * 220, 10, 10)
    }
    if (shape) {
      x.globalAlpha = 0.9
      const S = shape === 'h' ? ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'] : ['.XXXX.', 'X....X', '....X.', '...X..', '...X..', '......', '...X..']
      const s = 14, ox = cx - S[0].length * s / 2, oy = cy - 330 + Math.sin(t * 3) * 6
      S.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') R(shape === 'h' ? '#ffd0dc' : '#ffffff', ox + i * s, oy + j * s, s, s) }))
    }
    x.restore()
  }
  function bowl(t, cx, cy) {
    // table
    R(INK, 60, cy + 40, 960, 40); R('#c98a52', 66, cy + 44, 948, 30); R('#a8703e', 66, cy + 66, 948, 8)
    R(INK, 120, cy + 80, 30, 140); R(INK, 930, cy + 80, 30, 140)
    // bowl
    x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy - 40, 190, 50, 0, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.moveTo(cx - 190, cy - 40); x.quadraticCurveTo(cx - 170, cy + 60, cx, cy + 60); x.quadraticCurveTo(cx + 170, cy + 60, cx + 190, cy - 40); x.fill()
    x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(cx - 180, cy - 36); x.quadraticCurveTo(cx - 160, cy + 50, cx, cy + 50); x.quadraticCurveTo(cx + 160, cy + 50, cx + 180, cy - 36); x.fill()
    R('#3a6ab0', cx - 160, cy - 6, 320, 10)
    x.fillStyle = '#c8803a'; x.beginPath(); x.ellipse(cx, cy - 40, 176, 40, 0, 0, Math.PI * 2); x.fill()
    // noodles, herbs, a lime
    x.strokeStyle = '#fff1c8'; x.lineWidth = 5
    for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(cx - 120 + i * 40, cy - 40); x.quadraticCurveTo(cx - 100 + i * 40, cy - 66 + Math.sin(t * 2 + i) * 4, cx - 80 + i * 40, cy - 40); x.stroke() }
    for (const [hx, hy] of [[-60, -56], [30, -30], [100, -50], [-110, -32]]) R('#5fd07a', cx + hx, cy + hy, 22, 12)
    R(INK, cx + 120, cy - 70, 36, 30); R('#9ee66a', cx + 124, cy - 66, 28, 22)
    // chopsticks resting
    R(INK, cx - 230, cy - 120, 12, 150); R('#e6c08a', cx - 228, cy - 118, 8, 146)
  }
  function spoon(sx, sy, k, rot) {
    if (k <= 0) return
    x.save(); x.translate(sx, sy); x.rotate(rot); x.scale(k, k)
    R(INK, -10, -80, 20, 90); R('#ffffff', -6, -76, 12, 82)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 22, 26, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 22, 20, 14, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function haha(t) {
    const d = t - T.laugh[0]
    if (d < 0 || t > T.laugh[1]) return
    x.font = `900 italic 64px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let i = 0; i < 3; i++) {
      const a = d - i * 0.35; if (a < 0) continue
      const px = 760 + [0, 160, -60][i], py = 900 - a * 60 - i * 40
      x.save(); x.globalAlpha = clamp(1 - a / 1.6); x.translate(px, py); x.rotate([-0.15, 0.12, -0.05][i]); x.scale(easeOutBack(clamp(a / 0.2), 2), easeOutBack(clamp(a / 0.2), 2))
      x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('HA', 0, 0); x.fillStyle = '#fff1c8'; x.fillText('HA', 0, 0)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.sniff, dur: 1.4, x: 700, y: 1060, amount: 0.22, follow: 0.5 })
      x.save(); z.apply(x)
      shop(t)
      steam(t, BOWL.x, BOWL.y - 90, t >= T.sit ? 'h' : (t >= LINES[1].t && t < LINES[2].t) ? 'q' : 0)
      // Houston, bundled up
      const hMood = t < T.obj ? { mood: 'sparkle', look: [0, 1] } : t < LINES[1].t ? { mood: 'squint', look: [1, 0] } : t < T.sit ? { mood: 'happy', look: [1, 0] } : { mood: 'heart', look: [1, 0] }
      cityStar(x, HO_P.x, HO_P.y, 270, t, { city: 'HOU', ...hMood, prop: ['beanie'], pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      // New York: pops in laughing, sniffs, slides into the seat beside Houston
      if (t >= T.obj) {
        const inK = pop01(t, T.obj, 0.36, 2.4)
        const sitK = ease.inOutQuad(prog(t, T.sit, T.sit + 0.5))
        const nx = lerp(NY_A.x, NY_B.x, sitK), ny = lerp(NY_A.y, NY_B.y, sitK) + (t < T.laugh[1] ? Math.abs(Math.sin(t * 14)) * -14 : 0)
        const nMood = t < T.laugh[1] ? { mood: 'happy', look: [-1, 0] } : t < T.sniff ? { mood: 'eyeroll' } : t < T.sit ? { mood: 'sparkle', look: [-1, 1], blink: false } : { mood: 'happy', look: [-1, 0] }
        cityStar(x, nx, ny, 250, t, { city: 'NYC', ...nMood, prop: t < T.sit ? 'coffee' : ['beanie'], pop: inK * ok, seed: 11, hops: NY_HOPS, glow: 0.9 })
      }
      bowl(t, BOWL.x, BOWL.y)
      spoon(BOWL.x - 120, BOWL.y - 70, ok, -0.5)
      spoon(BOWL.x + 150, BOWL.y - 74, pop01(t, T.sit + 0.3, 0.3, 2.4) * ok, 0.45)
      haha(t)
      x.restore()
      objection(x, t, { at: T.obj, x: 760, y: 820 })
      x.save(); x.beginPath(); x.rect(0, 0, 1080, 124); x.clip(); heatMeter(x, t, { level: 2, at: T.heat }); x.restore()   // its n/5 score line is clipped: no extra numbers
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
const NOTE = [554.37, 622.25, 698.46, 739.99, 830.61, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 2, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 830.61, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [NY]: 990 } }),
  ['pop', T.obj + 0.1, 1108.73, 0.03, 0.4], ['pop', T.obj + 0.45, 1244.51, 0.03, 0.4], ['pop', T.obj + 0.8, 1108.73, 0.03, 0.4],
  ['whoosh', T.sniff - 0.05, 0.4, 0.03], ['bell', T.sniff + 0.15, 1396.91, 0.025, 1.0, 0.2],
  ['pop', T.close, 830.61, 0.03, 0],
  ['whoosh', T.sit, 0.35, 0.03], ['pluck', T.sit + 0.3, 1108.73, 0.04, 0.5, 0.2], ['pop', T.sit + 0.35, 1661.22, 0.03, 0.3],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1108.73, 0.05, 0], ['pluck', T.lastLand, 830.61, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
export { T }
