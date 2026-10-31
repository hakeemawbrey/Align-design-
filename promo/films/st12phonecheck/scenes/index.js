// st12phonecheck — Star Talk S12 "Hot Takes" E06 (20 s vertical, music: screwed · Bbm). Story 0–15.6, then the end card.
//   0.00–2.85  🔥 HOT TAKE: "Checking their phone | is *never* okay."  ♉ Taurus (left, little horns, mid-smirk) sits by a
//              small table where a phone lies FACE DOWN, buzzing now and then. HEAT 4/5.
//   2.95       TAURUS: "their phone. their *privacy.* hands off."
//   5.04       OBJECTION! (the drop) a nervous bone star scoots in, sweating, one pixel hand creeping toward the phone.
//   5.3        NERVOUS STAR: "but what *if…*"  The phone buzzes; the hand freezes; Taurus slides the phone back. Tense beat.
//   8.38       THE VERDICT: "if you feel you need to snoop, | talk about the *trust* instead."
//   12.27      AGREE / DISAGREE? (the cursor taps 🔥)
//   13.38      "Trust is *talked,* | not tapped."  The hand pulls back; the nervous star: "can we talk?" Taurus (soft):
//              "always ♡". The phone stays face down, now with a heart sticker. Rhymes with the start (the phone).
import { hotEpisode, HOT, rgba, clamp, easeOutBack, ease, prog, r3 } from '../../sthot.js'
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
const TAU = signStar('taurus')
export const OBJ = BEAT(8)
export const VERDICT_AT = BEAT(14)
const LAST_AT = BEAT(23)
const LINES = [
  { who: 'pro', t: 2.95, text: 'their phone. their *privacy.* hands off.' },
  { who: 'con', t: OBJ + 0.3, text: 'but what *if…*' },
]
const HORN = ['KK...', 'KWK..', '.KWK.', '.KWWK', '..KKK']
function horns(x, r) {
  const c = r.size / 36, s = c * 1.1
  bits(x, HORN, { K: HOT.ink, W: '#f6e2c0' }, r.x - 11 * s, r.top + 6 * s, s)
  bits(x, HORN.map(row => [...row].reverse().join('')), { K: HOT.ink, W: '#f6e2c0' }, r.x + 6 * s, r.top + 6 * s, s)
}
const BUZZ = [1.2, 3.9, 6.9, 7.6]
function table(x, t, T) {
  const cx = 540, ty = 1200
  R(x, HOT.ink, cx - 150, ty - 6, 300, 26); R(x, '#5a6a8a', cx - 144, ty, 288, 14); R(x, '#7a8aaa', cx - 144, ty, 288, 4)
  R(x, HOT.ink, cx - 20, ty + 20, 40, 80); R(x, '#3a4a6a', cx - 14, ty + 20, 28, 80)
  // the phone, face down
  const buzz = BUZZ.some(b => t > b && t < b + 0.4) && t < T.verdict ? Math.sin(t * 90) * 4 : 0
  const slideBack = t > 7.0 && t < T.verdict ? -30 * ease.outCubic(prog(t, 7.0, 7.3)) : t >= T.verdict ? -30 : 0
  const px = cx + buzz + slideBack, py = ty - 22
  R(x, HOT.ink, px - 100, py - 22, 200, 44); R(x, '#3a2a5a', px - 94, py - 16, 188, 32); R(x, '#6a5a8a', px + 56, py - 10, 20, 20); R(x, rgba('#ffffff', 0.2), px - 94, py - 16, 188, 5)
  if (buzz) for (const k of [-1, 1]) R(x, rgba(HOT.bone, 0.7), px + k * 90 - 4, py - 20, 8, 30)
  if (t >= T.last + 1.0) { const p = easeOutBack(clamp((t - T.last - 1.0) / 0.25), 2.4); x.save(); x.translate(px - 20, py - 2); x.scale(p, p); bits(x, ['.RR.RR.', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'], { R: '#ff5d8a' }, -14, -10, 4); x.restore() }
  return { px, py }
}
function hand(x, t, r, T, ph) {
  // the nervous star's creeping hand: out on the objection, frozen by the buzz, pulled back at the end
  const reach = t < T.obj + 0.4 ? 0 : t < 6.9 ? ease.inOutQuad(prog(t, T.obj + 0.4, 6.9)) * 0.85 : t < T.last ? 0.85 : 0.85 * (1 - ease.outCubic(prog(t, T.last + 0.1, T.last + 0.5)))
  if (reach <= 0.01 || !ph) return
  const sx = r.x - r.size * 0.36, sy = r.y + r.size * 0.12
  const ex = sx + (ph.px + 100 - sx) * reach, ey = sy + (ph.py - 20 - sy) * reach
  const shake = t > 6.9 && t < 7.4 ? Math.sin(t * 70) * 3 : 0
  x.save(); x.strokeStyle = HOT.ink; x.lineWidth = 18; x.lineCap = 'round'
  x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex + shake, ey); x.stroke()
  x.strokeStyle = '#efe6d6'; x.lineWidth = 10; x.stroke()
  x.restore()
  R(x, HOT.ink, ex - 14 + shake, ey - 14, 28, 28); R(x, '#efe6d6', ex - 10 + shake, ey - 10, 20, 20)
}
let PH = null
const EP = hotEpisode({
  numeral: 'S12 E06', duration: 20, key: 'Bbm',
  take: { text: 'Checking their phone | is *never* okay.', out: [2.7, 2.9] },
  heat: { level: 4, at: 0.55 },
  pro: { name: `${TAU.glyph}︎ TAURUS`, color: TAU.color, glyph: TAU.glyph, textColor: '#b6f0a0', x: 220, y: 1090, size: 280, seed: 6, draw: (x, t, r) => horns(x, r) },
  con: { name: 'NERVOUS STAR', color: '#efe6d6', glyph: null, textColor: '#9fe8ff', x: 860, y: 1090, size: 260, seed: 11,
    draw(x, t, r, T) { hand(x, t, r, T, PH); sweat(x, t, r, t < T.last + 0.5 ? 1 : 0) } },
  lines: LINES,
  objection: OBJ,
  verdict: { at: VERDICT_AT, text: 'if you feel you need to snoop, | talk about the *trust* instead.' },
  pill: { at: BEAT(21), dur: 0.75, pick: 'agree' },
  last: { at: LAST_AT, text: 'Trust is *talked,* | not tapped.' },
  moods: {
    con: [[OBJ + 0.4, { mood: 'wide', look: [-1, 1], blink: false }], [6.9, { mood: 'wide', look: [-1, 1], blink: false, sq: -0.08 }], [7.5, { mood: 'squint', look: [-1, 1] }], [LAST_AT + 0.4, { mood: 'neutral', look: [-1, 0] }], [LAST_AT + 1.2, { mood: 'happy', look: [-1, 0] }]],
    pro: [[6.9, { mood: 'squint', look: [1, 1] }], [LAST_AT + 1.0, { mood: 'happy', look: [1, 0] }]],
  },
  back(x, t, T) { PH = table(x, t, T) },
  front(x, t, T) {
    bubbleTxt(x, 820, 1360, 'can we talk?', T.last + 0.4, t, '#d0f0ff')
    bubbleTxt(x, 250, 1360, 'always ♡', T.last + 1.0, t, '#c8f0b8')
  },
  cues: [
    ...BUZZ.flatMap(b => [0, 0.08, 0.16, 0.24].map(d => ['tick', r3(b + d), 0.03])),
    ['pop', 6.9, 330, 0.04, 0.3], ['whoosh', 7.0, 0.3, 0.03],
    ['pop', r3(LAST_AT + 0.4), 987.77, 0.035, 0.3], ['pluck', r3(LAST_AT + 1.0), 1318.51, 0.04, 0.5, -0.3], ['glitter', r3(LAST_AT + 1.0), r3(LAST_AT + 1.5)],
  ],
})
export const { SCENES, CUES, DURATION } = EP
