// trickmenu: CUTE, NOT AN ICK · "They read the menu out loud, with voices." (20 s vertical, Star Talk Trends §11.2,
// music: jazzy · C). Story 0–15.6, then the shared end card. The format look lives in ./ickkit.js (identical in all five).
// THEM: ♊ Gemini (reads the menu like it's opening night). ME: ♎ Libra (should be cringing; is not).
//   0.0–2.3    hook: "Should be an *ick…* | but it’s *them.*"  Gemini peeks over a giant menu; Libra goes heart-eyed.
//   2.3–5.2    MOMENT 1 "reads the menu *out loud.*"  Candlelit table. Gemini: "the SOUP… of the DAY." "…with
//              CROUTONS." ICK? buzzer… flips to CUTE. Libra: cringe → heart eyes.
//   5.2–8.1    MOMENT 2 "…with *voices.*"  Movie-trailer voice (Gemini goes wide and dark): "IN A WORLD… of
//              breadsticks." Then the tiny voice (Gemini goes tall and small): "tiny pasta!!" ICK? → CUTE.
//   8.1        card cut.
//   8.1–11.3   MOMENT 3 (the twist) "…the next table wants *dessert.*"  The couple at the next table has turned their
//              chairs around and holds up a DESSERT menu. Gemini: "DESSERT… the sequel." Everyone swoons. ICK? → CUTE.
//   11.35      stamp "NOT AN *ICK.*"  Gemini bows behind the menu, Libra claps. Pisces: SO CUTE.
//   11.95      ♎ Libra: "*Encore.*"
import { makeIck, tint, R, box, bubble, label, shadow, sparkles, hearts, clapHands, mitt, glowPool, pop01, outK, prog, lerp, clamp, ease, signStar, drawStarChar, INK, BONE, GOLD, PINK, HOT, RED, INTER, SERIF, T } from './ickkit.js'

const GEM = signStar('gemini'), LIB = signStar('libra')
const GEM_L = tint(GEM.color, 0.6), LIB_L = tint(LIB.color, 0.55)

// ── the restaurant: plum wall, wainscot, a window with the moon, hanging lamps, a candlelit table
function room(x, t, top = 380, bot = 1300) {
  R(x, '#3a1f3e', 0, top, 1080, bot - top)
  for (let i = 0; i < 12; i++) R(x, 'rgba(255,190,150,0.05)', i * 96, top, 40, bot - top)
  R(x, '#24132a', 0, bot - 260, 1080, 260); R(x, '#5a2f4a', 0, bot - 266, 1080, 10)
  box(x, 400, top + 70, 280, 220, '#0e0b22', { b: 10 })
  R(x, '#5a2f4a', 535, top + 70, 10, 220); R(x, '#5a2f4a', 400, top + 175, 280, 10)
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(620, top + 120, 22, 0, Math.PI * 2); x.fill()
  for (const lx of [180, 900]) {
    R(x, INK, lx - 3, top, 6, 90)
    box(x, lx - 50, top + 90, 100, 40, GOLD, { b: 6 })
    glowPool(x, lx, top + 180, 260, 0.9 + 0.1 * Math.sin(t * 3 + lx))
  }
}
function table(x, t, cx, y, w, { candle = true } = {}) {
  box(x, cx - w / 2, y, w, 34, '#f6e9ee', { b: 6 })
  R(x, '#f6e9ee', cx - w / 2 + 10, y + 34, w - 20, 120); R(x, 'rgba(0,0,0,0.12)', cx - w / 2 + 10, y + 34, w - 20, 12)
  for (let i = 0; i < 6; i++) R(x, 'rgba(232,52,78,0.18)', cx - w / 2 + 20 + i * (w - 40) / 6, y + 50, (w - 40) / 12, 100)
  if (candle) {
    box(x, cx - 9, y - 54, 18, 50, BONE, { b: 4 })
    const fl = 1 + 0.15 * Math.sin(t * 17) + 0.08 * Math.sin(t * 29)
    x.save(); x.translate(cx, y - 64); x.scale(1, fl)
    R(x, GOLD, -7, -16, 14, 22); R(x, '#fff1c8', -3, -8, 6, 12)
    x.restore()
    glowPool(x, cx, y - 60, 180, 1, '255,210,140')
  }
}
// the menu: a tall bone card with a red header and squiggle lines, held by two mittens
function menu(x, cx, cy, { w = 200, h = 250, rot = 0, head = 'MENU', col = BONE, hand = GEM_L, cell = 7 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  R(x, '#c43a52', -w / 2, -h / 2, w, 46)
  x.font = `800 ${head.length > 5 ? 26 : 30}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(head, 0, -h / 2 + 24)
  for (let i = 0; i < 6; i++) { R(x, 'rgba(27,18,54,0.45)', -w / 2 + 22, -h / 2 + 70 + i * 28, w * (0.45 + 0.3 * ((i * 5) % 3) / 2), 8); R(x, 'rgba(27,18,54,0.3)', w / 2 - 50, -h / 2 + 70 + i * 28, 28, 8) }
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * w / 2 - 14 - 4, -14, 36, 40); x.fillStyle = hand; x.fillRect(s * w / 2 - 14, -10, 28, 32) }
  x.restore()
  void cell
}

// ── MOMENT 1: out loud
function m1(x, t, S) {
  const { u, them, me, meMood, t0 } = S
  room(x, t)
  const oT = { x: 320, y: 1000, s: 230, mood: u < 0.4 ? 'neutral' : 'sparkle', look: [0, -0.4], hops: [t0 + 0.4, t0 + 0.95] }
  them(x, t, oT)
  menu(x, 320, 1150 + 4 * Math.sin(t * 3), { rot: -0.05, w: 170, h: 200 })
  me(x, t, { x: 760, y: 1010, s: 210, mood: meMood(t), look: [-1, 0] })
  hearts(x, t, S.flip + 0.05, 760, 880, { n: 4 })
  table(x, t, 540, 1140, 900)
  bubble(x, t, 380, 720, t0 + 0.4, S.t1, '“the SOUP… of the DAY.”', { size: 38, tail: -0.3 })
  bubble(x, t, 420, 820, t0 + 0.95, S.t1, '“…with CROUTONS.”', { size: 32, tail: -0.5, col: '#ffe9a8' })
}

// ── MOMENT 2: the voices
function m2(x, t, S) {
  const { u, them, me, meMood, t0 } = S
  room(x, t)
  const deep = u > 0.25 && u < 0.9, tiny = u >= 0.9
  // the movie-trailer voice dims the room to a single cold spotlight
  if (deep) { x.save(); x.globalAlpha = 0.55 * clamp((u - 0.25) / 0.1) * (1 - clamp((u - 0.8) / 0.1)); R(x, '#05030c', 0, 380, 1080, 920); x.restore() }
  const sq = deep ? 0.16 : tiny ? -0.14 : 0
  const oT = { x: 320, y: 1000 + (tiny ? -20 : 0), s: deep ? 250 : tiny ? 200 : 230, mood: deep ? 'squint' : tiny ? 'wide' : 'neutral', look: [0, -0.4], squash: sq, hops: [t0 + 0.9, t0 + 1.1] }
  them(x, t, oT)
  menu(x, 320, 1150 + 4 * Math.sin(t * 3), { rot: tiny ? 0.08 * Math.sin(t * 16) : -0.05, w: 170, h: 200 })
  me(x, t, { x: 760, y: 1010, s: 210, mood: meMood(t), look: [-1, 0] })
  hearts(x, t, S.flip + 0.05, 760, 880, { n: 4 })
  table(x, t, 540, 1140, 900)
  bubble(x, t, 430, 700, t0 + 0.3, t0 + 0.92, '“IN A WORLD… of breadsticks.”', { size: 50, tail: -0.4, col: INK, ink: GOLD, font: SERIF, weight: 500, italic: true })
  bubble(x, t, 300, 790, t0 + 0.95, S.t1, '“tiny pasta!!”', { size: 30, tail: 0, col: '#ffd1e3' })
  if (deep) label(x, 'DUN DUN DUNNN', 760, 600, { size: 34, col: 'rgba(239,230,214,0.8)', font: INTER, weight: 800, rot: 0.06, alpha: clamp((u - 0.45) / 0.1) })
}

// ── MOMENT 3: the next table wants dessert
function m3(x, t, S) {
  const { u, them, me, meF, t0 } = S
  room(x, t)
  // the next table, further back: Leo + Aquarius have turned their chairs around
  const turned = u > 0.35, swoon = u > 1.2
  const nt = [['leo', 650], ['aquarius', 870]]
  nt.forEach(([id, cx], i) => drawStarChar(x, cx, 700, 140, t, { color: signStar(id).color, glyph: null, mood: swoon ? 'heart' : turned ? 'sparkle' : 'neutral', look: turned ? [-1, 0] : [i ? -1 : 1, 0], seed: 30 + i, glow: 0.7, hops: [t0 + 0.35 + i * 0.08, t0 + 1.2 + i * 0.1] }))
  table(x, t, 760, 760, 420, { candle: false })
  const dk = pop01(t, t0 + 0.55, 0.3, 2.4)
  if (dk > 0.01) { x.save(); x.translate(760, 565); x.scale(dk, dk); menu(x, 0, 0, { w: 170, h: 120, rot: 0.06 * Math.sin(t * 6), head: 'DESSERT', hand: tint(signStar('leo').color, 0.55) }); x.restore() }
  hearts(x, t, t0 + 1.25, 760, 620, { n: 5 })
  // our table, in front
  const oT = { x: 300, y: 1020, s: 220, mood: u < 0.6 ? 'wide' : 'sparkle', look: u < 0.6 ? [1, -0.6] : [0, -0.4], hops: [t0 + 0.4, t0 + 0.8, t0 + 1.3] }
  them(x, t, oT)
  menu(x, 300, 1165 + 4 * Math.sin(t * 3), { rot: 0.05, head: 'DESSERT', w: 170, h: 200 })
  const oM = { x: 760, y: 1040, s: 200, mood: t < S.buzz ? 'happy' : t < S.flip ? 'squint' : 'heart', look: [-1, 0] }
  me(x, t, oM)
  if (t > S.flip) clapHands(x, t, meF(t, oM), [S.flip + 0.1, S.flip + 0.35, S.flip + 0.6, S.flip + 0.85], { col: LIB_L })
  table(x, t, 540, 1160, 900)
  bubble(x, t, 300, 850, t0 + 0.75, S.t1, '“DESSERT… the sequel.”', { size: 40, tail: -0.3 })
  sparkles(x, t, 760, 565, t0 + 0.6, 8, 120, 0.2)
}

const EP = makeIck({
  id: 'trickmenu', them: 'gemini', me: 'libra', meName: 'LIBRA', deep: '#b8860b', accent: PINK, badge: GEM.color,
  hook(x, t, S) { if (S.tk > 0.01) menu(x, 700, 1175 + 4 * Math.sin(t * 3), { rot: -0.06, w: 190 * S.tk, h: 210 * S.tk }) },
  moments: [
    { caption: 'reads the menu *out loud.*', draw: m1, badge: { x: 800, y: 500 },
      cues: [['pop', 0.4, 880, 0.035, -0.2], ['pop', 0.47, 987.77, 0.03, -0.2], ['pop', 0.95, 1174.66, 0.03, -0.2]] },
    { caption: '…with *voices.*', draw: m2, badge: { x: 800, y: 500 },
      cues: [['boom', 0.3, 0.16], ['tom', 0.3, 65, { gain: 0.22, decay: 0.5 }], ['tom', 0.55, 62, { gain: 0.18, decay: 0.4 }], ['tom', 0.78, 55, { gain: 0.22, decay: 0.6 }],
        ['pop', 0.95, 2349.32, 0.04, -0.3], ['pop', 1.02, 2637.02, 0.035, -0.3], ['pop', 1.09, 2959.96, 0.03, -0.3]] },
    { caption: '…the next table wants *dessert.*', draw: m3, badge: { x: 540, y: 430 },
      cues: [['whoosh', 0.35, 0.3, 0.03], ['tick', 0.4, 0.04], ['pop', 0.55, 1318.51, 0.04, 0.3], ['pop', 0.75, 880, 0.035, -0.3], ['glitter', 1.25, 1.6],
        ['clap', 2.4, { gain: 0.1, pan: 0.3 }], ['clap', 2.65, { gain: 0.1, pan: 0.3 }], ['clap', 2.9, { gain: 0.1, pan: 0.3 }]] },
  ],
  finale(x, t, S) {
    const { them, me, meF, ok, ME_FIN_HOPS } = S
    shadow(x, 360, 1150, 220 * ok); shadow(x, 700, 1160, 200 * ok)
    const bow = t > T.stamp + 0.3 && t < T.stamp + 1.0 ? Math.sin(Math.PI * (t - T.stamp - 0.3) / 0.7) : 0
    them(x, t, { x: 360, y: 940 + 30 * bow, s: 260, pop: ok, mood: bow > 0.2 ? 'happy' : 'sparkle', look: [1, 0.6 * bow], squash: 0.12 * bow, hops: [T.stamp + 0.1, T.last + 1.7] })
    menu(x, 360, 1110 + 30 * bow, { rot: -0.05 + 0.2 * bow, w: 180 * ok, h: 200 * ok })
    const oM = { x: 720, y: 960, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: ME_FIN_HOPS }
    me(x, t, oM)
    clapHands(x, t, meF(t, oM), [11.6, 11.85, 12.1, 12.35], { col: LIB_L })
  },
  last: '*Encore.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ...[11.6, 11.85, 12.1, 12.35].map((c, i) => ['clap', c, { gain: 0.08, pan: i % 2 ? 0.3 : 0.1 }])]
void [box, R, lerp, ease, prog, outK, mitt, GOLD, HOT, RED, INTER]
