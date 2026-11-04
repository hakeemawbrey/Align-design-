// nrde05: RATE MY DATE IDEA, "Leo judges a gingerbread contest" (18 s vertical trial reel, music: funk · G).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Gingerbread contest. *I'm* the judge.”  ♌ Leo in a tall chef hat beside a gingerbread castle.
//   2.6–5.8   THE PLAN "Leo's entry: a *castle.* with a moat."  The castle gets towers, icing snow and a moat; Leo poses.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date's house is *lopsided.*"  The ♐ Sagittarius date's little house leans; Leo looks… then lifts
//             the tiny crown off its own castle and sets it on the date's house: "WINNER."
//   9.32      THE STARS RATE IT 9/10 *fair judge*.  Pisces: 10/10.   9.8 THE STARS: "Give them the *crown* for once."
import { makeDate, R, box, bubble, shadow, hearts, card, table, confetti, sparkles, starFrame, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, RED } from '../../nrde01/scenes/datekit.js'

const GB = '#b8733a', GBD = '#8a5226', ICE = '#fffaf0'
function icing(x, X, Y, w) { R(x, ICE, X, Y, w, 10); for (let i = 0; i < w; i += 22) R(x, ICE, X + i, Y + 10, 10, 8 + (i % 3) * 5) }
function castle(x, cx, by, k = 1, stage = 3) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -150, -170, 300, 170, GB, { b: 6 }); icing(x, -150, -170, 300)
  R(x, GBD, -30, -90, 60, 90); R(x, PINK, -12, -140, 24, 24)
  if (stage >= 2) for (const d of [-1, 1]) { box(x, d * 150 - 40, -300, 80, 300, GB, { b: 6 }); icing(x, d * 150 - 40, -300, 80); R(x, INK, d * 150 - 44, -330, 88, 30); for (let i = 0; i < 4; i++) R(x, GB, d * 150 - 40 + i * 22, -326, 14, 24) }
  if (stage >= 3) { R(x, INK, -230, -4, 460, 26); R(x, '#7fd0ff', -224, 0, 448, 16) }
  x.restore()
}
function house(x, cx, by, lean = 0.12) {
  x.save(); x.translate(cx, by); x.rotate(lean)
  box(x, -90, -110, 180, 110, GB, { b: 6 }); R(x, GBD, -20, -60, 40, 60)
  x.beginPath(); x.moveTo(-110, -110); x.lineTo(0, -210); x.lineTo(115, -104); x.closePath(); x.fillStyle = INK; x.fill()
  x.beginPath(); x.moveTo(-96, -116); x.lineTo(0, -198); x.lineTo(100, -110); x.closePath(); x.fillStyle = GBD; x.fill()
  icing(x, -100, -116, 200)
  R(x, '#9fe6b0', 40, -80, 26, 26); R(x, '#ff6b7f', -70, -80, 26, 26)
  x.restore()
}
function crownAt(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const C = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; R(x, INK, -30 + i * 12 - 3, -24 + j * 12 - 3, 18, 18) }))
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; R(x, ch === 'R' ? RED : GOLD, -30 + i * 12, -24 + j * 12, 12, 12) }))
  x.restore()
}
function chefHat(x, t, o) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  const top = F.cy - o.s * 0.36
  box(x, o.x - o.s * 0.14, top - o.s * 0.08, o.s * 0.28, o.s * 0.1, '#ffffff', { b: 5 })
  box(x, o.x - o.s * 0.18, top - o.s * 0.32, o.s * 0.36, o.s * 0.24, '#ffffff', { b: 5 })
}

const EP = makeDate({
  id: 'nrde05', sign: 'leo', date: 'sagittarius', accent: '#ffb35c', deep: '#b35a10',
  idea: 'Gingerbread contest. *I’m* the judge.',
  hook(x, t, S) {
    table(x, 540, 1330, 960, '#6b4a2f')
    castle(x, 760, 1326, 0.75, 3)
    crownAt(x, 760, 1065, 0.9)
    shadow(x, 330, 1330, 220)
    const o = { x: 330, y: 1110, s: 290, mood: 'sparkle', look: [1, 0], hops: S.HOOK_HOPS }
    S.hero(x, t, o); chefHat(x, t, o)
    sparkles(x, t, 760, 1060, 0.05, 8, 90, 1)
  },
  beats: [
    { caption: 'Leo’s entry: a *castle.* With a moat.', draw(x, t, S) {
      const { u, hero } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      const st = u < 0.7 ? 1 : u < 1.4 ? 2 : 3
      castle(x, 600, 1176, 1, st)
      if (u > 2.0) crownAt(x, 600, 820, 1)
      shadow(x, 200, 1170, 170)
      const o = { x: 200, y: 990, s: 200, mood: u > 2.0 ? 'sparkle' : 'happy', look: [1, -0.3], hops: [S.t0 + 0.7, S.t0 + 1.4, S.t0 + 2.0] }
      hero(x, t, o); chefHat(x, t, o)
      sparkles(x, t, 600, 820, S.t0 + 2.0, 10, 140, 2)
      card(x, 860, 700, 240, 84, 'ENTRY #1', { size: 42, rot: 0.06, k: pop01(t, S.t0 + 0.3, 0.3, 2.4) })
    }, cues: [['pop', 0.7, 880, 0.04, 0], ['pop', 1.4, 1174.66, 0.04, 0], ['glitter', 2.0, 2.4], ['pluck', 2.02, 1567.98, 0.04, 0, 0.3]] },
    { caption: 'their date’s house is *lopsided.*', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      castle(x, 240, 1176, 0.6, 3)
      house(x, 690, 1176, 0.13)
      // the crown travels from the castle to the date's house
      const mv = ease.inOutCubic(prog(u, 1.1, 1.8))
      crownAt(x, lerp(240, 700, mv), lerp(940, 940, mv) - 120 * Math.sin(Math.PI * mv), 0.9)
      shadow(x, 470, 1170, 160); shadow(x, 900, 1170, 160)
      const o = { x: 460, y: 1000, s: 180, mood: u < 0.6 ? 'squint' : u < 1.1 ? 'neutral' : 'happy', look: [1, 0.4], hops: [S.t0 + 1.1, S.t0 + 1.8] }
      hero(x, t, o); chefHat(x, t, o)
      date(x, t, { x: 910, y: 1000, s: 170, mood: u < 1.8 ? 'wide' : 'heart', look: [-1, 0.3], hops: [S.t0 + 1.85, S.t0 + 2.2] })
      card(x, 700, 720, 260, 84, 'WINNER', { size: 46, col: GOLD, k: pop01(t, S.t0 + 1.85, 0.3, 2.6), rot: -0.05 })
      confetti(x, t, S.t0 + 1.85, 700, 860)
      bubble(x, t, 460, 820, S.t0 + 0.25, S.t0 + 1.0, 'hmm.', { size: 36 })
    }, cues: [['pop', 0.28, 659.25, 0.03, 0], ['whoosh', 1.1, 0.6, 0.03], ['pop', 1.85, 1318.51, 0.05, 0.3], ['glitter', 1.85, 2.4], ['clap', 1.95, { gain: 0.12 }]] },
  ],
  score: '9/10', word: 'fair judge',
  last: 'Give them the *crown* for once.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, hearts]
