// st12lovelangs — Star Talk S12 "Hot Takes" E05 (20 s vertical, music: pop · D). Story 0–15.6, then the end card.
//   0.00–2.85  🔥 HOT TAKE: "Love languages aren't | a *personality.*"  ♍ Virgo (left, the season 2 clipboard, mid-smirk);
//              on the wall a big "MY ENTIRE PERSONALITY:" frame with a single sticky note in it. HEAT 3/5.
//   2.95       VIRGO: "it's a *preference,* not a whole bio."  Virgo ticks the clipboard.
//   5.04       OBJECTION! (the drop) ♌ Leo (crown) slides in wearing a WORDS OF AFFIRMATION sash.
//   5.3        LEO: "words of affirmation *IS* me."  Stickers rain onto the frame: ★ GREAT, ★ ICONIC, ★ YES.
//   8.38       THE VERDICT: "they're a starting point. | ask your person what *lands.*"
//   12.27      AGREE / DISAGREE? (the cursor taps 🔥)
//   13.38      "Ask. | Don't *assume.*"  Leo turns to Virgo: "what lands for you?" Virgo: "do the dishes ♡". The frame's
//              note flips to "ASK ME ♡". Rhymes with the start (the frame).
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
const VIR = signStar('virgo'), LEO = signStar('leo')
export const OBJ = BEAT(8)
export const VERDICT_AT = BEAT(14)
const LAST_AT = BEAT(23)
const LINES = [
  { who: 'pro', t: 2.95, text: 'it’s a *preference,* not a whole bio.' },
  { who: 'con', t: OBJ + 0.3, text: 'words of affirmation *IS* me.' },
]
function clipboard(x, t, r, T) {
  const c = r.size / 36, bx = r.x + 14 * c, by = r.y + 2 * c, s = c * 0.9
  x.save(); x.translate(bx, by); x.rotate(-0.12)
  R(x, HOT.ink, -12 * s, -15 * s, 24 * s, 30 * s); R(x, '#a86a3a', -11 * s, -14 * s, 22 * s, 28 * s); R(x, '#fffbea', -9 * s, -10 * s, 18 * s, 23 * s)
  R(x, HOT.ink, -4 * s, -16 * s, 8 * s, 4 * s); R(x, '#c9d2e8', -3 * s, -15 * s, 6 * s, 2 * s)
  for (let i = 0; i < 4; i++) {
    R(x, HOT.ink, -7 * s, (-7 + i * 5) * s, 3 * s, 3 * s); R(x, rgba(HOT.ink, 0.4), -2 * s, (-6.5 + i * 5) * s, 9 * s, 1.5 * s)
    const at = 3.3 + i * 0.35
    if (t > at) R(x, '#2fa84a', -7 * s, (-7 + i * 5) * s, 3 * s, 3 * s)
  }
  x.restore()
}
function frame(x, t, T) {
  const cx = 540, cy = 790, w = 440, h = 240
  R(x, HOT.ink, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28); R(x, HOT.gold, cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16); R(x, '#2a1a44', cx - w / 2, cy - h / 2, w, h)
  x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HOT.gold
  x.fillText('MY ENTIRE PERSONALITY:', cx, cy - h / 2 + 30)
  const note = (nx, ny, txt, col, rot, at, sz = 26) => {
    if (t < at) return
    const p = easeOutBack(clamp((t - at) / 0.2), 2.2)
    x.save(); x.translate(nx, ny); x.rotate(rot); x.scale(p, p)
    x.font = `700 ${sz}px ${MONO}`; const tw = x.measureText(txt).width + 28
    R(x, HOT.ink, -tw / 2 - 3, -25, tw + 6, 50); R(x, col, -tw / 2, -22, tw, 44)
    x.fillStyle = HOT.ink; x.fillText(txt, 0, 1); x.restore()
  }
  if (t < T.last + 0.5) note(cx, cy + 30, 'WORDS OF AFFIRMATION', '#ffe27a', -0.03, -1, 22)
  else note(cx, cy + 30, 'ASK ME ♡', '#b6f0a0', 0.03, T.last + 0.5, 34)
  if (t >= T.obj + 0.4 && t < T.last + 0.5) {
    note(cx - 140, cy - 40, '★ GREAT', '#ff8fc8', -0.2, T.obj + 0.5)
    note(cx + 140, cy - 30, '★ ICONIC', '#7fe0ff', 0.15, T.obj + 0.8)
    note(cx + 120, cy + 90, '★ YES', '#ffb070', -0.1, T.obj + 1.1)
    note(cx - 130, cy + 90, '★ WOW', '#c9a6ff', 0.12, T.obj + 1.4)
  }
}
function sash(x, t, r) {
  const c = r.size / 36
  x.save(); x.translate(r.x, r.y + 3 * c); x.rotate(-0.55)
  R(x, HOT.ink, -16 * c, -2.4 * c, 32 * c, 4.8 * c); R(x, '#ff5d8a', -16 * c, -1.8 * c, 32 * c, 3.6 * c)
  x.font = `700 ${Math.round(c * 2.4)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fffbea'; x.fillText('WORDS', 0, 0.1 * c)
  x.restore()
}
const EP = hotEpisode({
  numeral: 'S12 E05', duration: 20, key: 'D',
  take: { text: 'Love languages aren’t | a *personality.*', out: [2.7, 2.9] },
  heat: { level: 3, at: 0.55 },
  pro: { name: `${VIR.glyph}︎ VIRGO`, color: VIR.color, glyph: VIR.glyph, textColor: '#b6f0a0', x: 240, y: 1090, size: 280, seed: 3, draw: clipboard },
  con: { name: `${LEO.glyph}︎ LEO`, color: LEO.color, glyph: LEO.glyph, textColor: '#ffb070', x: 840, y: 1090, size: 290, seed: 9,
    draw(x, t, r) { sash(x, t, r); crown(x, r) } },
  lines: LINES,
  objection: OBJ,
  verdict: { at: VERDICT_AT, text: 'they’re a starting point. | ask your person what *lands.*' },
  pill: { at: BEAT(21), dur: 0.75, pick: 'agree' },
  last: { at: LAST_AT, text: 'Ask. | Don’t *assume.*' },
  moods: {
    con: [[OBJ + 0.4, { mood: 'sparkle', look: [0, -1] }], [LAST_AT + 0.3, { mood: 'neutral', look: [-1, 0] }], [LAST_AT + 1.2, { mood: 'heart', look: [-1, 0] }]],
    pro: [[LAST_AT + 1.2, { mood: 'heart', look: [1, 0] }]],
  },
  back: (x, t, T) => frame(x, t, T),
  front(x, t, T) {
    bubbleTxt(x, 810, 1360, 'what lands for you?', T.last + 0.3, t, '#ffd9a8', 28)
    bubbleTxt(x, 270, 1360, 'do the dishes ♡', T.last + 1.0, t, '#c8f0b8', 28)
  },
  cues: [
    ...[0, 1, 2, 3].map(i => ['tick', r3(3.3 + i * 0.35), 0.04]),
    ...[0.5, 0.8, 1.1, 1.4].map((d, i) => ['pop', r3(OBJ + d), [1174.66, 1318.51, 987.77, 1479.98][i], 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['pop', r3(LAST_AT + 0.3), 987.77, 0.035, 0.3], ['pluck', r3(LAST_AT + 0.5), 1174.66, 0.04, 0.5, 0], ['pop', r3(LAST_AT + 1.0), 1318.51, 0.035, -0.3], ['glitter', r3(LAST_AT + 1.0), r3(LAST_AT + 1.5)],
  ],
})
export const { SCENES, CUES, DURATION } = EP
