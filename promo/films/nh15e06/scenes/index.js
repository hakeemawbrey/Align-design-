// nh15e06: HOME FOR THE HOLIDAYS, "Virgo made a family binder" (35 s vertical, Season 15 ep 6; rows in
// promo/films/next30/b03.md; music jazzy · Bb). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–5.0    "*Virgo* brings someone home | with a *binder.*"  Frame 0: on the porch, Virgo mid-handover of a fat
//              tabbed binder to the Taurus date. VIRGO: "tabbed. laminated. *just in case*."
//   5.0        the binder opens big: "The *tabs.*" NAMES · ALLERGIES · THE DOG'S BIRTHDAY pop in (rule of three).
//   8.4        "They *studied.*"  Sticky notes everywhere, in the date's handwriting. TAURUS: "I read it *twice*. with snacks."
//  12.0        at the table: "At the | *table…*"  The date greets Aunt Bea by name ("tea, no sugar?"), passes the
//              gluten-free rolls, wishes Biscuit the dog a happy birthday (party hat, wag). Virgo melts.
//  17.8        card cut. "Love, | *studied.*"  THE STARS: "the binder was love." → "so was *the studying*." The Pisces
//              aunt cries onto the binder.
//  24.0–30.5   last line "*Studied* for you."
import { makeHome, drawHouse, drawYard, drawRoom, drawTable, bubble, label, hearts, sparkles, snow, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, GREEN, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3 } from '../../nh15e01/homekit.js'

const VIR = tagOf('virgo'), TAU = tagOf('taurus'), STARS = 'THE STARS'
const T = { tabs: [5.4, 6.4, 7.4], stick: 8.4, table: 12.0, bea: 12.6, rolls: 14.3, dog: 16.0, melt: 17.4, cut: 17.8, last: 24.0 }
const LINES = [
  { t: 1.4, speaker: VIR, color: '#c8e6a0', text: 'tabbed. laminated. *just in case*.' },
  { t: 8.8, speaker: TAU, color: '#9fe6b0', text: 'I read it *twice*. with snacks.' },
  { t: 18.3, speaker: STARS, text: 'the binder was *love*.' },
  { t: 21.0, speaker: STARS, text: 'so was *the studying*.' },
]
const TOP = 1250
const TABS = [['NAMES', '#ff9aa8'], ['ALLERGIES', '#9fd8f6'], ["THE DOG'S BIRTHDAY", '#ffe27a']]
const NOTES = [['memorized!', -0.1, 320, 840], ['Bea: no sugar', 0.08, 760, 850], ['Biscuit is 7!', -0.06, 750, 1000], ['rolls: GF', 0.12, 330, 1110], ['be yourself', 0.05, 770, 1130]]

function binder(x, cx, cy, s, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -66, -86, 132, 172); R(x, '#4a7a5a', -60, -80, 120, 160); R(x, '#3a6a4a', -60, -80, 18, 160)
  ;['#ff9aa8', '#9fd8f6', '#ffe27a'].forEach((c, i) => { R(x, INK, 58, -64 + i * 40, 22, 30); R(x, c, 60, -60 + i * 40, 16, 22) })
  R(x, BONE, -30, -40, 76, 30); x.font = "700 14px 'Space Mono', monospace"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FAMILY', 8, -25)
  x.restore()
}
function openBinder(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 920); x.scale(k, k)
  R(x, INK, -440, -330, 880, 640); R(x, '#4a7a5a', -432, -322, 864, 624)
  R(x, '#fbf7ee', -410, -300, 400, 580); R(x, '#fbf7ee', 10, -300, 400, 580)
  for (let i = 0; i < 6; i++) { R(x, INK, -24, -250 + i * 96, 48, 18); R(x, '#c0c0d0', -18, -246 + i * 96, 36, 10) }
  for (let k2 = 0; k2 < 9; k2++) { R(x, 'rgba(127,160,220,0.4)', -400, -200 + k2 * 52, 380, 3); R(x, 'rgba(127,160,220,0.4)', 20, -200 + k2 * 52, 380, 3) }
  // the three tabs, each a bold heading on the page
  TABS.forEach(([name, col], i) => {
    const tk = pop01(t, T.tabs[i], 0.3, 2.6)
    if (tk <= 0.01) return
    const tx = i < 2 ? -210 : 210, ty = i === 0 ? -200 : i === 1 ? 60 : -200
    x.save(); x.translate(tx, ty); x.scale(tk, tk)
    R(x, INK, -184, -34, 368, 68); R(x, col, -178, -28, 356, 56)
    x.font = `800 ${name.length > 12 ? 30 : 38}px Inter, sans-serif`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 2)
    x.restore()
  })
  x.restore()
}
function sticky(x, t, t0, text, rot, cx, cy) {
  const k = pop01(t, t0, 0.22, 3)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 30px 'Space Mono', monospace`
  const hw = Math.max(102, x.measureText(text).width / 2 + 22)
  R(x, 'rgba(6,4,18,0.4)', -hw + 2, -48, 2 * hw + 6, 104); R(x, INK, -hw - 6, -56, 2 * hw + 12, 104); R(x, '#fff07a', -hw, -50, 2 * hw, 92)
 x.fillStyle = '#2a3a8a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -2)
  x.restore()
}
const DOG = ['..BB.....BB..', '.BBBB...BBBB.', '.BBBBBBBBBBB.', '.BBWBBBBBWBB.', '.BBKBBBBBKBB.', '..BBBBNBBBB..', '...BBBBBBB...', '....BBBBB....']
const DOGBODY = ['.BBBBBBBBBB..', 'BBBBBBBBBBBBT', 'BBBBBBBBBBBB.', '.B.B....B.B..', '.B.B....B.B..']
function dog(x, t, cx, cy, wag, hat) {
  drawBits(x, DOGBODY, { B: '#c08a5a', T: '#c08a5a' }, cx + 40, cy + 64, 11)
  // tail wag
  const tw = Math.sin(t * 18) * wag
  x.save(); x.translate(cx + 106, cy + 46); x.rotate(-0.6 + tw * 0.6); R(x, INK, -6, -40, 14, 44); R(x, '#c08a5a', -2, -36, 6, 38); x.restore()
  drawBits(x, DOG, { B: '#c08a5a', W: '#ffffff', K: INK, N: INK }, cx, cy, 11)
  if (hat > 0.01) { x.save(); x.translate(cx, cy - 56); x.scale(hat, hat); x.fillStyle = INK; x.beginPath(); x.moveTo(-34, 14); x.lineTo(0, -60); x.lineTo(34, 14); x.fill(); x.fillStyle = PINK; x.beginPath(); x.moveTo(-26, 8); x.lineTo(0, -48); x.lineTo(26, 8); x.fill(); R(x, GOLD, -8, -64, 16, 16); x.restore() }
}

const EP = makeHome({
  id: 'nh15e06', duration: 35, hero: 'virgo', date: 'taurus',
  heads: [
    { text: '*Virgo* brings someone home | with a *binder.*', at: -1, out: [4.8, 5.0], size: 86, accentSize: 116 },
    { text: 'The | *tabs.*', at: 5.1, out: [8.2, 8.4], accent: '#9fd8f6' },
    { text: 'They | *studied.*', at: T.stick, out: [11.8, 12.0], accent: '#ffe27a' },
    { text: 'At the | *table…*', at: T.table + 0.1, out: [17.6, 17.8], accent: PINK },
    { text: 'Love, | *studied.*', at: 17.9, out: [23.75, 23.95], accent: GOLD },
    { text: '*Studied* | for you.', at: T.last, out: [30.05, 30.45], size: 112, accentSize: 170, late: 0, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 4.85 }, { from: 1, to: 1, close: 11.85 }, { from: 2, to: 3, close: 23.8 }],
  flashes: [5.0, T.table], shakes: [],
  cuts: [5.0, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < 5.0) {
      drawHouse(x, t, { wall: '#5a7a6a', trim: '#4a6a5a', door: '#3a5aa0' })
      drawYard(x, t)
      shadow(x, 330, 1350, 190); shadow(x, 760, 1350, 190)
      const hand = ease.inOutCubic(prog(t, -0.4, 1.2))
      K.hero(x, t, { x: 330, y: stand(240), s: 240, mood: t < 1.2 ? 'sparkle' : 'happy', look: [1, 0], hops: [-0.1, ...K.hops(VIR)], scarf: '#c8e6a0' })
      K.date(x, t, { x: 760, y: stand(240), s: 240, mood: t < 1.4 ? 'wide' : 'sparkle', look: [-1, 0.4], hops: [1.25] })
      binder(x, lerp(450, 650, hand), stand(240) + 40 - 50 * Math.sin(Math.PI * hand), 1.3, lerp(-0.2, 0.08, hand))
      snow(x, t, { n: 60 })
      return
    }
    if (t < T.table) {
      drawRoom(x, t, { fire: false, tree: false, windowX: null, wall: '#5a7a6a', stripe: '#62826f' })
      openBinder(x, t, pop01(t, 5.05, 0.4, 1.8))
      NOTES.forEach(([s, r, cx, cy], i) => sticky(x, t, T.stick + 0.15 + i * 0.22, s, r, cx, cy))
      // the date pops up from the bottom corner, proud
      const dk = pop01(t, T.stick + 1.2, 0.35, 2.2)
      K.date(x, t, { x: 900, y: 1330, s: 220, pop: dk, mood: 'sparkle', look: [-1, -0.6], hops: K.hops(TAU) })
      return
    }
    // ── the table
    drawRoom(x, t, { fire: false, treeX: 960, windowX: 80, wall: '#5a7a6a', stripe: '#62826f' })
    const y = TOP - 115
    const melt = t > T.melt
    K.hero(x, t, { x: 200, y, s: 230, mood: melt ? 'heart' : 'wide', look: [1, 0], hops: [T.melt, T.last + 0.3], scarf: '#c8e6a0' })
    K.date(x, t, { x: 420, y, s: 230, mood: 'happy', look: t < T.rolls ? [1, 0] : t < T.dog ? [-1, 0] : [1, 1], hops: [T.bea, T.rolls, T.dog, T.last + 0.4] })
    K.fam(x, t, 'libra', { x: 640, y, s: 220, mood: t > T.bea + 0.5 ? 'heart' : 'happy', look: [-1, 0], hops: [T.bea + 0.5] })
    K.pisces(x, t, { x: 830, y: y + 15, s: 180, tears: t > 18 ? 3 : 2, look: [-1, 0.6] })
    drawTable(x, t, { y: TOP, dishes: [{ kind: 'mug', x: 640, col: '#ffd8e8' }, { kind: 'rolls', x: lerp(560, 300, ease.inOutCubic(prog(t, T.rolls, T.rolls + 0.5))) }, { kind: 'candle', x: 735 }] })
    binder(x, 975, TOP - 70, 0.8, 0.12)
    // tear puddle on the binder
    if (t > 18) R(x, '#8fe3ff', 930, TOP - 20, 90 * clamp(prog(t, 18, 21)), 10)
    ;[['AUNT BEA', 640], ['AUNT', 830]].forEach(([s, cx]) => { x.font = "700 21px 'Space Mono', monospace"; const w = x.measureText(s).width + 22; R(x, INK, cx - w / 2 - 4, TOP + 66, w + 8, 38); R(x, BONE, cx - w / 2, TOP + 70, w, 30); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, TOP + 86) })
    // Biscuit the dog, in front of the table
    dog(x, t, 860, 1470, t > T.dog + 0.3 ? 1 : 0.2, pop01(t, T.dog + 0.2, 0.3, 2.6))
    bubble(x, t, 470, 880, T.bea, T.rolls - 0.05, 'hi, Aunt Bea! tea, no sugar?', { size: 32, tail: -0.1 })
    bubble(x, t, 470, 880, T.rolls, T.dog - 0.05, 'the gluten-free ones →', { size: 34, tail: -0.1 })
    bubble(x, t, 560, 880, T.dog, T.cut - 0.1, 'happy birthday, Biscuit!', { size: 36, tail: -0.3 })
    sparkles(x, t, 640, 1050, T.bea + 0.5, 8, 120, 1)
    hearts(x, t, T.melt, 200, 1000, { n: 7 })
    hearts(x, t, T.dog + 0.4, 860, 1380, { n: 4, cell: 5 })
    if (win(t, 17.9, T.last)) K.stars(x, t, { x: 860, y: 640, s: 170, pop: pop01(t, 18.0, 0.36, 2.1) * outK(t, [23.6, 23.9]), mood: t > 21 ? 'happy' : 'neutral', look: [-1, 0.6], hops: K.hops(STARS) })
    if (t > T.last) sparkles(x, t, 320, 1050, T.last + 0.6, 12, 240, 3)
    void [label, GREEN, RED, stand]
  },
  cues: [
    ['whoosh', 0.1, 0.4, 0.03], ['pop', 1.2, 880, 0.04, 0.2],
    ['whoosh', 5.05, 0.4, 0.035], ['tick', 5.4, 0.05],
    ...T.tabs.map((s, i) => ['pop', s, [1174.66, 1318.51, 1567.98][i], 0.045, 0]),
    ...NOTES.map((_, i) => ['tick', r3(T.stick + 0.15 + i * 0.22), 0.05]),
    ['pop', T.bea, 987.77, 0.04, -0.2], ['whoosh', T.rolls, 0.35, 0.03], ['pop', T.dog, 1318.51, 0.04, 0.3], ['glitter', T.dog + 0.2, T.dog + 0.6],
    ['pluck', T.melt, 1174.66, 0.04, 0.6, -0.4], ['pluck', T.melt + 0.12, 1567.98, 0.035, 0.6, -0.4],
    ['pluck', 18.6, 2349.32, 0.015, 0.3, 0.6],
    ['pop', T.last + 0.3, 1174.66, 0.05, 0], ['bell', T.last + 0.35, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.3, T.last + 0.8],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
