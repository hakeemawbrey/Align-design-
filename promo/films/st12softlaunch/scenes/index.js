// st12softlaunch — Star Talk S12 "Hot Takes" E07 (15 s vertical, music: synthwave · F#m). Story 0–10.6, then the end card.
//   0.00–2.6   🔥 HOT TAKE (2/5, a mild one): "Soft launches are *fine.* | Hard launch when sure."  ♊ Gemini (left,
//              mid-smirk) holds up a big phone with its soft-launch post: two cups and one mystery hand. "♡ 24"
//   2.6        OBJECTION! (the drop) ♌ Leo (crown) bursts in.
//   2.9        LEO: "POST THEM. *NOW.*"  Leo's own phone flashes like a paparazzi camera.
//   5.05       THE VERDICT: "post when you're both ready. | privacy isn't *secrecy.*"
//   7.95       AGREE / DISAGREE? (the cursor taps 🔥)
//   8.6        "Your love, | your *timeline.*"  Gemini's post updates: two little stars side by side, caption "when we're
//              ready ♡". Leo goes heart-eyed. Rhymes with the start (the post).
import { hotEpisode, HOT, rgba, clamp, easeOutBack, r3 } from '../../sthot.js'
import { signStar } from '../../startalk.js'
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const bits = (x, rows, pal, px, py, s) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) R(x, pal[ch], px + i * s, py + j * s, s + 0.4, s + 0.4) }))
const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
function bubbleTxt(x, bx, by, txt, at, t, col, size = 32) {
  if (t < at) return
  const p = easeOutBack(clamp((t - at) / 0.22), 2.4)
  x.save(); x.translate(bx, by); x.scale(p, p)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 36, h = size * 2
  R(x, HOT.ink, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, col, -w / 2, -h / 2, w, h)
  R(x, HOT.ink, -12, -h / 2 - 16, 24, 14); R(x, col, -8, -h / 2 - 12, 16, 14)
  x.fillStyle = HOT.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
  x.restore()
}
const CROWN = ['K.K..K..K.K', 'KYK.KYK.KYK', 'KYYKYYYKYYK', 'KYRYYYYYRYK', 'KYYYYYYYYYK', 'KKKKKKKKKKK']
function crown(x, r) { const c = r.size / 36, s = c * 1.1; bits(x, CROWN, { K: HOT.ink, Y: HOT.gold, R: HOT.red }, r.x - 5.5 * s, r.top - 2 * s, s) }
function sweat(x, t, r, k = 1) {
  if (k <= 0) return
  const c = r.size / 36
  for (let i = 0; i < 2; i++) { const ph = (t * 1.3 + i * 0.5) % 1; x.save(); x.globalAlpha *= k * (1 - ph); bits(x, ['.K.', 'KCK', 'KCK', '.K.'], { K: HOT.ink, C: '#9fe8ff' }, r.x + (i ? -11 : 9) * c, r.y - 9 * c + ph * 8 * c, c * 1.3); x.restore() }
}
const GEM = signStar('gemini'), LEO = signStar('leo')
export const OBJ = 2.62
export const VERDICT_AT = 5.05
const LAST_AT = 8.6
const LINES = [{ who: 'con', t: OBJ + 0.28, text: 'POST THEM. *NOW.*' }]
function cup(x, cx, cy, s, col) { R(x, HOT.ink, cx - 5 * s, cy - 6 * s, 10 * s, 12 * s); R(x, col, cx - 4 * s, cy - 5 * s, 8 * s, 10 * s); R(x, HOT.ink, cx + 4 * s, cy - 3 * s, 3 * s, 5 * s); R(x, '#fff6d8', cx - 4 * s, cy - 5 * s, 8 * s, 2 * s) }
function post(x, t, r, T) {
  const cx = r.x + r.size * 0.92, cy = r.y - 10, w = 250, h = 360
  x.save(); x.translate(cx, cy); x.rotate(0.08 + 0.02 * Math.sin(t * 2))
  R(x, HOT.ink, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16); R(x, '#2a1a4a', -w / 2, -h / 2, w, h)
  R(x, '#efe6d6', -w / 2 + 14, -h / 2 + 40, w - 28, w - 28)
  x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = HOT.bone; x.fillText('@gemini', -w / 2 + 16, -h / 2 + 22)
  const end = t >= T.last + 0.6
  const pic = -h / 2 + 40 + (w - 28) / 2
  if (!end) {
    R(x, '#ffd9a8', -w / 2 + 14, pic + 10, w - 28, (w - 28) / 2 - 10)
    cup(x, -40, pic + 14, 5, '#c98a4a'); cup(x, 40, pic + 14, 5, '#ff8fb1')
    // the mystery hand reaching in from the edge
    R(x, HOT.ink, w / 2 - 14 - 70, pic - 50, 70, 30); R(x, '#ffc08a', w / 2 - 14 - 66, pic - 46, 66, 22)
    x.fillStyle = HOT.ink; x.font = `700 22px ${MONO}`; x.fillText('coffee for two ;)', -w / 2 + 16, h / 2 - 54)
  } else {
    const p = easeOutBack(clamp((t - T.last - 0.6) / 0.3), 2)
    R(x, '#3a2a6a', -w / 2 + 14, -h / 2 + 40, w - 28, w - 28)
    x.save(); x.translate(0, pic); x.scale(p, p)
    for (const [dx, col] of [[-44, GEM.color], [44, '#9fe8ff']]) bits(x, ['...K...', '..KYK..', 'KKKYKKK', 'KYYYYYK', '.KYYYK.', 'KYK.KYK', 'KK...KK'], { K: HOT.ink, Y: col }, dx - 24, -24, 7)
    bits(x, ['.R.R.', 'RRRRR', '.RRR.', '..R..'], { R: '#ff5d8a' }, -10, -60, 4)
    x.restore()
    x.fillStyle = HOT.ink; x.font = `700 20px ${MONO}`; x.fillText('when we’re ready ♡', -w / 2 + 16, h / 2 - 54)
  }
  x.fillStyle = '#ff8fb1'; x.font = `700 22px ${MONO}`; x.fillText(end ? '♡ 212' : '♡ 24', -w / 2 + 16, h / 2 - 22)
  x.restore()
}
function flash(x, t, r, T) {
  if (t < T.obj + 0.3 || t > T.verdict) return
  const ph = (t - T.obj) % 0.45
  if (ph < 0.08) {
    x.save(); x.globalAlpha = 1 - ph / 0.08
    const g = x.createRadialGradient(r.x - r.size * 0.5, r.y - 40, 0, r.x - r.size * 0.5, r.y - 40, 260); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = g; x.fillRect(r.x - r.size * 0.5 - 260, r.y - 300, 520, 520); x.restore()
  }
  const px = r.x - r.size * 0.5, py = r.y - 30
  R(x, HOT.ink, px - 34, py - 52, 68, 104); R(x, '#3a2a5a', px - 28, py - 46, 56, 92); R(x, '#fffbea', px - 10, py - 40, 20, 14)
}
const EP = hotEpisode({
  numeral: 'S12 E07', duration: 15, key: 'F#m',
  take: { text: 'Soft launches are *fine.* | Hard launch when sure.', out: [2.5, 2.65], size: 96 },
  heat: { level: 2, at: 0.5 },
  pro: { name: `${GEM.glyph}︎ GEMINI`, color: GEM.color, glyph: GEM.glyph, textColor: '#ffe27a', x: 170, y: 1090, size: 270, seed: 4, draw: post },
  con: { name: `${LEO.glyph}︎ LEO`, color: LEO.color, glyph: LEO.glyph, textColor: '#ffb070', x: 860, y: 1090, size: 280, seed: 9,
    draw(x, t, r, T) { crown(x, r); flash(x, t, r, T) } },
  lines: LINES,
  objection: OBJ,
  verdict: { at: VERDICT_AT, text: 'post when you’re both ready. | privacy isn’t *secrecy.*', out: [7.9, 8.1] },
  pill: { at: 7.95, dur: 0.5, pick: 'agree' },
  last: { at: LAST_AT, text: 'Your love, | your *timeline.*', gap: 0.1 },
  moods: {
    con: [[OBJ + 0.4, { mood: 'squint', look: [-1, 0] }], [LAST_AT + 0.9, { mood: 'heart', look: [-1, 0] }]],
    pro: [[OBJ + 1.2, { mood: 'eyeroll' }], [OBJ + 2.0, { mood: 'squint', look: [1, 0] }], [LAST_AT + 0.9, { mood: 'happy', look: [1, 0] }]],
  },
  cues: [
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(OBJ + 0.3 + i * 0.45), 0.05]),
    ['pluck', r3(LAST_AT + 0.6), 1318.51, 0.04, 0.5, -0.3], ['glitter', r3(LAST_AT + 0.6), r3(LAST_AT + 1.1)], ['pop', r3(LAST_AT + 0.9), 1567.98, 0.03, 0.3],
  ],
})
export const { SCENES, CUES, DURATION } = EP
