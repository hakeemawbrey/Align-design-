// nrde02: RATE MY DATE IDEA, "Taurus plans a soup crawl" (18 s vertical trial reel, music: lofi · Db).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A *soup crawl.* Four soups. One night.”  ♉ Taurus stirs a huge steaming pot with a ladle.
//   2.6–5.8   THE PLAN "Four bowls. *Zero* regrets."  Four bowls slide in, one by one; Taurus beams, SOUP 1/4 → 4/4.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date is *full* after two."  The ♍ Virgo date leans back, stuffed; Taurus just smiles and
//             pours soups three and four into jars with lids: "for later!"
//   9.32      THE STARS RATE IT 9/10 *hearty*.  Pisces: 10/10.   9.8 THE STARS: "Let your date set the *pace*."
import { makeDate, R, box, bubble, label, shadow, hearts, card, mug, table, pop01, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function steam(x, t, cx, cy, n = 4, w = 90, a = 0.5) {
  for (let i = 0; i < n; i++) { const p = ((t * 0.7 + i / n) % 1); x.save(); x.globalAlpha = a * Math.sin(Math.PI * p); R(x, BONE, cx - w / 2 + (i * w) / (n - 1) + Math.sin(t * 2.5 + i) * 10, cy - p * 110, 12, 26); x.restore() }
}
function pot(x, t, cx, cy) {
  box(x, cx - 150, cy - 150, 300, 150, '#5b6c8f', { b: 7, hi: '#8193b8' })
  R(x, INK, cx - 190, cy - 140, 40, 20); R(x, INK, cx + 150, cy - 140, 40, 20)
  R(x, '#e8a23c', cx - 140, cy - 150, 280, 18)
  steam(x, t, cx, cy - 170, 5, 220, 0.55)
}
function bowl(x, t, cx, cy, col, k = 1, full = 1, steamOn = true) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (full > 0) { R(x, INK, -84, -76, 168, 34); R(x, col, -78, -70, 156, 30); R(x, 'rgba(255,255,255,0.35)', -60, -66, 40, 8) }
  else R(x, INK, -84, -50, 168, 10)
  box(x, -92, -44, 184, 60, '#efe6d6', { b: 6, hi: '#ffffff' }); R(x, '#d8574f', -92, -20, 184, 10); R(x, INK, -50, 22, 100, 10)
  x.restore()
  if (steamOn && full > 0) steam(x, t, cx, cy - 90, 3, 80, 0.5 * k)
}
function jar(x, cx, cy, col, fill, lid) {
  box(x, cx - 44, cy - 110, 88, 110, 'rgba(200,236,255,0.35)', { b: 5 })
  R(x, col, cx - 44, cy - 110 * fill, 88, 110 * fill)
  R(x, 'rgba(255,255,255,0.4)', cx - 34, cy - 100, 10, 80)
  if (lid > 0.01) box(x, cx - 50, cy - 132 - (1 - lid) * 80, 100, 22, GOLD, { b: 5 })
}
function ladle(x, t, o) {
  const a = Math.sin(t * 6) * 0.35
  x.save(); x.translate(o.x + o.s * 0.42, o.y - o.s * 0.05); x.rotate(0.5 + a)
  R(x, INK, -8, -10, 16, 200); R(x, '#c9cfe0', -4, -6, 8, 190)
  box(x, -36, 186, 72, 34, '#c9cfe0', { b: 5 })
  x.restore()
}
const SOUPS = ['#e8a23c', '#d9573f', '#9fd36a', '#f2d16b']

const EP = makeDate({
  id: 'nrde02', sign: 'taurus', date: 'virgo', accent: '#7fd38a', deep: '#2f7a3a',
  idea: 'A *soup crawl.* Four soups. One night.',
  hook(x, t, S) {
    table(x, 540, 1360, 900, '#6b4a2f')
    pot(x, t, 720, 1360)
    shadow(x, 360, 1350, 220)
    const o = { x: 360, y: 1120, s: 300, mood: 'sparkle', look: [1, 0.3], hops: S.HOOK_HOPS }
    S.hero(x, t, o); ladle(x, t, o)
  },
  beats: [
    { caption: 'Four bowls. *Zero* regrets.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1130, 1000, '#6b4a2f')
      const n = Math.max(1, Math.min(4, 1 + Math.floor((u - 0.15) / 0.6)))
      SOUPS.forEach((c, i) => bowl(x, t, 180 + i * 240, 1125, c, pop01(t, S.t0 + 0.15 + i * 0.6, 0.3, 2.4)))
      shadow(x, 320, 1000, 200); shadow(x, 760, 1000, 200)
      hero(x, t, { x: 330, y: 830, s: 230, mood: 'heart', look: [0, 1], hops: [0.15, 0.75, 1.35, 1.95].map(v => S.t0 + v + 0.05) })
      date(x, t, { x: 760, y: 840, s: 210, mood: u > 1.7 ? 'wide' : 'happy', look: [-1, 0.6], hops: [S.t0 + 1.8] })
      card(x, 540, 640, 260, 86, `SOUP ${n}/4`, { size: 46, rot: -0.04, k: pop01(t, S.t0 + 0.2, 0.3, 2.4) })
    }, cues: [0.15, 0.75, 1.35, 1.95].map((v, i) => ['pop', v, [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.3 : -0.3]) },
    { caption: 'their date is *full* after two.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1130, 1000, '#6b4a2f')
      bowl(x, t, 160, 1125, SOUPS[0], 1, 0, false); bowl(x, t, 320, 1125, SOUPS[1], 1, 0, false)
      // the date: leaning back, stuffed
      shadow(x, 250, 1000, 190)
      date(x, t, { x: 250, y: 850, s: 210, mood: u < 0.9 ? 'sleepy' : 'happy', squash: 0.12, look: [1, 0], zzz: false, hops: [S.t0 + 1.0] })
      bubble(x, t, 250, 640, S.t0 + 0.3, S.t0 + 1.6, 'I am… so full.', { size: 34, tail: 0 })
      // Taurus pours the last two soups into jars
      const p3 = prog(u, 1.0, 1.8), p4 = prog(u, 1.8, 2.6)
      jar(x, 620, 1130, SOUPS[2], 0.85 * ease.outCubic(p3), pop01(t, S.t0 + 1.9, 0.25, 2))
      jar(x, 780, 1130, SOUPS[3], 0.85 * ease.outCubic(p4), pop01(t, S.t0 + 2.7, 0.25, 2))
      shadow(x, 900, 1000, 170)
      hero(x, t, { x: 920, y: 860, s: 200, mood: 'happy', look: [-1, 0.5], hops: [S.t0 + 1.0, S.t0 + 1.9, S.t0 + 2.7] })
      bubble(x, t, 740, 700, S.t0 + 1.9, S.t1, 'for later!', { size: 36, tail: 0.5 })
      hearts(x, t, S.t0 + 2.8, 250, 760, { n: 4 })
    }, cues: [['pop', 0.32, 659.25, 0.03, -0.3], ['riser', 1.0, 0.8, 0.012], ['tick', 1.92, 0.05], ['riser', 1.8, 0.8, 0.012], ['tick', 2.72, 0.05], ['pop', 1.95, 1174.66, 0.04, 0.3], ['pluck', 2.85, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '9/10', word: 'hearty',
  last: 'Let your date set the *pace*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, mug, lerp, clamp, PINK]
