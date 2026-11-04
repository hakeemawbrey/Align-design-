// nrde15: RATE MY DATE IDEA, "Gemini plans a night market" (16 s vertical trial reel, music: house · E).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Night market. We try *everything.*”  ♊ Gemini juggles skewers and dumplings under string lights.
//   2.6–5.8   THE PLAN "eight snacks. *nonstop* talking."  Gemini zips between stalls, arms piling up; speech bubbles
//             stack up faster than the ♎ Libra date can answer.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "one bench. *one* dumpling."  They sit on a bench; Gemini splits one dumpling in two; the bubbles
//             slow down to one each; heart eyes.
//   9.32      THE STARS RATE IT 8/10 *one bite at a time*.  Pisces: 10/10.   9.8 THE STARS: "Slow down for the *good* part."
import { makeDate, R, box, bubble, shadow, hearts, card, fairyLights, floor, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function skewer(x, cx, cy, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -4, -70, 8, 140); R(x, '#e9cf9a', -2, -68, 4, 136)
  for (let i = 0; i < 3; i++) box(x, -18, -60 + i * 36, 36, 28, ['#c9583a', '#9fd36a', '#f2a63c'][i], { b: 4 })
  x.restore()
}
function dumpling(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 28, 0, Math.PI, 0); x.lineTo(40, 6); x.lineTo(-40, 6); x.closePath(); x.fill()
  x.fillStyle = '#fbf3e0'; x.beginPath(); x.ellipse(0, 0, 34, 22, 0, Math.PI, 0); x.closePath(); x.fill()
  for (let i = -2; i <= 2; i++) R(x, '#e2d4b4', i * 10 - 2, -18 + Math.abs(i) * 4, 4, 10)
  x.restore()
}
function stalls(x, t, y = 640) {
  fairyLights(x, t, 40, y, 1040, y, { n: 14, sag: 50 })
  for (let i = 0; i < 3; i++) {
    const cx = 190 + i * 350
    box(x, cx - 140, y + 140, 280, 240, '#3a2d66', { b: 6 })
    R(x, INK, cx - 160, y + 100, 320, 50); for (let j = 0; j < 6; j++) R(x, j % 2 ? ['#ff8fb1', '#7fd0ff', '#ffd36b'][i] : BONE, cx - 154 + j * 51, y + 106, 51, 38)
    box(x, cx - 110, y + 200, 220, 70, '#ffd98c', { b: 5 })
  }
  x.save(); x.globalAlpha = 0.35; R(x, '#05030c', 0, y + 100, 1080, 300); x.restore()
}
function bench(x, cx, by, w = 520) { box(x, cx - w / 2, by - 60, w, 26, '#8a5a3a', { b: 6 }); R(x, INK, cx - w / 2 + 30, by - 34, 18, 34); R(x, INK, cx + w / 2 - 48, by - 34, 18, 34) }

const EP = makeDate({
  id: 'nrde15', sign: 'gemini', date: 'libra', accent: '#ffd36b', deep: '#a7740f',
  idea: 'Night market. We try *everything.*',
  hook(x, t, S) {
    stalls(x, t, 600)
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    shadow(x, 540, 1340, 240)
    S.hero(x, t, { x: 540, y: 1150, s: 280, mood: 'happy', look: [0, -1], hops: S.HOOK_HOPS })
    for (let i = 0; i < 4; i++) { const a = t * 4 + i * Math.PI / 2, px = 540 + Math.cos(a) * 170, py = 930 - Math.sin(a) * 110; i % 2 ? dumpling(x, px, py, 1.3) : skewer(x, px, py, a, 1.2) }
  },
  beats: [
    { caption: 'eight snacks. *Nonstop* talking.', draw(x, t, S) {
      const { u, hero, date } = S
      stalls(x, t, 560)
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      const n = Math.min(8, 1 + Math.floor(u / 0.32))
      const hx = 300 + Math.sin(u * 4) * 120
      shadow(x, hx, 1190, 170)
      hero(x, t, { x: hx, y: 1050, s: 180, mood: 'happy', look: [1, 0], hops: Array.from({ length: 8 }, (_, i) => S.t0 + i * 0.32) })
      for (let i = 0; i < n; i++) i % 2 ? dumpling(x, hx - 60 + (i % 4) * 40, 920 - Math.floor(i / 2) * 34, 0.6) : skewer(x, hx - 60 + (i % 4) * 40, 900 - Math.floor(i / 2) * 34, 0.3 - i * 0.1, 0.6)
      shadow(x, 860, 1190, 160)
      date(x, t, { x: 860, y: 1060, s: 170, mood: u > 1.6 ? 'wide' : 'happy', look: [-1, -0.4] })
      ;['omg try this', 'and THIS', 'wait, the dog!', 'ok but hear me out'].forEach((s, i) => bubble(x, t, [340, 640, 360, 640][i], [600, 680, 760, 840][i], S.t0 + 0.3 + i * 0.55, S.t1, s, { size: 28, tail: i % 2 ? -0.4 : 0.2 }))
    }, cues: Array.from({ length: 8 }, (_, i) => ['tick', +(i * 0.32).toFixed(2), 0.04]).concat([0, 1, 2, 3].map(i => ['pop', +(0.3 + i * 0.55).toFixed(2), [880, 987.77, 1174.66, 1318.51][i], 0.03, i % 2 ? 0.3 : -0.3])) },
    { caption: 'one bench. *One* dumpling.', draw(x, t, S) {
      const { u, hero, date } = S
      stalls(x, t, 560)
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      bench(x, 540, 1180)
      shadow(x, 400, 1190, 150); shadow(x, 680, 1190, 150)
      hero(x, t, { x: 410, y: 1045, s: 170, mood: u < 1.6 ? 'happy' : 'heart', look: [1, 0], hops: [S.t0 + 1.0] })
      date(x, t, { x: 670, y: 1045, s: 170, mood: u < 1.6 ? 'happy' : 'heart', look: [-1, 0], hops: [S.t0 + 1.1] })
      // one dumpling, split in two
      const sp = ease.inOutCubic(prog(u, 0.6, 1.1))
      if (sp < 0.01) dumpling(x, 540, 900, 1.1)
      else { x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); dumpling(x, 540 - 40 * sp, 900, 1.1); x.restore(); x.save(); x.beginPath(); x.rect(540, 0, 540, 1920); x.clip(); dumpling(x, 540 + 40 * sp, 900, 1.1); x.restore() }
      bubble(x, t, 380, 720, S.t0 + 1.3, S.t1, 'so… how are YOU?', { size: 32, tail: 0.2 })
      hearts(x, t, S.t0 + 1.7, 540, 860, { n: 5 })
    }, cues: [['tick', 0.6, 0.05], ['pop', 1.0, 880, 0.035, 0], ['pop', 1.32, 987.77, 0.03, -0.3], ['pluck', 1.7, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '8/10', word: 'one bite at a time',
  last: 'Slow down for the *good* part.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, PINK, card]
