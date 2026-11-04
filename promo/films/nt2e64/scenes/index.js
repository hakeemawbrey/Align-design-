// nt2e64: IN THIS HOUSE WE…, "In This House: Capricorn's calendar" (18 s vertical, Star Talk Trends Vol. 2 ep 64,
// promo/films/next30/b14.md; music: jazzy · Bb). Story 0–15.6, then the shared short end card. Format: ../../nt2e61/scenes/house.js.
//   0.0–2.1    hook (frame 0): the sampler "In this house *we…*"; Capricorn pins up a wall calendar, a pen in its mouth.
//   2.1–4.85   RULE 1 "Sunday is *planning* day."  The week fills with colour blocks, tick tick tick; Leo dozes off.
//   4.85–7.6   RULE 2 "the chore chart gives *gold stars.*"  Stars land on Leo's row… and Capricorn awards itself one.
//   7.6–10.95  RULE 3 (the twist) "one night a week with *no plans.*"  Friday says NOTHING, circled twice. Capricorn
//              on the couch in striped socks, snoozing; Leo tucks a blanket over it: "look at you, resting."
//   11.35      the stamp "HOUSE *RULES.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Rest is on the *schedule.*"
import { makeHouse, calendar, couch, rug, sfx, R, box, bubble, label, shadow, sparkles, hearts, drawPixelStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from '../../nt2e61/scenes/house.js'

const FLOOR = 1180
const BLOCKS = ['#ff8fb1', '#9fe6b0', '#7fd0ff', '#f2c75c', '#c9a6ff', '#ff9a5c']

function pen(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -6, -6, 120, 18); R(x, '#e8344e', 0, -2, 80, 10); R(x, BONE, 80, -2, 30, 10); x.restore() }

function rule1(x, t, S) {
  const { u, hero, date } = S
  const filled = Math.floor(prog(u, 0.2, 1.8) * 12)
  const marks = {}
  for (let n = 0; n < 14; n++) {
    const key = `${Math.floor(n / 7)}${n % 7}`
    if (n < filled) marks[key] = (x2, cx, cy, cw) => { R(x2, INK, cx - cw / 2 + 6, cy - 30, cw - 12, 60); R(x2, BLOCKS[n % 6], cx - cw / 2 + 9, cy - 27, cw - 18, 54) }
  }
  calendar(x, t, 540, 720, { marks, w: 560, h: 380, title: 'THE WEEK' })
  hero(x, t, { x: 260, y: 1010, s: 210, mood: 'squint', look: [1, -0.8], hops: Array.from({ length: 8 }, (_, i) => S.t0 + 0.25 + i * 0.2) })
  pen(x, 360, 940, -0.7 + 0.2 * Math.sin(t * 14))
  date(x, t, { x: 830, y: 1020, s: 200, mood: u > 1.4 ? 'sleepy' : 'neutral', look: [-1, -0.6], hops: [S.t0 + 0.2] })
  shadow(x, 260, FLOOR + 30, 200); shadow(x, 830, FLOOR + 30, 180)
}

function chart(x, t, S, rows) {
  box(x, 220, 520, 640, 380, BONE, { b: 8 })
  R(x, '#3fb08a', 220, 520, 640, 70)
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('CHORE CHART', 540, 557)
  rows.forEach((r, j) => {
    const y = 640 + j * 120
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText(r.name, 250, y)
    for (let i = 0; i < 4; i++) { const X = 450 + i * 96; R(x, 'rgba(27,18,54,0.15)', X - 40, y - 44, 84, 88)
      const at = r.at[i]; if (at !== undefined) { const k = pop01(t, S.t0 + at, 0.25, 2.8); if (k > 0.01) drawPixelStar(x, X + 2, y, 150 * k, 2, GOLD) } }
  })
}
function rule2(x, t, S) {
  const { u, hero, date } = S
  chart(x, t, S, [{ name: 'LEO', at: [0.3, 0.55, 0.8] }, { name: 'CAP', at: [1.6] }])
  hero(x, t, { x: 230, y: 1030, s: 200, mood: u > 1.6 ? 'sparkle' : 'happy', look: [1, -0.8], hops: [S.t0 + 0.3, S.t0 + 0.55, S.t0 + 0.8, S.t0 + 1.6, S.t0 + 1.9] })
  date(x, t, { x: 850, y: 1030, s: 200, mood: u > 1.65 ? 'wide' : 'sparkle', look: [-1, -0.6], hops: [S.t0 + 0.45, S.t0 + 0.7, S.t0 + 0.95] })
  sparkles(x, t, 450, 760, S.t0 + 1.6, 8, 90, 1)
  bubble(x, t, 330, 1220 - 380, S.t0 + 1.75, S.t1, 'earned it.', { size: 36, tail: -0.3 })
  shadow(x, 230, FLOOR + 30, 190); shadow(x, 850, FLOOR + 30, 190)
}

function socks(x, cx, cy, s = 1) {
  for (const d of [-1, 1]) { x.save(); x.translate(cx + d * 34 * s, cy); x.scale(s, s); box(x, -16, -36, 32, 60, BONE, { b: 4 }); for (let i = 0; i < 3; i++) R(x, RED, -16, -30 + i * 18, 32, 8); box(x, -16, 18, 46, 22, BONE, { b: 4 }); x.restore() }
}
function rule3(x, t, S) {
  const { u, hero, date } = S
  // the calendar, with Friday circled: NOTHING
  const marks = { '04': (x2, cx, cy) => { x2.font = `800 17px ${INTER}`; x2.fillStyle = INK; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillText('NOTHING', cx, cy)
    const k = clamp(prog(u, 0.35, 0.9)); x2.strokeStyle = RED; x2.lineWidth = 5; for (let r = 0; r < 2; r++) { x2.beginPath(); x2.ellipse(cx, cy, 44 + r * 6, 30 + r * 4, 0.1 * r, 0, Math.PI * 2 * k); x2.stroke() } } }
  for (const k of ['00', '01', '02', '03', '05', '06', '10', '11', '12', '13', '14', '15', '16']) marks[k] = (x2, cx, cy, cw) => { R(x2, 'rgba(27,18,54,0.25)', cx - cw / 2 + 9, cy - 22, cw - 18, 44) }
  const zoom = 1 + 0.45 * ease.inOutCubic(prog(u, 0.2, 0.9)) - 0.45 * ease.inOutCubic(prog(u, 1.2, 1.6))
  x.save(); x.translate(540, 600); x.scale(zoom, zoom); x.translate(-540, -600)
  calendar(x, t, 540, 600, { marks, w: 520, h: 340, title: 'THIS WEEK' })
  x.restore()
  rug(x, 540, FLOOR + 80, 760, '#3fb08a')
  couch(x, 540, 1110, { col: '#7a4a8a', w: 600 })
  hero(x, t, { x: 470, y: 980, s: 210, mood: u > 1.2 ? 'sleepy' : 'happy', look: [0, 0], squash: 0.06, hops: [S.t0 + 0.3] })
  socks(x, 330, 1040, 0.9)
  date(x, t, { x: 760, y: 970, s: 200, mood: u > 1.8 ? 'heart' : 'happy', look: [-1, 0.3], hops: [S.t0 + 1.4, S.t0 + 1.8] })
  // a blanket tucked over Capricorn
  const bk = ease.outCubic(prog(u, 1.3, 1.7))
  if (bk > 0) { x.save(); x.globalAlpha = bk; box(x, 330, 1010 - 30 * (1 - bk), 300, 90, '#f2c75c', { b: 6, hi: '#ffe08a' }); for (let i = 0; i < 4; i++) R(x, '#ff8fb1', 350 + i * 70, 1030 - 30 * (1 - bk), 30, 50); x.restore() }
  bubble(x, t, 700, 760, S.t0 + 1.8, S.t1, 'look at you, resting.', { size: 32, tail: 0.2 })
}

const EP = makeHouse({
  id: 'nt2e64', sign: 'capricorn', name: 'Capricorn', date: 'leo', deep: '#5e4a8a', accent: '#d94a63',
  wall: ['#3a3a4a', '#424256'],
  hook(x, t, S) {
    const drop = ease.outCubic(prog(t, -0.5, 0.6))
    calendar(x, t, 600, 680 - 40 * (1 - drop), { w: 480, h: 340, title: 'THIS WEEK' })
    sparkles(x, t, 600, 520, 0.55, 6, 90, 1, [GOLD, BONE])
    S.hero(x, t, { x: 300, y: 980, s: 280, mood: 'squint', look: [1, -0.7], hops: S.HOPS })
    pen(x, 330, 990, 0.1 + 0.05 * Math.sin(t * 6))
    // a pushpin going in
    const pk = pop01(t, 0.5, 0.2, 3); if (pk > 0.01) { R(x, INK, 590, 500, 22, 22); R(x, RED, 593, 503, 16, 16) }
    shadow(x, 300, 1150, 240)
  },
  hookCues: [['tick', 0.5, 0.07], ['pop', 0.55, 1318.51, 0.03, 0]],
  tells: [
    { caption: 'Sunday is *planning* day.', draw: rule1, pis: { x: 960, y: 1660 },
      cues: Array.from({ length: 12 }, (_, i) => ['tick', 0.2 + i * 0.13, 0.035]).concat([['pop', 1.45, 523.25, 0.025, 0.4]]) },
    { caption: 'the chore chart gives *gold stars.*', draw: rule2, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.3, 1174.66, 0.035, 0.3], ['pop', 0.55, 1318.51, 0.035, 0.3], ['pop', 0.8, 1567.98, 0.035, 0.3], ['pop', 1.6, 1760, 0.045, -0.2], ['glitter', 1.6, 2.0]] },
    { caption: 'one night a week with *no plans.*', draw: rule3, pis: { x: 960, y: 1660 },
      cues: [['riser', 0.2, 0.7, 0.012], ['tick', 0.9, 0.05], ['whoosh', 1.3, 0.35, 0.02], ['pluck', 1.8, 1174.66, 0.03, 0.3, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'happy' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    socks(x, 420, 1040, 0.8 * ok)
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Rest is on the *schedule.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, hearts, outK, lerp, PINK, MONO]
