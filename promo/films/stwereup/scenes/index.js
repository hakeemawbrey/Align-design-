// stwereup — "We're up." (45 s vertical Align ad, Star Talk season 2 #5) · story 0–40.6, then the shared end card.
//   0.00–3.38  "2:07 AM."  A dark sky, every star asleep in a nightcap (zzz). A phone glows: him · "u up?" (buzz, buzz).
//   3.38       DROP: the whole sky snaps awake at once (big chord hit), the nightcaps blast off.
//   3.5–8.4    "The whole sky | is awake."  Box (THE STARS): "we're up." → "we're stars. we're always up." (a unison blink).
//   8.45–13.9  "You're typing | yeah."  The phone opens the chat; "yeah" types itself, three dots blink; every star leans
//              in… silence… ♑ CAPRICORN crashes in with a whistle (record scratch, the music tape-stops) and knocks the
//              ♎ star clean out of frame. CAPRICORN: "Hold on. When did he text you last?"
//  13.93       card cut (flip).
//  14.0–19.6   "The receipts."  The thread scrolls back: "u up?" TUE 1:48 AM · SAT 2:31 AM · LAST MONTH 3:02 AM; the
//              stars squint harder at each. ♏ SCORPIO: "Ever heard from him at noon?" Double-take.
//  19.65–27.7  "12:00 PM."  A smug pixel sun pops up, daylight, the phone lies silent (crickets). Pisces sobs. THE STARS:
//              "someone who only shows up at night?" … pause … "babe. that's OUR job. not his."  Night falls back;
//              "Backspace." — y-e-a-h deletes letter by letter and the sky cheers every letter.
//  27.82       card cut (deal).
//  27.9–32.2   "Tonight's deck."  Five card backs deal in; the middle one flips to a veiled card. THE STARS: "a new deck.
//              every night. at a decent hour."  Heart eyes.
//  32.27–36.9  ★ LESSON UNLOCKED (level-up arpeggio + sparkle burst): "Date someone who shows up in daylight."
//  36.9–40.6   "Now go to bed. | We've got this shift."  The stars yawn, the nightcaps float back down, they fall
//              asleep; the gold one opens one eye. Everything pops out by 40.5; the end card takes over at 40.6.
// One canvas (sky + phone + cards + stars + props), DOM type + dialogue boxes + the LESSON banner above it, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { drawNightcap, drawWhistle, drawTears, drawSun, drawBandage, drawPanelCanvas } from '../props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', SKYBLUE = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.25, h0Land: 0.75, h0Out: [3.05, 3.25],
  phone: 0.1, notif: 0.95, buzz: [1.05, 1.42], snore: [1.85, 2.55],
  drop: BEAT(5),                                                         // 3.378: the sky wakes
  h1: 3.5, h1Land: 3.95, h1Out: [8.2, 8.4],
  l1: 3.85, l2: 5.7, blinkSync: 7.45, closeA: 8.48,
  unlock: [8.45, 8.7],
  h2: 8.55, h2Land: 9.0, type: 8.9, typeGap: 0.16, lean: [9.5, 9.98],
  capIn: 9.82, whistle: BEAT(17),                                        // 10.045: whistle + record scratch
  openB: 10.4, l3: 10.6, closeB: 13.62, h2Out: [13.5, 13.7],
  cut1: BEAT(24),                                                        // 13.933
  h3: 14.02, h3Land: 14.38, bub: [14.55, 15.35, 16.15], l4: 16.95, dbl: [18.3, 18.75], closeC: 19.5, h3Out: [19.4, 19.6],
  move5: [19.65, 20.05], sun: 19.95, day: [19.9, 20.3], h4: 20.02, h4Land: 20.36, crick: [20.5, 21.0, 21.5], cry: 20.55,
  l5: 21.75, l6: 24.55, night: [25.95, 26.3], h4Out: [25.85, 26.05], h5: 26.12, h5Land: 26.36,
  del: [26.5, 26.8, 27.1, 27.4], closeD: 27.62, h5Out: [27.58, 27.74],
  cut2: BEAT(49),                                                        // 27.822
  h6: 27.92, h6Land: 28.28, deal: 28.0, dealGap: 0.1, rise: [29.35, 29.75], flip: [29.7, 30.05], hearts: 30.1, l7: 28.55,
  closeE: 32.1, deckOut: [31.9, 32.2], h6Out: [31.9, 32.1],
  roll: [31.62, 32.24], lesson: BEAT(57), lessonText: 32.68, lessonLand: 33.3, xp: 34.15, lessonOut: [36.6, 36.88],
  move7: [36.75, 37.25], h7: 37.0, h7Land: 37.62, yawn: [37.3, 37.95], caps: [37.55, 38.25], peek: [38.95, 39.75],
  out: [40.05, 40.48], h7Out: [40.22, 40.46],
}

// ── the dialogue
const STARS = 'THE STARS', CAPN = '♑ CAPRICORN', SCON = '♏ SCORPIO'
const CAPC = signStar('capricorn').color, SCOC = '#ff6f8e'
const LA_ = [
  { t: T.l1, speaker: STARS, text: "we're *up.*" },
  { t: T.l2, speaker: STARS, text: "we're stars. we're *always* up." },
]
const LB_ = [{ t: T.l3, speaker: CAPN, color: CAPC, text: 'Hold on. When did he text you *last?*' }]
const LC_ = [{ t: T.l4, speaker: SCON, color: SCOC, text: 'Ever heard from him at *noon?*' }]
const LD_ = [
  { t: T.l5, speaker: STARS, text: 'someone who only shows up at *night?*' },
  { t: T.l6, speaker: STARS, text: "babe. that's *OUR* job. not his." },
]
const LE_ = [{ t: T.l7, speaker: STARS, text: 'a new deck. every night. at a *decent hour.*' }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LD_, ...LE_]
export const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LD_, T.closeD], [LE_, T.closeE]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const LTn = i => LT[i]
const STAR_HOPS = talkHops(ALL_LINES, STARS, { cps: CPS })
const CAP_HOPS = talkHops(ALL_LINES, CAPN, { cps: CPS })
const SCO_HOPS = talkHops(ALL_LINES, SCON, { cps: CPS })
const charAt = (li, word) => { const L = ALL_LINES[li].text.replace(/\*/g, ''); const i = L.indexOf(word); return LT[li].chars[Math.max(0, i)] }
const T_OUR = charAt(6, 'OUR'), T_NOT = charAt(6, 'not his'), T_BABE = LT[6].start, T_NIGHTQ = charAt(5, 'night'), T_WHEN = charAt(2, 'When')
const REPLY = 'yeah'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, width = W - 140 }) {
  const box = el('div', { position: 'absolute', left: ((W - width) / 2) + 'px', width: width + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
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

// ── the cast
const GOLD2 = '#ffe08a', GOLD3 = '#f5b85a'
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true, cap: '#6f7cf2', stripe: '#3f3a9e' },
  ari: { ...signStar('aries'), seed: 11, cap: '#ff8fb1', stripe: '#c2456f' },
  g2: { col: GOLD2, glyph: null, seed: 17, gold: true, cap: '#7fd0f0', stripe: '#2f7fb0' },
  lib: { ...signStar('libra'), seed: 23, cap: '#c9a6ff', stripe: '#7a54c8' },
  leo: { ...signStar('leo'), seed: 29, cap: '#5fdc9a', stripe: '#2a8a5a' },
  g5: { col: GOLD3, glyph: null, seed: 31, gold: true, cap: '#ff8f6a', stripe: '#b84a2e' },
  sag: { ...signStar('sagittarius'), seed: 37, cap: '#ffd24a', stripe: '#c28a1a' },
  sco: { ...signStar('scorpio'), seed: 41, cap: '#3a3a5a', stripe: '#1b1236' },
  aqu: { ...signStar('aquarius'), seed: 43, cap: '#ff8fb1', stripe: '#c2456f' },
  pis: { ...signStar('pisces'), seed: 47, cap: '#8fd8f6', stripe: '#3f7cf0', back: true },
  cap: { ...signStar('capricorn'), seed: 53, cap: '#e8484f', stripe: '#8a1f2a' },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['pis', 'sag', 'sco', 'aqu', 'g2', 'leo', 'g5', 'ari', 'lib', 'g0', 'cap']   // back to front

// layouts: key → [x, y, size]
const BOTTOM = { sag: [150, 1812, 112], sco: [410, 1815, 118], aqu: [680, 1815, 112], pis: [935, 1802, 126] }
const LAY = {
  A: { g0: [168, 690, 210], ari: [915, 690, 168], g2: [104, 1005, 124], lib: [972, 995, 136], leo: [160, 1268, 170], g5: [925, 1272, 160], ...BOTTOM },
  A3: { g0: [124, 672, 160], ari: [958, 640, 124], g2: [86, 1000, 100], leo: [114, 1278, 140], g5: [962, 1290, 128], cap: [835, 985, 270], ...BOTTOM },
  B4: { g0: [96, 690, 112], leo: [96, 1250, 112], g5: [958, 1290, 124], cap: [930, 690, 146], sco: [838, 1005, 260], sag: BOTTOM.sag, g2: [410, 1815, 108], aqu: BOTTOM.aqu, pis: BOTTOM.pis },
  B5: { g0: [178, 735, 176], cap: [930, 850, 130], pis: [150, 1080, 168], sco: [962, 1095, 124], leo: [168, 1290, 140], g5: [918, 1290, 140], sag: BOTTOM.sag, g2: [410, 1815, 108], aqu: BOTTOM.aqu, lib: [935, 1802, 118] },
  D: { g0: [128, 700, 160], ari: [952, 700, 156], g2: [92, 1060, 108], lib: [988, 1060, 108], leo: [130, 1300, 132], g5: [950, 1300, 132], sag: BOTTOM.sag, sco: [410, 1815, 114], aqu: BOTTOM.aqu, pis: BOTTOM.pis },
  L: { g0: [540, 1505, 230], ari: [215, 1460, 128], lib: [865, 1460, 128], leo: [140, 1745, 118], g5: [940, 1745, 118], pis: [345, 1770, 104], aqu: [735, 1770, 104] },
  F: { g0: [540, 1080, 250], ari: [212, 845, 138], lib: [868, 845, 138], g2: [150, 1190, 118], g5: [930, 1190, 118], leo: [290, 1470, 138], cap: [790, 1470, 138], sco: [540, 1640, 116], sag: [150, 1760, 104], aqu: [930, 1760, 104], pis: [330, 1800, 96] },
}
const SEG = [
  { t: 0, L: LAY.A },
  { t: T.whistle - 0.02, L: LAY.A3, anim: 0.36 },
  { t: T.cut1, L: LAY.B4 },
  { t: T.move5[0], L: LAY.B5, anim: 0.4 },
  { t: T.cut2, L: LAY.D },
  { t: T.lesson - 0.12, L: LAY.L, anim: 0.42 },
  { t: T.move7[0], L: LAY.F, anim: 0.5 },
]
/** where actor k is at t → { p: [x, y, s], pk } or null */
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.025
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (cur && prev) {
      const e = ease.inOutCubic(p)
      return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 70, lerp(prev[2], cur[2], e)], pk: 1 }
    }
    if (cur) return { p: cur, pk: pop01(t, t0, 0.34, 2.2) }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, 0.3 + stag * 2, 0.4, 1.6)
  else if (t < S.t + 0.7) pk = pop01(t, S.t + 0.06 + stag, 0.32, 2.2)
  return { p: cur, pk }
}

// phone placements
const PH = { A: { x: 540, y: 1000, s: 0.88, r: -2 }, A3: { x: 398, y: 1000, s: 0.82, r: -4 }, B4: { x: 405, y: 975, s: 1.0, r: 0 }, B5: { x: 540, y: 1045, s: 0.72, r: 3 } }
const SUN = { x: 850, y: 560, r: 92 }
function phonePos(t) {
  let P
  if (t < T.whistle) P = PH.A
  else if (t < T.cut1) { const e = ease.inOutCubic(prog(t, T.whistle, T.whistle + 0.36)); P = { x: lerp(PH.A.x, PH.A3.x, e), y: PH.A.y, s: lerp(PH.A.s, PH.A3.s, e), r: lerp(PH.A.r, PH.A3.r, e) } }
  else if (t < T.move5[0]) P = PH.B4
  else if (t < T.cut2) { const e = ease.inOutCubic(prog(t, ...T.move5)); P = { x: lerp(PH.B4.x, PH.B5.x, e), y: lerp(PH.B4.y, PH.B5.y, e) - Math.sin(Math.PI * prog(t, ...T.move5)) * 40, s: lerp(PH.B4.s, PH.B5.s, e), r: lerp(PH.B4.r, PH.B5.r, e) } }
  else return null
  return P
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "500 30px Inter", "700 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 480), FACE = bake(faceIm, 640)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, '2:07 *AM.*', { top: 205, size: 172, accentSize: 200, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: LAV })
  const H1 = popText(root, 'The whole sky | is *awake.*', { top: 190, size: 112, accentSize: 156, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, "You're typing | *yeah.*", { top: 190, size: 112, accentSize: 160, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const H3 = popText(root, 'The *receipts.*', { top: 215, size: 120, accentSize: 168, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H4 = popText(root, '12:00 *PM.*', { top: 205, size: 172, accentSize: 200, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: '#ffcf5a' })
  const H5 = popText(root, '*Backspace.*', { top: 215, size: 120, accentSize: 176, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: PINK })
  const H6 = popText(root, "Tonight's *deck.*", { top: 215, size: 120, accentSize: 168, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV })
  const H7 = popText(root, "Now go to bed. | We've got this *shift.*", { top: 195, size: 102, accentSize: 140, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD, lineHeight: 1.08, gap: 0.08 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS }))

  // ── the LESSON banner (DOM): a gold pixel panel "★ LESSON UNLOCKED", the lesson in Inter 800 + one Garamond accent
  const BW = 860, BH = 148, BM = 28
  const banner = el('div', { position: 'absolute', left: ((W - BW) / 2) + 'px', top: '560px', width: BW + 'px', height: BH + 'px', transformOrigin: '50% 50%', display: 'none' }, root)
  const bcv = el('canvas', { position: 'absolute', left: -BM + 'px', top: -BM + 'px', width: (BW + 2 * BM) + 'px', height: (BH + 2 * BM) + 'px', imageRendering: 'pixelated' }, banner)
  drawPanelCanvas(bcv, BW, BH, { m: BM })
  const bText = el('div', { position: 'absolute', left: 0, top: 0, width: BW + 'px', height: BH + 'px', display: 'grid', placeItems: 'center', font: `700 58px ${MONO}`, letterSpacing: '0.05em', color: GOLD, textShadow: '0 4px 0 rgba(6,4,18,0.9), 0 0 18px rgba(242,199,92,0.55)', whiteSpace: 'nowrap' }, banner)
  const bRun = el('div', { whiteSpace: 'nowrap' }, bText)
  const bChars = [...'★ LESSON UNLOCKED'].map(ch => el('span', { visibility: 'hidden' }, bRun, ch === ' ' ? '&nbsp;' : ch))
  const sheen = el('div', { position: 'absolute', left: '10px', top: '10px', width: (BW - 20) + 'px', height: (BH - 20) + 'px', overflow: 'hidden', pointerEvents: 'none' }, banner)
  const sheenBar = el('div', { position: 'absolute', top: '-20px', width: '90px', height: (BH + 40) + 'px', background: 'linear-gradient(90deg, rgba(255,241,200,0), rgba(255,241,200,0.55), rgba(255,241,200,0))', transform: 'skewX(-20deg)' }, sheen)
  const LESSON = popText(root, 'Date someone | who shows up | in *daylight.*', { top: 790, size: 104, accentSize: 150, at: T.lessonText, late: 1, lateAt: T.lessonLand, wobble: true, accentColor: '#ffcf5a', gap: 0.075, lineHeight: 1.04 })
  const xp = el('div', { position: 'absolute', left: '0', width: W + 'px', top: '1222px', textAlign: 'center', display: 'none' }, root)
  const xpChip = el('span', { display: 'inline-block', font: `700 36px ${MONO}`, letterSpacing: '0.08em', color: '#1b1236', background: GOLD, padding: '10px 26px', boxShadow: '0 0 0 6px #1b1236, 0 0 0 10px rgba(242,199,92,0.9), 0 0 30px rgba(242,199,92,0.5)', transformOrigin: '50% 50%' }, xp, '+1 SELF-RESPECT')

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (local units: 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawPhone(t) {
    const P = phonePos(t)
    if (!P) return
    let k = 1
    if (t < T.cut1) k = easeOutBack(prog(t, T.phone, T.phone + 0.45), 1.7)
    else if (t < T.cut1 + 0.6) k = easeOutBack(prog(t, T.cut1 + 0.05, T.cut1 + 0.4), 1.8)
    if (t >= T.cut2 - 0.25) k *= 1 - ease.inCubic(prog(t, T.cut2 - 0.25, T.cut2 - 0.02))
    if (k <= 0.01) return
    let bz = 0
    for (const b of T.buzz) { const u = t - b; if (u >= 0 && u < 0.3) bz = Math.max(bz, 1 - u / 0.3) }
    const unl = pulse(t, T.unlock[0], 0.3)
    const jx = bz * 9 * Math.sin(t * 190), jr = bz * 3.2 * Math.sin(t * 160 + 1)
    x.save()
    x.translate(P.x + jx, P.y); x.rotate((P.r + jr) * Math.PI / 180); x.scale(P.s * k * (1 + unl * 0.04), P.s * k * (1 - unl * 0.03))
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    if (bz > 0) {
      x.save(); x.strokeStyle = rgba(BONE, 0.85 * bz); x.lineWidth = 8; x.lineCap = 'round'
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { x.beginPath(); x.arc(0, -hh + 140, hw + 34 + i * 30, sd < 0 ? Math.PI - 0.32 : -0.32, sd < 0 ? Math.PI + 0.32 : 0.32); x.stroke() }
      x.restore()
    }
    const day = dayK(t)
    x.save(); x.shadowColor = rgba(day > 0.5 ? '#ffcf5a' : LAV, 0.6); x.shadowBlur = 70
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    // screen: night indigo → noon sky
    const g = x.createLinearGradient(0, sy, 0, sy + sh)
    g.addColorStop(0, mixc('#24164f', '#4f9be0', day)); g.addColorStop(0.6, mixc('#3b2370', '#9fd0f4', day)); g.addColorStop(1, mixc('#5b2a74', '#ffd9a8', day))
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    const mode = phoneMode(t)
    if (mode.lock > 0) drawLock(t, sx, sy, sw, sh, mode.lock, day)
    if (mode.chat > 0) drawChat(t, sx, sy, sw, sh, mode.chat)
    if (mode.hist > 0) drawHistory(t, sx, sy, sw, sh, mode.hist)
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()      // notch
    // glass glare
    x.globalAlpha = 0.08; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }
  const mixc = (a, b, k) => { const A1 = parseInt(a.slice(1), 16), B1 = parseInt(b.slice(1), 16); const c = s => Math.round(lerp((A1 >> s) & 255, (B1 >> s) & 255, clamp(k))); return `rgb(${c(16)},${c(8)},${c(0)})` }
  function dayK(t) { return clamp(prog(t, ...T.day) - prog(t, ...T.night)) }
  function phoneMode(t) {
    if (t < T.unlock[1]) { const f = prog(t, T.unlock[0] + 0.05, T.unlock[1]); return { lock: 1 - f, chat: f, hist: 0 } }
    if (t < T.cut1) return { lock: 0, chat: 1, hist: 0 }
    if (t < T.move5[0] + 0.15) return { lock: 0, chat: 0, hist: 1 }
    if (t < T.night[0]) { const f = prog(t, T.move5[0] + 0.15, T.move5[0] + 0.4); return { lock: f, chat: 0, hist: 1 - f } }
    const f = prog(t, T.night[0], T.night[1]); return { lock: 1 - f, chat: f, hist: 0 }
  }
  function drawLock(t, sx, sy, sw, sh, a, day) {
    x.save(); x.globalAlpha = a
    const noon = t > T.move5[0]
    x.fillStyle = rgba(noon ? '#1b1236' : BONE, 0.9); x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.font = `500 30px ${INTER}`; x.fillText('Thursday', 0, sy + 110)
    x.font = `800 128px ${INTER}`; x.fillText(noon ? '12:00' : '2:07', 0, sy + 232)
    x.font = `700 34px ${MONO}`; x.fillText(noon ? 'PM' : 'AM', 0, sy + 280)
    if (!noon) {
      const np = easeOutBack(prog(t, T.notif, T.notif + 0.35), 1.6)
      if (np > 0) {
        x.save(); x.translate(0, lerp(-120, 0, np)); x.globalAlpha = a * clamp(np * 2)
        const ny = sy + 330, nw = sw - 36, nh = 150
        rr(-nw / 2, ny, nw, nh, 30); x.fillStyle = 'rgba(255,240,250,0.2)'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.28)'; x.stroke()
        // avatar: a little moon
        x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(-nw / 2 + 52, ny + 50, 24, 0, Math.PI * 2); x.fill()
        x.fillStyle = 'rgba(40,24,80,0.9)'; x.beginPath(); x.arc(-nw / 2 + 62, ny + 42, 20, 0, Math.PI * 2); x.fill()
        x.textAlign = 'left'; x.fillStyle = BONE; x.font = `800 38px ${INTER}`; x.fillText('him', -nw / 2 + 92, ny + 62)
        x.font = `500 26px ${INTER}`; x.fillStyle = rgba(BONE, 0.65); x.textAlign = 'right'; x.fillText('now', nw / 2 - 24, ny + 60)
        x.textAlign = 'left'; x.fillStyle = BONE; x.font = `700 44px ${INTER}`; x.fillText('u up?', -nw / 2 + 28, ny + 122)
        x.restore()
      }
    } else {
      // noon: nothing. at all.
      x.font = `500 30px ${INTER}`; x.fillStyle = rgba('#1b1236', 0.55); x.fillText('No new messages', 0, sy + 420)
      // a little sun glint on the glass
      const gp = clamp(prog(t, T.sun, T.sun + 0.4))
      x.globalAlpha = a * gp * 0.5; x.fillStyle = '#fff6c8'; x.beginPath(); x.arc(sw / 2 - 70, sy + 80, 40, 0, Math.PI * 2); x.fill()
    }
    x.restore()
  }
  function header(sy, sw) {
    x.fillStyle = 'rgba(10,6,28,0.45)'; x.fillRect(-sw / 2, sy, sw, 118)
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `700 44px ${INTER}`; x.fillText('‹', -sw / 2 + 22, sy + 86)
    x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(-sw / 2 + 92, sy + 72, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(40,24,80,0.95)'; x.beginPath(); x.arc(-sw / 2 + 103, sy + 63, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.fillText('him', -sw / 2 + 134, sy + 85)
  }
  function bubbleL(text, bx, by, size = 44) {
    x.font = `700 ${size}px ${INTER}`
    const tw2 = x.measureText(text).width, bw = tw2 + 52, bh = size + 40
    rr(bx, by, bw, bh, 30); x.fillStyle = 'rgba(239,230,214,0.92)'; x.fill()
    x.fillStyle = '#1b1236'; x.textAlign = 'left'; x.fillText(text, bx + 26, by + bh / 2 + size * 0.36)
    return bw
  }
  function drawChat(t, sx, sy, sw, sh, a) {
    x.save(); x.globalAlpha = a
    header(sy, sw)
    x.textAlign = 'center'; x.font = `700 28px ${MONO}`; x.fillStyle = rgba(BONE, 0.75); x.fillText('TODAY 2:07 AM', 0, sy + 186)
    bubbleL('u up?', -sw / 2 + 24, sy + 206)
    // the reply
    const typed = replyText(t)
    const fy = sy + sh - 116
    rr(-sw / 2 + 20, fy, sw - 40, 80, 40); x.fillStyle = 'rgba(15,8,34,0.6)'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.35)'; x.stroke()
    x.textAlign = 'left'; x.font = `600 40px ${INTER}`
    if (typed.length) { x.fillStyle = BONE; x.fillText(typed, -sw / 2 + 48, fy + 54) } else { x.fillStyle = rgba(BONE, 0.45); x.fillText('Message', -sw / 2 + 48, fy + 54) }
    const tw2 = typed.length ? x.measureText(typed).width : 0
    if (Math.floor(t * 2.6) % 2 === 0) { x.fillStyle = PINK; x.fillRect(-sw / 2 + 50 + tw2, fy + 18, 4, 46) }
    // send arrow, lit while there's a draft
    x.fillStyle = typed.length ? PINK : 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc(sw / 2 - 62, fy + 40, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#1b1236'; x.beginPath(); x.moveTo(sw / 2 - 62, fy + 26); x.lineTo(sw / 2 - 50, fy + 42); x.lineTo(sw / 2 - 74, fy + 42); x.fill(); x.fillRect(sw / 2 - 65, fy + 40, 6, 16)
    // your three dots, blinking, while the draft sits there
    const dotsOn = typed.length > 0 && t > T.type + 0.3 && t < T.cut1
    if (dotsOn) {
      const bx = sw / 2 - 150, by = fy - 112
      rr(bx, by, 126, 74, 37); x.fillStyle = 'rgba(255,143,177,0.9)'; x.fill()
      for (let i = 0; i < 3; i++) { const ph = (t * 2.2 - i * 0.18) % 1; x.fillStyle = rgba('#ffffff', ph < 0.5 ? 1 : 0.4); x.beginPath(); x.arc(bx + 33 + i * 30, by + 37 - (ph < 0.5 ? 5 : 0), 10, 0, Math.PI * 2); x.fill() }
    }
    x.restore()
  }
  function replyText(t) {
    if (t < T.type) return ''
    if (t < T.cut1) return REPLY.slice(0, clamp(Math.floor((t - T.type) / T.typeGap) + 1, 0, REPLY.length))
    // after the night falls back: deleted one letter at a time
    let n = REPLY.length
    for (const d of T.del) if (t >= d) n--
    return REPLY.slice(0, Math.max(0, n))
  }
  const HIST = [['TODAY 2:07 AM', 0], ['TUE 1:48 AM', T.bub[0]], ['SAT 2:31 AM', T.bub[1]], ['LAST MONTH 3:02 AM', T.bub[2]]]
  function drawHistory(t, sx, sy, sw, sh, a) {
    x.save(); x.globalAlpha = a
    header(sy, sw)
    // older messages load in at the top; each load nudges the thread down a touch (scrolling back)
    let nudge = 0
    for (const [, tb] of HIST.slice(1)) nudge += 18 * pulse(t, tb, 0.3)
    HIST.forEach(([stamp, tb], i) => {
      const slot = 3 - i, yy = sy + 150 + slot * 152 + nudge
      const p = i === 0 ? 1 : easeOutBack(prog(t, tb, tb + 0.3), 2)
      if (p <= 0) return
      x.save(); x.globalAlpha = a * clamp(p * 2); x.translate(0, (1 - p) * -40)
      x.textAlign = 'center'; x.font = `700 31px ${MONO}`; x.fillStyle = i === 0 ? rgba(BONE, 0.7) : '#ffcf5a'; x.fillText(stamp, 0, yy + 24)
      bubbleL('u up?', -sw / 2 + 24, yy + 40, 42)
      x.restore()
    })
    // scroll bar
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(sw / 2 - 12, sy + 140 + (1 - clamp((t - T.bub[0]) / 2)) * 300, 5, 120)
    x.restore()
  }

  // ─────────────────────────────── tonight's deck
  const FAN = [-28, -14, 0, 14, 28], FAN_R = 540, FAN_PY = 1620, CARD_W = 236
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal || t > T.deckOut[1]) return
    FAN.forEach((deg, i) => {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5), a = deg * Math.PI / 180
      const fx = 540 + Math.sin(a) * FAN_R, fy = FAN_PY - Math.cos(a) * FAN_R
      let cx = lerp(540 + (i - 2) * 40, fx, e), cy = lerp(2300, fy, e), rot = lerp(a * 2.2 + 0.4, a, e)
      const o = prog(t, ...T.deckOut)
      if (i === 2) {
        const r = ease.inOutCubic(prog(t, ...T.rise)), f = prog(t, ...T.flip)
        cx = lerp(cx, 540, r); cy = lerp(cy, 960, r) - ease.inCubic(o) * 240
        const wB = lerp(CARD_W, 400, r) * (1 - 0.85 * ease.inCubic(o))
        const halo = r * (1 - o)
        if (halo > 0) { const gg = x.createRadialGradient(cx, cy, 0, cx, cy, 520); gg.addColorStop(0, rgba(LAV, 0.3 * halo)); gg.addColorStop(1, rgba(LAV, 0)); x.fillStyle = gg; x.fillRect(cx - 520, cy - 520, 1040, 1040) }
        const sx2 = Math.cos(f * Math.PI)
        if (sx2 > 0) drawCardImg(BACK, BACK_BODY, cx, cy, wB, rot * (1 - r), sx2, 1 - o)
        else drawCardImg(FACE, FACE_BODY, cx, cy, wB, rot * (1 - r), -sx2, 1 - o)
        if (f > 0.4 && f < 1) sparkles(t, cx, cy, T.flip[0] + 0.2, 12, 300, 2)
        return
      }
      const s = ease.inCubic(prog(t, T.rise[0] + Math.abs(i - 2) * 0.05, T.rise[1] + 0.05))
      if (s >= 1) return
      drawCardImg(BACK, BACK_BODY, cx + Math.sign(i - 2) * s * 160, cy + s * 1100, CARD_W, rot + Math.sign(i - 2) * s * 0.5, 1, 1 - s * 0.3)
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  // ─────────────────────────────── the cast: moods, reactions, props
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  function hopsFor(k) {
    const C = CAST[k], st = (C.seed % 5) * 0.03
    const h = [T.drop + 0.02 + st * 0.3, T.whistle + 0.03 + st * 0.5, ...T.del.map(d => d + 0.02 + st * 0.4), T.hearts + st, T.lesson + 0.08 + st, T.lessonLand + st]
    if (C.gold) h.push(...STAR_HOPS)
    else h.push(...[T.l1, T.l2, T.l5, T.l6, T.l7].map(v => v + 0.05 + st))
    if (k === 'cap') h.push(...CAP_HOPS, T.whistle)
    if (k === 'sco') h.push(...SCO_HOPS, T.dbl[1])
    if (k !== 'cap' && k !== 'sco') h.push(T.dbl[1] + st)
    return h.filter(v => k !== 'cap' || v < T.whistle - 0.1 || v >= T.whistle)
  }
  const HOPS = Object.fromEntries(Object.keys(CAST).map(k => [k, hopsFor(k)]))

  function stateOf(k, t, p) {
    const C = CAST[k], i = C.seed % 9
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0
    const ph = phonePos(t) || { x: 540, y: 1000 }
    if (t < T.drop) {
      mood = 'sleepy'
    } else if (t < T.unlock[0]) {                                   // awake! "we're up."
      const kk = t - T.drop
      mood = 'wide'; look = kk < 1.0 ? toward(p, ph.x, ph.y) : [0, 0]
      squash = -0.24 * Math.exp(-kk * 5) * Math.cos(kk * 22)
      if (t >= T.l2 && t < LTn(1).done + 0.5) mood = 'happy'
      if (t >= LTn(1).done + 0.5) { mood = 'neutral'; look = [0, 0] }
      const bs = t - T.blinkSync                                    // a perfect unison double-blink
      if ((bs >= 0 && bs < 0.12) || (bs >= 0.24 && bs < 0.36)) blink = 1
      else if (t >= LTn(1).done + 0.5) blink = false
      if (k === 'pis' && kk < 2.2) tears = 0.6
    } else if (t < T.cut1) {                                         // "yeah" … lean in … WHISTLE
      mood = 'neutral'; look = toward(p, ph.x, ph.y)
      if (t >= T.type) mood = 'wide'
      const ln = ease.inOutCubic(prog(t, ...T.lean)) * (t < T.whistle ? 1 : Math.max(0, 1 - (t - T.whistle) * 6))
      if (k !== 'cap') { dx = Math.sign(ph.x - p[0]) * 70 * ln; dy = Math.sign(ph.y - p[1]) * 26 * ln; squash = -0.12 * ln }
      if (t >= T.whistle && k !== 'cap') {
        const kk = t - T.whistle
        mood = 'wide'; look = toward(p, LAY.A3.cap[0], LAY.A3.cap[1]); blink = false
        dy -= 34 * Math.exp(-kk * 6) * Math.abs(Math.sin(kk * 14))
        if (t > T.l3 + 0.2) { mood = 'neutral'; blink = undefined }
        if (t > T_WHEN) { mood = 'squint'; look = toward(p, ph.x, ph.y) }
        if (k === 'pis') tears = 0.7
      }
      if (k === 'cap') {
        mood = 'squint'; look = [-1, 0]
        if (t > T.l3) look = [0, 0]
        if (t > T_WHEN) look = [-1, 0]
        if (t > LTn(2).done + 0.4) look = [0, 0]
        const kk = t - T.whistle
        if (kk >= 0) squash += 0.22 * Math.exp(-kk * 7) * Math.cos(kk * 24)
      }
    } else if (t < T.move5[0]) {                                     // the receipts
      look = toward(p, ph.x, ph.y)
      let lvl = 0; for (const b of T.bub) if (t >= b) lvl++
      if (lvl > 0) mood = 'squint'
      if (k !== 'sco') { dx = Math.sign(ph.x - p[0]) * 10 * lvl; squash = 0.035 * lvl }
      if (k === 'sco') {
        mood = 'squint'; look = toward(p, ph.x, ph.y)
        if (t >= T.l4) look = [0, 0]
      }
      if (k === 'pis') tears = 0.5 + 0.2 * lvl
      if (t >= T.dbl[0] && t < T.dbl[1]) { mood = 'neutral'; look = [p[0] > 540 ? -1 : 1, 0]; blink = false }
      if (t >= T.dbl[1]) { mood = 'wide'; look = [0, 0]; blink = false }
      if (k === 'cap' && t >= T.l4 && t < T.dbl[0]) { mood = 'squint'; look = [-1, 1] }
    } else if (t < T.cut2) {                                          // noon. silence. "that's OUR job."
      look = [0, 0]; mood = 'neutral'
      if (t < T.crick[0]) { mood = 'squint'; look = toward(p, SUN.x, SUN.y) }
      else if (t < T.l5) {
        mood = 'neutral'; look = toward(p, PH.B5.x, PH.B5.y)
        for (const c0 of T.crick.slice(1)) { const b = t - (c0 + (p[0] / W) * 0.3); if (b >= 0 && b < 0.13) blink = 1 }
      } else if (t < T.l6) {
        mood = t >= T_NIGHTQ ? 'squint' : 'neutral'
        if (t > LTn(5).done + 0.35 && t < T.l6 - 0.35) { look = [p[0] > 540 ? -1 : 1, 0] }
      } else {
        mood = 'happy'
        if (t >= T_OUR && t < T_NOT) squash = 0.13 * Math.min(1, (t - T_OUR) * 6)
        if (t >= T_NOT && t < LTn(6).done + 0.5) mood = 'eyeroll'
        if (t >= T.night[0]) mood = 'happy'
        if (t >= T.del[3] + 0.05) mood = 'sparkle'
      }
      if (k === 'pis') {
        tears = t >= T.cry ? 1 : 0.4
        if (t >= T.cry && t < T_BABE) { mood = 'squint'; squash += 0.05 * Math.abs(Math.sin(t * 9)) }
      }
      if (k === 'lib') { /* back, with a band-aid */ }
    } else if (t < T.lesson - 0.12) {                                 // tonight's deck
      look = t < T.rise[0] ? toward(p, 540, 1100) : toward(p, 540, 960)
      mood = 'neutral'
      if (t >= T.flip[1] - 0.1) mood = 'wide'
      if (t >= T.hearts + (p[0] / W) * 0.12) mood = 'heart'
      if (k === 'pis') tears = t >= T.hearts ? 0.8 : 0.3
    } else if (t < T.move7[0]) {                                       // lesson
      mood = 'sparkle'; look = toward(p, 540, 640)
      if (t > T.lessonLand) mood = 'happy'
      if (k === 'pis') tears = 0.9
    } else {                                                          // bedtime
      mood = 'happy'
      const yp = prog(t, T.yawn[0] + (C.seed % 4) * 0.06, T.yawn[1] + (C.seed % 4) * 0.06)
      if (yp > 0 && yp < 1) { squash = -0.2 * Math.sin(Math.PI * yp); mood = 'happy' }
      if (yp >= 1) mood = 'sleepy'
      if (k === 'g0' && t >= T.peek[0] && t < T.peek[1]) { mood = 'wink'; look = [1, 0] }
      if (k === 'pis') tears = yp < 1 ? 0.4 : 0
    }
    void i
    return { mood, look, blink, squash, dx, dy, tears }
  }

  // nightcaps: on while asleep (until the drop, flung off), and floating back down at bedtime
  function capFor(k, t, R) {
    const C = CAST[k]
    const size = R.size * 0.5
    const hx = R.x + R.size * 0.05, hy = R.top + R.size * 0.1
    if (t < T.drop) return { x: hx, y: hy, rot: -0.2, size, a: 1 }
    if (t < T.drop + 1.0) {
      const p = (t - T.drop) / 1.0, dir = R.x > 540 ? 1 : -1
      return { x: hx + dir * p * 340, y: hy - 900 * p + 900 * p * p * 0.35, rot: -0.2 + dir * p * 9, size, a: 1 - ease.inQuad(p) }
    }
    if (t >= T.caps[0] - 0.4) {
      const t0 = T.caps[0] + (C.seed % 5) * 0.08, p = prog(t, t0 - 0.5, t0 + 0.5)
      if (p <= 0) return null
      const e = ease.outCubic(p)
      return { x: hx + Math.sin(p * 9 + C.seed) * 26 * (1 - e), y: lerp(hy - 520, hy, e), rot: -0.2 + Math.sin(p * 7 + C.seed) * 0.5 * (1 - e), size, a: clamp(p * 3) }
    }
    return null
  }

  function drawActor(k, t, ok) {
    const pl = place(k, t)
    // libra gets bonked clean out of frame when Capricorn lands
    let flyRot = 0, flyP = null
    if (k === 'lib' && t >= T.whistle && t < T.cut1) {
      const p = prog(t, T.whistle, T.whistle + 0.75)
      if (p >= 1) return
      const s0 = LAY.A.lib
      flyP = { p: [s0[0] + ease.outQuad(p) * 420, s0[1] - Math.sin(p * Math.PI * 0.9) * 360 + p * p * 300, s0[2]], pk: 1 }
      flyRot = p * 11
    }
    const P = flyP || pl
    if (!P) return
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return
    const C = CAST[k], st = stateOf(k, t, p)
    const alpha = C.back ? 0.92 : 1
    let R
    if (flyRot) {
      x.save(); x.translate(p[0], p[1]); x.rotate(flyRot)
      R = drawStarChar(x, 0, 0, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: 'wide', look: [-1, 0], blink: false, seed: C.seed, pop: pk })
      x.restore()
      return
    }
    R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * (t < T.drop ? 0.02 : 0.04), alpha })
    const S = R.size
    // props
    const cap = capFor(k, t, R)
    if (cap && cap.a > 0 && (place(k, t) || t < T.drop + 1)) drawNightcap(x, cap.x, cap.y, cap.size * pk, { color: C.cap, stripe: C.stripe, rot: cap.rot, alpha: cap.a })
    if (k === 'cap') {
      const blow = Math.max(pulse(t, T.whistle - 0.02, 0.62), 0.6 * pulse(t, T.l3 - 0.05, 0.3))
      drawWhistle(x, R.x + S * 0.03, R.y + S * 0.13, S / 24, { blow, t, flip: true })
    }
    if (k === 'lib' && t >= T.cut1) drawBandage(x, R.x - S * 0.26, R.y - S * 0.06, Math.max(2, S / 44))
    if (st.tears > 0) {
      const ey = R.y + S * 0.07, exo = S * 0.17
      drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears })
    }
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) drawActor(k, t, ok)
  }

  // ─────────────────────────────── the sky: dark while asleep, daylight at noon, the lesson dim
  function drawWorld(t) {
    const wake = ease.outCubic(prog(t, T.drop - 0.05, T.drop + 0.25))
    const flash = pulse(t, T.drop - 0.02, 0.5)
    const d0 = dayK(t)
    drawSky(x, t, { ...SKY_H, moon: { ...SKY_H.moon, alpha: 1 - d0 }, dim: lerp(lerp(0.22, SKY_H.dim, wake) + flash * 0.3, 0.25, d0), stars: lerp(lerp(0.45, 1, wake), 0.3, d0) })
    if (flash > 0) { x.fillStyle = rgba('#fff3c8', 0.16 * flash); x.fillRect(0, 0, W, 1920) }
    const d = dayK(t)
    if (d > 0) {
      const g = x.createLinearGradient(0, 0, 0, 1920)
      g.addColorStop(0, rgba('#5aa8f5', 0.78 * d)); g.addColorStop(0.5, rgba('#8cc8f2', 0.6 * d)); g.addColorStop(1, rgba('#ffc08a', 0.55 * d))
      x.fillStyle = g; x.fillRect(0, 0, W, 1920)
      drawSun(x, SUN.x, SUN.y + ease.inCubic(prog(t, ...T.night)) * 300, SUN.r, t, { pop: easeOutBack(prog(t, T.sun, T.sun + 0.45), 1.8), alpha: 1 - prog(t, ...T.night) })
    }
    // phone glow on the sleepers
    if (t < T.drop + 0.3) {
      const gl = clamp(prog(t, T.phone, T.phone + 0.6)) * (0.8 + 0.2 * Math.sin(t * 3)) * (1 - prog(t, T.drop, T.drop + 0.3))
      const g = x.createRadialGradient(540, 1000, 0, 540, 1000, 760)
      g.addColorStop(0, rgba(LAV, 0.22 * gl)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.fillRect(0, 200, W, 1600)
    }
    const dim = clamp(prog(t, T.lesson - 0.15, T.lesson + 0.2)) * (1 - prog(t, ...T.lessonOut))
    if (dim > 0) { x.fillStyle = `rgba(6,4,18,${0.5 * dim})`; x.fillRect(0, 0, W, 1920) }
  }

  // ─────────────────────────────── the LESSON banner
  function updateBanner(t) {
    const on = t >= T.lesson && t < T.lessonOut[1]
    banner.style.display = on ? 'block' : 'none'
    xp.style.display = t >= T.xp && t < T.lessonOut[1] ? 'block' : 'none'
    if (on) {
      const p = prog(t, T.lesson, T.lesson + 0.42), o = prog(t, ...T.lessonOut)
      const sc = (0.2 + 0.8 * easeOutBack(p, 2.6)) * (1 - 0.6 * ease.inCubic(o))
      const rot = (1 - ease.outCubic(p)) * -8 + 2.2 * Math.sin((t - T.lesson) * 16) * Math.exp(-(t - T.lesson) * 3.5)
      banner.style.transform = `scale(${sc.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      banner.style.opacity = String(clamp(p * 4) * (1 - ease.inQuad(o)))
      bChars.forEach((s, i) => { s.style.visibility = t >= T.lesson + 0.12 + i * 0.022 ? 'visible' : 'hidden' })
      const sp = prog(t, T.lesson + 0.5, T.lesson + 1.1)
      sheenBar.style.left = (lerp(-120, BW + 40, sp)).toFixed(1) + 'px'
      sheenBar.style.opacity = sp > 0 && sp < 1 ? '1' : '0'
    }
    if (t >= T.xp && t < T.lessonOut[1]) {
      const p = prog(t, T.xp, T.xp + 0.35), o = prog(t, ...T.lessonOut)
      xpChip.style.transform = `translateY(${((1 - ease.outCubic(p)) * 40 - o * 20).toFixed(1)}px) scale(${(0.5 + 0.5 * easeOutBack(p, 2.4)).toFixed(3)})`
      xpChip.style.opacity = String(clamp(p * 3) * (1 - o))
    }
    LESSON.update(t, outK(t, T.lessonOut))
  }
  function lessonSparks(t) {
    sparkles(t, 540, 634, T.lesson + 0.05, 16, 430, 0.3, 0.9, 34)
    sparkles(t, 540, 634, T.lesson + 0.3, 10, 300, 1.1, 0.8, 24)
    sparkles(t, 540, 1050, T.lessonLand + 0.05, 12, 380, 0.7, 0.8, 28)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawDeck(t)
        drawPhone(t)
        drawCast(t)
        lessonSparks(t)
        // the deletes: a little gold confetti puff from the phone per letter
        for (const [j, d] of T.del.entries()) { const P = PH.B5; sparkles(t, P.x, P.y + 230, d, j === 3 ? 14 : 7, j === 3 ? 330 : 180, j, 0.6, j === 3 ? 30 : 22) }
        sparkles(t, 540, 1080, T.h7Land, 10, 360, 0.2, 0.7, 24)
      }
      for (const b of boxes) b.update(t)
      updateBanner(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      grainC.style.opacity = String(GRAIN_H * (1 - 0.55 * dayK(t)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (default selection keeps the 2nd + 4th: 13.93 flip and 27.82 deal). The others stay inert:
// 8.4 (the wake beat → the typing beat), 19.65 (the receipts → noon, an on-screen move), 32.2 (deck → lesson).
export const CUTS = [8.4, { t: T.cut1, kind: 'flip' }, T.move5[0], { t: T.cut2, kind: 'deal' }, 32.2]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const buzz = t0 => Array.from({ length: 6 }, (_, i) => ['pop', r3(t0 + i * 0.045), 150 + (i % 2) * 20, 0.05, 0])
// whistle: a two-note pea trill
const whistle = (t0, len = 0.5, gain = 0.03) => Array.from({ length: Math.round(len / 0.03) }, (_, i) => ['pop', r3(t0 + i * 0.03), i % 2 ? 2793.83 : 2349.32, gain * (1 - 0.4 * i / (len / 0.03)), 0.1])
// record scratch: wik-wikka (short band-passed noise sweeps) + the music tape-stops
const scratch = t0 => [['whoosh', r3(t0 + 0.07), 0.1, 0.13], ['whoosh', r3(t0 + 0.17), 0.08, 0.1], ['whoosh', r3(t0 + 0.27), 0.14, 0.13], ['tapeStop', t0, 0.45]]
// crickets: a chiptune chirp (three fast high blips)
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
// a sob: two little descending blips
const sob = (t0, gain = 0.022) => [['pop', r3(t0), 659.25, gain, -0.35], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, -0.35], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, -0.35]]
// a cheer: a noise swell + glitter + a happy blip
const cheer = (t0, big = false) => [['whoosh', r3(t0 + (big ? 0.45 : 0.2)), big ? 0.9 : 0.4, big ? 0.06 : 0.035], ['glitter', r3(t0), r3(t0 + (big ? 0.6 : 0.22))], ['pop', r3(t0 + 0.02), NOTE[big ? 5 : 3], 0.035, 0]]
// a drumroll: a tick roll, crescendo
const roll = (a, b) => { const n = Math.round((b - a) / 0.028); return Array.from({ length: n }, (_, i) => ['tick', r3(a + i * 0.028), 0.012 + 0.03 * (i / n)]) }
// the level-up: a fast rising chiptune arpeggio in key, then a bell
const levelUp = t0 => [...[587.33, 739.99, 880, 1174.66, 1479.98, 1760].map((f, i) => ['pop', r3(t0 + i * 0.065), f, 0.045, (i % 2 ? 0.2 : -0.2)]),
  ...[1174.66, 1479.98, 1760].map((f, i) => ['pluck', r3(t0 + 0.4 + i * 0.012), f, 0.03, 0.9, 0]), ['bell', r3(t0 + 0.4), 1760, 0.035, 1.8, 0], ['glitter', r3(t0 + 0.05), r3(t0 + 0.8)]]
const PITCH = { [STARS]: 880, [CAPN]: 659.25, [SCON]: 739.99 }

export const CUES = [
  // 1 · 2:07 AM
  ...head(T.h0, 2, T.h0Land, 0),
  ['bell', T.phone + 0.1, 880, 0.012, 1.2, 0],
  ['pop', T.notif, 880, 0.035, 0], ['bell', T.notif + 0.02, 1318.51, 0.02, 0.8, 0],
  ...T.buzz.flatMap(buzz),
  ...T.snore.flatMap(s => [['pop', s, 220, 0.022, -0.4], ['pop', r3(s + 0.32), 196, 0.018, -0.4]]),
  // 2 · the sky wakes: a big chord hit, the nightcaps blast off
  ['boom', T.drop, 0.2], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', r3(T.drop + i * 0.008), f, 0.03, 1.6, (i - 1.5) * 0.2]),
  ['whoosh', r3(T.drop + 0.25), 0.5, 0.05], ['glitter', T.drop, r3(T.drop + 0.5)],
  ...head(T.h1, 4, T.h1Land, 2),
  ['pop', r3(T.l1 - 0.2), 659.25, 0.035, 0], ['pop', r3(T.l1 - 0.14), 880, 0.03, 0],
  ['tick', T.blinkSync, 0.03], ['tick', r3(T.blinkSync + 0.24), 0.03],
  // 3 · "yeah" … the lean … the whistle
  ...head(T.h2, 2, T.h2Land, 4),
  ['pop', T.unlock[0], 1174.66, 0.025, 0],
  ...Array.from({ length: REPLY.length }, (_, i) => ['tick', r3(T.type + i * T.typeGap), 0.03]),
  ['riser', T.lean[0], T.whistle, 0.03],
  ['whoosh', r3(T.capIn + 0.15), 0.25, 0.05],
  ...whistle(T.whistle, 0.5), ['pluck', T.whistle, 2349.32, 0.03, 0.3, 0.1], ...scratch(T.whistle + 0.02),
  ['boom', r3(T.whistle + 0.01), 0.1],
  ...[392, 523.25, 659.25, 880].map((f, i) => ['pop', r3(T.whistle + 0.05 + i * 0.05), f, 0.03, 0.5]),     // libra: boing
  ['pop', T.openB, 659.25, 0.035, 0], ['pop', r3(T.openB + 0.06), 880, 0.03, 0],
  ...whistle(r3(T.l3 - 0.05), 0.2, 0.018),
  // 4 · the receipts
  ...head(T.h3, 1, T.h3Land, 1),
  ...T.bub.flatMap((b, i) => [['pop', b, NOTE[2 + i * 2], 0.04, -0.2], ['tick', r3(b + 0.02), 0.03], ['pop', r3(b + 0.25), 392 - i * 30, 0.02, 0.3]]),
  ['pop', r3(T.l4 - 0.2), 659.25, 0.035, 0], ['pop', r3(T.l4 - 0.14), 880, 0.03, 0],
  ['whoosh', r3(T.dbl[0] + 0.08), 0.14, 0.05], ['whoosh', r3(T.dbl[0] + 0.25), 0.12, 0.04], ['pop', T.dbl[1], 1174.66, 0.04, 0], ['bell', r3(T.dbl[1] + 0.02), 1318.51, 0.02, 0.6, 0],
  // 5 · noon: the sun, the silence, crickets, sobbing; "that's OUR job"
  ['whoosh', T.move5[0], 0.35, 0.04],
  ['bell', T.sun, 1567.98, 0.03, 1.4, 0.3], ['glitter', T.sun, r3(T.sun + 0.4)],
  ...head(T.h4, 2, T.h4Land, 0),
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.011)]),
  ...sob(T.cry), ...sob(r3(T.cry + 0.6), 0.018), ...sob(r3(T.l6 - 0.9), 0.016),
  ['pop', r3(T.l5 - 0.2), 659.25, 0.035, 0], ['pop', r3(T.l5 - 0.14), 880, 0.03, 0],
  ['pop', T_OUR, 1174.66, 0.035, 0], ['pop', r3(T_NOT + 0.05), 440, 0.025, 0.2], ['pop', r3(T_NOT + 0.18), 392, 0.025, -0.2],
  ['whoosh', T.night[0], 0.4, 0.035], ['pluck', T.night[1], 587.33, 0.025, 0.8, 0],
  ...head(T.h5, 0, T.h5Land, 0),
  ...T.del.flatMap((d, i) => [['tick', d, 0.045], ...cheer(r3(d + 0.03), i === 3)]),
  ['bell', r3(T.del[3] + 0.05), 1567.98, 0.03, 1.2, 0],
  // 6 · tonight's deck
  ...head(T.h6, 1, T.h6Land, 3),
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.18), 0.05]),
  ['pop', r3(T.l7 - 0.2), 659.25, 0.035, 0], ['pop', r3(T.l7 - 0.14), 880, 0.03, 0],
  ['whoosh', T.rise[0], 0.4, 0.04], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', r3(T.flip[0] + 0.2), r3(T.flip[1] + 0.5)],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.hearts + 0.04 * i), NOTE[(i * 2 + 3) % 7], 0.02, (i % 2 ? 0.4 : -0.4)]),
  ['whoosh', T.deckOut[0], 0.35, 0.035],
  // 7 · LESSON UNLOCKED: drumroll → level-up → sparkle burst; the lesson words; +1
  ...roll(...T.roll),
  ...levelUp(T.lesson),
  ...wordPops(T.lessonText, 6, 0.075, 0, 0.024), ['pop', T.lessonLand, 1174.66, 0.05, 0], ['pluck', T.lessonLand, 1174.66, 0.045, 0.8, 0], ['glitter', T.lessonLand, r3(T.lessonLand + 0.5)],
  ['pop', T.xp, 1318.51, 0.04, 0], ['pop', r3(T.xp + 0.07), 1760, 0.035, 0],
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // 8 · bedtime
  ...wordPops(T.h7, 6, 0.08, 1, 0.022), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0],
  ['pluck', T.yawn[0], 659.25, 0.03, 0.9, -0.2], ['pluck', r3(T.yawn[0] + 0.3), 493.88, 0.028, 1.1, 0.2],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.caps[0] + i * 0.14), NOTE[4 - i], 0.018, (i % 2 ? 0.3 : -0.3)]),
  ['pop', r3(T.caps[1] + 0.4), 220, 0.02, -0.3], ['pop', r3(T.caps[1] + 0.72), 196, 0.016, -0.3],
  ['tick', T.peek[0], 0.04], ['pluck', r3(T.peek[0] + 0.02), 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
