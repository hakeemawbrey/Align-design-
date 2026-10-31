// st12more — helpers for the season 12 extension, "Hot Takes, part 2" (promo/films/STARTALK15.md, E36–E57).
// Every episode is built with sthot.js's hotEpisode; this file only adds the timing plan (so each episode keeps the
// readability rules without hand-tuning) and a few small pixel props / speech bubbles. Pure f(t); nothing touches
// `document` at module top level.
//
//   import { hotPlan, castSign, R, bits, bubble, PROPS2 } from '../../st12more.js'
//
// hotPlan({ duration, lines, verdict, obj = 2.6, cps = 28 }) → { objection, lines, verdict, pill, last, VERDICT_AT }
//   lines: [{ who: 'pro' | 'con', text }]  (one line for a 15 s episode, two or three for 20 s). Each line starts 1.5 s
//   after the previous one finishes typing (the first at obj + 0.28); the verdict lands 1.5 s after the last one.
//   The last line lands max(verdict end + 2.5 s, …) but never later than STORY_END − 1.9 (15 s: 8.7, 20 s: 13.7); the
//   pill pops 0.65 s before it and the verdict fades over [last − 0.7, last − 0.5]. Spread the result into hotEpisode:
//     const P = hotPlan({ duration: 15, lines: [...], verdict: '…' })
//     hotEpisode({ ..., objection: P.objection, lines: P.lines, verdict: P.verdict, pill: P.pill, last: { ...P.last, text } })
// castSign(id, o) → a hotEpisode cast entry for a zodiac sign: { name: '♍︎ VIRGO', color, glyph, textColor, ...o }.
// R(x, colour, x0, y0, w, h) · bits(x, rows, palette, px, py, cell) — pixel helpers.
// bubble(x, t, { x, y, text, at, out, color, size = 32 }) — a pixel speech bubble (tail down) that pops in at `at`.
import { lineTimes, signStar } from './startalk.js'
import { verdictTimes, HOT, clamp, easeOutBack, r3 } from './sthot.js'
import { ENDCARD_LEN } from './endcard.js'

const MONO = "'Space Mono', ui-monospace, monospace"

export function hotPlan({ duration, lines, verdict, obj = 2.6, cps = 28 }) {
  let t = obj + 0.28
  const out = []
  for (const L of lines) {
    const at = r3(t)
    out.push({ ...L, t: at })
    const [lt] = lineTimes([{ t: at, speaker: 'x', text: L.text }], { cps })
    t = lt.done + 1.5
  }
  const VERDICT_AT = r3(Math.max(t, obj + 1.6))
  const vt = verdictTimes(VERDICT_AT, verdict)
  const STORY_END = duration - ENDCARD_LEN
  const last = r3(Math.min(STORY_END - 1.9, vt.end + 2.5 + 0.7))
  return {
    objection: obj, lines: out, VERDICT_AT,
    verdict: { at: VERDICT_AT, text: verdict, out: [r3(last - 0.7), r3(last - 0.5)] },
    pill: { at: r3(last - 0.65), dur: 0.5 },
    last: { at: last },
  }
}

const mixWhite = (hex, k) => { const n = parseInt(hex.slice(1), 16); return '#' + [16, 8, 0].map(s => Math.round(((n >> s) & 255) + (255 - ((n >> s) & 255)) * k).toString(16).padStart(2, '0')).join('') }
export function castSign(id, o = {}) {
  const s = signStar(id)
  return { name: `${s.glyph}︎ ${id.toUpperCase()}`, color: s.color, glyph: s.glyph, textColor: mixWhite(s.color, 0.35), ...o }
}

export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const bits = (x, rows, pal, px, py, s) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) R(x, pal[ch], px + i * s, py + j * s, s + 0.4, s + 0.4) }))

export function bubble(x, t, { x: bx, y: by, text, at, out = null, color = '#fffbea', size = 32 }) {
  if (t < at || (out != null && t > out + 0.15)) return
  const pin = easeOutBack(clamp((t - at) / 0.22), 2.4), pout = out != null ? 1 - clamp((t - out) / 0.15) : 1
  const p = pin * pout
  if (p <= 0.01) return
  x.save(); x.translate(bx, by); x.scale(p, p)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 1.1, h = size * 1.75
  R(x, HOT.ink, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, color, -w / 2, -h / 2, w, h)
  R(x, HOT.ink, -10, h / 2, 20, 16); R(x, color, -6, h / 2 - 2, 12, 14)
  x.fillStyle = HOT.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}
