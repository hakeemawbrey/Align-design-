// nt2e78: LITTLE TREAT, "Little Treat: Capricorn logged off" (20 s vertical, Star Talk Trends Vol. 2 ep 78,
// promo/films/next30/b14.md; music: chiptune · E). Story 0–15.6, then the shared end card. Format: ../../nt2e76/scenes/treat.js.
//   0.0–2.1    hook (frame 0): "Little treat for | *logging off.*"  Capricorn snapping a laptop shut, the clock at 6:00 PM.
//   2.1–4.85   WIN 1 "left work *on time* for a date."  6:00 PM on the dot; out the door at a sprint. → a pretzel.
//   4.85–7.6   WIN 2 "phone face *down* at dinner."  A buzz… Capricorn flips the phone over and looks at Virgo instead.
//              → a cocoa.
//   7.6        card cut.
//   7.6–10.95  WIN 3 (the twist) "let someone else *plan.*"  Virgo: "I planned tonight. even the treat." Capricorn, no
//              clipboard, just smiling. → a donut, from Virgo.
//   11.35      the stamp "TREAT *EARNED.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Off the clock, *on* the date."
import { makeTreat, FLOOR, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from '../../nt2e76/scenes/treat.js'
import { table } from '../../nt2e61/scenes/house.js'

function laptop(x, cx, cy, close) {
  box(x, cx - 160, cy, 320, 24, '#8a8aa0', { b: 5 })
  x.save(); x.translate(cx, cy); x.scale(1, Math.max(0.04, 1 - close))
  box(x, -150, -200, 300, 200, '#5a5a70', { b: 5 }); R(x, '#9fe6b0', -132, -184, 264, 168)
  x.restore()
}
function clock(x, cx, cy, text = '6:00 PM') {
  box(x, cx - 130, cy - 50, 260, 100, '#1b1236', { b: 6 })
  x.font = `700 48px ${MONO}`; x.fillStyle = '#ff5c7a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, cx, cy + 4)
}
function phone(x, cx, cy, flip, t, buzz) {
  x.save(); x.translate(cx + (buzz ? 4 * Math.sin(t * 60) : 0), cy); x.scale(Math.cos(Math.PI * flip) || 0.02, 1)
  box(x, -40, -70, 80, 140, '#2a2148', { b: 5 }); R(x, Math.cos(Math.PI * flip) > 0 ? '#7fd0ff' : '#3a3058', -32, -60, 64, 120)
  x.restore()
}

const tells = [
  { caption: 'left work *on time* for a date.', treat: 'pretzel',
    draw(x, t, S) {
      const { u, hero } = S
      clock(x, 300, 620, '6:00 PM')
      table(x, 300, FLOOR, { w: 360, h: 200 })
      laptop(x, 300, 980, 1)
      const run = ease.inCubic(prog(u, 0.3, 1.1))
      const hx = lerp(560, 1250, run)
      for (let i = 0; i < 4; i++) if (u > 0.3 && u < 1.1) R(x, 'rgba(239,230,214,0.6)', hx - 200 - i * 40, 930 + i * 30, 140, 8)
      hero(x, t, { x: hx, y: 1000, s: 220, mood: 'happy', look: [1, 0], squash: -0.06, hops: [0.3, 0.5, 0.7, 0.9].map(v => S.t0 + v) })
      label(x, 'BYE!', 820, 760, { size: 56 * pop01(t, S.t0 + 0.35, 0.2, 3) * outK(t, [S.t0 + 1.2, S.t0 + 1.4]), font: INTER, weight: 800, col: GOLD, rot: -0.1, alpha: u > 0.35 ? 1 : 0 })
    },
    treatPos: [700, 820], pis: { x: 960, y: 1660 },
    cues: [['bell', 0.05, 1760, 0.03, 0.6, 0], ['whoosh', 0.3, 0.8, 0.04], ['pop', 0.35, 1318.51, 0.04, 0.3]] },
  { caption: 'phone face *down* at dinner.', treat: 'cocoa',
    draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, FLOOR, { w: 560, h: 220 })
      const flip = ease.inOutCubic(prog(u, 0.7, 1.0))
      phone(x, 540, 900, flip, t, u > 0.2 && u < 0.7)
      if (u > 0.2 && u < 0.7) label(x, 'bzz', 600, 800, { size: 36, font: INTER, weight: 800, col: BONE, rot: 0.1 })
      hero(x, t, { x: 260, y: 920, s: 220, mood: u < 1.0 ? 'squint' : 'happy', look: u < 1.0 ? [1, 0.6] : [1, 0], hops: [S.t0 + 1.0] })
      date(x, t, { x: 820, y: 920, s: 210, mood: u > 1.1 ? 'heart' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.15] })
      bubble(x, t, 300, 680, S.t0 + 1.1, S.t1, 'so. tell me everything.', { size: 30, tail: -0.2 })
    },
    treatPos: [560, 560], pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['pop', 0.2, 220, 0.03, 0.2], ['pop', 0.32, 220, 0.03, 0.2], ['pop', 0.44, 220, 0.03, 0.2], ['tick', 1.0, 0.06], ['pop', 1.1, 880, 0.03, -0.3]] },
  { caption: 'let someone else *plan.*', treat: 'donut', treatAt: 2.0,
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 780, FLOOR + 30, 200)
      date(x, t, { x: 780, y: 1000, s: 220, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 1.9] })
      // Virgo's itinerary card
      x.save(); x.translate(780, 720); x.rotate(0.05); box(x, -120, -90, 240, 180, BONE, { b: 5 })
      x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
      ;['7:00 noodles', '8:30 walk', '9:00 treat ✓'.replace(' ✓', '')].forEach((l, i) => x.fillText(l, -100, -50 + i * 46)); x.restore()
      bubble(x, t, 640, 520, S.t0 + 0.5, S.t1, 'I planned tonight. even the treat.', { size: 28, tail: 0.4 })
      hero(x, t, { x: 300, y: 1000, s: 230, mood: u > 1.2 ? 'heart' : 'wide', look: [1, -0.3], hops: [S.t0 + 1.2] })
      if (u > 1.2) hearts(x, t, S.t0 + 1.25, 300, 880, { n: 4 })
    },
    treatPos: [480, 700], pis: { x: 960, y: 1660 },
    cues: [['pop', 0.4, 1174.66, 0.035, 0.3], ['pop', 0.5, 880, 0.03, 0.3], ['pluck', 1.2, 1567.98, 0.035, -0.3, 0.3]] },
]

const EP = makeTreat({
  id: 'nt2e78', sign: 'capricorn', name: 'Capricorn', date: 'virgo', deep: '#2f6a5a', accent: '#ffd23f',
  hookText: 'Little treat for | *logging off.*',
  hook(x, t, S) {
    clock(x, 300, 620, '6:00 PM')
    table(x, 540, FLOOR, { w: 440, h: 200 })
    laptop(x, 540, 980, clamp(prog(t, 0.2, 0.55)))
    S.hero(x, t, { x: 820, y: 960, s: 250, mood: t > 0.55 ? 'happy' : 'squint', look: [-1, 0.4], hops: [0.55, 1.2] })
    sparkles(x, t, 540, 960, 0.56, 8, 140, 1, [GOLD, BONE])
  },
  hookCues: [['tick', 0.55, 0.08], ['pop', 0.57, 1318.51, 0.035, 0]],
  tells,
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    hero(x, t, { x: 420, y: 700, s: 230, pop: ok, mood: 'sparkle', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 710, s: 210, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Off the clock, *on* the date.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, PINK, RED]
