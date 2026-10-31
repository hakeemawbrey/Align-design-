// st12talkingstage — Star Talk S12 "Hot Takes" E03 (15 s vertical, music: house · Am). Story 0–10.6, then the end card.
//   0.00–2.6   🔥 HOT TAKE: "Talking stage over a | month? Just *ask.*"  ♈ Aries (left, ram horns, mid-smirk) taps a
//              wall calendar whose page reads DAY 34 (the pages keep flipping: 35, 36…). HEAT 3/5.
//   2.6        OBJECTION! (the drop) ♓ Pisces floats in, crying happily, hugging a misty crystal ball full of "?".
//   2.9        PISCES: "but the *mystery…*"  Aries stares at the calendar: DAY 41.
//   5.05       THE VERDICT: "clarity is kind. | “what are we?” is a *fair question.*"
//   8.05       AGREE / DISAGREE? (the cursor taps 🔥)
//   8.6        "Ask *what are we.* | You’re allowed."  Aries: "what are we?" · Pisces (heart eyes): "…dating? ♡" The fog in
//              the ball clears to a heart; the calendar stops on a circled day. Rhymes with the start (the calendar).
import { hotEpisode, HOT, rgba, clamp, easeOutBack, r3 } from '../../sthot.js'
import { signStar } from '../../startalk.js'

const ARI = signStar('aries'), PIS = signStar('pisces')
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const bits = (x, rows, pal, px, py, s) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) R(x, pal[ch], px + i * s, py + j * s, s + 0.4, s + 0.4) }))
const MONO = "'Space Mono', ui-monospace, monospace"
export const OBJ = 2.62
export const VERDICT_AT = 5.05
const LAST_AT = 8.6
const LINES = [{ who: 'con', t: OBJ + 0.28, text: 'but the *mystery…*' }]

const HORN = ['.KKK..', 'KWWWK.', 'KWKKWK', 'KWK.KK', '.KWK..', '..KK..']
function horns(x, r) {
  const c = r.size / 36, s = c * 1.1
  bits(x, HORN, { K: HOT.ink, W: '#f6e2c0' }, r.x - 13 * s, r.top + 4 * s, s)
  bits(x, HORN.map(row => [...row].reverse().join('')), { K: HOT.ink, W: '#f6e2c0' }, r.x + 7 * s, r.top + 4 * s, s)
}
function bubbleTxt(x, bx, by, txt, at, t, col) {
  if (t < at) return
  const p = easeOutBack(clamp((t - at) / 0.22), 2.4)
  x.save(); x.translate(bx, by); x.scale(p, p)
  x.font = `700 32px ${MONO}`; const w = x.measureText(txt).width + 36
  R(x, HOT.ink, -w / 2 - 4, -32, w + 8, 64); R(x, col, -w / 2, -28, w, 56); R(x, HOT.ink, -12, -44, 24, 14); R(x, col, -8, -40, 16, 12)
  x.fillStyle = HOT.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
  x.restore()
}
function calendar(x, t, T) {
  // a big wall calendar, back left; the day counter keeps climbing until the ask
  const cx = 250, cy = 740, w = 230, h = 220
  R(x, HOT.ink, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, '#fffbea', cx - w / 2, cy - h / 2, w, h); R(x, HOT.red, cx - w / 2, cy - h / 2, w, 52)
  for (const k of [-60, 60]) R(x, HOT.ink, cx + k - 6, cy - h / 2 - 18, 12, 30)
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fffbea'; x.fillText('DAY', cx, cy - h / 2 + 27)
  const tt = Math.min(t, T.last) + 0.35, day = 34 + Math.floor(tt / 0.75)
  const flip = t < T.last ? (tt % 0.75) / 0.75 : 1
  x.font = `700 104px ${MONO}`; x.fillStyle = HOT.ink; x.fillText(String(day), cx, cy + 28)
  if (flip < 0.16) { const k = flip / 0.16; R(x, HOT.ink, cx - w / 2, cy - h / 2 + 52 + (h - 52) * k - 4, w, 8); R(x, rgba('#e8dcc0', 0.9), cx - w / 2, cy - h / 2 + 52 + (h - 52) * k, w, 14 * (1 - k)) }
  if (t >= T.last + 0.6) {   // the circled day
    const p = clamp((t - T.last - 0.6) / 0.4)
    x.save(); x.strokeStyle = HOT.red; x.lineWidth = 8; x.beginPath(); x.ellipse(cx, cy + 28, 92, 60, -0.1, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); x.stroke(); x.restore()
  }
}
function ball(x, t, r, T) {
  // Pisces' crystal ball: fog full of "?", clearing to a heart at the end
  const bx = r.x - r.size * 0.55, by = r.y + r.size * 0.12, rr = 66
  x.save()
  x.fillStyle = HOT.ink; x.beginPath(); x.arc(bx, by, rr + 6, 0, Math.PI * 2); x.fill()
  const g = x.createRadialGradient(bx - 20, by - 20, 5, bx, by, rr); g.addColorStop(0, '#e8f6ff'); g.addColorStop(1, '#7a9ad8')
  x.fillStyle = g; x.beginPath(); x.arc(bx, by, rr, 0, Math.PI * 2); x.fill()
  const clear = clamp((t - T.last - 0.9) / 0.5)
  x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 4; i++) { const a = t * 1.6 + i * 1.57; x.globalAlpha = 0.75 * (1 - clear); x.fillStyle = '#4a3a7a'; x.fillText('?', bx + Math.cos(a) * 30, by + Math.sin(a) * 22) }
  x.globalAlpha = clear
  bits(x, ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'], { R: HOT.red }, bx - 21, by - 18, 6)
  x.globalAlpha = 1
  R(x, HOT.ink, bx - 46, by + rr - 4, 92, 24); R(x, '#8a5228', bx - 40, by + rr, 80, 14)
  x.restore()
}
const EP = hotEpisode({
  numeral: 'S12 E03', duration: 15, key: 'Am',
  take: { text: 'Talking stage over a | month? Just *ask.*', out: [2.5, 2.65] },
  heat: { level: 3, at: 0.5 },
  pro: { name: `${ARI.glyph}︎ ARIES`, color: ARI.color, glyph: ARI.glyph, textColor: '#ff9a7a', x: 260, y: 1090, size: 290, seed: 2, draw: (x, t, r) => horns(x, r) },
  con: { name: `${PIS.glyph}︎ PISCES`, color: PIS.color, glyph: PIS.glyph, textColor: '#b8a8ff', x: 820, y: 1090, size: 280, seed: 7,
    draw: (x, t, r, T) => ball(x, t, r, T) },
  lines: LINES,
  objection: OBJ,
  verdict: { at: VERDICT_AT, text: 'clarity is kind. | “what are we?” is a *fair question.*', out: [7.9, 8.1] },
  pill: { at: 7.95, dur: 0.5, pick: 'agree' },
  last: { at: LAST_AT, text: 'Ask *what are we.* | You’re allowed.', gap: 0.09 },
  moods: {
    pro: [[OBJ + 1.2, { mood: 'squint', look: [-1, -1] }], [LAST_AT + 0.9, { mood: 'heart', look: [1, 0] }]],
    con: [[0, { mood: 'sparkle', look: [-1, 0] }], [OBJ + 0.4, { mood: 'sparkle', look: [0, -1] }], [LAST_AT + 0.9, { mood: 'heart', look: [-1, 0] }]],
  },
  back: (x, t, T) => calendar(x, t, T),
  front(x, t, T, rp, rc) {
    bubbleTxt(x, 300, 1360, 'what are we?', T.last + 0.3, t, '#ffd0c0')
    bubbleTxt(x, 790, 1360, '…dating? ♡', T.last + 0.9, t, '#d8d0ff')
  },
  cues: [
    ...Array.from({ length: 11 }, (_, i) => ['tick', r3(0.75 * (i + 1) - 0.35), 0.02]).filter(c => c[1] < LAST_AT),
    ['pop', r3(LAST_AT + 0.3), 987.77, 0.035, -0.3], ['pluck', r3(LAST_AT + 0.9), 1318.51, 0.04, 0.5, 0.3], ['glitter', r3(LAST_AT + 0.9), r3(LAST_AT + 1.4)],
  ],
})
export const { SCENES, CUES, DURATION } = EP
