// ngfe13: 24 DAYS OF GREEN FLAGS, door 13: "Scrapes the frost off your car." (18 s vertical, pop · G)
//   hook "Frosty morning. | *Who's outside?*" · Taurus peeks out of a frosted window: Aries is already scraping its
//   windshield, ice flakes flying (SCRITCH SCRITCH). Aries: "your car's ready!" Taurus presses its face to the glass:
//   "…it's 7 AM??" Last: "*Clear* view ahead."
import { makeDoor, snowGround, snowfall, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, SNOW, prog, ease, lerp, clamp } from '../../ngfe01/scenes/advent.js'
function car(x, cx, base, frost) {
  // body
  box(x, cx - 330, base - 150, 660, 110, '#4f7cd8', { b: 7, hi: '#6f9cf0' })
  box(x, cx - 200, base - 270, 330, 120, '#4f7cd8', { b: 7 })
  // windows: windshield on the right, frosted by `frost` (cleared from left to right)
  R(x, '#bfe8ff', cx - 180, base - 252, 130, 96)
  R(x, '#bfe8ff', cx - 30, base - 252, 140, 96)
  const fw = 140 * frost
  R(x, SNOW, cx - 30 + (140 - fw), base - 252, fw, 96)
  if (frost > 0.02) for (let i = 0; i < 5; i++) R(x, '#dde8ff', cx - 30 + (140 - fw) + ((i * 29) % Math.max(1, fw)), base - 240 + i * 16, 18, 6)
  R(x, SNOW, cx - 200, base - 284, 330, 16)
  for (const d of [-0.3, 0.3]) { R(x, INK, cx + d * 660 - 50, base - 60, 100, 70); R(x, '#5a5470', cx + d * 660 - 26, base - 36, 52, 28) }
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  snowGround(x, 1180)
  snowfall(x, t, { n: 30, h: 1200, speed: 30, seed: 13 })
  // the house window (top left), Taurus inside
  box(x, 70, 260, 380, 330, '#3a2a60', { b: 10 })
  R(x, '#ffd98a', 82, 272, 356, 306)
  const peek = ease.outBack(prog(u, 0.3, 0.8))
  x.save(); x.beginPath(); x.rect(82, 272, 356, 306); x.clip()
  mate(x, t, { x: 260, y: lerp(720, 470, peek), s: 220, mood: u < 1.6 ? 'sleepy' : u < 4.3 ? 'wide' : 'heart', look: [1, 0.4], hops: [S.t0 + 1.6, S.t0 + 4.3], zzz: false, squash: u > 4.3 ? -0.08 : 0 })
  x.restore()
  const fog = 0.4 * (1 - prog(u, 0.9, 1.4))
  R(x, `rgba(230,240,255,${fog})`, 82, 272, 356, 306)
  R(x, '#5a4680', 254, 272, 12, 306); R(x, '#5a4680', 82, 420, 356, 12)
  // the car + Aries scraping
  const frost = 1 - ease.inOutQuad(prog(u, 0.6, 3.2))
  car(x, 560, 1210, frost)
  const scraping = u > 0.6 && u < 3.2
  const sx = 640 + (scraping ? 40 * Math.sin(t * 16) : 0)
  shadow(x, 900, 1210, 200)
  hero(x, t, { x: 900, y: 1040, s: 230, mood: scraping ? 'squint' : 'sparkle', look: [-1, -0.6], hops: [S.t0 + 3.25, S.t0 + 3.5] })
  // the scraper
  x.save(); x.translate(sx, 1000); x.rotate(-0.5); box(x, -12, -20, 24, 90, '#ffd23a', { b: 4 }); box(x, -40, -40, 80, 22, '#e8344e', { b: 4 }); x.restore()
  if (scraping) {
    for (let i = 0; i < 8; i++) { const p = (t * 1.6 + i / 8) % 1; R(x, SNOW, sx - 20 + Math.sin(i * 3) * 80 * p, 990 - 120 * p + 260 * p * p, 10, 10) }
    label(x, 'SCRITCH SCRITCH', 640, 820, { size: 30, col: '#bfe8ff', rot: -0.05 })
  }
  if (u > 4.3) hearts(x, t, S.t0 + 4.35, 260, 420, { n: 4 })
  bubble(x, t, 800, 760, S.t0 + 3.3, S.t1 - 0.2, "your car's\nready!", { size: 44, tail: 0.3 })
  bubble(x, t, 300, 680, S.t0 + 4.4, S.t1 - 0.2, "…it's 7 AM??", { size: 40, tail: -0.1, col: '#ffe0c2', tailUp: true })
  void GOLD; void BONE; void clamp
}
const EP = makeDoor({
  day: 13, hero: 'aries', mate: 'taurus', hook: "Frosty morning. | *Who's outside?*",
  flag: 'scrapes the *frost* off your car.', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['pop', 0.4, 659.25, 0.03, -0.4], ...Array.from({ length: 12 }, (_, i) => ['tick', +(0.7 + i * 0.2).toFixed(2), 0.04]), ['whoosh', 0.7, 0.4, 0.02], ['whoosh', 2.0, 0.4, 0.02],
    ['bell', 3.2, 1760, 0.03, 1, 0.3], ['pop', 3.3, 1174.66, 0.045, 0.3], ['pop', 4.35, 880, 0.04, -0.4], ['pluck', 4.4, 1567.98, 0.035, 0.5, -0.4]],
  last: '*Clear* view ahead.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
