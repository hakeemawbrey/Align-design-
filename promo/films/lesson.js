// lesson — the shared Star Talk "★ LESSON UNLOCKED" beat (season 3, promo/films/STARTALK4.md), moved out of stlive5th
// (season 2) so every film lands its lesson the same way: a gold stepped-corner pixel panel drops in with a small rotate
// and scale bounce, a shine sweeps across it, a pixel sparkle burst flies out from behind it, and the lesson pops in word
// by word below it (Inter 800, the *accent* in EB Garamond italic). Optional: a "+1 …" reward chip under the lesson and
// a dark scrim over the scene while the lesson is up.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { buildLesson, lessonCues, popText } from '../../lesson.js'
//
// buildLesson(root, { at, out, text, chip = null, accentColor = GOLD, dim = 0.55, top = 492, textTop = 690, size = 88, accentSize = 150 })
//   → { update(t), end, chipAt }
//   Call it in build() AFTER your scene layers (so it sits on top) and BEFORE grain and the card-cut layers, and call
//   lesson.update(t) every frame. Pure f(t): any frame, any order.
//     at          the banner drops in (snap it to the beat grid: 0.6 + n·0.5556)
//     out         [a, b] the fade-out window: everything fades over it; from b on nothing shows (display: none)
//     text        the lesson. ' | ' = line break, *…* = the EB Garamond italic accent (it may span words: '*carry it.*')
//     chip        optional reward chip under the lesson, e.g. '+1 SELF-RESPECT' (a leading +N is drawn in mint)
//     accentColor the accent's colour (default gold #f2c75c)
//     dim         0…1: a full-frame dark scrim behind the banner and the text while the lesson is up (0 = none)
//     top         the banner's top in px (the panel is 800 × 136, centred)
//     textTop     the lesson's top in px; size / accentSize = the Inter / Garamond font sizes in px
//   The lesson shrinks to fit (never grows) so each ' | ' line fits the 940 px measure, down to 0.7 × size; longer
//   lines wrap. At 88 px a line holds ~18 characters, so plan your breaks (or pass a smaller size) and check a still.
//   end    = when the lesson text is fully in. Hold it ≥ 2.5 s: out[0] − end ≥ 2.5.
//   chipAt = when the chip pops (null without a chip).   fit = the shrink applied (1 = none).
//   Timeline (seconds after at): 0–0.45 the banner drops in · 0–0.35 the scrim fades up · 0.12–1.12 the sparkle burst ·
//   0.4–1.1 the shine sweep · 0.45 the first word, then one every 0.08 (an accent lands big with a wobble 0.2 after the
//   word before it; the words after an accent wait 0.3 for it) · max(1.2, last word + 0.15) the chip pops, then floats.
//   With the accent at the end and ≤ 6 words before it, that is exactly stlive5th: accent at 1.05, chip at 1.2, end 1.45.
//
// lessonCues(at, { text, chip, key } = {}) → cue entries to spread into your CUES.
//   lessonCues(at) alone = the chiptune level-up arpeggio, glitter and a bell, timed to the banner (stlive5th's sound).
//   Pass the same text and chip you gave buildLesson to add the word pops, the accent's pop + pluck and the chip's ding,
//   on the same schedule. Pass key (your music.key, e.g. 'Gm', 'Eb', 'F#m') to move the chiptune arpeggio into your key
//   (pop / pluck / bell are moved by the engine already; without key it plays in A minor / C major, as in stlive5th).
//     const LESSON = { at: 46.2, out: [50.8, 51.0], text: 'Wanting clarity | isn’t *too much.*', chip: '+1 CLARITY' }
//     build():  const lesson = buildLesson(root, LESSON)        CUES: ...lessonCues(LESSON.at, { ...LESSON, key: 'Gm' })
//
// lessonTimes({ at, text, chip }) → { words: [{ t, accent }], end, chip }   the same schedule, pure (works in node).
//
// popText(parent, text, { top, size, at, weight = 800, accentColor = GOLD, accentSize = size·1.09, gap = 0.07, late = 0,
//                         lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, color = BONE, left = 70, width = 940,
//                         fit = false })
//   → { update(t, out = 1), root }
//   The season's headline helper (from stlive5th): springy word-by-word type, centred, Inter 800 bone with a text shadow.
//   '*word*' = accent (EB Garamond italic 500, accentColor), '|' = line break. Word n pops at at + n·gap; the last `late`
//   words pop big at lateAt (+ lateGap each), with a wobble if wobble. update(t, out): pass out = 1 → 0 to fade it out
//   (e.g. 1 − ease.inQuad(prog(t, a, b))); at out ≤ 0 or t < at it is hidden. fit: true = shrink to fit like the lesson.
//
// pixelPanel(cv, w, h, { m = 28, fill, border = GOLD, P = 8 })   the banner's stepped-corner pixel panel, into a canvas
//   sized (w + 2m) × (h + 2m) (place the canvas at −m, −m). Drawn once, at build.
//
// Nothing touches `document` or `window` at module top level (the sound build imports this in node).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, rng } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'

const FW = 1080, FH = 1920                       // Star Talk is vertical
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BAN = { w: 800, h: 136, m: 28 }
const r2 = v => +v.toFixed(2), r3 = v => +v.toFixed(3)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ─────────────────────────────────────────────── words
/** text → tokens: { br } for '|', else { w, accent }. *…* may span words; punctuation may follow the closing star. */
function tokens(text) {
  const out = []
  let open = false
  for (const tok of String(text || '').trim().split(/\s+/)) {
    if (!tok) continue
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 })
    if (stars % 2) open = !open
  }
  return out
}

/** the centred word box: one inline-block span per word (opacity 0 until it pops) */
function wordBox(parent, text, { size, weight = 800, accentColor = GOLD, accentSize, lineHeight = 1.02, color = BONE }, place) {
  const box = el('div', { ...place, textAlign: 'center', fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (tk.accent) Object.assign(style, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ accent: tk.accent, t: 0, big: false, e: el('span', style, box, tk.w) })
  }
  return { box, ws }
}

/** shrink a laid-out word box (never grow) so each explicit line fits maxW, down to `floor` of the asked sizes; longer
 *  lines still wrap. Measured once at build (fonts are loaded by then); a box that isn't laid out is left alone. */
function fitBox(box, ws, size, accentSize, maxW, floor = 0.7) {
  let widest = 0, cur = 0
  for (const n of box.childNodes) {
    if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
    cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || size)        // + the 0.12em margins
  }
  widest = Math.max(widest, cur)
  if (!(widest > maxW)) return 1
  const k = Math.max(floor, (maxW - 8) / widest)
  box.style.fontSize = (size * k) + 'px'
  for (const w of ws) if (w.accent) w.e.style.fontSize = ((accentSize || size * 1.09) * k) + 'px'
  return k
}

/** one word's pop at t (big = the springier accent pop, wobbling if asked), faded by out (1 → 0) */
function popWord(w, t, out, wobble) {
  const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
  const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
  const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
  w.e.style.opacity = String(clamp(p * 3) * out)
  w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, color = BONE, left = 70, width = FW - 140, fit = false }) {
  const { box, ws } = wordBox(parent, text, { size, weight, accentColor, accentSize, lineHeight, color }, { position: 'absolute', left: left + 'px', width: width + 'px', top: top + 'px' })
  if (fit) fitBox(box, ws, size, accentSize, width)
  const nW = ws.length
  ws.forEach((w, n) => { w.big = late > 0 && n >= nW - late; w.t = w.big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap })
  return {
    root: box,
    update(t, out = 1) {
      const on = out > 0 && t >= t0
      box.style.display = on ? 'block' : 'none'
      if (on) for (const w of ws) popWord(w, t, out, wobble)
    },
  }
}

// ─────────────────────────────────────────────── the schedule (pure; shared by the picture and the sound)
const T_TEXT = 0.45, T_GAP = 0.08, T_ACC = 0.2, T_ACC_GAP = 0.12, T_AFTER = 0.3, T_CHIP = 1.2
export function lessonTimes({ at, text, chip = null }) {
  let t = null, prevAcc = false
  const words = tokens(text).filter(k => !k.br).map(k => {
    if (t === null) t = at + T_TEXT
    else if (k.accent) t += prevAcc ? T_ACC_GAP : T_ACC        // an accent lands a beat late, big
    else t += prevAcc ? T_AFTER : T_GAP                        // the words after an accent wait for it to land
    prevAcc = k.accent
    return { t: r3(t), accent: k.accent }
  })
  const end = words.length ? r3(Math.max(...words.map(w => w.t + (w.accent ? 0.4 : 0.28)))) : r3(at + T_TEXT)
  const last = words.length ? words[words.length - 1].t : at
  return { words, end, chip: chip ? r3(Math.max(at + T_CHIP, last + 0.15)) : null }
}

// ─────────────────────────────────────────────── the pixel panel
const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
/** a pixel panel (stepped corners, gold border, bone hairline) on a canvas sized (w + 2m) × (h + 2m) */
export function pixelPanel(cv, w, h, { m = 28, fill = 'rgba(16,9,38,0.95)', border = GOLD, P = 8 } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d'); x.translate(m, m)
  x.save(); x.shadowColor = 'rgba(242,199,92,0.65)'; x.shadowBlur = 26; step(x, 0, 0, w, h, P, border); x.restore()
  step(x, 0, 0, w, h, P, border)
  step(x, P, P, w - 2 * P, h - 2 * P, P, INK)
  step(x, 2 * P, 2 * P, w - 4 * P, h - 4 * P, P, fill)
  x.fillStyle = 'rgba(239,230,214,0.45)'; x.fillRect(3 * P, 3 * P - P / 2, w - 6 * P, P / 3); x.fillRect(3 * P, h - 3 * P + P / 6, w - 6 * P, P / 3)
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 4, P / 2); x.fillRect(0, 2 * P, P / 2, P * 3)
  // corner gems
  for (const [gx, gy] of [[P * 1.5, P * 1.5], [w - P * 2.5, P * 1.5], [P * 1.5, h - P * 2.5], [w - P * 2.5, h - P * 2.5]]) { x.fillStyle = '#ff8fb1'; x.fillRect(gx, gy, P, P) }
}

/** CSS clip-path for the same stepped corners (step P px), for DOM boxes of any size */
function stepClip(P) {
  const a = P + 'px', b = 2 * P + 'px', A = `calc(100% - ${P}px)`, B = `calc(100% - ${2 * P}px)`
  return `polygon(${[[b, '0'], [B, '0'], [B, a], [A, a], [A, b], ['100%', b], ['100%', B], [A, B], [A, A], [B, A], [B, '100%'], [b, '100%'], [b, A], [a, A], [a, B], ['0', B], ['0', b], [a, b], [a, a], [b, a]].map(p => p.join(' ')).join(', ')})`
}

// ─────────────────────────────────────────────── the beat
export function buildLesson(root, { at, out, text, chip = null, accentColor = GOLD, dim = 0.55, top = 492, textTop = 690, size = 88, accentSize = 150 }) {
  const OUT = out || [at + 4.6, at + 4.8]
  const S = lessonTimes({ at, text, chip })
  // the scrim, then the burst canvas (behind the banner, as on stlive5th's scene canvas), the banner, the lesson + chip
  const scrim = el('div', { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px', background: '#060410', opacity: 0, display: 'none', pointerEvents: 'none' }, root)
  const burst = el('canvas', { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px', display: 'none', pointerEvents: 'none' }, root)
  burst.width = FW; burst.height = FH
  const bx = burst.getContext('2d')

  const banner = el('div', { position: 'absolute', left: ((FW - BAN.w) / 2) + 'px', top: top + 'px', width: BAN.w + 'px', height: BAN.h + 'px', display: 'none', transformOrigin: '50% 50%' }, root)
  const banCv = el('canvas', { position: 'absolute', left: -BAN.m + 'px', top: -BAN.m + 'px', width: (BAN.w + 2 * BAN.m) + 'px', height: (BAN.h + 2 * BAN.m) + 'px', imageRendering: 'pixelated' }, banner)
  pixelPanel(banCv, BAN.w, BAN.h, { m: BAN.m })
  const shineWrap = el('div', { position: 'absolute', left: '16px', top: '16px', right: '16px', bottom: '16px', overflow: 'hidden' }, banner)
  const shine = el('div', { position: 'absolute', top: '-20px', bottom: '-20px', width: '90px', left: '0px', background: 'linear-gradient(90deg, rgba(255,241,200,0), rgba(255,241,200,0.55), rgba(255,241,200,0))', transform: 'skewX(-20deg)' }, shineWrap)
  el('div', { position: 'absolute', left: 0, top: 0, width: BAN.w + 'px', height: BAN.h + 'px', display: 'grid', placeItems: 'center', font: `700 54px ${MONO}`, letterSpacing: '0.06em', color: GOLD,
    textShadow: '0 4px 0 rgba(6,4,18,0.9), 0 0 18px rgba(242,199,92,0.55)', whiteSpace: 'nowrap' }, banner, '★ LESSON UNLOCKED')

  // the lesson; the chip flows under it, so it always clears the last line
  const wrap = el('div', { position: 'absolute', left: 0, top: textTop + 'px', width: FW + 'px' }, root)
  const { box, ws } = wordBox(wrap, text, { size, accentColor, accentSize, lineHeight: 1.04 }, { margin: '0 70px' })
  ws.forEach((w, i) => { w.t = S.words[i].t; w.big = S.words[i].accent })
  const fitK = fitBox(box, ws, size, accentSize, FW - 140)
  wrap.style.display = 'none'
  let chipRow = null, chipEl = null
  if (chip) {
    const m = /^([+−-]\s*\d+)\s+(.+)$/.exec(String(chip).trim())
    chipRow = el('div', { textAlign: 'center', marginTop: '46px', visibility: 'hidden' }, wrap)
    chipEl = el('div', { display: 'inline-block', transformOrigin: '50% 60%', filter: 'drop-shadow(0 6px 0 rgba(6,4,18,0.85)) drop-shadow(0 0 16px rgba(242,199,92,0.5))' }, chipRow)
    const ring = el('div', { background: GOLD, clipPath: stepClip(5), padding: '5px' }, chipEl)
    const ink = el('div', { background: INK, clipPath: stepClip(5), padding: '5px' }, ring)
    const face = el('div', { background: '#100926', clipPath: stepClip(5), padding: '9px 24px 8px', font: `700 34px ${MONO}`, lineHeight: '1.25', letterSpacing: '0.06em', color: BONE, whiteSpace: 'nowrap', textShadow: '0 3px 0 rgba(6,4,18,0.9)' }, ink)
    if (m) { el('span', { color: MINT }, face, m[1]); face.appendChild(document.createTextNode(' ' + m[2])) }
    else face.textContent = String(chip)
  }

  return {
    end: S.end,
    chipAt: S.chip,
    fit: fitK,
    update(t) {
      const on = t >= at && t < OUT[1]
      const o = outK(t, OUT)
      // scrim
      const dk = on && dim > 0 ? clamp(dim) * ease.outQuad(prog(t, at, at + 0.35)) * o : 0
      scrim.style.display = dk > 0 ? 'block' : 'none'
      if (dk > 0) scrim.style.opacity = dk.toFixed(4)
      // sparkle burst from behind the banner
      const tt = t - (at + 0.12)
      const bOn = on && tt >= 0 && tt <= 1
      burst.style.display = bOn ? 'block' : 'none'
      if (bOn) {
        bx.clearRect(0, 0, FW, FH)
        const p = ease.outCubic(tt), r = rng(77)
        bx.save(); bx.globalAlpha = (1 - ease.inQuad(tt)) * o
        for (let i = 0; i < 22; i++) {
          const a = r() * Math.PI * 2, d = 160 + r() * 380, cx = FW / 2 + Math.cos(a) * d * p * 1.2, cy = top + BAN.h / 2 + Math.sin(a) * d * p * 0.7
          drawPixelStar(bx, cx, cy, (20 + r() * 26) * (1 - 0.3 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, CYAN][i % 5])
        }
        bx.restore()
      }
      // banner: drop-in with a small rotate + scale bounce, then the shine
      banner.style.display = on ? 'block' : 'none'
      if (on) {
        const p = prog(t, at, at + 0.45)
        const sc = (0.2 + 0.8 * easeOutBack(p, 2.8)) * lerp(0.85, 1, o)
        banner.style.opacity = String(clamp(p * 4) * o)
        banner.style.transform = `translateY(${((1 - ease.outCubic(p)) * -80).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${((1 - ease.outCubic(p)) * -4).toFixed(2)}deg)`
        shine.style.left = lerp(-140, BAN.w + 60, prog(t, at + 0.4, at + 1.1)).toFixed(1) + 'px'
      }
      // the lesson + the chip
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      for (const w of ws) popWord(w, t, o, true)
      if (chipEl) {
        const c = t >= S.chip
        chipRow.style.visibility = c ? 'visible' : 'hidden'
        if (c) {
          const dt = t - S.chip, p = prog(dt, 0, 0.36)
          const fy = -5 * Math.sin(dt * 2.6) * clamp(dt * 2), fr = 1.2 * Math.sin(dt * 2.1 + 0.6) * clamp(dt * 2)      // a little float
          chipEl.style.opacity = String(clamp(p * 4) * o)
          chipEl.style.transform = `translateY(${((1 - ease.outCubic(p)) * 34 + fy + (1 - o) * 10).toFixed(2)}px) scale(${((0.4 + 0.6 * easeOutBack(p, 2.6)) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${fr.toFixed(2)}deg)`
        }
      }
    },
  }
}

// ─────────────────────────────────────────────── sound
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into each film's key); the
// chiptune level-up is a 'chip' (not moved by the engine), written in A minor / C major as in stlive5th, moved by `key`.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const PC = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
/** semitones (nearest way round) from the stlive5th level-up to `key`: a minor key gets its i chord + bIII on top,
 *  a major key its vi chord + I on top (the same shape, so it always lands on a chord of the key) */
function keyShift(key) {
  const m = key ? /^([A-G][#b]?)\s*(.*)$/.exec(String(key).trim()) : null
  if (!m || PC[m[1]] == null) return 0
  const s = PC[m[1]] - (/^(m(?!aj)|dor|aeol|phryg)/i.test(m[2]) ? 9 : 0)
  return ((s % 12) + 18) % 12 - 6
}
const levelUp = (t0, k) => [
  ...[440, 523.25, 659.25, 880, 1046.5].map((f, i) => ['chip', r3(t0 + i * 0.075), r2(f * k), 0.09, { duty: 0.25, gain: 0.028, decay: 0.08, sustain: 0.6, rev: 0.12, dly: 0.1, bus: 'fx' }]),
  ['chip', r3(t0 + 0.38), r2(1046.5 * k), 0.62, { duty: 0.25, arp: [0, 4, 7, 12], gain: 0.026, decay: 0.4, sustain: 0.55, vib: 0.004, rev: 0.2, dly: 0.15, bus: 'fx' }],
  ['chip', r3(t0 + 0.38), r2(523.25 * k), 0.62, { wave: 'tri', gain: 0.03, decay: 0.4, sustain: 0.6, rev: 0.1, dly: 0, bus: 'fx' }],
]
export function lessonCues(at, { text = null, chip = null, key = null } = {}) {
  const cues = [...levelUp(at, 2 ** (keyShift(key) / 12)), ['glitter', r3(at + 0.1), r3(at + 0.9)], ['bell', r3(at + 0.4), 1760, 0.03, 1.6, 0]]
  if (!text && !chip) return cues
  const S = lessonTimes({ at, text, chip })
  let n = 0
  S.words.forEach((w, i) => {
    if (w.accent && !(i && S.words[i - 1].accent)) cues.push(['pop', w.t, 1174.66, 0.05, 0], ['pluck', w.t, 1174.66, 0.045, 0.8, 0])
    else if (w.accent) cues.push(['pop', w.t, 1318.51, 0.04, 0])
    else { cues.push(['pop', w.t, NOTE[(1 + n) % NOTE.length], 0.024, n % 2 ? 0.15 : -0.15]); n++ }
  })
  if (S.chip != null) cues.push(['pop', S.chip, 1318.51, 0.032, 0.2], ['pop', r3(S.chip + 0.07), 1760, 0.03, 0.2], ['pluck', r3(S.chip + 0.07), 1760, 0.022, 0.5, 0.2])
  return cues
}
