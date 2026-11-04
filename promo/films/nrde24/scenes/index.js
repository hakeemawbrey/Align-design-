// nrde24: RATE MY DATE IDEA, "Pisces plans letters out loud" (18 s vertical trial reel, music: dreamy · C).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
// (Pisces is the pitcher here, so the crying is front and centre instead of in the background.)
//   0.0–2.6   hook: “We write letters. Then read them *out loud.*”  ♓ Pisces at a desk, a long letter trailing off it, sniffling.
//   2.6–5.8   THE PLAN "Pisces' letter: *nine pages.* soggy."  The pages pile up, PAGE 1… PAGE 9, tear drops on each.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date's letter: *two lines.*"  The ♉ Taurus date unfolds one small card and reads:
//             "you make ordinary days feel warm. I'm glad it's you."  Pisces fountains; so does the date.
//   9.32      THE STARS RATE IT 10/10 *soggy paper*.   9.8 THE STARS: "Say the soft thing *out loud*."
import { makeDate, R, box, bubble, shadow, hearts, card, table, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function page(x, cx, cy, rot, n, wet = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -80, -100, 160, 200, '#fbf6ea', { b: 5 })
  for (let i = 0; i < 7; i++) R(x, '#8a8fb8', -60, -76 + i * 24, 110 - (i % 3) * 18, 5)
  if (wet) for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(-30 + i * 34, -20 + (i % 2) * 50, 14, 0, Math.PI * 2); x.fillStyle = 'rgba(120,190,240,0.45)'; x.fill() }
  if (n) { x.font = "800 22px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(String(n), 56, 86) }
  x.restore()
}

const EP = makeDate({
  id: 'nrde24', sign: 'pisces', date: 'taurus', accent: '#c9b3ff', deep: '#5a3fa8', badge: '#b3a6ff',
  idea: 'We write letters. Then read them *out loud.*',
  hook(x, t, S) {
    table(x, 600, 1300, 840, '#6b4a2f')
    for (let i = 0; i < 4; i++) page(x, 640 + i * 70, 1200 - i * 8, -0.2 + i * 0.12, 0, 1)
    shadow(x, 330, 1310, 220)
    S.hero(x, t, { x: 330, y: 1080, s: 290, mood: 'sparkle', look: [1, 0.5], hops: S.HOOK_HOPS, tears: 2 })
  },
  beats: [
    { caption: 'Pisces’ letter: *nine pages.* Soggy.', draw(x, t, S) {
      const { u, hero } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      const n = Math.min(9, 1 + Math.floor(u / 0.3))
      for (let i = 0; i < n; i++) page(x, 420 + (i % 5) * 90, 1060 - Math.floor(i / 5) * 60 - (i % 2) * 10, -0.25 + (i % 5) * 0.12, i + 1, 1)
      card(x, 760, 740, 220, 76, `PAGE ${n}`, { size: 40, rot: 0.05, k: pop01(t, S.t0 + 0.1, 0.3, 2.4) })
      shadow(x, 180, 1180, 150)
      hero(x, t, { x: 180, y: 1030, s: 180, mood: 'sparkle', look: [1, 0.4], tears: u < 1.4 ? 2 : 3, hops: Array.from({ length: 9 }, (_, i) => S.t0 + i * 0.3) })
    }, cues: Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.3).toFixed(2), 0.04]).concat([['pop', 0.12, 880, 0.03, 0.3]]) },
    { caption: 'their date’s letter: *two lines.*', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      for (let i = 0; i < 5; i++) page(x, 440 + i * 26, 1110 - i * 6, -0.1 + i * 0.05, 0, 1)
      shadow(x, 260, 1180, 150); shadow(x, 820, 1180, 150)
      hero(x, t, { x: 260, y: 1000, s: 170, mood: 'sparkle', look: [1, -0.3], tears: u < 1.3 ? 2 : 3, hops: [S.t0 + 1.4, S.t0 + 2.1] })
      date(x, t, { x: 820, y: 1000, s: 170, mood: u < 1.6 ? 'happy' : 'sparkle', look: [-1, 0.3], tears: u < 1.6 ? 0 : 3, hops: [S.t0 + 0.3, S.t0 + 1.7] })
      const k = pop01(t, S.t0 + 0.2, 0.35, 2)
      card(x, 540, 790, 600, 150, 'you make ordinary days feel warm.\nI’m glad it’s you.', { size: 34, k, rot: -0.02 })
      hearts(x, t, S.t0 + 1.7, 600, 1060, { n: 6 })
    }, cues: [['pop', 0.22, 880, 0.04, 0], ['bell', 0.4, 1318.51, 0.03, 1.4, 0], ['pluck', 1.45, 1567.98, 0.035, -0.3, 0.3], ['pluck', 1.75, 1975.53, 0.03, 0.3, 0.3]] },
  ],
  score: '10/10', word: 'soggy paper',
  last: 'Say the soft thing *out loud*.',
  finale(x, t, S) {
    const { hero, date, ok, FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 400, y: 880, s: 250, pop: ok, mood: 'sparkle', look: [1, 0], hops: FIN_HOPS, tears: 3 })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], tears: 2, hops: [9.42, 11.5] })
    const ck = pop01(t, 10.15, 0.3, 2.6) * ok
    if (ck > 0.01) card(x, 900, 1140, 170, 96, '11/10', { size: 50, ink: '#e8344e', k: ck, rot: 0.08 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, GOLD, PINK, bubble, lerp, ease, prog]
