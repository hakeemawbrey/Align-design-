// st12exfriends — Star Talk S12 "Hot Takes" E04 (20 s vertical, music: screwed · C#m). Story 0–15.6, then the end card.
//   0.00–2.85  🔥 HOT TAKE (5/5, the meter shakes red): "Being friends with your | ex? Usually *no.*"  ♏ Scorpio (left,
//              mid-smirk) stands by a door at the back of the set, held open a crack; a bone star (the ex) peeks out, waving.
//   2.95       SCORPIO: "an ex is an ex. *door's closed.*"
//   5.04       OBJECTION! (the drop) ♒ Aquarius slides in, sweating, holding up a friendship bracelet.
//   5.3        AQUARIUS: "we're totally *fine!* we hug!"  The ex in the doorway waves harder; Aquarius sweats more.
//   8.38       THE VERDICT: "it can work when it's truly over | and your new partner is *comfortable.*"
//   12.27      AGREE / DISAGREE? (the cursor taps 🧊: this one's a split crowd)
//   13.38      "Closed doors. | *Then* friendship."  The door shuts (CLOSED sign swings); a beat later a little
//              FRIENDS? ♡ sign hangs on it. Scorpio and Aquarius nod. Rhymes with the start (the door).
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
const SCO = { ...signStar('scorpio'), color: '#9a5cf0' }, AQU = signStar('aquarius')
export const OBJ = BEAT(8)
export const VERDICT_AT = BEAT(14)
const LAST_AT = BEAT(23)
const LINES = [
  { who: 'pro', t: 2.95, text: 'an ex is an ex. *door’s closed.*' },
  { who: 'con', t: OBJ + 0.3, text: 'we’re totally *fine!* we hug!' },
]
function door(x, t, T) {
  const cx = 540, top = 700, w = 220, h = 420
  R(x, HOT.ink, cx - w / 2 - 14, top - 14, w + 28, h + 14); R(x, '#5a3a7a', cx - w / 2 - 8, top - 8, w + 16, h + 8)
  R(x, '#120a24', cx - w / 2, top, w, h)
  // how open the door is: a crack, wider at the objection, shut at the end
  const open = t < T.obj ? 0.32 : t < T.last ? 0.45 + 0.04 * Math.sin(t * 6) : 0.45 * (1 - ease.inCubic(prog(t, T.last + 0.1, T.last + 0.35)))
  // the ex peeking from the gap
  if (open > 0.05) {
    const wave = Math.sin(t * (t > T.obj ? 9 : 4))
    const ex = cx - w / 2 + w * open * 0.55
    x.save(); x.beginPath(); x.rect(cx - w / 2, top, w * open, h); x.clip()
    for (const k of [0, 1]) R(x, HOT.ink, ex - 46 + k * 52, top + 150, 34, 38)
    R(x, '#efe6d6', ex - 60, top + 120, 120, 120); R(x, HOT.ink, ex - 30, top + 160, 12, 18); R(x, HOT.ink, ex + 10, top + 160, 12, 18)
    R(x, '#ff9ab8', ex - 40, top + 190, 14, 8); R(x, '#ff9ab8', ex + 26, top + 190, 14, 8)
    x.restore()
    // the waving hand
    x.save(); x.translate(cx - w / 2 + w * open + 14, top + 150); x.rotate(0.4 * wave); R(x, HOT.ink, -10, -40, 20, 46); R(x, '#efe6d6', -6, -36, 12, 38); x.restore()
  }
  // the door leaf (hinged on the right, swinging inward = shrinking toward the right)
  const lw = w * (1 - open)
  R(x, HOT.ink, cx + w / 2 - lw - 4, top, lw + 4, h); R(x, '#8a5228', cx + w / 2 - lw, top + 4, lw - 4, h - 4)
  if (lw > 60) { R(x, '#a86a3a', cx + w / 2 - lw + 18, top + 30, lw - 40, 150); R(x, '#a86a3a', cx + w / 2 - lw + 18, top + 220, lw - 40, 170); R(x, HOT.gold, cx + w / 2 - lw + 14, top + 220, 14, 14) }
  // the signs at the end
  const sign = (txt, at, y, col) => {
    if (t < at) return
    const sw = Math.sin((t - at) * 8) * 0.25 * Math.exp(-(t - at) * 2.5)
    x.save(); x.translate(cx, y); x.rotate(sw)
    x.font = `700 30px ${MONO}`; const tw = x.measureText(txt).width + 34
    R(x, HOT.ink, -2, -40, 4, 30); R(x, HOT.ink, -tw / 2 - 4, -12, tw + 8, 58); R(x, col, -tw / 2, -8, tw, 50)
    x.fillStyle = HOT.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 17)
    x.restore()
  }
  sign('CLOSED', T.last + 0.35, top + 60, '#ff8a8a')
  sign('FRIENDS? ♡', T.last + 1.0, top + 200, '#b6f0a0')
}
function bracelet(x, t, r) {
  const c = r.size / 36, bx = r.x - 15 * c, by = r.y + 3 * c
  const cols = ['#ff8fc8', HOT.gold, '#7fe0ff', '#b6f0a0', '#c9a6ff']
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t; R(x, HOT.ink, bx + Math.cos(a) * 34 - 9, by + Math.sin(a) * 22 - 9, 18, 18); R(x, cols[i % 5], bx + Math.cos(a) * 34 - 6, by + Math.sin(a) * 22 - 6, 12, 12) }
}
const EP = hotEpisode({
  numeral: 'S12 E04', duration: 20, key: 'C#m',
  take: { text: 'Being friends with your | ex? Usually *no.*', out: [2.7, 2.9] },
  heat: { level: 5, at: 0.5 },
  pro: { name: `${SCO.glyph}︎ SCORPIO`, color: SCO.color, glyph: SCO.glyph, textColor: '#d88cff', x: 230, y: 1090, size: 280, seed: 8 },
  con: { name: `${AQU.glyph}︎ AQUARIUS`, color: AQU.color, glyph: AQU.glyph, textColor: '#9fe8ff', x: 850, y: 1090, size: 280, seed: 4,
    draw(x, t, r, T) { if (t < T.last) bracelet(x, t, r); sweat(x, t, r, t < T.verdict ? 1 : 0) } },
  lines: LINES,
  objection: OBJ,
  verdict: { at: VERDICT_AT, text: 'it can work when it’s truly over | and your new partner is *comfortable.*' },
  pill: { at: BEAT(21), dur: 0.75, pick: 'disagree' },
  last: { at: LAST_AT, text: 'Closed doors. | *Then* friendship.' },
  moods: {
    con: [[OBJ + 0.4, { mood: 'happy', look: [-1, 0] }], [LAST_AT + 0.4, { mood: 'wide', look: [-1, -1], blink: false }], [LAST_AT + 1.2, { mood: 'happy', look: [-1, 0] }]],
    pro: [[LAST_AT + 0.4, { mood: 'wink', look: [1, 0] }], [LAST_AT + 1.2, { mood: 'happy', look: [1, 0] }]],
  },
  back: (x, t, T) => door(x, t, T),
  cues: [
    ['whoosh', r3(LAST_AT + 0.1), 0.3, 0.05], ['boom', r3(LAST_AT + 0.35), 0.3], ['tick', r3(LAST_AT + 0.36), 0.08],
    ['pop', r3(LAST_AT + 0.35), 440, 0.04, 0], ['pluck', r3(LAST_AT + 1.0), 1318.51, 0.04, 0.5, 0], ['glitter', r3(LAST_AT + 1.0), r3(LAST_AT + 1.5)],
  ],
})
export const { SCENES, CUES, DURATION } = EP
