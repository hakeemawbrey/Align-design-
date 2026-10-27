// stair (25 s vertical Align ad, Star Talk batch 3) · story 0–20.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "The *air signs* | draft a text."  The ♊ Gemini (Mercury), ♎ Libra (Venus) and ♒ Aquarius (Saturn/Uranus)
//              stars crowd one pixel phone. Their date wrote "had the best time tonight!" The draft rewrites itself:
//              "hey" → "heyyy" → "hey :)".
//   2.82       the drop: the box opens.
//              GEMINI: "add a *joke.*"           → the draft grows a horse-walks-into-a-bar joke
//              LIBRA: "no, too *much.*"           → it deletes back to "hey"
//   8.3        "Three *air signs.* | One *text.*"
//              AQUARIUS: "send a *meme* instead."  → a pixel cat meme… then all three type at once: a 412-word essay
//   11.3       THE STARS: "just send what you *mean.*"  → the essay clears; "had fun. again?" is typed and SENT.
//   14.55      card cut (deal) · "Say it | *plainly.*"  The reply pops in: "yes!! friday? ♥". Heart-eyes all round.
//   20.45→     plain sky; the end card takes over at 20.6.
// One canvas (sky + phone + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, at, wordT, checkLines, NOTE, wordPops } from './kit.js'

export const DURATION = 25
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GEM = signStar('gemini'), LIB = signStar('libra'), AQU = signStar('aquarius')
const GEM_TAG = `${GEM.glyph} GEMINI STAR`, LIB_TAG = `${LIB.glyph} LIBRA STAR`, AQU_TAG = `${AQU.glyph} AQUARIUS STAR`, SKY_TAG = 'THE STARS'
const AIR = ELEMENT_COLOR.air, SENT = '#5fb8ff'

const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [8.1, 8.3],
  phoneIn: 0.3, gemIn: 0.55, libIn: 0.8, aquIn: 1.05, d1: 1.0, d2: 1.65, d3: 2.25,
  open: 2.6, l1: BEAT(4) + 0.02, joke: 3.75, l2: 5.6, del: 6.45, l3: 8.4, meme: 9.35, essay: 10.15,
  h1: 8.35, h1Land: 8.75, h1Out: [14.1, 14.3],
  l4: 11.6, clear: 12.75, type: [13.0, 13.55], send: 13.75, close: 14.3,
  cut: 14.55,
  h2: 14.65, h2Land: 15.1, reply: 15.75, hearts: 16.6,
  out: [20.05, 20.42], h2Out: [20.1, 20.36],
}
const CPS = 30
const LINES = [
  { t: T.l1, speaker: GEM_TAG, color: GEM.color, text: 'add a *joke.*' },
  { t: T.l2, speaker: LIB_TAG, color: '#f08ae6', text: 'no, too *much.*' },
  { t: T.l3, speaker: AQU_TAG, color: AQU.color, text: 'send a *meme* instead.' },
  { t: T.l4, speaker: SKY_TAG, text: 'just send what you *mean.*' },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_MEAN = wordT(LT, LINES, 3, 'mean')

const JOKE = 'hey :) so a horse walks into a bar and'
// draft states: [t, kind, text]
const DRAFT = [[T.d1, 'type', 'hey'], [T.d2, 'type', 'heyyy'], [T.d3, 'type', 'hey :)'], [T.joke, 'type', JOKE], [T.del, 'del', 'hey'], [T.meme, 'meme', ''], [T.essay, 'essay', ''], [T.clear, 'del', ''], [T.type[0], 'type', 'had fun. again?'], [T.send, 'sent', '']]
const FINAL = 'had fun. again?'

// layout
const PH = { x: 540, y: 530, w: 420, h: 660 }, PH2 = { y: 600, sc: 1.12 }       // phone top-left = (x - w/2, y)
const GEMP = { x: 160, y: 900, s: 225 }, LIBP = { x: 920, y: 900, s: 225 }, AQUP = { x: 540, y: 1300, s: 190 }
const AQU2 = { x: 880, y: 1430, s: 215 }, GEM2 = { x: 170, y: 1380, s: 235 }, LIB2 = { x: 920, y: 1050, s: 225 }
const after = t => t >= T.cut

const GEM_HOPS = [T.gemIn + 0.3, ...talkHops(LINES, GEM_TAG, { cps: CPS }), T.essay, T.essay + 0.35, T.send + 0.1, T.reply + 0.3]
const LIB_HOPS = [T.libIn + 0.3, ...talkHops(LINES, LIB_TAG, { cps: CPS }), T.essay + 0.12, T.essay + 0.47, T.send + 0.15, T.reply + 0.35]
const AQU_HOPS = [T.aquIn + 0.3, ...talkHops(LINES, AQU_TAG, { cps: CPS }), T.essay + 0.24, T.essay + 0.6, T.send + 0.2, T.reply + 0.4]

const GEM_ST = [
  [0, { mood: 'happy' }], [T.d1, { mood: 'neutral', look: [1, 0] }],
  [T.l1, { mood: 'sparkle', look: [1, 0] }], [T.joke + 0.4, { mood: 'happy' }],
  [T.l2, { mood: 'wide', look: [1, 0], blink: false }], [T.del, { mood: 'eyeroll' }], [T.del + 1.0, { mood: 'neutral', look: [1, 0] }],
  [T.l3, { mood: 'neutral', look: [1, 1] }], [T.meme, { mood: 'happy' }], [T.essay, { mood: 'squint', look: [1, 0] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEAN, { mood: 'wide', look: [0, 0], blink: false }], [T.send, { mood: 'wide', look: [1, 0], blink: false }], [T.send + 0.6, { mood: 'happy' }],
  [T.cut, { mood: 'neutral', look: [1, -1] }], [T.reply + 0.2, { mood: 'heart' }],
]
const LIB_ST = [
  [0, { mood: 'sparkle', look: [0, 0] }], [T.d1, { mood: 'neutral', look: [-1, 0] }], [T.d2, { mood: 'squint', look: [-1, 0] }], [T.d3, { mood: 'neutral', look: [-1, 0] }],
  [T.l1, { mood: 'neutral', look: [-1, 0] }], [T.joke + 0.5, { mood: 'wide', look: [-1, 0], blink: false }],
  [T.l2, { mood: 'squint', look: [0, 0] }], [T.del + 0.3, { mood: 'happy' }],
  [T.l3, { mood: 'neutral', look: [-1, 1] }], [T.meme, { mood: 'squint', look: [-1, 0] }], [T.essay, { mood: 'wide', look: [-1, 0], blink: false }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEAN, { mood: 'wide', look: [0, 0], blink: false }], [T.send + 0.6, { mood: 'happy' }],
  [T.cut, { mood: 'neutral', look: [-1, 0] }], [T.reply + 0.25, { mood: 'heart' }],
]
const AQU_ST = [
  [0, { mood: 'neutral', look: [1, 0] }], [T.l1, { mood: 'neutral', look: [-1, -1] }],
  [T.l2, { mood: 'eyeroll' }],
  [T.l3, { mood: 'sparkle', look: [0, -1] }], [T.meme, { mood: 'happy' }], [T.essay, { mood: 'wide', look: [0, -1], blink: false }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEAN, { mood: 'wide', look: [0, 0], blink: false }], [T.send + 0.6, { mood: 'happy' }],
  [T.cut, { mood: 'neutral', look: [-1, -1] }], [T.reply + 0.3, { mood: 'heart' }],
]

const CAT = ['X.....X...', 'XX...XX...', 'XoXXXoX...', 'XXXXXXX...', 'XwXXXwX..X', 'XXXpXXX.X.', '.XXXXX.X..', '.XXXXXXX..', '.XX.XX.X..']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The *air signs* | draft a text.', { top: 190, size: 104, accentSize: 140, at: T.h0, times: [T.h0, T.h0Land, T.h0Land + 0.12, T.h0Land + 0.4, T.h0Land + 0.48, T.h0Land + 0.56], wobble: true, accentColor: AIR })
  const H1 = popText(root, 'Three *air signs.* | One *text.*', { top: 196, size: 104, accentSize: 136, at: T.h1, times: [T.h1, T.h1Land, T.h1Land + 0.1, T.h1 + 0.65, T.h1Land + 0.65], wobble: true, colors: { 1: AIR, 2: AIR, 4: GOLD } })
  const H2 = popText(root, 'Say it | *plainly.*', { top: 200, size: 128, accentSize: 184, at: T.h2, times: [T.h2, T.h2 + 0.1, T.h2Land], wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  /** wrap text into rows of at most n chars (monospace) */
  const wrap = (s, n) => { const out = []; let row = ''; for (const w of s.split(' ')) { if ((row + (row ? ' ' : '') + w).length > n) { out.push(row); row = w } else row += (row ? ' ' : '') + w } if (row) out.push(row); return out }

  /** the draft at t: { kind, text (visible), caret } */
  function draftAt(t) {
    let cur = null, prev = null
    for (const d of DRAFT) if (t >= d[0]) { prev = cur; cur = d }
    if (!cur) return { kind: 'type', text: '' }
    const [t0, kind, txt] = cur, dt = t - t0
    if (kind === 'type') {
      const from = prev && prev[1] === 'type' && txt.startsWith(prev[2].slice(0, 3)) ? Math.min(prev[2].length, [...txt].findIndex((c, i) => prev[2][i] !== c) >>> 0) : 0
      const n = Math.min(txt.length, from + Math.floor(dt * 24))
      return { kind, text: txt.slice(0, n) }
    }
    if (kind === 'del') {
      const src = prev ? (prev[1] === 'essay' ? '' : prev[1] === 'meme' ? '' : prev[2]) : ''
      const n = Math.max(txt.length, src.length - Math.floor(dt * 40))
      return { kind: 'type', text: n > txt.length ? src.slice(0, n) : txt }
    }
    return { kind, text: '', dt }
  }

  function drawPhone(t, o) {
    const pk = pop01(t, T.phoneIn, 0.42, 1.8) * o
    if (pk <= 0.01) return
    const { w, h } = PH, X0 = -w / 2
    const shake = t > T.essay && t < T.essay + 0.8 ? Math.sin((t - T.essay) * 60) * 6 * (1 - (t - T.essay) / 0.8) : 0
    const two = after(t), Y0 = two ? PH2.y : PH.y, sc = two ? PH2.sc : 1
    x.save(); x.translate(PH.x + shake, Y0 + h * sc / 2 + Math.sin(t * 1.5) * 5); x.scale(pk * sc, pk * sc); x.translate(0, -h / 2)
    // body
    x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(X0 - 12, -12, w + 24, h + 24)
    x.fillStyle = '#3a2f66'; x.fillRect(X0 - 6, -6, w + 12, h + 12)
    x.fillStyle = '#fbf6ea'; x.fillRect(X0 + 10, 10, w - 20, h - 20)
    // header
    x.fillStyle = '#ece4d2'; x.fillRect(X0 + 10, 10, w - 20, 74)
    x.fillStyle = '#d9cfb8'; x.fillRect(X0 + 10, 84, w - 20, 3)
    x.fillStyle = '#c9a6ff'; x.fillRect(X0 + 32, 28, 38, 38)
    x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textBaseline = 'middle'; x.fillText('them', X0 + 86, 48)
    x.fillStyle = '#ff4f86'; x.fillText('♡', X0 + 170, 47)
    // their message
    const bub = (bx, by, rows, col, ink, right) => {
      const bw = Math.max(...rows.map(r => r.length)) * 19.3 + 34, bh = rows.length * 38 + 24
      const xx = right ? X0 + w - 26 - bw : X0 + 26
      x.fillStyle = col; x.fillRect(xx, by, bw, bh); x.fillRect(xx + 6, by - 4, bw - 12, bh + 8)
      x.fillStyle = ink; x.font = `700 32px ${MONO}`
      rows.forEach((r, i) => x.fillText(r, xx + 17, by + 31 + i * 38))
      return bh
    }
    bub(0, 110, ['had the best', 'time tonight!'], '#e4ddcb', INK, false)
    // sent message (moves up from the draft)
    const sp = prog(t, T.send, T.send + 0.35)
    if (sp > 0) {
      const yy = lerp(h - 130, 230, ease.outCubic(sp))
      bub(0, yy, [FINAL], SENT, '#0d1a3a', true)
      if (sp >= 1) { x.fillStyle = '#8a8098'; x.font = `700 20px ${MONO}`; x.fillText('delivered ✓', X0 + w - 186, yy + 86) }
    }
    // the reply (after the cut)
    if (t >= T.reply) {
      const rk = pop01(t, T.reply, 0.3, 2.4)
      x.save(); x.translate(X0 + 26, 380); x.scale(rk, rk); x.translate(-(X0 + 26), -380)
      bub(0, 350, ['yes!! friday? ♥'], '#ffd1de', '#4a0f2a', false)
      x.restore()
    }
    // the draft field
    const D = draftAt(t)
    const fx = X0 + 22, fw = w - 44
    let fh = 70, fy = h - 22 - fh
    if (D.kind === 'type' && D.text) { const rows = wrap(D.text, 18); fh = Math.max(70, rows.length * 34 + 30); fy = h - 22 - fh }
    if (D.kind === 'meme') { fh = 230; fy = h - 22 - fh }
    if (D.kind === 'essay') { const g = ease.outCubic(clamp(D.dt / 0.7)); fh = lerp(70, 420, g); fy = h - 22 - fh }
    if (D.kind !== 'sent' || t < T.send + 0.05) {
      x.fillStyle = '#ffffff'; x.fillRect(fx, fy, fw, fh)
      x.fillStyle = '#c9bfa8'; x.fillRect(fx, fy, fw, 3); x.fillRect(fx, fy + fh - 3, fw, 3); x.fillRect(fx, fy, 3, fh); x.fillRect(fx + fw - 3, fy, 3, fh)
    } else { x.fillStyle = '#ffffff'; x.fillRect(fx, h - 92, fw, 70); x.fillStyle = '#c9bfa8'; x.fillRect(fx, h - 92, fw, 3) }
    x.font = `700 28px ${MONO}`; x.fillStyle = INK
    if (D.kind === 'type') {
      const rows = wrap(D.text, 18)
      rows.forEach((r, i) => x.fillText(r, fx + 16, fy + 36 + i * 34))
      // caret
      if (Math.floor(t * 3) % 2 === 0) { const last = rows[rows.length - 1] || ''; x.fillStyle = SENT; x.fillRect(fx + 18 + last.length * 17, fy + 20 + (Math.max(1, rows.length) - 1) * 34, 4, 30) }
    }
    if (D.kind === 'meme') {
      const mk = pop01(t, T.meme, 0.3, 2.4)
      x.save(); x.translate(fx + fw / 2, fy + fh / 2); x.scale(mk, mk)
      x.fillStyle = '#2a2350'; x.fillRect(-120, -95, 240, 190)
      drawBits(x, CAT, { X: '#f2a65a', o: '#ffd98a', w: '#ffffff', p: '#ff8fb1' }, -10, -18, 12, { outline: '#1b1236' })
      x.fillStyle = '#ffffff'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('ME RN', 0, 72); x.textAlign = 'left'
      x.restore()
    }
    if (D.kind === 'essay') {
      const n = Math.floor((fh - 40) / 16)
      for (let i = 0; i < n; i++) { const ww = 40 + ((i * 53) % 9) * 30; x.fillStyle = i % 7 === 6 ? '#ffffff' : '#7a6f8e'; x.fillRect(fx + 16, fy + 18 + i * 16, Math.min(fw - 40, ww + 120), 8) }
      // word counter badge
      const words = Math.min(412, Math.floor(D.dt * 520))
      x.fillStyle = '#ff5c6c'; x.fillRect(fx + fw - 190, fy - 52, 190, 44)
      x.fillStyle = '#ffffff'; x.font = `700 24px ${MONO}`; x.fillText(`${words} words`, fx + fw - 176, fy - 29)
      // scroll bar
      x.fillStyle = '#c9bfa8'; x.fillRect(fx + fw - 14, fy + 10, 6, fh - 20); x.fillStyle = '#7a6f8e'; x.fillRect(fx + fw - 14, fy + 10 + ((D.dt * 80) % (fh - 60)), 6, 40)
    }
    // send button flash
    if (t > T.send - 0.1 && t < T.send + 0.3) { x.globalAlpha = 1 - prog(t, T.send, T.send + 0.3); x.fillStyle = SENT; x.fillRect(fx + fw - 60, h - 86, 48, 48); x.globalAlpha = 1 }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + (((i * 37) % 9) / 8 - 0.5) * 700 + Math.sin(p * 7 + i) * 16, cy - p * 240, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const two = after(t)
    drawPhone(t, o)
    const gasp = t > T_MEAN && t < T_MEAN + 0.6 ? -0.1 * Math.exp(-(t - T_MEAN) * 7) * Math.cos((t - T_MEAN) * 20) : 0
    const cast = [
      { P: two ? GEM2 : GEMP, c: GEM, st: GEM_ST, hops: GEM_HOPS, tin: T.gemIn, seed: 4, bob: 0.06 },
      { P: two ? LIB2 : LIBP, c: LIB, st: LIB_ST, hops: LIB_HOPS, tin: T.libIn, seed: 7, bob: 0.03 },
      { P: two ? AQU2 : AQUP, c: AQU, st: AQU_ST, hops: AQU_HOPS, tin: T.aquIn, seed: 12, bob: 0.07 },
    ]
    cast.forEach(m => {
      const pk = pop01(t, m.tin, 0.36, 2.2) * o
      if (pk <= 0.01) return
      // Libra sways like a scale, Aquarius floats a little apart
      const tilt = m.c === LIB ? Math.sin(t * 2.2) * 0.03 : 0
      drawStarChar(x, m.P.x, m.P.y, m.P.s, t, { color: m.c.color, glyph: m.c.glyph, ...at(t, m.st), hops: m.hops, seed: m.seed, pop: pk, bob: m.P.s * m.bob, squash: gasp + tilt })
    })
    sparkles(x, t, PH.x + 120, PH.y + 250, T.send + 0.2, { n: 10, R: 140, size: 22, seed: 3, cols: [SENT, BONE, GOLD] })
    sparkles(x, t, PH.x - 60, PH.y + 360, T.meme + 0.1, { n: 8, R: 120, size: 20, seed: 6, cols: ['#f2a65a', BONE, AQU.color] })
    if (two) {
      sparkles(x, t, PH.x - 60, PH2.y + 400, T.reply + 0.1, { n: 12, R: 220, size: 24, seed: 8, cols: [PINK, GOLD, BONE] })
      if (t > T.hearts) floatHearts(t, 540, 1330, T.hearts)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 14.55 (box shut → the reply). End card flips at 20.6.
const CUTS = [{ t: T.cut, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const PITCH = { [GEM_TAG]: 1174.66, [LIB_TAG]: 880, [AQU_TAG]: 659.25, [SKY_TAG]: 987.77 }
const keyTicks = (t0, n, gap = 0.042) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), 0.012])
export const CUES = [
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Land, 987.77, 0.045, -0.1], ['pop', T.h0Land + 0.12, 1174.66, 0.045, 0.1], ...wordPops(T.h0Land + 0.4, 3, 0.08, 2, 0.026),
  ['whoosh', T.phoneIn, 0.4, 0.03], ['pop', T.phoneIn + 0.25, 739.99, 0.04, 0],
  ['pop', T.gemIn + 0.05, 1174.66, 0.04, -0.5], ['pop', T.libIn + 0.05, 880, 0.04, 0.5], ['pop', T.aquIn + 0.05, 659.25, 0.04, 0],
  ...keyTicks(T.d1, 3), ...keyTicks(T.d2 + 0.12, 2), ...keyTicks(T.d3 + 0.1, 3),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ...keyTicks(T.joke + 0.2, 12, 0.07),
  ['whoosh', T.del, 0.35, 0.025], ['pop', T.del + 0.4, 440, 0.03, 0],
  ...wordPops(T.h1, 2, 0.1, 1, 0.028), ['pop', T.h1 + 0.65, 659.25, 0.035, 0], ['pop', T.h1Land + 0.65, 587.33, 0.045, 0],
  ['pop', T.meme, 1318.51, 0.04, 0], ['glitter', T.meme + 0.1, T.meme + 0.5],
  ['boom', T.essay, 0.08], ...keyTicks(T.essay, 18, 0.035),
  ['pop', T_MEAN, 440, 0.035, 0], ['pop', T_MEAN + 0.06, 392, 0.03, 0],
  ['whoosh', T.clear, 0.3, 0.025], ...keyTicks(T.type[0], 8, 0.07),
  ['whoosh', T.send, 0.35, 0.035], ['pluck', T.send + 0.05, 1318.51, 0.045, 0.6, 0.2], ['glitter', T.send + 0.2, T.send + 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pop', T.reply, 1567.98, 0.045, -0.2], ['bell', T.reply + 0.05, 1760, 0.03, 1.1, 0], ['glitter', T.reply + 0.1, T.reply + 0.6],
  ['glitter', T.hearts, T.hearts + 0.6], ['pluck', T.hearts, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
