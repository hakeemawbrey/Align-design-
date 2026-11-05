// kxtre10: DELULU OR SOLULU, "Delulu or Solulu: Single at the Wedding Table" (116 s vertical, Trends: Extended ep 10,
// rows in promo/films/month2/m41.md; music: dreamy · Ab). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// ♐ Sagittarius is seated at TABLE 7: SINGLES. The DELULU ↔ SOLULU meter swings every chapter. ♒ Aquarius is the seatmate;
// ♓ Pisces gives the toast (sobbing; the whole room cries); ♉ Taurus is the aunt. The verdict: solulu, best night anyway.
//   0.0–3.6   frame 0: the place card mid-spin, "TABLE 7: SINGLES", Sagittarius mid-gasp; whip + shake
//   1 THE SEATING CHART · 2 THE NAME CARDS · 3 THE SMALL TALK (the chicken) · 4 THE SPEECH · 5 THE BOUQUET
//   6 THE AUNT ("so when's YOUR turn?" "I'm happy, actually.") · 7 THE DANCE FLOOR (all of table 7) · 8 THE VERDICT
//   (the meter breaks; Aquarius asks for a dance, just a dance). Last: "Single at table seven. | *Thriving.*"
import {
  makeEp, star, pisces, partyRoom, table, tag, sfx, hearts, sparkles, confetti, label, glowSpot, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, SERIF, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#ffb3d9'
const SAG = 'sagittarius', AQU = 'aquarius'
// the meter: v in −1 (DELULU) … +1 (SOLULU)
function meter(x, t, v, k = 1, broken = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 450); x.scale(k, k)
  box(x, -380, -50, 760, 100, '#1d1640', { b: 6 })
  const g = x.createLinearGradient(-360, 0, 360, 0); g.addColorStop(0, '#ff5ab4'); g.addColorStop(0.5, '#c9a6ff'); g.addColorStop(1, '#7fe0a0')
  x.fillStyle = g; x.fillRect(-360, -14, 720, 28)
  x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'
  x.fillStyle = '#ff8fd0'; x.textAlign = 'left'; x.fillText('DELULU', -360, -34 + 4)
  x.fillStyle = '#9fe6b0'; x.textAlign = 'right'; x.fillText('SOLULU', 360, -34 + 4)
  const nx = clamp(v, -1.15, 1.15) * 340 + Math.sin(t * 13) * 5
  x.save(); x.translate(nx, 0); x.rotate(broken * 0.9); R(x, INK, -10, -40, 20, 80); R(x, BONE, -5, -36, 10, 72); x.restore()
  x.restore()
}
const NEEDLE = [-0.2, -0.75, -0.95, 0.0, 0.1, -1.0, 0.7, 0.95, 1.4]
function needleAt(T, t) {
  const CH = T.CH, i = CH.findIndex((c, j) => t >= c.a && (j === CH.length - 1 || t < CH[j + 1].a))
  if (i < 0) return NEEDLE[0]
  const from = NEEDLE[i], to = NEEDLE[i + 1], u = t - CH[i].a
  return lerp(from, to, ease.outCubic(clamp((u - 1.0) / 0.8))) + (u > 1.0 && u < 2.0 ? 0.12 * Math.sin((u - 1) * 18) * (2 - u) : 0)
}
function hall(x, t) { partyRoom(x, t, { warm: 1 }); glowSpot(x, 540, 700, 600, '255,200,230', 0.15) }
function flowers(x, cx, cy, s = 1) { drawBits(x, ['.P.W.', 'PPWWW', '.PGW.', '..G..', '..G..'], { P: PINK, W: '#ffffff', G: '#5fbf6a' }, cx, cy, 14 * s) }
function chicken(x, cx, cy) { box(x, cx - 70, cy - 10, 140, 26, '#ffffff', { b: 4 }); drawBits(x, ['.CCC.', 'CCCCC', '.CC..'], { C: '#d8a060' }, cx, cy - 16, 10) }

function hook(x, t, S) {
  hall(x, t)
  table(x, 540, 1180, { w: 800 })
  flowers(x, 540, 1110)
  star(x, t, SAG, { x: 300, y: 1020, s: 240, mood: 'wide', look: [1, -0.6], squash: -0.06 })
  x.save(); x.translate(680, 820); x.rotate(-0.4 + t * 3); x.scale(Math.abs(Math.cos(t * 3)) * 0.8 + 0.4, 1)
  box(x, -170, -60, 340, 120, BONE, { b: 6 }); x.font = `italic 600 44px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Table 7: Singles', 0, 4); x.restore()
  pisces(x, t, { x: 930, y: 1420, s: 130, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE SEATING CHART', dur: 13, caption: 'table 7. *it’s a sign.*',
  bubbles: [{ at: 4.6, end: 8.0, x: 300, y: 700, text: 'seven is my lucky number.', tail: 0.2, size: 36 }],
  cues: [['bell', 2.0, 1318.51, 0.04, 1.0, 0], ['glitter', 2.0, 2.6]],
  draw(x, t, S) {
    hall(x, t)
    box(x, 520, 560, 460, 600, BONE, { b: 8 })
    x.font = `italic 600 44px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('Seating', 750, 630)
    for (let i = 1; i <= 8; i++) { const hi = i === 7 && S.u > 2; if (hi) R(x, '#ffe08a', 540, 640 + i * 56, 420, 48); x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.fillText(i === 7 ? 'TABLE 7 · SINGLES' : `TABLE ${i} · family`, 750, 676 + i * 56) }
    star(x, t, SAG, { x: 300, y: 1060, s: 240, mood: S.u > 2 ? 'sparkle' : 'neutral', look: [1, -0.4], hops: S.hops(2.0, 4.6) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(4, 13) })
  } })
C.push({ name: 'THE NAME CARDS', dur: 14, caption: 'seat 3. next to *Aquarius.*',
  bubbles: [{ at: 3.6, end: 8.4, x: 300, y: 640, text: 'the universe planned this.', think: true, size: 36 }, { at: 9.0, end: 12.6, x: 780, y: 640, text: 'hi. are you also… table 7?', tail: -0.3, size: 34 }],
  cues: [['pluck', 3.6, 1046.5, 0.03, 0.8, -0.4], ['pop', 9.0, 783.99, 0.04, 0.4]],
  draw(x, t, S) {
    hall(x, t); table(x, 540, 1180, { w: 820 }); flowers(x, 540, 1110)
    tag(x, 'SAG', 330, 1150, 1, { size: 26 }); tag(x, 'AQUARIUS', 760, 1150, 1, { size: 26 })
    star(x, t, SAG, { x: 330, y: 1020, s: 230, mood: S.u > 3.6 ? 'heart' : 'wide', look: [1, -0.2], hops: S.hops(3.6) })
    const sit = ease.outCubic(prog(S.u, 6.0, 7.6))
    star(x, t, AQU, { x: lerp(1200, 760, sit), y: 1020, s: 230, mood: 'neutral', look: [-1, -0.2], hops: S.hops(9.0) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(2, 14) })
  } })
C.push({ name: 'THE SMALL TALK', dur: 14, caption: 'common ground: *the chicken.*',
  bubbles: [{ at: 2.4, end: 5.6, x: 330, y: 660, text: 'do you also hate this chicken?', tail: 0.2, size: 32 }, { at: 5.4, end: 8.6, x: 760, y: 620, text: 'SO much.', tail: -0.3, size: 44 }, { at: 9.4, end: 12.8, x: 540, y: 560, text: 'so… soulmates?', think: true, size: 36 }],
  cues: [['pop', 5.4, 880, 0.05, 0.4], ['tick', 9.4, 0.04]],
  draw(x, t, S) {
    hall(x, t); table(x, 540, 1180, { w: 820 })
    chicken(x, 400, 1150); chicken(x, 690, 1150)
    const poke = Math.sin(S.u * 5) * 8
    star(x, t, SAG, { x: 330, y: 1020 + poke * 0.3, s: 230, mood: S.u > 9.4 ? 'sparkle' : 'squint', look: [1, 0.4], hops: S.hops(2.4, 9.4) })
    star(x, t, AQU, { x: 760, y: 1020, s: 230, mood: S.u > 5.4 ? 'happy' : 'squint', look: [-1, 0.4], hops: S.hops(5.4, 5.8) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(2, 14) })
  } })
C.push({ name: 'THE SPEECH', dur: 14, caption: 'Pisces gives *the toast.*',
  bubbles: [{ at: 1.6, end: 5.0, x: 540, y: 520, text: 'I promised I would not cry—', size: 38, col: '#cfe9ff' }, { at: 5.0, end: 9.0, x: 540, y: 520, text: '*cries for four minutes*', size: 36, col: '#cfe9ff' }],
  cues: [['pluck', 5.2, 392, 0.04, 0.8, 0], ['pluck', 5.6, 349.23, 0.04, 0.8, 0], ['glitter', 9.4, 10.2]],
  draw(x, t, S) {
    hall(x, t)
    R(x, INK, 536, 900, 10, 260); box(x, 520, 880, 40, 40, '#555', { b: 4 })
    pisces(x, t, { x: 540, y: 830, s: 280, tears: 3, look: [0, 0], noBox: true, hops: S.hops(1.6, 5.0, 5.4, 5.8) })
    ;[[160, SAG], [340, AQU], [740, 'taurus'], [920, 'leo']].forEach(([px, id], i) => star(x, t, id, { x: px, y: 1260, s: 150, mood: S.u > 7 ? 'sparkle' : 'happy', look: [px < 540 ? 1 : -1, -1], tears: S.u > 7 ? 2 : 0, hops: S.hops(9.4 + i * 0.1) }))
    tag(x, 'EVERYONE IS CRYING', 540, 1080, S.w(9.4, 14), { bg: SKYB, size: 40 })
  } })
C.push({ name: 'THE BOUQUET', dur: 14, caption: 'the bouquet. *by accident.*',
  bubbles: [{ at: 6.4, end: 9.6, x: 330, y: 640, text: 'I was reaching for a napkin', tail: 0.2, size: 32 }],
  cues: [['whoosh', 2.0, 0.8, 0.04], ['pop', 3.2, 523.25, 0.06, 0], ['glitter', 3.2, 4.0], ['riser', 3.4, 5.0, 0.03]],
  draw(x, t, S) {
    hall(x, t)
    const f = prog(S.u, 2.0, 3.2)
    const bx = lerp(900, 360, f), by = lerp(700, 900, f) - Math.sin(Math.PI * f) * 340
    flowers(x, S.u > 3.2 ? 380 : bx, S.u > 3.2 ? 920 : by, 1.4)
    star(x, t, SAG, { x: 330, y: 1060, s: 240, mood: S.u > 3.2 ? 'wide' : 'neutral', look: [1, -1], hops: S.hops(3.2) })
    ;[[620, 'gemini'], [780, 'libra'], [930, 'leo']].forEach(([px, id]) => star(x, t, id, { x: px, y: 1100, s: 150, mood: S.u > 3.2 ? 'wide' : 'happy', look: [-1, -0.5], hops: S.hops(3.3, 3.7) }))
    if (S.u > 3.2) { sfx(x, t, 'AAAAAH', 700, 820, S.at(3.3), { size: 60, col: PINK, life: 1.6 }); confetti(x, t, S.at(3.2), 380, 900) }
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 3, look: [-1, -1], pop: S.w(4, 14) })
  } })
C.push({ name: 'THE AUNT', dur: 14, caption: 'the *aunt question.*',
  bubbles: [{ at: 1.8, end: 5.4, x: 780, y: 600, text: "so when's YOUR turn?", tail: -0.3, size: 38 }, { at: 6.4, end: 10.6, x: 330, y: 640, text: "I'm happy, actually.", tail: 0.2, size: 40 }, { at: 10.4, end: 13.6, x: 780, y: 600, text: '…good. me too.', tail: -0.3, size: 36 }],
  cues: [['tom', 2.0, 100, { gain: 0.2, decay: 0.2 }], ['bell', 6.8, 1318.51, 0.04, 1.0, 0]],
  draw(x, t, S) {
    hall(x, t)
    star(x, t, SAG, { x: 330, y: 1060, s: 240, mood: S.u > 6.4 ? 'happy' : 'squint', look: [1, -0.2], hops: S.hops(6.4, 6.8) })
    star(x, t, 'taurus', { x: 760, y: 1060, s: 240, mood: S.u > 10.4 ? 'happy' : 'neutral', look: [-1, -0.2], hops: S.hops(1.8, 10.4) })
    drawBits(x, ['.HHHH.', 'HHHHHH'], { H: '#a07ad0' }, 760, 900, 14)
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(2, 14) })
  } })
C.push({ name: 'THE DANCE FLOOR', dur: 15, caption: 'all of *table 7* dances.',
  cues: Array.from({ length: 14 }, (_, i) => ['pop', r3(1 + i), [523.25, 659.25, 783.99, 880][i % 4], 0.03, (i % 2 ? 0.4 : -0.4)]),
  draw(x, t, S) {
    hall(x, t)
    for (let i = 0; i < 9; i++) R(x, ['#ff5ab4', '#7fd0ff', '#ffd27a'][(i + Math.floor(S.u * 2)) % 3], i * 120 + 10, 1260, 110, 120)
    const cast = [[SAG, 300], [AQU, 480], ['gemini', 660], ['libra', 840], ['leo', 160]]
    cast.forEach(([id, px], i) => star(x, t, id, { x: px + Math.sin(S.u * 3 + i) * 30, y: 1100, s: 190, mood: 'happy', look: [0, 0], hops: S.hops(...Array.from({ length: 14 }, (_, k) => 1 + k + (i % 2) * 0.5)) }))
    pisces(x, t, { x: 930, y: 1440, s: 130, tears: 3, mood: 'happy', look: [-1, -1], hops: S.hops(2, 4, 6, 8, 10, 12) })
  } })
C.push({ name: 'THE VERDICT', dur: 14.4, caption: null,
  bubbles: [{ at: 5.0, end: 8.6, x: 780, y: 800, text: 'one dance? just a dance.', tail: -0.3, size: 36 }, { at: 8.0, end: 11.0, x: 330, y: 820, text: 'just a dance. :)', tail: 0.2, size: 38 }],
  cues: [['riser', 0.2, 1.4, 0.03], ['tom', 1.6, 80, { gain: 0.3, decay: 0.3 }], ['pop', 1.7, 392, 0.05, 0], ['glitter', 1.8, 2.6], ['bell', 2.0, 1567.98, 0.05, 1.2, 0]],
  draw(x, t, S) {
    hall(x, t)
    tag(x, 'SOLULU: BEST NIGHT ANYWAY', 540, 600, S.w(2.0, 9.6), { bg: MINT, size: 40 })
    star(x, t, SAG, { x: 400, y: 1080, s: 240, mood: S.u > 8 ? 'heart' : 'happy', look: [1, -0.2], hops: S.hops(2.0, 8.0, 10, 11.5, 13) })
    const come = ease.outCubic(prog(S.u, 3.6, 5.0))
    star(x, t, AQU, { x: lerp(1200, 680, come), y: 1080, s: 230, mood: 'happy', look: [-1, -0.2], blush: 1, hops: S.hops(5.0, 8.4, 10.4, 12) })
    if (S.u > 8.4) hearts(x, t, S.at(8.4 + Math.floor((S.u - 8.4) / 1.8) * 1.8), 540, 900, { n: 5 })
    pisces(x, t, { x: 930, y: 1440, s: 140, tears: 3, look: [-1, -1], hops: S.hops(2.0, 2.4, 9, 11) })
  } })

const EP = makeEp({
  id: 'kxtre10', bug: 'DELULU OR SOLULU', lead: SAG, accent: ACC, deep: '#b0487a',
  music: { style: 'dreamy', key: 'Ab', seed: 4110, breakdown: [58.6], lift: [86.6] },
  hook: {
    text: 'Delulu or solulu: | *table seven.*', len: 3.6, draw: hook, top: 250, size: 104,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['shake', { at: 0.3, len: 0.4, amp: 20 }]],
  },
  promiseAt: 1.4,
  promise: 'the verdict comes *at the last dance.*',
  chapters: C,
  overlay(tx, t) {
    const T = EP.T, i = T.CH.findIndex((c, j) => t >= c.a && (j === T.CH.length - 1 || t < T.CH[j + 1].a))
    if (i < 0) return
    const last = T.CH[T.CH.length - 1]
    const k = t < T.CH[0].a + 0.4 ? prog(t, T.CH[0].a, T.CH[0].a + 0.4) : (t > last.a + 2.6 ? 1 - prog(t, last.a + 2.6, last.a + 3.0) : 1)
    meter(tx, t, needleAt(T, t), k, t > last.a + 1.6 ? 1 : 0)
    if (t > last.a + 1.6 && t < last.a + 2.6) sparkles(tx, t, 880, 450, last.a + 1.65, 10, 120, 1, [MINT, GOLD, BONE])
  },
  last: { text: 'Single at table seven. | *Thriving.*', at: 12.6, top: 300, size: 96 },
  ending: 'cut',
  hits: [61.6, 101.6],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [label, RED, r3]
