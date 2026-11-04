// nt2e65: IN THIS HOUSE WE…, "In This House: Libra says no" (18 s vertical, Star Talk Trends Vol. 2 ep 65,
// promo/films/next30/b14.md; music: jazzy · C). Story 0–15.6, then the shared short end card. Format: ../../nt2e61/scenes/house.js.
//   0.0–2.1    hook (frame 0): the sampler "In this house *we…*"; Libra holds two mugs up to the light, deciding.
//   2.1–4.85   RULE 1 "two opinions, *one* decision."  Libra's paint swatch says TEAL, Scorpio's says PLUM; they talk it
//              out and the swatches merge: TEAL-ISH PLUM. A handshake: "deal."
//   4.85–7.6   RULE 2 "our mugs match… *nearly.*"  Two mugs on a shelf; one is chipped. Libra hugs that one: "the favourite."
//   7.6–10.95  RULE 3 (the twist) "we say *no*: nicely, but we say it."  A phone: "4th weekend plan??" Libra sweats…
//              then, calm: "not this time. next month?" Scorpio beams.
//   11.35      the stamp "HOUSE *RULES.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Kind *and* honest."
import { makeHouse, mug, rug, phoneMsg, sfx, R, box, bubble, label, shadow, sparkles, hearts, HOUSE, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from '../../nt2e61/scenes/house.js'

const FLOOR = 1180

function swatch(x, cx, cy, col, name, k = 1, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -90, -120, 180, 240, BONE, { b: 6 }); R(x, col, -76, -106, 152, 150)
  x.font = `800 ${name.length > 6 ? 22 : 30}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 82)
  x.restore()
}

function rule1(x, t, S) {
  const { u, hero, date } = S
  rug(x, 540, FLOOR + 70, 700, '#c9a6ff')
  const merge = ease.inOutCubic(prog(u, 1.1, 1.6))
  hero(x, t, { x: 290, y: 1010, s: 210, mood: u > 1.6 ? 'happy' : 'neutral', look: [1, -0.4], hops: [S.t0 + 0.5, S.t0 + 0.8, S.t0 + 1.7] })
  date(x, t, { x: 790, y: 1010, s: 210, mood: u > 1.6 ? 'happy' : 'neutral', look: [-1, -0.4], hops: [S.t0 + 0.65, S.t0 + 0.95, S.t0 + 1.75] })
  if (merge < 1) { swatch(x, lerp(290, 540, merge), 680, '#3fa8a0', 'TEAL', pop01(t, S.t0 + 0.2) * (1 - merge * 0.6), -0.08); swatch(x, lerp(790, 540, merge), 680, '#7a3a6e', 'PLUM', pop01(t, S.t0 + 0.35) * (1 - merge * 0.6), 0.08) }
  if (u > 1.5) { swatch(x, 540, 680, '#566a87', 'TEAL-ISH PLUM', pop01(t, S.t0 + 1.55, 0.3, 2.6), 0); sparkles(x, t, 540, 680, S.t0 + 1.58, 10, 170, 1) }
  if (u > 0.5 && u < 1.1) { sfx(x, t, 'hmm.', 290, 820, S.t0 + 0.5, { size: 34, col: BONE }); sfx(x, t, 'what if…', 790, 820, S.t0 + 0.75, { size: 34, col: BONE }) }
  bubble(x, t, 540, 900, S.t0 + 1.8, S.t1, 'deal.', { size: 40, tail: 0 })
  shadow(x, 290, FLOOR + 30, 190); shadow(x, 790, FLOOR + 30, 190)
}

function rule2(x, t, S) {
  const { u, hero, date } = S
  // a shelf with two "matching" mugs
  box(x, 260, 780, 560, 24, HOUSE.WOOD, { b: 6, hi: HOUSE.WOOD_L }); R(x, INK, 300, 804, 14, 40); R(x, INK, 766, 804, 14, 40)
  const grab = ease.inOutCubic(prog(u, 0.9, 1.4))
  mug(x, 420, 730, { col: '#ff8fb1' })
  mug(x, lerp(660, 380, grab), lerp(730, 960, grab), { col: '#ff8fb1', chip: true, s: 1 + 0.3 * grab, steam: grab, t })
  const ck = pop01(t, S.t0 + 0.45, 0.25, 3)
  if (ck > 0.01 && grab < 0.2) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(683, 690, 34 * ck, 0, Math.PI * 2); x.stroke(); x.restore(); label(x, 'chip!', 760, 640, { size: 32, font: INTER, weight: 800, col: GOLD, alpha: ck }) }
  hero(x, t, { x: 300, y: 1020, s: 220, mood: u > 1.4 ? 'heart' : 'neutral', look: [1, -0.6], squash: u > 1.4 ? 0.08 : 0, hops: [S.t0 + 0.9, S.t0 + 1.45] })
  date(x, t, { x: 830, y: 1030, s: 190, mood: u > 1.6 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.7] })
  bubble(x, t, 300, 560, S.t0 + 1.5, S.t1, 'the favourite.', { size: 34, tail: -0.2 })
  if (u > 1.45) hearts(x, t, S.t0 + 1.5, 380, 900, { n: 4 })
  shadow(x, 300, FLOOR + 30, 200)
}

function rule3(x, t, S) {
  const { u, hero, date } = S
  rug(x, 540, FLOOR + 70, 720, '#3fb08a')
  const k = pop01(t, S.t0 + 0.15, 0.3, 2.4)
  x.save(); x.translate(560, 700); x.scale(1.5 * k, 1.5 * k); phoneMsg(x, 0, 0, ['LEO', 'weekend', 'plan #4??'], { col: '#ff9a5c', rot: 0.05 }); x.restore()
  const sweat = u > 0.5 && u < 1.3
  hero(x, t, { x: 300, y: 1010, s: 230, mood: sweat ? 'wide' : u >= 1.3 ? 'happy' : 'neutral', look: [1, -0.6], squash: sweat ? 0.04 * Math.sin(t * 30) : 0, hops: [S.t0 + 1.35] })
  if (sweat) for (let i = 0; i < 3; i++) { const ph = (t * 2 + i / 3) % 1; R(x, '#8fe3ff', 400 + i * 14, 890 + ph * 60, 10, 14) }
  if (sweat) label(x, 'uh…', 190, 840, { size: 44, font: INTER, weight: 800, col: BONE, rot: -0.1 })
  bubble(x, t, 330, 1260 - 380, S.t0 + 1.35, S.t1, 'not this time. next month?', { size: 32, col: '#e8fff0', tail: -0.3 })
  date(x, t, { x: 840, y: 1030, s: 200, mood: u > 1.9 ? 'sparkle' : 'neutral', look: [-1, -0.2], hops: [S.t0 + 1.9, S.t0 + 2.2] })
  if (u > 1.9) sparkles(x, t, 840, 960, S.t0 + 1.9, 8, 120, 2)
  shadow(x, 300, FLOOR + 30, 200); shadow(x, 840, FLOOR + 30, 180)
}

const EP = makeHouse({
  id: 'nt2e65', sign: 'libra', name: 'Libra', date: 'scorpio', deep: '#b0487a', accent: '#d94a63',
  wall: ['#4a2f4a', '#553755'],
  hook(x, t, S) {
    shadow(x, 540, 1150, 260)
    const look = Math.sin(t * 3) > 0 ? -1 : 1
    S.hero(x, t, { x: 540, y: 960, s: 290, mood: 'neutral', look: [look, -0.5], hops: S.HOPS })
    mug(x, 300, 800 + 14 * Math.sin(t * 3), { col: '#ff8fb1', s: 1.3 })
    mug(x, 780, 800 - 14 * Math.sin(t * 3), { col: '#ff9fbf', s: 1.3, chip: true })
    label(x, '?', 540, 700, { size: 70, font: INTER, weight: 800, col: GOLD, alpha: 0.5 + 0.5 * Math.abs(Math.sin(t * 3)) })
  },
  hookCues: [['pop', 0.5, 880, 0.025, -0.4], ['pop', 1.55, 987.77, 0.025, 0.4]],
  tells: [
    { caption: 'two opinions, *one* decision.', draw: rule1, pis: { x: 960, y: 1660 },
      cues: [['pop', 0.2, 880, 0.035, -0.3], ['pop', 0.35, 987.77, 0.035, 0.3], ['whoosh', 1.1, 0.5, 0.025], ['pop', 1.55, 1318.51, 0.045, 0], ['glitter', 1.58, 2.0], ['clap', 1.8, { gain: 0.1 }]] },
    { caption: 'our mugs match… *nearly.*', draw: rule2, pis: { x: 960, y: 1660, look: [-1, -0.8] },
      cues: [['pop', 0.45, 1567.98, 0.035, 0.3], ['whoosh', 0.9, 0.4, 0.02], ['pluck', 1.5, 1174.66, 0.03, 0.3, 0.3]] },
    { caption: 'we say *no*: nicely, but we say it.', draw: rule3, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.15, 987.77, 0.04, 0], ['tick', 0.2, 0.05], ['tick', 0.55, 0.04], ['tick', 0.75, 0.04], ['pluck', 1.35, 1318.51, 0.03, -0.3, 0.3], ['glitter', 1.9, 2.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    mug(x, 300, 980, { col: '#ff8fb1', chip: true, s: 0.8 * ok, steam: 1, t })
  },
  last: 'Kind *and* honest.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp, PINK, RED, MONO]
