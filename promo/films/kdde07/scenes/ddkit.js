// ddkit — the DEEP DIVE: ___ IN LOVE show kit (star_advice, Month 2 boost, batch m25: kdde07–kdde12).
// kdde08–12 IMPORT this file read-only ('../../kdde07/scenes/ddkit.js'). Built on the shared hookkit.js + startalk.js
// + the Moonlight kit (mlkit.js, read-only). No end card, no card cut, no logo, the word "Align" never on screen.
//
// A film is data + a few drawing functions:
//   const DD = buildDeepDive({
//     id, sign: 'libra', ep: 7,
//     hook:   { text: 'Loving a *Libra?* | Watch this first.', accent }     frame-0 hook line (≤ 7 words, on at t = 0)
//     promise: 'stay for *chapter four.* that's the one.'                     THE STARS' second intro line
//     cold(x, t, H)             draws the frame-0 action (the sign mid-chaos). Called for t < INTRO and for the loop-back.
//     chapters: [ { beats: [ { cap, lines: [{ text, who? }], draw(x, t, lt, H) } × 3 ], note: 'field note text' } × 4 ]
//          cap   the beat's headline ('Compliments like *confetti.*')   lines  1–2 dialogue lines (≤ 70 chars)
//          who   'stars' (default) | 'sign' | 'you'   draw  the beat's picture (lt = seconds since the beat began)
//     outro(x, t, lt, H)        the last scene (under the last line)       last: 'Ask, then wait. | They'll *choose you.*'
//     ending: 'cut' | 'loop',   chLen = 27 (seconds per chapter)
//   })
//   export const { DURATION, SCENES, CUES, T } = DD
//
// H (the helper bag passed to every draw function):
//   H.hero(o)  the sign  { x = 330, y = 930, s = 300, mood, look, hops, rot, squash, pop, alpha }
//   H.you(o)   the partner ("YOU", a pale star with a name pill)  { x = 770, y = 960, s = 250, … }
//   H.star(sign, o)  any other sign · H.bubble(x, y, text, o) · H.icon(name, x, y, cell) · H.bits(rows, pal, x, y, cell)
//   H.spark(t, x, y, t0, n, R, seed) · H.meter(x, y, w, f, label, col) · H.stamp(text, x, y, k, col, rot)
//   H.label(text, x, y, o) · H.card(x, y, w, text, o) (a talk card) · H.phone(cx, cy, w, h, t, o)
//   H.pop(lt, at, d) springy 0→1 · H.out(lt, a, b) 1→0 · H.in(lt, a, b) eased 0→1 · H.bump(lt, at, d)
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  ML_GOLD, GOLD, BONE, INK, PINK, LAV, CYAN, MINT, MONO, INTER, SERIF, r3, rgba, mixHex, pop01, outK, popOut, bump, loadFonts,
  drawSign, drawBubble, drawPhone, drawIcon, sparkles, popCues,
} from '../../mlpilot/scenes/mlkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, loopBack, loopCues } from '../../hookkit.js'

export { GOLD, BONE, INK, PINK, LAV, CYAN, MINT, MONO, INTER, SERIF, r3, rgba, mixHex, pop01, outK, popOut, bump }
export const YOU_C = '#f3eeff'
const CH_NAMES = ['HOW THEY FLIRT', 'WHAT THEY NEED', 'HOW THEY FIGHT', 'WHAT MAKES THEM STAY']
const CH_SHORT = ['FLIRT', 'NEED', 'FIGHT', 'STAY']
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]

// ── pixel bitmaps
export function bits(x, rows, pal, cx, cy, cell, { rot = 0, alpha = 1 } = {}) {
  if (cell <= 0 || alpha <= 0.01) return
  const w = rows[0].length, h = rows.length
  x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(cy)); if (rot) x.rotate(rot); x.scale(cell, cell); x.translate(-w / 2, -h / 2)
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { x.fillStyle = c; x.fillRect(i, j, 1.03, 1.03) } } })
  x.restore()
}
export const PAL = { K: INK, W: '#fff8ec', G: GOLD, R: '#e8566e', P: PINK, B: '#5a7be0', O: '#a8683a', M: '#3fb88a', C: CYAN, L: LAV, Y: '#ffe27a', D: '#2a1f55', S: '#c9c2d6' }
export const PIX = {
  heart: ['.KK.KK.', 'KPPKPPK', 'KPWPPPK', 'KPPPPPK', '.KPPPK.', '..KPK..', '...K...'],
  bigheart: ['.KKK.KKK.', 'KPPPKPPPK', 'KPWPPPPPK', 'KPPPPPPPK', '.KPPPPPK.', '..KPPPK..', '...KPK...', '....K....'],
  brokenheart: ['.KKK.KKK.', 'KPPPKPPPK', 'KPWPKPPPK', 'KPPKPPPPK', '.KPPKPPK.', '..KPKPK..', '...KPK...', '....K....'],
  tissue: ['..KKKK..', '.KWWWWK.', 'KWWWWWWK', 'KWWSWWWK', 'KWWWWWWK', '.KWWWWK.', '..KKKK..'],
  drop: ['..K..', '.KCK.', 'KCCCK', 'KCWCK', '.KKK.'],
  bolt: ['...KKK', '..KYYK', '.KYYK.', 'KYYYYK', '.KKYK.', '..KYK.', '..KK..'],
  note: ['..KKKK', '..KGGK', '..KK.K', '..K..K', 'KKK.KK', 'KGK.KK', 'KKK...'],
  sweat: ['.K.', 'KCK', 'KCK', '.K.'],
  zz: ['KKKK', '..K.', '.K..', 'KKKK'],
  exclaim: ['KK', 'KK', 'KK', 'KK', '..', 'KK'],
  question: ['.KKK.', 'K...K', '...K.', '..K..', '.....', '..K..'],
  plant: ['...MM...', '..MMMM..', '.MM..MM.', '...MM...', '..KKKK..', '..KOOK..', '..KOOK..', '...KK...'],
  clock: ['..KKKK..', '.KWWWWK.', 'KWWKWWWK', 'KWWKWWWK', 'KWWKKKWK', 'KWWWWWWK', '.KWWWWK.', '..KKKK..'],
  cloud: ['...KKKK...', '..KWWWWK..', '.KWWWWWWKK', 'KWWWWWWWWK', 'KWWWWWWWWK', '.KKKKKKKK.'],
  sun: ['.Y..Y..Y.', '..KKKKK..', 'YKGGGGGKY', '.KGGGGGK.', 'YKGGGGGKY', '..KKKKK..', '.Y..Y..Y.'],
  key: ['.KKK......', 'KGGGK.....', 'KG.GKKKKKK', 'KGGGKGGGGK', '.KKK.KK.KK'],
  star: ['....K....', '...KGK...', 'KKKKGKKKK', 'KGGGGGGGK', '.KGGGGGK.', '..KGGGK..', '.KGGKGGK.', 'KGK...KGK', 'KK.....KK'],
  ring: ['..KKK..', '.KGGGK.', 'KG...GK', 'KG...GK', 'KG...GK', '.KGGGK.', '..KKK..'],
  rock: ['..KKKK..', '.KSSSSK.', 'KSKSSKSK', 'KSSSSSSK', 'KSKSSKSK', 'KSSKKSSK', '.KSSSSK.', '..KKKK..'],
  gift: ['.KK.KK.', 'KPPKPPK', 'KKKKKKK', 'KRRGRRK', 'KRRGRRK', 'KRRGRRK', 'KKKKKKK'],
  cup: ['..K.K.K...', '...K.K....', 'KKKKKKKK..', 'KWWWWWWKKK', 'KWOOOOWK.K', 'KWOOOOWK.K', 'KWOOOOWKKK', '.KWWWWK...', '..KKKK....'],
  check: ['.......KK', '......KMK', '.....KMK.', 'KK..KMK..', 'KMKKMK...', '.KMMK....', '..KK.....'],
  cross: ['KK...KK', 'KRK.KRK', '.KRKRK.', '..KRK..', '.KRKRK.', 'KRK.KRK', 'KK...KK'],
  flower: ['..KKK...', '.KPPPK..', 'KPPGPPK.', '.KPPPK..', '..KMK...', '..KMK.K.', '..KMKKMK', '..KMMMK.', '...KMK..'],
  moon: ['..KKKK...', '.KGGGK...', 'KGGGK....', 'KGGK.....', 'KGGK.....', 'KGGGK....', '.KGGGKKK.', '..KKKKKK.'],
}
export const pix = (x, name, cx, cy, cell, o) => bits(x, PIX[name] || PIX.star, PAL, cx, cy, cell, o)

// ── canvas text
export function label(x, text, cx, cy, { size = 34, col = BONE, font = INTER, weight = 800, align = 'center', alpha = 1, k = 1, rot = 0, shadow = true, spacing = 0 } = {}) {
  if (alpha <= 0.01 || k <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); if (rot) x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (spacing) x.letterSpacing = spacing + 'px'
  if (shadow) { x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.shadowOffsetY = 2 }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function wrap(x, text, maxW) {
  const out = []; let cur = ''
  for (const w of String(text).split(' ')) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
  return out
}
/** a stepped pixel panel at (cx, cy) */
export function panel(x, cx, cy, w, h, { fillC = 'rgba(16,9,38,0.94)', border = GOLD, P = 6, k = 1, rot = 0, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const st = (ww, hh, c) => { x.fillStyle = c; x.fillRect(-ww / 2 + 2 * P, -hh / 2, ww - 4 * P, hh); x.fillRect(-ww / 2, -hh / 2 + 2 * P, ww, hh - 4 * P); x.fillRect(-ww / 2 + P, -hh / 2 + P, ww - 2 * P, hh - 2 * P) }
  st(w + 4 * P, h + 4 * P, INK); st(w + 2 * P, h + 2 * P, border); st(w, h, fillC)
  x.restore()
}
/** a rubber stamp slam (k: 0→1 from pop01; it lands big then settles) */
export function stamp(x, text, cx, cy, k, { col = '#ff5b7a', rot = -0.12, size = 64, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const s = lerp(2.2, 1, clamp(k)) * (k > 1 ? k : 1)
  x.save(); x.globalAlpha *= alpha * clamp(k * 3); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `900 ${size}px ${INTER}`; x.letterSpacing = '4px'
  const w = x.measureText(text).width + size * 0.9, h = size * 1.5
  x.lineWidth = size * 0.1; x.strokeStyle = col; x.strokeRect(-w / 2, -h / 2, w, h)
  x.lineWidth = size * 0.04; x.strokeRect(-w / 2 + size * 0.14, -h / 2 + size * 0.14, w - size * 0.28, h - size * 0.28)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, size * 0.05)
  x.restore()
}
/** a segmented pixel meter */
export function meter(x, cx, cy, w, f, { label: lab = '', col = PINK, k = 1, n = 12 } = {}) {
  if (k <= 0.01) return
  const h = 40
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#2a1f55'; x.fillRect(-w / 2, -h / 2, w, h)
  const cw = w / n
  for (let i = 0; i < n; i++) if ((i + 1) / n <= clamp(f) + 0.001) { x.fillStyle = i % 2 ? col : mixHex(col, '#ffffff', 0.35); x.fillRect(-w / 2 + i * cw + 3, -h / 2 + 4, cw - 6, h - 8) }
  if (lab) { x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'bottom'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 8; x.fillText(lab, 0, -h / 2 - 16) }
  x.restore()
}
/** a talk card (an object on the table: dark card, gold border, one question) */
export function talkCard(x, cx, cy, w, text, { rot = 0, k = 1, alpha = 1, head = 'TALK CARD', flip = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const h = w * 1.4, u = w / 300
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k * flip, k)
  x.save(); x.shadowColor = 'rgba(242,199,92,0.55)'; x.shadowBlur = 40 * u
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22 * u); x.fillStyle = '#150c2c'; x.fill(); x.restore()
  x.lineWidth = 6 * u; x.strokeStyle = GOLD; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22 * u); x.stroke()
  x.lineWidth = 2 * u; x.strokeStyle = rgba(GOLD, 0.5); x.beginPath(); x.roundRect(-w / 2 + 14 * u, -h / 2 + 14 * u, w - 28 * u, h - 28 * u, 14 * u); x.stroke()
  if (flip > 0) {
    x.fillStyle = GOLD; x.font = `700 ${Math.round(20 * u)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = 3 * u + 'px'
    x.fillText(head, 0, -h / 2 + 52 * u)
    x.letterSpacing = '0px'
    x.fillStyle = BONE; x.font = `italic 500 ${Math.round(40 * u)}px ${SERIF}`
    const ls = wrap(x, text, w - 60 * u)
    ls.forEach((s, i) => x.fillText(s, 0, (i - (ls.length - 1) / 2) * 46 * u + 10 * u))
  } else {
    x.strokeStyle = rgba(GOLD, 0.7); x.lineWidth = 3 * u
    for (let i = 0; i < 7; i++) { const a = i / 6 * Math.PI * 2; x.beginPath(); x.arc(i ? Math.cos(a) * 36 * u : 0, i ? Math.sin(a) * 36 * u : 0, 36 * u, 0, Math.PI * 2); x.stroke() }
  }
  x.restore()
}

// ── the cast
function drawYou(x, t, { x: px = 770, y = 960, s = 250, mood = 'happy', look, hops, pop = 1, alpha = 1, squash = 0, seed = 21, tag = true, blush } = {}) {
  const r = drawStarChar(x, px, y, s, t, { color: YOU_C, mood, look, hops, pop, alpha, squash, seed, glow: 0.7, blush })
  if (tag && pop > 0.3 && alpha > 0.05) {
    x.save(); x.globalAlpha *= alpha * clamp((pop - 0.3) * 2)
    const ty = y + s * 0.58
    x.font = `800 24px ${INTER}`; x.letterSpacing = '5px'
    const w = x.measureText('YOU').width + 34
    x.fillStyle = INK; x.fillRect(px - w / 2 - 4, ty - 20, w + 8, 40); x.fillStyle = '#efe6ff'; x.fillRect(px - w / 2, ty - 16, w, 32)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOU', px + 2, ty + 1)
    x.restore()
  }
  return r
}

// ── the show
export function buildDeepDive(spec) {
  const { sign, ep, chapters, chLen = 27, ending = 'cut' } = spec
  const S = signStar(sign), NAME = sign[0].toUpperCase() + sign.slice(1)
  const SIGN_TAG = `${S.glyph}︎ ${NAME.toUpperCase()}`
  const ACC = spec.accent || mixHex(S.color, '#ffffff', 0.25)
  const INTRO = 8.5
  // the timeline (pure)
  const CH = chapters.map((c, i) => {
    const at = r3(INTRO + i * chLen), beatLen = (chLen - 2.2 - 2.9) / 3
    const beats = c.beats.map((b, j) => ({ ...b, at: r3(at + 2.2 + j * beatLen), end: r3(at + 2.2 + (j + 1) * beatLen) }))
    return { ...c, i, at, end: r3(at + chLen), beats, note: { text: c.note, at: r3(at + 2.2 + 3 * beatLen), out: r3(at + chLen - 0.15) } }
  })
  const OUT = CH[CH.length - 1].end
  const nLast = spec.last.split(/\s+/).filter(w => w && w !== '|').length
  const LASTH = { at: r3(OUT + 0.35), text: spec.last, top: 270, size: 104, gap: 0.12, accentColor: mixHex(S.color, '#ffffff', 0.25) }
  const lastLand = LASTH.at + (nLast - 1) * LASTH.gap + 0.25
  const DURATION = r3(ending === 'loop' ? lastLand + 1.45 : lastLand + 0.85)
  const LOOP = ending === 'loop' ? [r3(DURATION - 0.4), DURATION] : null
  const HOOK = { at: -1, text: spec.hook.text, out: [r3(INTRO - 0.4), r3(INTRO - 0.2)], top: 250, size: 112, accentColor: mixHex(S.color, '#ffffff', 0.2) }
  const WHIP = { at: -0.2, from: 1.4 }
  const REC = { at: 0.42, len: 1.45, sub: 'deep dive · a field guide', caption: `everything nobody tells you | about *loving a ${NAME}.*`, top: 1440 }
  const STICK = chapters.map((c, i) => ({ at: r3(INTRO + i * chLen + 1.0), out: [r3(INTRO + (i + 1) * chLen - 0.3), r3(INTRO + (i + 1) * chLen - 0.1)], n: i + 1, title: CH_NAMES[i], x: 56, y: 116, color: i === 3 ? GOLD : mixHex(S.color, '#ffffff', 0.35) }))
  const T = { INTRO, CH, OUT, LASTH, DURATION, LOOP, kicker: 2.0, lens: 4.6 }

  // dialogue
  const CPS = 30
  const SPK = { stars: 'THE STARS', sign: SIGN_TAG, you: '✦ YOU' }
  const COL = { stars: GOLD, sign: ACC, you: '#d9ccff' }
  const mk = (l, t) => ({ t: r3(t), speaker: SPK[l.who || 'stars'], color: COL[l.who || 'stars'], text: l.text })
  const INTRO_LINES = [
    mk({ text: spec.intro || `a field guide to loving a *${NAME}.*` }, 2.2),
    mk({ text: spec.promise }, 4.95),
  ]
  const BOXES = [{ lines: INTRO_LINES, open: 2.0, close: r3(INTRO - 0.25) }]
  for (const c of CH) {
    const lines = []
    for (const b of c.beats) b.lines.forEach((l, j) => lines.push(mk(l, b.at + (l.at ?? (j === 0 ? 0.35 : 3.95)))))
    BOXES.push({ lines, open: r3(c.beats[0].at + 0.25), close: r3(c.note.at - 0.1) })
  }
  const ALL_LINES = BOXES.flatMap(b => b.lines)
  const NAR_HOPS = talkHops(ALL_LINES, SPK.stars, { cps: CPS })
  const SIGN_HOPS = talkHops(ALL_LINES, SPK.sign, { cps: CPS })
  const YOU_HOPS = talkHops(ALL_LINES, SPK.you, { cps: CPS })

  // captions
  const CAPS = [
    ...CH.flatMap(c => c.beats.map(b => ({ text: b.cap, at: r3(b.at + 0.05), out: [r3(b.end - 0.25), r3(b.end - 0.05)], size: 84, accent: ACC }))),
  ]

  const curCh = t => { for (let i = CH.length - 1; i >= 0; i--) if (t >= CH[i].at) return i; return -1 }
  const curBeat = t => { const c = curCh(t); if (c < 0) return null; const C = CH[c]; for (let j = 2; j >= 0; j--) if (t >= C.beats[j].at && t < C.beats[j].end) return { c, j, b: C.beats[j] }; return null }

  async function build(stage) {
    await loadFonts(["700 46px 'Space Mono'", '900 64px Inter', "italic 500 48px 'EB Garamond'"])
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = {
      hero: (o = {}) => drawSign(x, sign, o.x ?? 330, o.y ?? 930, o.s ?? 300, o.t ?? H.t, { hops: SIGN_HOPS, seed: 5, cap: false, ...o }),
      dim: (a) => { if (a > 0.01) { x.save(); x.fillStyle = `rgba(5,4,12,${a})`; x.fillRect(0, 0, 1080, 1920); x.restore() } },
      you: (o = {}) => drawYou(x, o.t ?? H.t, { hops: YOU_HOPS, ...o }),
      star: (sg, o = {}) => drawSign(x, sg, o.x ?? 540, o.y ?? 930, o.s ?? 200, o.t ?? H.t, o),
      bubble: (bx, by, text, o) => drawBubble(x, bx, by, text, o),
      icon: (name, ix, iy, cell) => drawIcon(x, name, ix, iy, cell),
      bits: (rows, pal, bx, by, cell, o) => bits(x, rows, pal, bx, by, cell, o),
      pix: (name, bx, by, cell, o) => pix(x, name, bx, by, cell, o),
      spark: (t, sx, sy, t0, n = 10, R = 150, seed = 1, cols) => sparkles(x, t, sx, sy, t0, n, R, seed, cols),
      meter: (mx, my, w, f, o) => meter(x, mx, my, w, f, o),
      stamp: (text, sx, sy, k, o) => stamp(x, text, sx, sy, k, o),
      label: (text, lx, ly, o) => label(x, text, lx, ly, o),
      panel: (px, py, w, h, o) => panel(x, px, py, w, h, o),
      card: (cx, cy, w, text, o) => talkCard(x, cx, cy, w, text, o),
      phone: (cx, cy, w, h, t, o) => drawPhone(x, cx, cy, w, h, t, o),
      pop: (lt, at, d = 0.32, s = 1.9) => pop01(lt, at, d, s), out: (lt, a, b) => outK(lt, [a, b]), in: (lt, a, b) => ease.inOutCubic(prog(lt, a, b)),
      bump: (lt, at, d = 0.3) => bump(lt, at, d), lerp, clamp, prog, ease, rng, S, NAME, ACC, x, t: 0,
    }

    // DOM: captions, boxes, bug, chapter strip, chapter stickers
    const caps = CAPS.map(c => ({ c, h: popText(root, c.text, { top: 262, size: c.size, accentSize: c.size * 1.32, accentColor: c.accent, at: c.at, gap: 0.07, wobble: true }) }))
    const kick = el('div', { position: 'absolute', left: 0, top: '560px', width: '1080px', textAlign: 'center', display: 'none', pointerEvents: 'none' }, root)
    el('span', { display: 'inline-block', padding: '12px 26px 11px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: INK, background: GOLD, boxShadow: `0 0 0 4px ${INK}, 0 10px 30px rgba(6,4,18,0.7)` }, kick, `EVERYTHING NOBODY TELLS YOU ABOUT LOVING A ${NAME.toUpperCase()}`)
    const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1450, height: 280, size: 46, open: b.open, close: b.close, cps: CPS }))
    const bug = el('div', { position: 'absolute', left: '56px', top: '58px', whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: '1', textShadow: '0 2px 10px rgba(6,4,18,0.9)' }, root)
    el('span', { fontFamily: INTER, fontWeight: '800', fontSize: '34px', letterSpacing: '0.2em', color: ML_GOLD, fontVariantCaps: 'all-small-caps' }, bug, 'Deep Dive')
    el('span', { fontFamily: INTER, fontWeight: '800', fontSize: '34px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.72)', fontVariantCaps: 'all-small-caps' }, bug, ` · ${NAME} in Love`)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    // ── canvas pieces
    function narrator(t) {
      const k = pop01(t, 2.0, 0.35, 2) * (t > T.OUT - 0.3 ? outK(t, [T.OUT - 0.3, T.OUT]) : 1)
      if (k <= 0.01) return
      const talking = ALL_LINES.some((l, i) => l.speaker === SPK.stars && t >= l.t && t < l.t + l.text.length / CPS + 0.3)
      drawStarChar(x, 128, 1360, 120, t, { color: STAR.sky, mood: talking ? 'happy' : 'neutral', look: [0.6, -0.5], hops: NAR_HOPS, pop: k, seed: 2, glow: 1 })
    }
    function pisces(t) {
      const k = pop01(t, 2.6, 0.4, 2.2)
      if (k <= 0.01) return
      const c = curCh(t)
      let tears = 2
      if (CH.some(C => t >= C.note.at && t < C.note.out + 0.2)) tears = 3
      if (c === 3 || t > T.OUT) tears = 3
      const pull = CH.some(C => t >= C.note.at && t < C.note.at + 0.6) ? 1 : 0
      drawSign(x, 'pisces', 930, 1330, 150, t, { mood: tears >= 3 ? 'wide' : 'sparkle', look: [-0.7, -0.6], tears, pull, pop: k, seed: 12 })
      // the research clipboard
      bits(x, ['KKKKKK', 'KWWWWK', 'KWKKWK', 'KWWWWK', 'KWKKWK', 'KWWWWK', 'KKKKKK'], PAL, 830, 1390 + Math.sin(t * 3) * 3, 5 * k)
    }
    function sticker(t, C) {
      const p = prog(t, C.at, C.at + 2.2)
      if (p <= 0 || p >= 1) return
      const k = pop01(t, C.at + 0.05, 0.4, 2.6) * outK(t, [C.at + 1.95, C.at + 2.2])
      x.save(); x.fillStyle = `rgba(5,4,12,${0.45 * k})`; x.fillRect(0, 0, 1080, 1920); x.restore()
      panel(x, 540, 900, 820, 330, { k, rot: -0.04 + 0.02 * Math.sin(t * 6), border: S.color })
      label(x, `CHAPTER ${C.i + 1} / 4`, 540, 800, { size: 36, font: MONO, weight: 700, col: GOLD, k, rot: -0.04, spacing: 6 })
      label(x, CH_NAMES[C.i], 540, 905, { size: CH_NAMES[C.i].length > 16 ? 62 : 76, col: BONE, k, rot: -0.04 })
      if (C.i === 3) label(x, '★ the one we promised', 540, 1000, { size: 42, font: SERIF, weight: '500 italic', col: ACC, k, rot: -0.04 })
      else label(x, `${S.glyph}︎`, 540, 1000, { size: 56, font: SERIF, weight: 500, col: S.color, k, rot: -0.04 })
    }
    function fieldNote(t, C) {
      const N = C.note
      if (t < N.at || t > N.out + 0.01) return
      const k = pop01(t, N.at, 0.42, 2.4) * popOut(t, [N.out - 0.3, N.out])
      if (k <= 0.01) return
      const rot = -0.05 + 0.01 * Math.sin(t * 2)
      x.save(); x.translate(540, 900); x.rotate(rot); x.scale(k, k)
      x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-410 + 18, -270 + 22, 820, 540)
      x.fillStyle = '#f4e8cc'; x.fillRect(-410, -270, 820, 540)
      x.fillStyle = '#e2cfa6'; x.fillRect(-410, -270, 820, 70)
      x.strokeStyle = 'rgba(90,123,224,0.35)'; x.lineWidth = 2
      for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-380, -110 + i * 68); x.lineTo(380, -110 + i * 68); x.stroke() }
      x.font = `700 30px ${MONO}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.letterSpacing = '4px'
      x.fillText(`FIELD NOTE ${C.i + 1}/4 · ${NAME.toUpperCase()}`, -370, -235)
      x.letterSpacing = '0px'
      x.font = `700 50px ${INTER}`; x.fillStyle = '#1b1236'
      const ls = wrap(x, N.text, 700)
      ls.forEach((s, i) => x.fillText(s, -360, -125 + i * 68))
      x.restore()
      // Pisces' "verified" stamp
      const sk = pop01(t, N.at + 1.1, 0.3, 2.2)
      stamp(x, 'VERIFIED (CRYING)', 640, 1145, sk, { col: '#5a5ad8', rot: -0.14, size: 34 })
    }
    function lens(t) {
      const k = pop01(t, T.lens, 0.35, 2.4) * outK(t, [INTRO - 0.5, INTRO - 0.25])
      if (k <= 0.01) return
      panel(x, 760, 1240, 470, 90, { k, rot: 0.05, border: CYAN, fillC: 'rgba(12,20,46,0.95)' })
      label(x, 'astrology = a lens, not a lab result', 760, 1240, { size: 25, font: MONO, weight: 700, col: '#bfefff', k, rot: 0.05, shadow: false })
    }
    function flash(t, t0, col = '#ffffff', d = 0.22, a = 0.85) {
      const p = prog(t, t0, t0 + d)
      if (p <= 0 || p >= 1) return
      x.save(); x.globalAlpha = a * (1 - p); x.fillStyle = col; x.fillRect(0, 0, 1080, 1920); x.restore()
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        H.t = t
        // camera: frame 0 is mid whip-zoom; a punch-in at every beat
        let zoom = 1
        const bt = curBeat(t)
        if (bt) { const d = t - bt.b.at; if (d < 0.35) zoom *= 1 + 0.05 * (1 - ease.outCubic(d / 0.35)) }
        drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (t < 3 ? lerp(1.25, 1, ease.inOutCubic(prog(t, 0, 3))) : 1) })
        // a soft spotlight in the sign's colour
        const g = x.createRadialGradient(540, 960, 0, 540, 960, 700); g.addColorStop(0, rgba(S.color, 0.16)); g.addColorStop(1, rgba(S.color, 0)); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
        x.save(); x.translate(540, 960); x.scale(zoom, zoom); x.translate(-540, -960)
        if (t < INTRO) spec.cold(x, t, H)
        else if (bt) bt.b.draw(x, t, t - bt.b.at, H)
        else if (t >= T.OUT) spec.outro(x, t, t - T.OUT, H)
        x.restore()
        for (const C of CH) { sticker(t, C); fieldNote(t, C) }
        lens(t)
        narrator(t); pisces(t)
        // small flashes on the chapter title cards
        for (const C of CH) flash(t, C.at, '#ffffff', 0.18, 0.5)
        // DOM
        const capOn = (c) => t >= c.at && (!c.out || t < c.out[1])
        for (const { c, h } of caps) h.update(t, capOn(c) ? outK(t, c.out) : 0)
        const kk = pop01(t, T.kicker, 0.3, 2.2) * outK(t, [INTRO - 0.4, INTRO - 0.2])
        kick.style.display = 'none'; kick.style.opacity = String(clamp(kk)); kick.style.transform = `scale(${(0.7 + 0.3 * kk).toFixed(3)}) rotate(-1.5deg)`
        boxes.forEach(b => b.update(t))
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const capCues = CAPS.filter(c => c.at >= 0).flatMap(c => popCues({ text: c.text, at: c.at, gap: 0.07 }))
  const CUES = [
    // frame 0: the whip-zoom lands, the slam title, record scratch + freeze
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...STICK.flatMap(chapterCues),
    ['pop', T.kicker, 1174.66, 0.045, 0], ['tick', r3(T.kicker + 0.05), 0.04], ['glitter', T.kicker, r3(T.kicker + 0.5)],
    ['pop', 2.0, 880, 0.035, -0.4], ['pop', 2.6, 987.77, 0.03, 0.4], ['pop', T.lens, 1318.51, 0.03, 0.3],
    ...capCues,
    ...CH.flatMap(C => [
      ['whoosh', r3(C.at - 0.05), 0.45, 0.05], ['tom', C.at, 110, { gain: 0.22, decay: 0.3 }], ['bell', r3(C.at + 0.1), 1760, 0.03, 1.1, 0], ['glitter', C.at, r3(C.at + 0.6)],
      ...C.beats.map(b => ['whoosh', r3(b.at - 0.02), 0.3, 0.03]),
      ['whoosh', C.note.at, 0.35, 0.04], ['tick', r3(C.note.at + 0.3), 0.06], ['pop', r3(C.note.at + 1.1), 523.25, 0.045, 0.3], ['tom', r3(C.note.at + 1.1), 140, { gain: 0.15, decay: 0.2 }],
      ['pluck', r3(C.note.at + 0.6), 1318.51, 0.02, 0.4, 0.4], ['whoosh', r3(C.note.out - 0.3), 0.3, 0.03],
    ]),
    ...slamTitleCues(LASTH), ['glitter', r3(lastLand - 0.1), r3(lastLand + 0.5)],
    ...(LOOP ? loopCues({ duration: DURATION }) : []),
    ...talkCues(ALL_LINES, { cps: CPS, pitch: { [SPK.stars]: 880, [SPK.sign]: 740, [SPK.you]: 1046.5 } }),
    ...(spec.cues || []),
  ]
  const SCENES = [frozen(build, [REC]), whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC), ...STICK.map(chapter), slamTitle(LASTH)]
  if (LOOP) SCENES.push(loopBack([build, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION }))
  return { DURATION, SCENES, CUES, T, CHECK: { BOXES, CPS } }
}
