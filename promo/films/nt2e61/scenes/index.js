// nt2e61: IN THIS HOUSE WE…, "In This House: Cancer's rules" (20 s vertical, Star Talk Trends Vol. 2 ep 61,
// promo/films/next30/b14.md; music: jazzy · F). Story 0–15.6, then the shared end card. The format: ./house.js on ./t2kit.js.
//   0.0–2.1    hook (frame 0): the sampler "In this house *we…*"; Cancer is mid-stitch on an embroidery hoop.
//   2.1–4.85   RULE 1 "send *leftovers* home with everyone."  Cancer stacks tubs into a guest's arms: one, two… five.
//              Gemini, buckling: "I live next door."
//   4.85–7.6   RULE 2 "name the *houseplants*."  GREG, AUNTIE and LIL BEAN get their tags; Cancer: "night, Greg."
//   7.6        card cut.
//   7.6–10.95  RULE 3 (the twist) "text 'home safe'… from the *mailbox*."  Cancer walks the twelve steps to the mailbox
//              and texts "home safe." Taurus, inside at the window, holds up a phone: "you can SEE me."
//   11.35      the stamp "HOUSE *RULES.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Care, in *every* room."
import { makeHouse, door, plant, mailbox, phoneMsg, sfx, rug, R, box, bubble, shadow, sparkles, hearts, inSprite, starFrame, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, T } from './house.js'

const CANCER = '#9fd8f6'
const FLOOR = 1180

// the embroidery hoop + needle Cancer is stitching at (frame 0 is mid-stitch)
function hoop(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 98, 98, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b07a4e'; x.beginPath(); x.ellipse(0, 0, 90, 90, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f3e9d2'; x.beginPath(); x.ellipse(0, 0, 76, 76, 0, 0, Math.PI * 2); x.fill()
  // a stitched heart, half done
  const H = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
  const done = 0.55 + 0.45 * ((t * 0.25) % 1)
  H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; if ((j * 7 + i) / 42 > done) return; x.fillStyle = RED; x.fillRect(-35 + i * 10, -30 + j * 10, 8, 8) }))
  // the needle bobbing through the cloth, the thread arcing up
  const ph = (t * 1.6) % 1, ny = -10 - 70 * Math.sin(Math.PI * ph)
  x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(20, 10); x.quadraticCurveTo(60, ny - 30, 70, ny); x.stroke()
  R(x, INK, 64, ny - 34, 12, 46); R(x, '#dfe6f0', 67, ny - 31, 6, 40)
  x.restore()
}

// a tower of leftover tubs
function tub(x, cx, cy, col) {
  box(x, cx - 70, cy - 28, 140, 56, col, { b: 5, hi: 'rgba(255,255,255,0.3)' }); R(x, INK, cx - 76, cy - 34, 152, 10); R(x, '#f3e9d2', cx - 70, cy - 30, 140, 6)
}

function rule1(x, t, S) {
  const { u, hero, star } = S
  door(x, 820, FLOOR, { open: 1, col: '#7a4a8a' })
  rug(x, 520, FLOOR + 70, 640)
  shadow(x, 360, FLOOR + 40, 220); shadow(x, 760, FLOOR + 40, 200)
  // five tubs, one every 0.3 s, into the guest's arms
  const n = Math.min(5, Math.floor(prog(u, 0.25, 1.75) * 5 + (u > 0.25 ? 1 : 0)))
  const buckle = clamp((n - 2) / 3)
  const gy = 1000 + buckle * 26 + (n >= 5 ? 6 * Math.sin(t * 22) : 0)
  star('gemini', x, t, { x: 760, y: gy, s: 230, mood: n >= 5 ? 'wide' : n >= 3 ? 'neutral' : 'happy', look: [-1, -0.2], squash: buckle * 0.12, hops: [S.t0 + 2.25] })
  const cols = ['#ff8fb1', '#9fe6b0', '#f2c75c', '#c9a6ff', '#ff9a5c']
  for (let i = 0; i < n; i++) { const k = pop01(t, S.t0 + 0.25 + i * 0.3, 0.2, 2.6); x.save(); x.translate(760, 910 - i * 62 + (1 - k) * -80); x.rotate((i % 2 ? 0.04 : -0.05) + buckle * 0.04 * Math.sin(t * 9 + i)); tub(x, 0, 0, cols[i]); x.restore() }
  hero(x, t, { x: 360, y: 990, s: 250, mood: 'happy', look: [1, -0.3], hops: [S.t0 + 0.3, S.t0 + 0.6, S.t0 + 0.9, S.t0 + 1.2, S.t0 + 1.5] })
  bubble(x, t, 360, 640, S.t0 + 0.9, S.t1, 'take the soup too.', { size: 34, tail: 0.1 })
  bubble(x, t, 740, 420 + 60, S.t0 + 1.95, S.t1, 'I live next door.', { size: 32, col: '#fff1c8', tail: 0.3 })
}

function rule2(x, t, S) {
  const { u, hero } = S
  rug(x, 540, FLOOR + 80, 760, '#3fb08a')
  const tags = ['GREG', 'AUNTIE', 'LIL BEAN'], xs = [220, 540, 860], hs = [190, 240, 120]
  tags.forEach((tg, i) => {
    const at = S.t0 + 0.3 + i * 0.42, k = pop01(t, at, 0.25, 2.4)
    plant(x, t, xs[i], FLOOR + 30, { h: hs[i], tag: k > 0.5 ? tg : null, seed: i * 2, col: ['#3fb08a', '#2e9a6a', '#5fcf9f'][i] })
    sparkles(x, t, xs[i], FLOOR - 60, at, 6, 70, i, [GOLD, BONE])
  })
  // Cancer with a watering can, leaning in to GREG
  const lean = ease.inOutCubic(prog(u, 1.55, 1.9))
  hero(x, t, { x: lerp(640, 380, ease.inOutCubic(prog(u, 0, 0.5))), y: 900, s: 220, mood: u > 1.6 ? 'heart' : 'happy', look: [-1, 0.5], squash: -0.04 * lean, hops: [S.t0 + 0.3, S.t0 + 0.72, S.t0 + 1.14] })
  const cx = lerp(640, 380, ease.inOutCubic(prog(u, 0, 0.5))) - 120
  x.save(); x.translate(cx, 930); x.rotate(-0.35 * lean)
  box(x, -50, -40, 100, 80, '#9fd8f6', { b: 5, hi: '#c9ecfb' }); R(x, INK, -100, -40, 54, 12); R(x, INK, -10, -70, 12, 32); x.restore()
  if (lean > 0.5) for (let i = 0; i < 5; i++) { const ph = (t * 2.4 + i / 5) % 1; R(x, '#8fe3ff', cx - 100 - ph * 20, 900 + ph * 140, 8, 12) }
  bubble(x, t, 470, 600, S.t0 + 1.7, S.t1, 'night, Greg.', { size: 36, tail: -0.3 })
  hearts(x, t, S.t0 + 1.8, 260, 900, { n: 3 })
}

function rule3(x, t, S) {
  const { u, hero, date } = S
  // outside: the porch on the left, the mailbox on the right, footprints between
  R(x, '#16123a', 0, 0, 1080, FLOOR)
  for (let i = 0; i < 30; i++) R(x, `rgba(255,247,220,${0.3 + 0.4 * Math.abs(Math.sin(t * 2 + i))})`, (i * 137) % 1080, 140 + (i * 211) % 700, 5, 5)
  R(x, '#2a3f2e', 0, FLOOR, 1080, 740); R(x, INK, 0, FLOOR, 1080, 8)
  // the house front + its lit window with Taurus inside
  box(x, 0, 520, 420, FLOOR - 520, '#6b4a7a', { b: 8 }); R(x, INK, 0, 500, 440, 24)
  box(x, 90, 640, 220, 200, '#ffe7b0', { b: 8 })
  date(x, t, { x: 200, y: 760, s: 150, mood: u > 2.0 ? 'squint' : 'neutral', look: [1, 0], hops: [S.t0 + 2.0] })
  R(x, INK, 195, 640, 10, 200); R(x, INK, 90, 735, 220, 10)
  box(x, 300, 900, 110, FLOOR - 900, '#7a4a8a', { b: 6 })
  mailbox(x, 860, FLOOR + 20, { flag: 1 })
  // twelve little footprints
  const walk = ease.inOutCubic(prog(u, 0, 0.9))
  for (let i = 0; i < 12; i++) { const fx = 430 + i * 32; if ((fx - 430) / 384 > walk) continue; R(x, 'rgba(239,230,214,0.35)', fx, FLOOR + 30 + (i % 2) * 22, 18, 10) }
  sfx(x, t, '12 STEPS', 620, FLOOR + 120, S.t0 + 0.9, { size: 34, col: BONE, life: 1.4 })
  const hx = lerp(440, 700, walk)
  hero(x, t, { x: hx, y: 1010, s: 220, mood: u > 1.0 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.t0 + 0.2, S.t0 + 0.45, S.t0 + 0.7, S.t0 + 1.25] })
  // Cancer's phone: "home safe."
  if (u > 1.05) {
    const k = pop01(t, S.t0 + 1.05, 0.3, 2.4)
    x.save(); x.translate(hx - 190, 780); x.scale(1.25 * k, 1.25 * k)
    phoneMsg(x, 0, 0, ['SENT', 'home', 'safe.'], { col: '#9fe6b0', rot: 0.06 })
    x.restore()
  }
  bubble(x, t, 260, 560, S.t0 + 2.0, S.t1, 'you can SEE me.', { size: 32, col: '#fff1c8', tail: -0.4 })
}

const EP = makeHouse({
  id: 'nt2e61', sign: 'cancer', name: 'Cancer', date: 'taurus', deep: '#2f7fb0', accent: '#d94a63',
  wall: ['#3b2a55', '#45325f'],
  hook(x, t, S) {
    shadow(x, 540, 1150, 260)
    S.hero(x, t, { x: 470, y: 920, s: 300, mood: t > 1.2 && t < 1.6 ? 'wink' : 'happy', look: [1, 0.4], hops: S.HOPS })
    const F = starFrame(470, 920, 300, t, { hops: S.HOPS, seed: 3 })
    hoop(x, t, 700, F.cy + 10, 1.05)
    hearts(x, t, 0.6, 700, 820, { n: 3 })
  },
  hookCues: [['pluck', 0.3, 1318.51, 0.03, 0.3, 0.3], ['pluck', 0.92, 1567.98, 0.03, 0.3, 0.3]],
  tells: [
    { caption: 'send *leftovers* home with everyone.', draw: rule1, pis: { x: 120, y: 1650, look: [1, -0.6] },
      cues: [0, 1, 2, 3, 4].map(i => ['pop', 0.25 + i * 0.3, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.035, 0.2]).concat([['tick', 2.0, 0.05], ['pop', 1.95, 659.25, 0.03, 0.4]]) },
    { caption: 'name the *houseplants.*', draw: rule2, pis: { x: 960, y: 1660 },
      cues: [['pop', 0.3, 1174.66, 0.035, -0.4], ['pop', 0.72, 1318.51, 0.035, 0], ['pop', 1.14, 1567.98, 0.035, 0.4], ['glitter', 1.8, 2.3], ['pluck', 1.72, 1174.66, 0.03, 0.4, 0.2]] },
    { caption: 'text “home safe”… from the *mailbox.*', draw: rule3, outside: true, pis: { x: 940, y: 1660 }, stickerAt: 0.5,
      cues: [['tick', 0.2, 0.04], ['tick', 0.45, 0.04], ['tick', 0.7, 0.04], ['pop', 1.05, 1567.98, 0.04, 0.2], ['tick', 1.1, 0.06], ['pop', 2.0, 659.25, 0.035, -0.4], ['pop', 2.06, 523.25, 0.03, -0.4]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 900, s: 220, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    tub(x, 690, 780, '#ff8fb1')
  },
  last: 'Care, in *every* room.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [inSprite, outK, BONE, GOLD, PINK, INTER, CANCER]
