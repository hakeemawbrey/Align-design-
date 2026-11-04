// nt2e62: IN THIS HOUSE WE…, "In This House: an Aries and Virgo home" (18 s vertical, Star Talk Trends Vol. 2 ep 62,
// promo/films/next30/b14.md; music: jazzy · G). Story 0–15.6, then the shared short end card. Format: ../../nt2e61/scenes/house.js.
//   0.0–2.1    hook (frame 0): the sampler "In this house *we…*"; Aries mid-sprint (speed lines), Virgo with a label maker.
//   2.1–4.85   RULE 1 "*race* to the door… then hold it open."  Aries wins the dash (WIN!), then bows and holds the
//              door for Virgo: "after you."
//   4.85–7.6   RULE 2 "label the *chaos* drawer."  Aries flings odds and ends in; Virgo prints the label: CHAOS, SORTED.
//   7.6–10.95  RULE 3 (the twist) "fight *fair*: snacks first, then a talk card."  Both sulk on the couch; a snack bowl
//              lands between them; munch, munch; a talk card flips up: "What do you need from me right now?" Both melt.
//   11.35      the stamp "HOUSE *RULES.*"  Pisces holds up a 10/10, fountaining (it cried at the talk card).
//   11.95      THE STARS: "Fair fights, *full* snack bowl."
import { makeHouse, door, couch, drawer, rug, sfx, R, box, bubble, label, shadow, sparkles, hearts, confetti, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, SERIF, MONO, T } from '../../nt2e61/scenes/house.js'

const FLOOR = 1180

function labelMaker(x, cx, cy, rot = 0, tape = 0, text = '') {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -50, -70, 100, 140, '#f2c75c', { b: 5, hi: '#ffe08a' }); R(x, INK, -34, -50, 68, 40); R(x, '#9fe6b0', -28, -44, 56, 28)
  for (let i = 0; i < 6; i++) R(x, INK, -32 + (i % 3) * 24, 8 + Math.floor(i / 3) * 24, 16, 14)
  if (tape > 0) {
    x.font = `700 22px ${MONO}`; const w = Math.max(40, x.measureText(text).width + 20) * tape
    R(x, INK, 46, -84, w + 6, 34); R(x, '#fffdf4', 48, -82, w, 30)
    x.save(); x.beginPath(); x.rect(48, -82, w, 30); x.clip(); x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, 58, -66); x.restore()
  }
  x.restore()
}

function speedLines(x, t, cx, cy, n = 5, len = 160) {
  for (let i = 0; i < n; i++) { const ph = (t * 3 + i * 0.37) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); R(x, BONE, cx - 120 - ph * 120 - len, cy - 80 + i * 36, len * (1 - ph * 0.5), 8); x.restore() }
}

function talkCard(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04 + 0.03 * Math.sin(t * 2)); x.scale(k, k)
  box(x, -200, -130, 400, 260, '#1e1540', { b: 8 })
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-184, -114, 368, 228)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -86)
  x.font = `italic 500 38px ${SERIF}`; x.fillStyle = BONE
  text.forEach((l, i) => x.fillText(l, 0, -30 + i * 44))
  x.restore()
}

function snackBowl(x, t, cx, cy, n = 1) {
  for (let i = 0; i < 10 * n; i++) { const a = (i * 2.4) % Math.PI; R(x, ['#f2c75c', '#ff9a5c', '#ffe08a'][i % 3], cx - 70 + (i * 37) % 140, cy - 34 - Math.sin(a) * 26, 22, 18) }
  box(x, -90 + cx, cy - 30, 180, 60, '#ff8fb1', { b: 6, hi: '#ffb3c9' })
  void t
}

function rule1(x, t, S) {
  const { u, hero, date } = S
  door(x, 820, FLOOR, { open: ease.inOutCubic(prog(u, 1.0, 1.3)), col: '#4f7cd8' })
  rug(x, 480, FLOOR + 70, 640, '#c9a6ff')
  const run = ease.inCubic(prog(u, 0.05, 0.75))
  const ax = lerp(160, 640, run)
  if (u < 0.8) speedLines(x, t, ax, 990)
  shadow(x, ax, FLOOR + 30, 200)
  hero(x, t, { x: ax, y: 1000, s: 220, mood: u < 0.8 ? 'squint' : u < 1.2 ? 'happy' : 'sparkle', look: [1, 0], squash: u > 0.75 && u < 0.95 ? 0.12 : 0, hops: [S.t0 + 0.8, S.t0 + 1.4] })
  sfx(x, t, 'WIN!', 620, 760, S.t0 + 0.8, { size: 60, col: GOLD, rot: -0.12, life: 0.6 })
  sparkles(x, t, 640, 900, S.t0 + 0.8, 8, 140, 1)
  // Virgo strolls in behind, then through the held door
  const vx = lerp(-120, 820, ease.inOutCubic(prog(u, 0.6, 2.5)))
  date(x, t, { x: vx, y: 1010, s: 200, mood: u > 1.9 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.1, S.t0 + 1.5, S.t0 + 1.9] })
  bubble(x, t, 600, 640, S.t0 + 1.3, S.t1, 'after you.', { size: 36, tail: 0.1 })
  if (u > 2.0) hearts(x, t, S.t0 + 2.0, 820, 860, { n: 3 })
}

function rule2(x, t, S) {
  const { u, hero, date } = S
  rug(x, 540, FLOOR + 70, 600, '#9fe6b0')
  drawer(x, 540, 890, { labelText: u > 1.7 ? 'CHAOS, SORTED' : null })
  shadow(x, 220, FLOOR + 30, 180); shadow(x, 860, FLOOR + 30, 180)
  // Aries flings odds and ends into the top drawer
  const items = [['#ff9a5c', 30, 10], ['#9fd8f6', 14, 40], ['#f2c75c', 40, 14], ['#ff8fb1', 20, 20], ['#9fe6b0', 26, 26]]
  items.forEach(([c, w, h], i) => {
    const a = S.t0 + 0.2 + i * 0.22, p = prog(t, a, a + 0.45)
    if (p <= 0 || p >= 1) return
    const px = lerp(260, 520, p), py = lerp(860, 860, p) - 220 * Math.sin(Math.PI * p)
    x.save(); x.translate(px, py); x.rotate(p * 8 + i); box(x, -w, -h, w * 2, h * 2, c, { b: 4 }); x.restore()
  })
  hero(x, t, { x: 220, y: 1000, s: 200, mood: u < 1.6 ? 'happy' : 'wide', look: [1, -0.4], hops: [S.t0 + 0.2, S.t0 + 0.42, S.t0 + 0.64, S.t0 + 0.86, S.t0 + 1.08, S.t0 + 1.75] })
  date(x, t, { x: 860, y: 1000, s: 200, mood: u > 1.8 ? 'sparkle' : 'squint', look: [-1, 0], hops: [S.t0 + 1.3, S.t0 + 1.8] })
  const tape = clamp(prog(u, 1.15, 1.7))
  labelMaker(x, 760, 900, -0.15, u < 1.75 ? tape : 0, 'CHAOS, SORTED')
  if (u > 1.7) sparkles(x, t, 540, 830, S.t0 + 1.72, 8, 170, 2, [GOLD, BONE])
  bubble(x, t, 760, 620, S.t0 + 1.9, S.t1, 'perfect.', { size: 36, tail: 0.3 })
}

function rule3(x, t, S) {
  const { u, hero, date } = S
  rug(x, 540, FLOOR + 80, 800, '#c85a6e')
  couch(x, 540, 1110, { col: '#5a7a4f', w: 560 })
  const bowlK = pop01(t, S.t0 + 0.6, 0.3, 2.4)
  const sulk = u < 0.6, munch = u > 0.9 && u < 1.6
  hero(x, t, { x: 390, y: 960, s: 200, mood: sulk ? 'squint' : munch ? 'happy' : u > 2.0 ? 'heart' : 'neutral', look: sulk ? [-1, 0] : [1, -0.4], hops: [S.t0 + 0.95, S.t0 + 1.2, S.t0 + 1.45, S.t0 + 2.1] })
  date(x, t, { x: 690, y: 960, s: 200, mood: sulk ? 'squint' : munch ? 'happy' : u > 2.0 ? 'heart' : 'neutral', look: sulk ? [1, 0] : [-1, -0.4], hops: [S.t0 + 1.05, S.t0 + 1.3, S.t0 + 1.55, S.t0 + 2.15] })
  if (sulk) { label(x, 'hmph.', 270, 800, { size: 34, font: INTER, weight: 800, col: BONE, rot: -0.1 }); label(x, 'hmph.', 810, 800, { size: 34, font: INTER, weight: 800, col: BONE, rot: 0.1 }) }
  if (bowlK > 0.01) { x.save(); x.translate(540, 1030); x.scale(bowlK, bowlK); snackBowl(x, t, 0, 0); x.restore() }
  if (munch) { sfx(x, t, 'munch', 430, 780, S.t0 + 0.95, { size: 30, col: GOLD, rot: -0.1, life: 0.5 }); sfx(x, t, 'munch', 650, 760, S.t0 + 1.25, { size: 30, col: GOLD, rot: 0.1, life: 0.5 }) }
  const ck = pop01(t, S.t0 + 1.65, 0.35, 2.2)
  talkCard(x, t, 540, 640, ck * 1.3, ['What do you need', 'from me right now?'])
  if (u > 2.0) hearts(x, t, S.t0 + 2.05, 540, 880, { n: 5 })
}

const EP = makeHouse({
  id: 'nt2e62', sign: 'aries', name: 'Aries', date: 'virgo', deep: '#c0392b', accent: '#d94a63',
  wall: ['#2d3a5a', '#34436a'],
  hook(x, t, S) {
    shadow(x, 360, 1150, 240); shadow(x, 800, 1160, 200)
    const ax = 360 + 18 * Math.sin(t * 9)
    speedLines(x, t, ax, 930)
    S.hero(x, t, { x: ax, y: 930, s: 290, mood: 'squint', look: [1, 0], squash: -0.06 * Math.abs(Math.sin(t * 9)), hops: [0.1, 0.4, 0.7, 1.0, 1.3, 1.6, 1.9] })
    S.date(x, t, { x: 800, y: 960, s: 220, mood: t > 1.2 ? 'eyeroll' : 'neutral', look: [-1, 0], hops: [1.2] })
    labelMaker(x, 680, 960, -0.2, clamp(prog(t, 0.3, 1.4)), 'RACE ZONE')
  },
  hookCues: [['tick', 0.1, 0.04], ['tick', 0.4, 0.04], ['tick', 0.7, 0.04], ['tick', 1.0, 0.04]],
  tells: [
    { caption: '*race* to the door… then hold it open.', draw: rule1, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['whoosh', 0.05, 0.6, 0.04], ['pop', 0.8, 1567.98, 0.045, 0.2], ['glitter', 0.8, 1.2], ['tick', 1.0, 0.05], ['pop', 1.3, 880, 0.03, 0]] },
    { caption: 'label the *chaos* drawer.', draw: rule2, pis: { x: 960, y: 1660 },
      cues: [0, 1, 2, 3, 4].map(i => ['tick', 0.2 + i * 0.22, 0.04]).concat([['riser', 1.15, 0.55, 0.012], ['pop', 1.72, 1318.51, 0.04, 0.3], ['glitter', 1.72, 2.1]]) },
    { caption: 'fight *fair*: snacks first, then a talk card.', draw: rule3, pis: { x: 940, y: 1670, tears: 3 },
      cues: [['pop', 0.6, 659.25, 0.04, 0], ['tick', 0.95, 0.04], ['tick', 1.25, 0.04], ['tick', 1.5, 0.04], ['whoosh', 1.6, 0.3, 0.03], ['pop', 1.68, 1174.66, 0.04, 0], ['glitter', 1.7, 2.2], ['pluck', 2.05, 1567.98, 0.03, 0.3, 0.2]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 410, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 410, y: 880, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'happy' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    x.save(); x.translate(545, 1050); x.scale(ok * 0.8, ok * 0.8); snackBowl(x, t, 0, 0); x.restore()
  },
  last: 'Fair fights, *full* snack bowl.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [confetti, outK, PINK, RED]
