// st12splitbill — Star Talk S12 "Hot Takes" E02 (20 s vertical, music: funk · G). Story 0–15.6, then the end card.
//   0.00–2.85  🔥 HOT TAKE: "Splitting the bill on | date one is *fine.*"  ♎ Libra (left, smirking, its little brass
//              scales level) beside a date table with the bill on a tray, split down the middle: 50 | 50. HEAT 4/5.
//   2.95       LIBRA: "half and half. *balanced.* easy."
//   5.04       OBJECTION! (the drop) ♌ Leo (crown) slides in, slapping a pixel card on the tray.
//   5.3        LEO: "no! i'm *paying.* i insist!"  Libra's scales tip hard to Leo's side.
//   8.38       THE VERDICT: "talk about it. there's no rule, | just *respect.*"
//   12.27      AGREE / DISAGREE? (the cursor taps 🔥)
//   13.38      "Ask. Then *split* | or treat."  A speech bubble from Leo: "split?" Libra: "next one's on me ♡". The scales
//              settle level again. Rhymes with the start (the 50 | 50 bill, now with two hearts).
import { hotEpisode, HOT, rgba, clamp, prog, ease, easeOutBack, r3 } from '../../sthot.js'
import { signStar } from '../../startalk.js'

export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const LIB = signStar('libra'), LEO = signStar('leo')
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const bits = (x, rows, pal, px, py, s) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) R(x, pal[ch], px + i * s, py + j * s, s + 0.4, s + 0.4) }))
const MONO = "'Space Mono', ui-monospace, monospace"
const OBJ = BEAT(8), LAST_AT = BEAT(23)
const LINES = [
  { who: 'pro', t: 2.95, text: 'half and half. *balanced.* easy.' },
  { who: 'con', t: OBJ + 0.3, text: 'no! i’m *paying.* i insist!' },
]

const CROWN = ['K.K..K..K.K', 'KYK.KYK.KYK', 'KYYKYYYKYYK', 'KYRYYYYYRYK', 'KYYYYYYYYYK', 'KKKKKKKKKKK']
function crown(x, r) { const c = r.size / 36, s = c * 1.1; bits(x, CROWN, { K: HOT.ink, Y: HOT.gold, R: HOT.red }, r.x - 5.5 * s, r.top - 2 * s, s) }
function scales(x, cx, cy, s, tilt) {
  R(x, HOT.ink, cx - s, cy - 14 * s, 2 * s, 16 * s); R(x, '#d9a64a', cx - s * 0.5, cy - 14 * s, s, 15 * s)
  R(x, HOT.ink, cx - 5 * s, cy, 10 * s, 2 * s)
  x.save(); x.translate(cx, cy - 13 * s); x.rotate(tilt)
  R(x, HOT.ink, -11 * s, -s, 22 * s, 2 * s); R(x, HOT.gold, -11 * s, -s * 0.5, 22 * s, s)
  for (const sx of [-10, 10]) { x.save(); x.translate(sx * s, 0); x.rotate(-tilt); R(x, rgba(HOT.bone, 0.7), -0.25 * s, 0, 0.5 * s, 5 * s); R(x, HOT.ink, -4 * s, 5 * s, 8 * s, 2 * s); R(x, HOT.gold, -3.5 * s, 5 * s, 7 * s, 1.2 * s); x.restore() }
  x.restore()
}
function table(x, t, T) {
  // a little date table centre stage, the bill on a tray, split down the middle
  const cx = 540, ty = 1215
  R(x, HOT.ink, cx - 170, ty - 6, 340, 26); R(x, '#7a4a2a', cx - 164, ty, 328, 14); R(x, '#a86a3a', cx - 164, ty, 328, 4)
  R(x, HOT.ink, cx - 20, ty + 20, 40, 70); R(x, '#5a3420', cx - 14, ty + 20, 28, 70)
  // the bill
  const by = ty - 100
  R(x, HOT.ink, cx - 100, by - 6, 200, 102); R(x, '#fffbea', cx - 94, by, 188, 90)
  x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HOT.ink
  const leoCard = t >= T.obj + 0.15 && t < T.last
  const end = t >= T.last
  x.fillText(leoCard ? 'ALL ♌︎' : '50 | 50', cx, by + 30)
  if (end) { x.fillStyle = HOT.red; x.fillText('♡   ♡', cx, by + 66) } else { R(x, rgba(HOT.ink, 0.3), cx - 60, by + 64, 120, 4) }
  if (leoCard) {   // Leo's card slapped on the tray
    const p = easeOutBack(clamp((t - T.obj - 0.15) / 0.2), 2)
    x.save(); x.translate(cx + 120, by + 40); x.rotate(-0.25); x.scale(p, p)
    R(x, HOT.ink, -40, -24, 80, 50); R(x, HOT.gold, -36, -20, 72, 42); R(x, '#c9862a', -36, -8, 72, 8); R(x, '#fff6d8', -28, 6, 18, 10)
    x.restore()
  }
}
const EP = hotEpisode({
  numeral: 'S12 E02', duration: 20, key: 'G',
  take: { text: 'Splitting the bill on | date one is *fine.*', out: [2.7, 2.9] },
  heat: { level: 4, at: 0.55 },
  pro: { name: `${LIB.glyph}︎ LIBRA`, color: LIB.color, glyph: LIB.glyph, textColor: '#ffd0e6', x: 230, y: 1080, size: 280, seed: 5,
    draw(x, t, r, T) {
      const tilt = t < T.obj + 0.4 ? 0.04 * Math.sin(t * 2) : t < T.last ? 0.35 + 0.05 * Math.sin(t * 5) : 0.35 * Math.exp(-(t - T.last) * 3) * Math.cos((t - T.last) * 9)
      scales(x, r.x - 4, r.y - r.size * 0.62, 6, tilt)
    } },
  con: { name: `${LEO.glyph}︎ LEO`, color: LEO.color, glyph: LEO.glyph, textColor: '#ffb070', x: 850, y: 1080, size: 280, seed: 9, draw: (x, t, r) => crown(x, r) },
  lines: LINES,
  objection: OBJ,
  verdict: { at: BEAT(14), text: 'talk about it. there’s no rule, | just *respect.*' },
  pill: { at: BEAT(21), dur: 0.75, pick: 'agree' },
  last: { at: LAST_AT, text: 'Ask. Then *split* | or treat.' },
  moods: { con: [[LAST_AT + 0.3, { mood: 'neutral', look: [-1, 0] }], [LAST_AT + 1.2, { mood: 'heart', look: [-1, 0] }]], pro: [[LAST_AT + 1.2, { mood: 'heart', look: [1, 0] }]] },
  front(x, t, T) {
    table(x, t, T)
    // the ending bubbles: Leo asks, Libra offers the next one
    const bub = (bx, by, txt, at, col) => {
      if (t < at) return
      const p = easeOutBack(clamp((t - at) / 0.22), 2.4)
      x.save(); x.translate(bx, by); x.scale(p, p)
      x.font = `700 30px ${MONO}`; const w = x.measureText(txt).width + 36
      R(x, HOT.ink, -w / 2 - 4, -30, w + 8, 60); R(x, col, -w / 2, -26, w, 52)
      x.fillStyle = HOT.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
      x.restore()
    }
    bub(820, 860, 'split?', T.last + 0.5, '#ffd9a8')
    bub(290, 860, 'next one’s on me ♡', T.last + 1.1, '#ffd0e6')
  },
  cues: [
    ['pop', r3(OBJ + 0.15), 330, 0.05, 0.2], ['tick', r3(OBJ + 0.17), 0.06],
    ['pop', r3(LAST_AT + 0.5), 987.77, 0.035, 0.3], ['pop', r3(LAST_AT + 1.1), 1318.51, 0.035, -0.3], ['glitter', r3(LAST_AT + 1.2), r3(LAST_AT + 1.7)],
  ],
})
export const { SCENES, CUES, DURATION } = EP
void prog; void ease
