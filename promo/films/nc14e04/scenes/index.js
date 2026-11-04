// nc14e04: CUFFING SEASON, "Gemini's three almost-dates" (40 s vertical, Season 14 ep 4, music: pop · G).
// Story 0–35.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–8.4    "Gemini had three dates. | *Almost.*"  Frame 0: Gemini mid-juggle, three phones orbiting it. Three asks pop
//              ("free friday?" ×3, from Leo, Libra and Aquarius); Gemini answers "maybe!", "maybe!", "MAYBE!!". A calendar's
//              FRIDAY square collects three "?" stickers.
//   8.4–17.4   "Three maybes. | *One* Friday."  Friday arrives. Three phones buzz at once: "so are we on?", "still on??",
//              "friday??"  Gemini spins between them. Pisces, tissues in hand, cries for everyone.
//  17.4        card cut.
//  17.4–27.0   "Maybe isn't a | *yes.*"  THE STARS: "three maybes aren't one *yes*." → "pick what you want. say it *kindly*."
//              Gemini sends two kind, honest no's (Leo: "fair! thanks for telling me." Libra: "appreciate it!") and one
//              "yes. friday. I'm excited." to Aquarius.
//  27.0–35.6   "One phone. | *One* date."  Friday: Gemini and Aquarius with cocoa, one phone face-down on the table.
//              THE STARS: "One clear *yes* beats three warm maybes."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, mug, phone, windowFrame, drawSnow,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [8.2, 8.4], asks: [1.2, 2.9, 4.6], maybes: [1.8, 3.5, 5.3],
  b2: 8.4, h1: 8.55, h1Out: [17.2, 17.4], fri: 9.0, buzz: [10.4, 11.4, 12.4], spin: [13.2, 15.2],
  cut: 17.4, h2: 17.55, h2Out: [26.8, 27.0], sends: [23.0, 23.9, 24.9], reacts: [24.0, 24.9],
  b4: 27.0, h3: 27.15, last: 28.2,
}
const SP = 'THE STARS'
const B2 = [
  { t: 17.8, speaker: SP, text: "three maybes aren't one *yes*." },
  { t: 20.3, speaker: SP, text: 'pick what you want. say it *kindly*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'One clear *yes* beats three warm maybes.' }]
const WHO = ['leo', 'libra', 'aquarius']
const GEM = signStar('gemini')

function cafe(x, t) {
  R(x, '#2b1f45', 0, 520, 1080, 900)
  windowFrame(x, 540, 800, 620, 420)
  x.save(); x.beginPath(); x.rect(230, 590, 620, 420); x.clip(); drawSnow(x, t, 1, 1); x.restore()
  R(x, '#6b4a2f', 534, 590, 12, 420); R(x, '#6b4a2f', 230, 794, 620, 12)
  R(x, '#3d2a2a', 0, 1400, 1080, 520); R(x, '#4f3632', 0, 1400, 1080, 12)
}
function calendar(x, t, cx, cy, s, n) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -150, -120, 300, 240, BONE, { b: 8 })
  R(x, RED, -150, -120, 300, 54)
  label(x, 'FRIDAY', 0, -92, { size: 36, col: BONE, font: 'Inter, sans-serif', weight: 800 })
  for (let i = 0; i < n; i++) {
    const k = easeOutBack(prog(t, T.maybes[i] + 0.15, T.maybes[i] + 0.45), 2.4)
    if (k <= 0) continue
    x.save(); x.translate(-90 + i * 90, 20); x.rotate([-0.2, 0.1, -0.05][i]); x.scale(k, k)
    box(x, -36, -36, 72, 72, [GOLD, PINK, ICE][i], { b: 5 })
    label(x, '?', 0, 4, { size: 56, col: INK, font: 'Inter, sans-serif', weight: 800 })
    x.restore()
  }
  x.restore()
}

function beat1(x, t, K) {
  if (t > T.b2) return
  const ok = outK(t, [T.b2 - 0.15, T.b2])
  cafe(x, t)
  // Gemini juggles three phones (orbit)
  shadow(x, 540, 1400, 260)
  const gm = t < T.maybes[0] ? 'happy' : 'sparkle'
  K.star(x, t, 'gemini', { x: 540, y: 1230, s: 270, pop: ok, mood: gm, look: [0, -0.8], hops: [0.1, 0.55, 1.0, ...T.maybes.map(m => m + 0.02)], seed: 4 })
  for (let i = 0; i < 3; i++) {
    const a = t * 3.4 + i * 2.094
    const px = 540 + Math.cos(a) * 230, py = 1010 + Math.sin(a) * 90
    x.save(); x.translate(px, py); x.rotate(Math.sin(a) * 0.4); box(x, -32, -54, 64, 108, '#2a2148', { b: 5 }); R(x, [GOLD, PINK, ICE][i], -22, -40, 44, 70); x.restore()
  }
  // the asks and the maybes
  T.asks.forEach((a, i) => {
    const nm = WHO[i].toUpperCase()
    bubble(x, t, [270, 810, 290][i], [620, 690, 780][i], a, T.b2 - 0.15, `${nm}: free friday?`, { size: 30, col: '#e6e2ff' })
    bubble(x, t, 790, 930, T.maybes[i], T.maybes[i] + (i < 2 ? 1.5 : 2.8), i < 2 ? 'maybe!' : 'MAYBE!!', { size: i < 2 ? 44 : 60, col: '#fff3b0', tail: 0 })
  })
  calendar(x, t, 860, 1580, 0.85 * pop01(t, 0.8, 0.4, 2) * ok, 3)
  K.pisces(x, t, { x: 170, y: 1600, s: 140, pop: pop01(t, 3.0, 0.3, 2) * ok, scarf: ICE }, 1, 'wide', [1, -0.6])
}

function beat2(x, t, K) {
  if (t < T.b2 || t > T.cut) return
  const ok = outK(t, [T.cut - 0.2, T.cut])
  cafe(x, t)
  // FRIDAY slams in
  const fk = easeOutBack(prog(t, T.fri, T.fri + 0.35), 2)
  calendar(x, t, 540, 780, 1.1 * fk * ok, 3)
  // Gemini spins between the buzzing phones
  const sp = ease.inOutCubic(prog(t, ...T.spin))
  x.save(); x.translate(540, 1230); x.rotate(sp * Math.PI * 4); x.translate(-540, -1230)
  K.star(x, t, 'gemini', { x: 540, y: 1230, s: 240, pop: ok, mood: t > T.buzz[0] ? 'wide' : 'neutral', look: t > T.buzz[0] ? [Math.sin(t * 7), -0.5] : [0, 0], hops: [T.buzz[0], T.buzz[1], T.buzz[2]], seed: 4 })
  x.restore()
  if (t > T.spin[0] && t < T.spin[1]) for (let i = 0; i < 4; i++) R(x, 'rgba(242,207,74,0.6)', 540 + Math.cos(t * 20 + i * 1.6) * 190, 1230 + Math.sin(t * 20 + i * 1.6) * 60, 22, 8)
  const msgs = ['so are we on?', 'still on??', 'friday??']
  const pos = [[190, 1060], [890, 1060], [540, 1560]]
  msgs.forEach((m, i) => {
    const k = easeOutBack(prog(t, T.buzz[i], T.buzz[i] + 0.3), 1.6) * ok
    if (k <= 0.01) return
    const bz = 4 * Math.sin(t * 70 + i)
    x.save(); x.translate(pos[i][0] + bz, pos[i][1]); x.scale(k, k); x.translate(-pos[i][0], -pos[i][1])
    phone(x, t, pos[i][0], pos[i][1] - 170, 280, 340, { title: `${signStar(WHO[i]).glyph}︎ ${WHO[i].toUpperCase()}`, size: 28, msgs: [{ at: T.buzz[i] + 0.1, side: 'L', text: m }] })
    x.restore()
    label(x, 'BZZT', pos[i][0] + 100, pos[i][1] - 200 + 6 * Math.sin(t * 40), { size: 28, col: GOLD, alpha: clamp(k) })
  })
  K.pisces(x, t, { x: 140, y: 1640, s: 150, pop: pop01(t, T.b2 + 0.5, 0.3, 2) * ok, scarf: ICE }, t > T.buzz[2] ? 3 : 2, 'sparkle', [1, -0.6])
}

function beat3(x, t, K) {
  if (t < T.cut) return
  const ok = popOut(t, K.OUT)
  cafe(x, t)
  const fin = ease.inOutCubic(prog(t, T.b4, T.b4 + 0.6))
  if (t < T.b4 + 0.4) {
    const k = outK(t, [T.b4, T.b4 + 0.4])
    K.stars(x, t, { x: 540, y: 780, s: 220, pop: pop01(t, T.cut + 0.15, 0.4, 2) * k, mood: t > T.sends[2] ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hopsFor(SP) })
    K.star(x, t, 'gemini', { x: 540, y: 1180, s: 230, pop: k, mood: t < T.sends[0] ? 'neutral' : t < T.sends[2] ? 'happy' : 'sparkle', look: [0, 0.5], hops: [...T.sends], seed: 4 })
    // three phones: two kind no's, one yes
    const texts = ['being honest: not a match for me. you were great!', "I can't friday, and I don't want to string you along.", "yes. friday. I'm excited."]
    const replies = ['fair! thanks for telling me.', 'appreciate it!']
    const pos = [[195, 1130], [885, 1130], [540, 1560]]
    texts.forEach((m, i) => {
      const pk = easeOutBack(prog(t, T.sends[i] - 0.4, T.sends[i] - 0.1), 1.5) * k
      if (pk <= 0.01) return
      x.save(); x.translate(pos[i][0], pos[i][1]); x.scale(pk, pk); x.translate(-pos[i][0], -pos[i][1])
      phone(x, t, pos[i][0], pos[i][1] - (i < 2 ? 230 : 150), i < 2 ? 330 : 420, i < 2 ? 470 : 300, { title: `${signStar(WHO[i]).glyph}︎ ${WHO[i].toUpperCase()}`, size: 26,
        msgs: [{ at: T.sends[i], side: 'R', text: m, col: i < 2 ? '#7a6aa8' : '#b89a2a' }, ...(i < 2 ? [{ at: T.reacts[i], side: 'L', text: replies[i] }] : [])] })
      x.restore()
    })
    sparkles(x, t, 540, 1500, T.sends[2] + 0.1, 12, 200, 2, [GOLD, BONE, ICE])
  }
  // Friday: one date, one phone face-down
  if (t > T.b4) {
    box(x, 220, 1330, 640, 40, '#a07850', { b: 7 }); R(x, INK, 300, 1370, 20, 120); R(x, INK, 760, 1370, 20, 120)
    K.star(x, t, 'gemini', { x: lerp(540, 380, fin), y: 1180, s: 230, pop: ok, mood: t > T.last + 1 ? 'heart' : 'happy', look: [1, 0], hops: [T.b4 + 0.3, T.last + 1.2], seed: 4, scarf: '#ff8fb1' })
    K.star(x, t, 'aquarius', { x: 700, y: 1185, s: 220, pop: pop01(t, T.b4 + 0.2, 0.35, 2) * ok, mood: 'happy', look: [-1, 0], hops: [T.b4 + 0.5], seed: 9, scarf: GOLD })
    mug(x, t, 470, 1300, 0.7, { col: '#ff8fb1' }); mug(x, t, 620, 1300, 0.7, { col: '#4f8cff' })
    box(x, 520, 1318, 50, 14, '#2a2148', { b: 3 })
    label(x, 'ONE PHONE · FACE DOWN', 540, 1440, { size: 28, col: MINT, alpha: clamp(prog(t, T.b4 + 0.8, T.b4 + 1.1)) * clamp(ok) })
    hearts(x, t, T.last + 1.2, 540, 1080, { n: 6 })
    K.pisces(x, t, { x: 930, y: 900, s: 150, pop: pop01(t, T.b4 + 0.6, 0.3, 2) * ok, scarf: ICE }, 3, 'sparkle', [-1, 0.4])
  }
}

const EP = makeCuff({
  id: 'nc14e04', duration: 40, ep: 4,
  heads: [
    { text: 'Gemini had three dates. | *Almost.*', at: -1.2, out: T.h0Out, size: 88, accent: GEM.color },
    { text: 'Three maybes. | *One* Friday.', at: T.h1, out: T.h1Out, size: 98 },
    { text: "Maybe isn't a | *yes.*", at: T.h2, out: T.h2Out, size: 104, accent: GOLD },
    { text: 'One phone. | *One* date.', at: T.h3, out: [35.0, 35.3], size: 104, accent: PINK },
  ],
  boxes: [
    { lines: B2, open: 17.6, close: 22.6, y: 1440 },
    { lines: B3, open: T.last - 0.22, close: 34.9, y: 1540 },
  ],
  snow: 0.5,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 850, y: 1010, at: 15.6, from: 'below', cell: 3 },
  draw(x, t, K) { beat1(x, t, K); beat2(x, t, K); beat3(x, t, K) },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.1 + i * 0.45).toFixed(3), 0.03]),
    ...T.asks.map((a, i) => ['pop', a, [880, 987.77, 1174.66][i], 0.04, (i - 1) * 0.5]),
    ...T.maybes.map((m, i) => ['pop', m, 1318.51, 0.045 + i * 0.01, 0]), ['pop', T.maybes[2] + 0.08, 1760, 0.04, 0],
    ...T.maybes.map(m => ['tick', +(m + 0.2).toFixed(3), 0.04]),
    ['boom', T.fri, 0.25], ['tom', T.fri, 90, { gain: 0.25, decay: 0.3 }],
    ...T.buzz.flatMap((b, i) => Array.from({ length: 4 }, (_, j) => ['tick', +(b + j * 0.08).toFixed(3), 0.03])),
    ['riser', T.spin[0], T.spin[1], 0.02], ['whoosh', T.spin[0], 0.6, 0.04], ['whoosh', T.spin[0] + 0.8, 0.6, 0.04],
    ...T.sends.map((s, i) => ['pop', s, [739.99, 739.99, 1174.66][i], 0.045, (i - 1) * 0.5]), ...T.reacts.map(r => ['pop', r, 880, 0.035, 0]),
    ['bell', T.sends[2] + 0.1, 1760, 0.03, 1, 0], ['glitter', T.sends[2] + 0.1, T.sends[2] + 0.5],
    ['pluck', T.last + 1.2, 1174.66, 0.04, 0.5, 0], ['pluck', T.last + 1.32, 1567.98, 0.035, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, RED]
