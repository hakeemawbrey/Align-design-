// starmercury (30 s vertical Align ad, Star Talk #4) · story 0–25.6, then the shared end card ("come" + the Align logo).
//   0.00–10.0   "Two stars walk | into a *group chat.*"  The ♊ Gemini star bounces in from the left (fast, chatty, never
//               still); the ♍ Virgo star glides in from the right and settles, neat, squinting. A typing bubble (• • •), then
//               GEMINI: "omg 14 ideas for date night!!" and 14 little pixel date ideas burst out around it (Virgo goes wide).
//               "*Air* meets | *earth.*"  VIRGO: "pick one. with a *reservation.*" → 13 ideas poof, one floats over to Virgo
//               and a pixel ticket stamps under it (TABLE FOR 2 · 7:30 ✓). Gemini rolls its eyes.
//               GEMINI: "ugh. fine. *13* ideas." → thirteen pop right back. Now Virgo rolls its eyes.
//   10.2        card cut (deal)
//   10.3–16.6   "Plot twist: | *Mercury.*"  A gold winged ☿ orb drops between them (both stars go wide and look up).
//               THE STARS: "Mercury rules you *both.*" (gold beams to each star) · "Same ruler. | Different *dialect.*"
//               THE STARS: "you just talk *different.*"  The two glance at each other… and soften.
//   16.8        card cut (flip)
//   16.85–21.95 "Push. Pull. *Align.*"  Their two charts open behind them; the Push (pink), Pull (blue) and Align (gold, through
//               Mercury) lines draw between the charts. THE STARS: "Align shows you how, before the *first date.*"
//   22.2–25.42  "Speak each | other's *language.*"  They hop closer, heart-eyes, pixel hearts float up under the orb; all pops out.
//   25.42→      plain sky (SKY_H + grain); the end card takes over at 25.6.
// One canvas (sky + cast), DOM type + three dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, ELEMENT_COLOR, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const GEM = signStar('gemini'), VIR = signStar('virgo')
const GEM_TAG = `${GEM.glyph} GEMINI STAR`, VIR_TAG = `${VIR.glyph} VIRGO STAR`, SKY_TAG = 'THE STARS'

// ── the timeline
const T = {
  // beat 1 · the group chat
  h0: 0.12, h0Land: 1.0, h0Out: [4.22, 4.4],
  gemIn: 0.45, virIn: 0.9, dotsG: [1.45, 2.05], open1: 1.9, l1: 2.1, ideas: BEAT(4), ideaGap: 0.075,
  h1: 4.5, h1Land: 4.86, h1Out: [9.55, 9.72],
  dotsV: [3.95, 4.55], l2: 4.6, pick: 5.0, fly: [5.08, 5.5], ticket: 5.5, gemRoll: [5.95, 7.22],
  l3: 7.3, back: 8.1, virRoll: [8.6, 9.55], ideasOut: [9.62, 9.95], close1: 9.95,
  // beat 2 · Mercury
  h2: 10.3, h2Land: BEAT(18), h2Out: [13.42, 13.6],
  drop: [10.32, 10.74], open2: 11.12, l4: 11.3, beams: 12.05, h3: 13.7, h3Land: 14.12, l5: 14.0, glance: 15.0, soften: 15.55,
  close2: 16.6, h3Out: [16.38, 16.56],
  // beat 3 · the reading
  charts: [16.86, 17.36], lines: [17.05, 17.62, 18.19], open3: 18.48, l6: 18.66, close3: 21.95, chartsOut: [21.6, 21.95], h4Out: [21.68, 21.86],
  // beat 4 · the close
  h5: 22.2, h5Land: BEAT(40), hearts: 22.82, out: [25.0, 25.42], h5Out: [25.08, 25.34],
}
const CPS = 30
const L1 = [
  { t: T.l1, speaker: GEM_TAG, color: GEM.color, text: 'omg 14 ideas for date night!!' },
  { t: T.l2, speaker: VIR_TAG, color: VIR.color, text: 'pick one. with a *reservation.*' },
  { t: T.l3, speaker: GEM_TAG, color: GEM.color, text: 'ugh. fine. *13* ideas.' },
]
const L2 = [
  { t: T.l4, speaker: SKY_TAG, text: 'Mercury rules you *both.*' },
  { t: T.l5, speaker: SKY_TAG, text: 'you just talk *different.*' },
]
const L3 = [
  { t: T.l6, speaker: SKY_TAG, text: 'Align shows you how, before the *first date.*' },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const D2R = Math.PI / 180

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break. colors[i] tints word i;
 *  times[i] overrides when word i pops; the last `late` words pop at lateAt. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, colors = {}, times = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (colors[n]) style.color = colors[n]
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: colors[n] || accentColor, letterSpacing: '0' })
    const big = (late > 0 && n >= nW - late) || (times && acc)
    const tt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: tt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < ws[0].t ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── pixel bits: date-idea icons, the ticket, the winged Mercury orb, typing bubbles, hearts
const BMP = s => s.trim().split(/\s+/)
const ICONS = {
  heart: BMP(`.XX.XX. XXXXXXX XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`),
  note: BMP(`..XXXXX ..XXXXX ..X...X ..X...X XXX.XXX XXX.XXX XXX.XXX`),
  pizza: BMP(`XXXXXXX oooooo. oXoooo. .ooXo.. .ooo... ..o.... ..o....`),
  moon: BMP(`..XXX.. .XX.... XX..... XX..... XX..... .XX.... ..XXX..`),
  ticket: BMP(`XXXXXXX X.XXX.X XXXXXXX .XX.XX. XXXXXXX X.XXX.X XXXXXXX`),
  cup: BMP(`.X.X... ..X.X.. XXXXX.. XoooXXX XoooX.X XoooXX. .XXX...`),
  mic: BMP(`..XXX.. .XoXoX. .XXXXX. .XoXoX. ..XXX.. ...X... ..XXX..`),
  star: BMP(`...X... ...X... XXXXXXX .XXXXX. ..XXX.. .XX.XX. X.....X`),
  ball: BMP(`..XXX.. .XoXoX. XoXoXoX XXoXoXX XoXoXoX .XoXoX. ..XXX..`),
}
const ICON_KEYS = ['heart', 'note', 'pizza', 'moon', 'ticket', 'cup', 'mic', 'star', 'ball']
const ICON_COLS = ['#ff8fb1', '#8fd8f6', '#ffd98a', '#c9a6ff', '#f29a4a', '#7fe0b8', '#f2c75c']
// 14 ideas around Gemini (300, 1030); index 3 (the note: karaoke) is the one Virgo picks
const IDEA_POS = [
  [110, 640], [235, 615], [365, 640], [490, 620], [600, 690], [80, 775], [205, 745], [330, 765],
  [455, 735], [560, 815], [75, 905], [480, 860], [612, 925], [395, 850],
]
const IDEAS = IDEA_POS.map(([x, y], i) => ({ x, y, k: ICON_KEYS[(i * 4 + 1) % ICON_KEYS.length], col: ICON_COLS[i % ICON_COLS.length], t: T.ideas + i * T.ideaGap, rot: ((i * 37) % 11 - 5) * 2.4 }))
const PICKED = 3
IDEAS[PICKED].k = 'note'; IDEAS[PICKED].col = '#8fd8f6'
// the 13 that come back
const BACK = IDEAS.map((d, i) => ({ ...d, t: T.back + ((i * 5) % 14) * 0.045 })).filter((_, i) => i !== PICKED)

const GEMP = { x: 292, y: 1030, size: 330 }, VIRP = { x: 790, y: 1030, size: 330 }
const ORB = { x: 540, y: 690, r: 64 }
const TICKET = { x: 800, y: 690 }

// Mercury orb sprite (16-cell circle) + wings (two frames)
const ORB_G = 16
const WING_UP = BMP(`.....XX ...XXXX .XXXXXX XXXXXX. XXXXX.. .XXX... ..X....`)
const WING_DN = BMP(`....... ....... .....XX ..XXXXX XXXXXXX .XXXXX. ...XX..`)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)

// beat-3 charts: each star's chart (drawWheelH scaled) + three reading lines
const CH_S = 0.46
const CHART_W = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }
const R_DOT = 330 * CH_S
const READ = [
  { a: -62, b: -118, apex: 790, col: READING.push },     // PUSH: over the top
  { a: 58, b: 122, apex: 1290, col: READING.pull },      // PULL: underneath
  { a: -150, b: -30, apex: 560, col: READING.align },    // ALIGN: the big rainbow, through Mercury
]

// talk hops + hearts
const GEM_HOPS = [T.gemIn + 0.38, ...talkHops(L1, GEM_TAG, { cps: CPS }), T.drop[1] + 0.04, T.beams + 0.05, T.soften, T.lines[2] + 0.4, T.hearts, T.hearts + 1.11]
const VIR_HOPS = [...talkHops(L1, VIR_TAG, { cps: CPS }), T.drop[1] + 0.1, T.beams + 0.12, T.soften + 0.1, T.lines[2] + 0.46, T.hearts + 0.04, T.hearts + 1.15]
const HEARTS = Array.from({ length: 9 }, (_, i) => ({ t: T.hearts + 0.1 + i * 0.24, x: 540 + ((i * 53) % 220) - 110, col: [PINK, '#ff4f86', GOLD, LAV][i % 4], s: 6 + (i % 3) }))

function gemState(t) {
  const sparkle = t >= T.l1 && t < T.l2 - 0.1
  if (t < T.l1) return { mood: t < T.gemIn + 0.4 ? 'happy' : 'neutral', look: [1, 0] }
  if (sparkle) return { mood: 'sparkle', look: t < T.ideas ? [0, 0] : [-1, -1] }
  if (t < T.pick) return { mood: 'neutral', look: [1, 0] }
  if (t < T.gemRoll[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.gemRoll[1]) return { mood: 'eyeroll' }
  if (t < T.back) return { mood: 'squint', look: [1, 0] }
  if (t < T.h2) return { mood: t < T.virRoll[0] ? 'sparkle' : 'happy', look: [0, 0] }
  if (t < T.drop[1]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.beams) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.glance) return { mood: t < T.h3 ? 'happy' : 'neutral', look: [0, 0] }
  if (t < T.soften) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.charts[0]) return { mood: 'happy' }
  if (t < T.h5) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.hearts) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart' }
}
function virState(t) {
  if (t < T.ideas + 0.15) return { mood: 'squint', look: [-1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.pick) return { mood: 'neutral', look: [0, 0] }
  if (t < T.ticket + 0.3) return { mood: 'squint', look: [-1, -1] }
  if (t < T.l3) return { mood: 'happy' }
  if (t < T.virRoll[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.virRoll[1]) return { mood: 'eyeroll' }
  if (t < T.h2) return { mood: 'squint', look: [0, 0] }
  if (t < T.drop[1]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.beams) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.glance + 0.15) return { mood: t < T.h3 ? 'sparkle' : 'neutral', look: [0, 0] }
  if (t < T.soften + 0.1) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.charts[0]) return { mood: 'happy' }
  if (t < T.h5) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.hearts) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Two stars walk | into a *group chat.*', { top: 200, size: 100, accentSize: 132, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.08, accentColor: GOLD })
  const H1 = popText(root, '*Air* meets | *earth.*', { top: 210, size: 120, accentSize: 168, at: T.h1, times: [T.h1, T.h1 + 0.16, T.h1Land], wobble: true, colors: { 0: ELEMENT_COLOR.air, 2: ELEMENT_COLOR.earth } })
  const H2 = popText(root, 'Plot twist: | *Mercury.*', { top: 196, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H3 = popText(root, 'Same ruler. | Different *dialect.*', { top: 210, size: 100, accentSize: 134, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Push. Pull. *Align.*', { top: 230, size: 104, accentSize: 140, at: T.lines[0], times: T.lines, wobble: true, colors: { 0: READING.push, 1: READING.pull, 2: READING.align } })
  const H5 = popText(root, 'Speak each | other’s *language.*', { top: 200, size: 108, accentSize: 150, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const box1 = dialogueBox(root, { lines: L1, y: 1400, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: L2, y: 1400, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: L3, y: 1400, open: T.open3, close: T.close3, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // offscreen buffers for crisp pixel art
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
  const orbBuf = mk(ORB_G, ORB_G)
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }

  // ── drawing helpers
  function bitmap(bm, cx, cy, cell, col, col2, { rot = 0, a = 1, sc = 1 } = {}) {
    if (a <= 0 || sc <= 0) return
    const w = bm[0].length, h = bm.length
    x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot * D2R); x.scale(sc, sc)
    // dark outline (1 cell) for legibility on the sky
    x.fillStyle = 'rgba(14,8,32,0.85)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'o' ? col2 : col; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell, cell) }))
    x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, hexA(col, 0.55 * a)); g.addColorStop(0.45, hexA(col, 0.18 * a)); g.addColorStop(1, hexA(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function sparkles(t, cx, cy, t0, { n = 10, R = 120, size = 24, seed = 1, dur = 0.6, cols = [GOLD, BONE, PINK, LAV] } = {}) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.5 + 0.7 * p), cy + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  /** a little chat bubble with three bouncing dots, tail pointing down at (cx, cy) */
  function typingBubble(t, cx, cy, [a, b], col) {
    const k = pop01(t, a, 0.26, 2.4) * (1 - ease.inQuad(prog(t, b - 0.12, b)))
    if (k <= 0.01 || t > b) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const P = 6, w = 22 * P, h = 12 * P
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-w / 2 - P, -h - 3 * P - P, w + 2 * P, h + 2 * P)
    x.fillStyle = BONE; x.fillRect(-w / 2, -h - 3 * P, w, h)
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-P * 2, -3 * P + P, P * 4, P)
    x.fillStyle = BONE; x.fillRect(-P * 2, -3 * P, P * 3, P); x.fillRect(-P, -2 * P, P * 2, P); x.fillRect(-P, -P, P, P)
    for (let i = 0; i < 3; i++) {
      const up = Math.max(0, Math.sin((t - a) * 11 - i * 0.9)) * P * 1.5
      x.fillStyle = col; x.fillRect(-w / 2 + (4 + i * 6) * P, -h - 3 * P + 4 * P - up, P * 3, P * 3)
    }
    x.restore()
  }
  function drawOrb(t, cx, cy, r, k) {
    if (k <= 0) return
    glow(cx, cy, r * 3.2, GOLD, 0.9 * clamp(k))
    // wings: flap fast while falling, gently after
    const fl = t < T.drop[1] + 0.3 ? Math.sin(t * 40) > 0 : Math.sin(t * 9) > -0.1
    const wb = fl ? WING_UP : WING_DN, cell = Math.max(2, Math.round(r * 0.16 * k))
    for (const sgn of [-1, 1]) {
      x.save(); x.translate(cx + sgn * r * 1.05 * k, cy - r * 0.15 * k); x.scale(sgn * -1, 1)
      bitmap(wb, -cell * 3, 0, cell, '#fff3e0', BONE)
      x.restore()
    }
    const S = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(cx, cy, S / 2 + 4, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, Math.round(cx - S / 2), Math.round(cy - S / 2), S, S)
    x.restore()
    x.save(); x.font = `700 ${Math.round(r * 1.25 * k)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('☿︎', cx, cy + r * 0.08 * k); x.restore()
  }
  function drawTicket(t, k) {
    if (k <= 0.01) return
    const { x: cx, y: cy } = TICKET
    x.save(); x.translate(cx, cy + 95); x.rotate(-4 * D2R); x.scale(k, k)
    const P = 5, w = 384, h = 74
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P)
    x.fillStyle = '#fff3e0'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = VIR.color; x.fillRect(-w / 2, -h / 2, w, P * 2); x.fillRect(-w / 2, h / 2 - P * 2, w, P * 2)
    // perforation notches
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-w / 2 - P, -P, P * 2, P * 2); x.fillRect(w / 2 - P, -P, P * 2, P * 2)
    x.font = `700 27px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('TABLE FOR 2 · 7:30', 0, 2)
    x.restore()
    // check stamp
    const ck = pop01(t, T.ticket + 0.25, 0.3, 3)
    if (ck > 0) bitmap(BMP(`......X .....XX X...XX. XX.XX.. .XXX... ..X....`), cx + 196, cy + 62, 7, '#7fe0b8', '#7fe0b8', { sc: ck, rot: -4 })
  }

  // ── beat 1: ideas
  function drawIdeas(t) {
    const o = popOut(t, T.ideasOut)
    if (t < T.ideas || o <= 0) return
    const pickK = prog(t, ...T.fly)
    IDEAS.forEach((d, i) => {
      const pk = pop01(t, d.t, 0.28, 2.6)
      if (pk <= 0) return
      const wob = Math.sin(t * 6 + i) * 6
      if (i === PICKED) {
        // floats over to Virgo and sits above the ticket
        const e = ease.inOutCubic(pickK), arc = Math.sin(Math.PI * e) * 40
        const px = lerp(d.x, TICKET.x, e), py = lerp(d.y, TICKET.y, e) - arc
        bitmap(ICONS[d.k], px, py + wob * (1 - e), lerp(8, 10, e), d.col, '#fff3e0', { rot: d.rot * (1 - e), sc: pk * o })
        if (pickK >= 1) sparkles(t, TICKET.x, TICKET.y, T.fly[1], { n: 8, R: 70, size: 18, seed: 4 })
        return
      }
      // the others poof on "pick one."
      const gone = t >= T.pick + (i % 5) * 0.03
      if (gone) { sparkles(t, d.x, d.y, T.pick + (i % 5) * 0.03, { n: 5, R: 36, size: 14, seed: i, dur: 0.4, cols: [d.col, BONE] }); return }
      bitmap(ICONS[d.k], d.x, d.y + wob, 8, d.col, '#fff3e0', { rot: d.rot + Math.sin(t * 9 + i) * 4, sc: pk })
    })
    // …and 13 come right back
    BACK.forEach((d, i) => {
      const pk = pop01(t, d.t, 0.3, 2.8)
      if (pk <= 0) return
      bitmap(ICONS[d.k], d.x, d.y + Math.sin(t * 6 + i) * 6, 8, d.col, '#fff3e0', { rot: d.rot + Math.sin(t * 9 + i) * 4, sc: pk * o })
    })
    drawTicket(t, pop01(t, T.ticket, 0.32, 2.6) * o)
  }

  // ── the cast
  function castPos(t) {
    // gemini bounces in from the left; virgo glides in from the right
    const gi = prog(t, T.gemIn, T.gemIn + 0.5), vi = ease.outCubic(prog(t, T.virIn, T.virIn + 0.55))
    const close = ease.inOutCubic(prog(t, T.h5, T.h5 + 0.5))
    const shrink = ease.inOutCubic(prog(t, ...T.charts)) * (1 - ease.inOutCubic(prog(t, T.chartsOut[0], T.chartsOut[1] + 0.2)))
    const gx_ = lerp(-200, GEMP.x, ease.outCubic(gi)) + close * 70
    const vx_ = lerp(1300, VIRP.x, vi) - close * 70
    // gemini can't keep still in beat 1 (little hops of its own)
    const chatty = t < T.h2 ? Math.abs(Math.sin((t - T.gemIn) * 6.2)) * 16 * clamp((t - T.gemIn - 0.5) * 2) : 0
    const gy = GEMP.y - Math.sin(Math.PI * gi) * 160 - chatty
    const vsq = t > T.virIn + 0.55 ? 0.12 * Math.exp(-(t - T.virIn - 0.55) * 9) * Math.cos((t - T.virIn - 0.55) * 30) : 0
    return { gx: gx_, gy, vx: vx_, vy: VIRP.y, vsq, size: lerp(330, 236, shrink), gin: gi, vin: vi }
  }
  function drawCast(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const P = castPos(t)
    if (t >= T.gemIn) drawStarChar(x, P.gx, P.gy, P.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: GEM_HOPS, seed: 5, pop: o, bob: P.size * 0.05, squash: Math.sin(t * 12.4) * 0.03 * (t < T.h2 ? 1 : 0) })
    if (t >= T.virIn) drawStarChar(x, P.vx, P.vy, P.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: VIR_HOPS, seed: 8, pop: o, bob: P.size * 0.012, squash: P.vsq })
    typingBubble(t, P.gx + 40, P.gy - 190, T.dotsG, GEM.color)
    typingBubble(t, P.vx - 30, P.vy - 190, T.dotsV, VIR.color)
    return P
  }

  // ── beat 2+: Mercury
  function orbState(t) {
    // falls from above the frame, squash-lands at ORB; in beat 3 it lifts to the top of the Align arc; beat 4 back down
    const f = prog(t, ...T.drop)
    let y = lerp(-140, ORB.y, ease.inQuad(f))
    const land = t > T.drop[1] ? Math.exp(-(t - T.drop[1]) * 6) * Math.sin((t - T.drop[1]) * 22) * 26 : 0
    y -= land
    const up = ease.inOutCubic(prog(t, ...T.charts)) * (1 - ease.inOutCubic(prog(t, T.chartsOut[0], T.chartsOut[1] + 0.2)))
    y = lerp(y, 612, up)
    const r = ORB.r * lerp(1, 0.8, up)
    return { x: ORB.x, y: y + Math.sin(t * 2.4) * 6 * clamp(t - T.drop[1]), r }
  }
  function drawMercury(t, P) {
    if (t < T.drop[0]) return
    const o = popOut(t, T.out)
    if (o <= 0) return
    const S = orbState(t)
    // beams to both stars on "both."
    const bk = prog(t, T.beams, T.beams + 0.35), bOut = 1 - prog(t, T.h2Out[0], T.h2Out[0] + 0.5)
    if (bk > 0 && bOut > 0) {
      for (const [tx, ty] of [[P.gx, P.gy], [P.vx, P.vy]]) {
        const ex = lerp(S.x, tx, ease.outCubic(bk)), ey = lerp(S.y, ty - 40, ease.outCubic(bk))
        x.save(); x.globalAlpha = bOut * 0.9; x.globalCompositeOperation = 'lighter'
        x.strokeStyle = GOLD; x.lineCap = 'round'; x.setLineDash([14, 16]); x.lineDashOffset = -t * 60
        x.lineWidth = 8; x.shadowColor = GOLD; x.shadowBlur = 24
        x.beginPath(); x.moveTo(S.x, S.y); x.lineTo(ex, ey); x.stroke(); x.restore()
      }
      sparkles(t, P.gx, P.gy - 40, T.beams + 0.33, { n: 8, R: 120, size: 22, seed: 2 })
      sparkles(t, P.vx, P.vy - 40, T.beams + 0.33, { n: 8, R: 120, size: 22, seed: 3 })
    }
    drawOrb(t, S.x, S.y, S.r, o)
    // landing sparkle
    sparkles(t, S.x, S.y, T.drop[1], { n: 12, R: 150, size: 26, seed: 7 })
  }

  // ── beat 3: the charts and the reading
  function chartCentre(P, side) { return side ? [P.vx, P.vy] : [P.gx, P.gy] }
  function drawCharts(t, P) {
    if (t < T.charts[0] || t > T.chartsOut[1] + 0.05) return
    const k = easeOutBack(prog(t, ...T.charts), 1.6) * (1 - ease.inCubic(prog(t, ...T.chartsOut)))
    if (k <= 0) return
    for (const side of [0, 1]) {
      const [cx, cy] = chartCentre(P, side)
      x.save(); x.translate(cx, cy); x.rotate((side ? 1 : -1) * (1 - ease.outCubic(prog(t, ...T.charts))) * 1.4 + (side ? -1 : 1) * t * 0.04)
      x.scale(CH_S * k, CH_S * k); drawWheelH(x, { W: CHART_W, k: clamp(k) }); x.restore()
    }
    const orb = orbState(t)
    READ.forEach((L, i) => {
      const [ax, ay] = chartCentre(P, 0), [bx, by] = chartCentre(P, 1)
      const A_ = { x: ax + Math.cos(L.a * D2R) * R_DOT * k, y: ay + Math.sin(L.a * D2R) * R_DOT * k }
      const B_ = { x: bx + Math.cos(L.b * D2R) * R_DOT * k, y: by + Math.sin(L.b * D2R) * R_DOT * k }
      const apexY = i === 2 ? orb.y : L.apex
      const cX = (A_.x + B_.x) / 2, cY = 2 * apexY - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.42)) * clamp(k)
      if (lk > 0) {
        const pulse = 1 + 0.35 * Math.exp(-Math.max(0, t - T.lines[i] - 0.42) * 4)
        x.save(); x.globalAlpha = clamp(k); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = 9 * pulse; x.shadowColor = L.col; x.shadowBlur = 26
        x.beginPath(); x.moveTo(A_.x, A_.y)
        const N = 40
        for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
        x.stroke(); x.restore()
        sparkles(t, B_.x, B_.y, T.lines[i] + 0.4, { n: 8, R: 80, size: 20, seed: 11 + i, cols: [L.col, '#fff3e0'] })
      }
      const dk = pop01(t, T.charts[1] - 0.1 + i * 0.07, 0.3, 2.4) * clamp(k)
      for (const [p, col] of [[A_, GEM.color], [B_, VIR.color]]) {
        if (dk <= 0) continue
        glow(p.x, p.y, 34 * dk, col, 0.9)
        x.save(); x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(p.x, p.y, 15 * dk, 0, Math.PI * 2); x.fill()
        x.fillStyle = col; x.beginPath(); x.arc(p.x, p.y, 11 * dk, 0, Math.PI * 2); x.fill(); x.restore()
      }
    })
  }

  // ── beat 4: hearts
  function drawHearts(t) {
    const o = popOut(t, T.out)
    if (o <= 0 || t < T.hearts) return
    HEARTS.forEach((h, i) => {
      const k = (t - h.t) / 1.6
      if (k < 0 || k > 1) return
      bitmap(HEART, h.x + Math.sin(k * 7 + i) * 18, 960 - k * 330, h.s, h.col, h.col, { a: Math.sin(Math.PI * k) * o, sc: o })
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        const P = castPos(t)
        drawCharts(t, P)
        drawHearts(t)
        drawCast(t)
        drawMercury(t, P)
        drawIdeas(t)
        sparkles(t, GEMP.x, GEMP.y, T.gemIn + 0.5, { n: 8, R: 150, size: 22, seed: 1, cols: [GEM.color, BONE] })
        sparkles(t, VIRP.x, VIRP.y, T.virIn + 0.55, { n: 8, R: 150, size: 22, seed: 2, cols: [VIR.color, BONE] })
        sparkles(t, 540, 960, T.hearts, { n: 14, R: 330, size: 28, seed: 5, cols: [PINK, GOLD, BONE, LAV] })
      }
      box1.update(t); box2.update(t); box3.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// card-motif candidates: 10.2 (the chat clears → Mercury drops), 16.8 (box shut → the charts), 22.1 (→ the close).
// cardfx keeps the middle one (16.8) plus the kept 10.2. End card flips at 25.6.
const CUTS = [{ t: 10.2, kind: 'deal', keep: true }, { t: 16.8, kind: 'flip' }, 22.1]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const PITCH = { [GEM_TAG]: 1174.66, [VIR_TAG]: 659.25, [SKY_TAG]: 880 }
export const CUES = [
  // hook
  ...wordPops(T.h0, 4, 0.08, 0, 0.022), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.14, 1318.51, 0.05, 0], ['pluck', T.h0Land + 0.14, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.gemIn, 0.3, 0.025], ['pop', T.gemIn + 0.42, 987.77, 0.04, -0.4], ['pop', T.gemIn + 0.5, 1318.51, 0.03, -0.4],
  ['whoosh', T.virIn, 0.35, 0.02], ['pluck', T.virIn + 0.55, 587.33, 0.04, 0.5, 0.4],
  ['tick', T.dotsG[0] + 0.1, 0.02], ['tick', T.dotsG[0] + 0.3, 0.02], ['tick', T.dotsG[0] + 0.5, 0.02],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L1, { cps: CPS, pitch: PITCH }),
  // 14 ideas
  ...IDEAS.map((d, i) => ['pop', +(d.t + 0.05).toFixed(3), NOTE[(i * 2) % 7] * (i % 2 ? 2 : 1), 0.026, +((d.x / W - 0.5) * 1.2).toFixed(2)]),
  ['glitter', T.ideas, T.ideas + 1.1],
  // air meets earth
  ['pop', T.h1, 1174.66, 0.035, -0.2], ['pop', T.h1 + 0.16, 880, 0.03, 0.2], ['pop', T.h1Land, 587.33, 0.05, 0], ['pluck', T.h1Land, 587.33, 0.04, 0.6, 0],
  ['tick', T.dotsV[0] + 0.1, 0.02], ['tick', T.dotsV[0] + 0.3, 0.02],
  ['whoosh', T.pick, 0.25, 0.025], ['pop', T.pick, 440, 0.035, 0], ['pop', T.pick + 0.08, 392, 0.03, 0],
  ['pluck', T.fly[1], 987.77, 0.04, 0.5, 0.4], ['pop', T.ticket, 739.99, 0.045, 0.4], ['tick', T.ticket + 0.25, 0.04], ['bell', T.ticket + 0.27, 1318.51, 0.025, 0.8, 0.4],
  ['pop', T.gemRoll[0], 330, 0.03, -0.3], ['tick', T.gemRoll[0] + 0.3, 0.02],
  ...BACK.map((d, i) => ['pop', +(d.t + 0.05).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.024, +((d.x / W - 0.5) * 1.2).toFixed(2)]),
  ['pop', T.virRoll[0], 294, 0.03, 0.3], ['tick', T.virRoll[0] + 0.3, 0.02],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // mercury drops
  ['riser', T.drop[0] - 0.05, T.drop[1], 0.025], ['boom', T.drop[1], 0.15], ['bell', T.drop[1], 1174.66, 0.04, 1.4, 0], ['glitter', T.drop[1], T.drop[1] + 0.6],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.08, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.05, 0],
  ['pop', T.open2, 739.99, 0.04, 0], ['pop', T.open2 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L2, { cps: CPS, pitch: PITCH }),
  ['bell', T.beams + 0.3, 1318.51, 0.03, 1.0, -0.3], ['bell', T.beams + 0.36, 1760, 0.025, 1.0, 0.3],
  ...wordPops(T.h3, 3, 0.08, 1, 0.025), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['tick', T.glance, 0.02], ['pluck', T.soften, 1318.51, 0.035, 0.5, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // the reading
  ['whoosh', T.charts[0], 0.4, 0.025], ['glitter', T.charts[0] + 0.1, T.charts[1] + 0.1],
  ...T.lines.map((tl, i) => ['pluck', tl, [987.77, 1174.66, 1318.51][i], 0.045, 0.6, [-0.3, 0.3, 0][i]]),
  ...T.lines.map((tl, i) => ['pop', +(tl + 0.4).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.035, 0]),
  ['bell', T.lines[2] + 0.42, 1760, 0.03, 1.2, 0],
  ['pop', T.open3, 739.99, 0.04, 0], ['pop', T.open3 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L3, { cps: CPS, pitch: PITCH }),
  ['pop', T.close3, 880, 0.03, 0], ['pop', T.close3 + 0.07, 587.33, 0.03, 0],
  // speak each other's language
  ...wordPops(T.h5, 3, 0.08, 2, 0.026), ['pop', T.h5Land, 1318.51, 0.055, 0], ['pluck', T.h5Land, 1174.66, 0.05, 0.7, 0],
  ['glitter', T.hearts, T.hearts + 0.6], ['bell', T.hearts + 0.05, 1760, 0.025, 1.0, 0],
  ...HEARTS.map((h, i) => ['pop', +h.t.toFixed(3), NOTE[(i * 2 + 3) % 7] * 2, 0.018, +((h.x / W - 0.5) * 1.2).toFixed(2)]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
