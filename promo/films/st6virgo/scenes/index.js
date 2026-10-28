// st6virgo (90 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 06) · story 0–85.6, then the shared end card.
//   A documentary profile of Virgo, the long, tender one (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  VIRGO, pencil tucked behind its point, fixing the light: "sorry, one sec. just fixing the lighting. *okay.*"
//   TITLE      BEHIND THE SIGN · ♍ VIRGO · *the fixer.* · EARTH · MUTABLE · RULED BY MERCURY / THE MAIDEN · AUG 23 – SEP 22
//   I MYTH     archive footage, three tableaux: Astraea with her scales, goddess of justice; the people turn cruel and the
//              gods leave, she stays longest; one story says she rose into the sky as Virgo; others link Virgo to Demeter
//              and the harvest (a wheat field, a sheaf).
//   II SKY     the real figure (β · η · Porrima · δ · Vindemiatrix, Spica, ζ · τ · 109, ι · μ). Spica labelled: "ear of
//              grain", the wheat in her hand. Virgo is the largest zodiac constellation. VIRGO: "more room for *lists.*"
//   III CLOSE  why it fixes ("if it's perfect, nobody *leaves.*"), how it loves (it notices), Pisces cutaway, what scares
//              it, then the season-3 checklist comes back with one new item written in: "let them see me tired". What it
//              wishes someone asked: "want me to take a turn?"
//   TAKEAWAY   "I'm not a project either. *Love* me unfinished."
//   The ghost peeks over the top of the clipboard.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, monoText, KID, KID_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const ASTRAEA = [          // the goddess holding up her scales
  '.....s........',
  'sssssssssss...',
  's....s....s...',
  's....s....s...',
  'kkk..s...kkk..',
  '.....s.hhh....',
  '.....shSSSh...',
  '.....shSESh...',
  '.....shSSSh...',
  '.....SDDDDDD..',
  '......DDDDDDS.',
  '......DDDDD...',
  '.....DDDDDDD..',
  '....DDDDDDDDD.',
  '...DDDDDDDDDDD',
  '...DDDDDDDDDDD',
]
const ASTRAEA_C = { k: '#c8963e', s: '#c8963e', h: '#d9b24a', S: '#e8b48a', E: '#2a1a12', D: '#f3ead8' }
const WHEAT = ['.g.', 'ggg', '.g.', 'ggg', '.g.', '.s.', '.s.', '.s.', '.s.']
const WHEAT_C = { g: '#e0b24a', s: '#a8862e' }
const SHEAF = ['g.g.g.g.g', 'ggggggggg', '.g.g.g.g.', 'g.ggggg.g', '..sssss..', '...sss...', '..bbbbb..', '...sss...', '..s.s.s..', '.s..s..s.', 's...s...s']
const SHEAF_C = { g: '#e0b24a', s: '#a8862e', b: '#8a5a2c' }
const PENCIL = ['pYYYYYYw.', 'pYYYYYYwk', 'pYYYYYYw.']
const PENCIL_C = { p: '#ff8fb1', Y: '#f7c948', w: '#f0d6a8', k: '#2a1a12' }

function ground(ctx, P, col = '#7a6a52') {
  ctx.fillStyle = col; ctx.fillRect(P.x0, 1160, P.x1 - P.x0, P.y1 - 1160)
  ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1156 + ((xx / 24) % 2) * 4, 12, 8)
}
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // Astraea among the people, scales level; then the people turn away and walk off
    ground(ctx, P)
    drawBits(ctx, ASTRAEA, ASTRAEA_C, 540, 1050, 14)
    const leave = ease.inQuad(clamp((t - tabAt - 4.0) / 3.0))
    ;[[-300, 0], [-200, 1], [220, 2], [320, 3]].forEach(([dx, i]) => {
      const side = Math.sign(dx), xx = 540 + dx + side * leave * 400
      drawBits(ctx, KID, { ...KID_C, T: ['#d8c6e8', '#c8d8b8', '#e8c8b0', '#c8d0e8'][i] }, Math.round(xx), 1120 + Math.round(Math.abs(Math.sin(t * 6 + i)) * -4 * leave), 11, { flip: side > 0 ? leave < 0.05 : leave >= 0.05 })
    })
  } else if (tab === 1) {
    // she is the last to go: she rises, the stars gather round her
    ground(ctx, P)
    const p = ease.inOutQuad(clamp((t - tabAt) / 3))
    drawBits(ctx, ASTRAEA, ASTRAEA_C, 540, Math.round(lerp(1050, 820, p)), 14)
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2 + t * 0.4, R = lerp(300, 200, p)
      ctx.save(); ctx.globalAlpha *= p; drawPixelStar(ctx, 540 + Math.cos(a) * R, 820 + Math.sin(a) * R * 0.8, 24 + (i % 3) * 6, i % 2, '#fff1c8', '#ffffff'); ctx.restore()
    }
  } else {
    // Demeter's harvest: a wheat field, a sheaf
    ground(ctx, P, '#8a7a4a')
    for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) {
      const xx = P.x0 + 30 + i * 72 + r * 24, sway = Math.round(Math.sin(t * 2 + i * 0.7 + r) * 3)
      drawBits(ctx, WHEAT, WHEAT_C, xx + sway, 1110 + r * 50, 10, { outline: null })
    }
    drawBits(ctx, SHEAF, SHEAF_C, 540, 930, 20)
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    // her scales glint gold
    ctx.save(); ctx.globalAlpha *= 0.8
    drawBits(ctx, ASTRAEA.slice(0, 5).map(r => r.replace(/[^ks]/g, '.')).concat(Array(11).fill('..............')), { k: '#f7cf68', s: '#f7cf68' }, 540, 1050, 14, { outline: null })
    ctx.restore()
  } else if (tab === 2) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(540, 930, 0, 540, 930, 200)
    g.addColorStop(0, 'rgba(240,190,80,0.35)'); g.addColorStop(1, 'rgba(240,190,80,0)')
    ctx.fillStyle = g; ctx.fillRect(340, 730, 400, 400); ctx.restore()
  }
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'spica', ra: 13.4199, dec: -11.16, mag: 0.97 },
  { id: 'porrima', ra: 12.6943, dec: -1.45, mag: 2.74 },
  { id: 'vindemiatrix', ra: 13.0363, dec: 10.96, mag: 2.8 },
  { id: 'delta', ra: 12.9268, dec: 3.40, mag: 3.4 },
  { id: 'zeta', ra: 13.5783, dec: -0.60, mag: 3.4 },
  { id: 'beta', ra: 11.8448, dec: 1.77, mag: 3.6 },
  { id: 'eta', ra: 12.3317, dec: -0.67, mag: 3.9 },
  { id: 'theta', ra: 13.1658, dec: -5.54, mag: 4.4 },
  { id: 'iota', ra: 14.2669, dec: -6.00, mag: 4.1 },
  { id: 'mu', ra: 14.7177, dec: -5.66, mag: 3.9 },
  { id: 'tau', ra: 14.0274, dec: 1.54, mag: 4.3 },
  { id: 'v109', ra: 14.7707, dec: 1.89, mag: 3.7 },
]
function skyExtras(ctx, t, { at, pos }) {
  const s = pos('spica'), p = ease.outCubic(prog(t, at + 2.0, at + 2.5))
  if (p <= 0) return
  ctx.save(); ctx.globalAlpha *= p
  drawBits(ctx, WHEAT, WHEAT_C, Math.round(s.x + 60), Math.round(s.y - 24), 8, { rot: 0.3 })
  ctx.restore()
}

// ── the checklist (season 3) comes back, with one new item
const ROWS = [['v', 'fix the lighting'], ['v', 'reply to everyone'], ['v', 're-fold the towels'], ['v', 'be fine']]
const NEW = 'let them see me tired'
const MARK = { v: ['.....X', '....XX', 'X..XX.', 'XXXX..', '.XX...'] }
let EP = null
const CLIP = { x: 790, y: 1050, w: 400, h: 430 }
function clipTimes() {
  const it = EP.T.items[3], L = it.lines[0]
  return { in: it.q + 0.1, rows: it.q + 0.5, write: L.done + 0.4, out: it.end }
}
function drawClipboard(ctx, t, k) {
  const C = clipTimes()
  const pin = ease.outCubic(prog(t, C.in, C.in + 0.4)), po = prog(t, C.out - 0.3, C.out)
  const a = pin * (1 - po) * k
  if (a <= 0) return
  const { x, y, w, h } = CLIP, P = 6
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + (1 - pin) * 200); ctx.rotate(0.06)
  const ox = -w / 2, oy = -h / 2
  ctx.fillStyle = INK; ctx.fillRect(ox - P, oy, w + 2 * P, h); ctx.fillRect(ox, oy - P, w, h + 2 * P)
  ctx.fillStyle = '#b0773f'; ctx.fillRect(ox, oy, w, h)
  ctx.fillStyle = '#c98f52'; ctx.fillRect(ox, oy, w, P); ctx.fillRect(ox, oy, P, h)
  const px0 = ox + 18, pw = w - 36, py0 = oy + 34, ph = h - 52
  ctx.fillStyle = INK; ctx.fillRect(px0 - 3, py0 - 3, pw + 6, ph + 6)
  ctx.fillStyle = '#fbf6ea'; ctx.fillRect(px0, py0, pw, ph)
  ctx.font = `700 22px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.fillStyle = INK; ctx.fillText('TODAY', px0 + 14, py0 + 26)
  ctx.fillStyle = 'rgba(27,18,54,0.6)'; ctx.fillRect(px0 + 14, py0 + 42, pw - 28, 3)
  const rowAt = i => py0 + 76 + i * 50
  const row = (i, text, mark, born, n = Infinity) => {
    const ry = rowAt(i), al = clamp((t - born) / 0.15)
    if (al <= 0) return
    ctx.save(); ctx.globalAlpha *= al
    ctx.fillStyle = 'rgba(120,150,210,0.35)'; ctx.fillRect(px0 + 8, ry + 22, pw - 16, 2)
    ctx.fillStyle = INK; ctx.fillRect(px0 + 14, ry - 13, 26, 26); ctx.fillStyle = '#fbf6ea'; ctx.fillRect(px0 + 17, ry - 10, 20, 20)
    if (mark) MARK.v.forEach((r, j) => [...r].forEach((ch, ii) => { if (ch === 'X') { ctx.fillStyle = '#5f9a5a'; ctx.fillRect(px0 + 18 + ii * 3, ry - 8 + j * 3, 3, 3) } }))
    ctx.font = `700 22px ${MONO}`; ctx.fillStyle = INK; ctx.fillText(text.slice(0, n), px0 + 50, ry + 1)
    ctx.restore()
  }
  ROWS.forEach(([m, s], i) => row(i, s, m, C.rows + i * 0.18))
  // the new item, written in by hand, in Virgo pink
  if (t >= C.write) {
    const n = Math.floor((t - C.write) / 0.07) + 1, ry = rowAt(ROWS.length)
    ctx.save(); ctx.fillStyle = 'rgba(120,150,210,0.35)'; ctx.fillRect(px0 + 8, ry + 22, pw - 16, 2)
    ctx.fillStyle = INK; ctx.fillRect(px0 + 14, ry - 13, 26, 26); ctx.fillStyle = '#fbf6ea'; ctx.fillRect(px0 + 17, ry - 10, 20, 20)
    ctx.font = `italic 500 30px 'EB Garamond', Georgia, serif`; ctx.fillStyle = '#d23a78'; ctx.fillText(NEW.slice(0, n), px0 + 50, ry + 2)
    ctx.restore()
    if (n >= NEW.length) {
      const q = ease.outCubic(prog(t, C.write + NEW.length * 0.07, C.write + NEW.length * 0.07 + 0.4))
      ctx.save(); ctx.globalAlpha *= q; ctx.font = `700 18px ${MONO}`; ctx.fillStyle = '#d23a78'; ctx.fillText('NEW', px0 + pw - 60, ry - 30); ctx.restore()
    }
  }
  // the clip
  ctx.fillStyle = INK; ctx.fillRect(-62, oy - 22, 124, 52)
  ctx.fillStyle = '#c9cfd8'; ctx.fillRect(-56, oy - 16, 112, 40)
  ctx.fillStyle = '#eef2f6'; ctx.fillRect(-56, oy - 16, 112, 8)
  ctx.restore()
}

function prop(ctx, t, r, { size }) {
  const c = Math.max(3, Math.round(size / 40))
  drawBits(ctx, PENCIL, PENCIL_C, Math.round(r.x + 0.24 * size), Math.round(r.top + 0.22 * size), c, { rot: -0.7 })
}

EP = makeEpisode({
  id: 'st6virgo', sign: 'virgo', ep: 6, duration: 90, pitch: 830.61,
  cold: [{ text: 'sorry, one sec. just fixing the lighting. *okay.*', mood: 'squint', look: [0, -1] }],
  title: { accent: 'the fixer.', facts: [['EARTH', 'MUTABLE', 'RULED BY MERCURY'], ['THE MAIDEN', 'AUG 23 – SEP 22']] },
  myth: {
    head: 'The *last* to leave.',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, Astraea was the goddess of justice.' },
      { who: 'stars', tab: 0, text: 'as people grew cruel, the gods left Earth. she stayed *longest.*' },
      { who: 'stars', tab: 1, text: 'one story says the last immortal rose into the sky as *Virgo.*' },
      { who: 'stars', tab: 2, text: 'others link Virgo to Demeter, goddess of the *harvest.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'An ear of *wheat.*',
    map: { name: 'Virgo', stars: STARS, bright: 'spica', brightCol: '#cfe2ff',
      lines: [['beta', 'eta'], ['eta', 'porrima'], ['porrima', 'delta'], ['delta', 'vindemiatrix'], ['porrima', 'theta'], ['theta', 'spica'], ['delta', 'zeta'], ['zeta', 'tau'], ['tau', 'v109'], ['spica', 'iota'], ['iota', 'mu']],
      box: { cx: 540, cy: 860, w: 820, h: 470 },
      labels: [{ star: 'spica', text: 'SPICA', sub: '“EAR OF GRAIN”', dx: -40, dy: 70, align: 'right', at: 1.6 }] },
    lines: [
      { who: 'stars', text: 'Spica, her brightest star, is the ear of wheat in her *hand.*' },
      { who: 'stars', text: 'Virgo is the largest constellation of the *zodiac.*' },
      { text: 'more room for *lists.*', mood: 'happy' },
    ],
    heroAt: [904, 1238],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 6 · MUTABLE EARTH',
    cutChyron: 'CUTAWAY · THE PARTNER',
    draw: (ctx, t, { k }) => drawClipboard(ctx, t, k),
    items: [
      { q: 'Q. Why do you | *fix* things?', lines: [{ text: 'i fix things because if it’s perfect, nobody *leaves.*', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'i notice. the loose button. the low battery. i *notice.*', mood: 'happy' },
        { who: 'pisces', text: 'it remembers my dreams. even the weird *ones.*' },
      ] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'that one small mistake is the one that makes you *go.*', mood: 'neutral', look: [-1, 1] }] },
      { q: 'Q. Still keeping | the *list?*', lines: [
        { text: 'always. but there’s one new item. it’s the *hardest* one.', mood: 'neutral', look: [1, 0] },
        { text: '“let them see me *tired.*”', mood: 'sleepy' },
      ] },
      { q: 'Q. What do you wish | we’d *ask?*', lines: [{ text: '“want me to take a turn?” …yes. *please.*', mood: 'sparkle' }] },
    ],
  },
  takeaway: { min: 5, text: 'I’m not a project | either. *Love* me | unfinished.', words: 5, late: 3, top: 320, size: 100, accentSize: 156, byY: 830 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'happy', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'personal', item: 3, at: 2.6, x: 900, y: 842, from: 'below', cell: 3, where: 'peeking over the top of the checklist clipboard (III · UP CLOSE, the list beat)' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void GOLD; void BONE; void monoText
