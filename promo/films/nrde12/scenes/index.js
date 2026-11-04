// nrde12: RATE MY DATE IDEA, "Pisces plans an aquarium night" (16 s vertical trial reel, music: dreamy · E).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
// (Pisces is the pitcher here, so the crying is front and centre instead of in the background.)
//   0.0–2.6   hook: “The aquarium. At *night.*”  ♓ Pisces pressed to a glowing blue tank, already teary.
//   2.6–5.8   THE PLAN "look at the *jellyfish.*"  Jellyfish drift and glow; Pisces sniffles harder; the ♏ Scorpio
//             date plays it cool.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their date cries *too.*"  The jellyfish pulse; the Scorpio date's eyes well up; one tissue pops out
//             of the box: they share it. Both fountain.
//   9.32      THE STARS RATE IT 10/10 *both cried*.   9.8 THE STARS: "Find someone who *feels* it too."
import { makeDate, R, box, bubble, shadow, hearts, card, starFrame, inSprite, tearsCells, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function tank(x, t, x0, y0, w, h) {
  box(x, x0, y0, w, h, '#0e3a6a', { b: 8 })
  const g = x.createLinearGradient(0, y0, 0, y0 + h); g.addColorStop(0, '#1f74b8'); g.addColorStop(1, '#0b2e5a')
  x.fillStyle = g; x.fillRect(x0, y0, w, h)
  for (let i = 0; i < 6; i++) { const p = (t * 0.25 + i / 6) % 1; R(x, 'rgba(255,255,255,0.18)', x0 + 40 + ((i * 131) % (w - 80)), y0 + h - p * h, 10, 10) }
  for (let i = 0; i < 5; i++) { const px = x0 + 40 + i * (w - 80) / 4; R(x, '#2f8a5a', px, y0 + h - 90 - (i % 2) * 40, 14, 90 + (i % 2) * 40) }
  x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(120,200,255,0.08)'; x.fillRect(x0 - 60, y0 - 60, w + 120, h + 120); x.restore()
}
function jelly(x, t, cx, cy, s, col, seed) {
  const pulse = 1 + 0.12 * Math.sin(t * 3 + seed), dy = Math.sin(t * 1.2 + seed) * 20
  x.save(); x.translate(cx, cy + dy); x.scale(s * pulse, s / pulse)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 4, 0, 0, 90); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.globalAlpha = 0.5; x.fillStyle = g; x.fillRect(-90, -90, 180, 180); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, Math.PI, 0); x.lineTo(46, 6); x.lineTo(-46, 6); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 40, Math.PI, 0); x.closePath(); x.fill()
  for (let i = 0; i < 5; i++) { const tx = -32 + i * 16; for (let j = 0; j < 5; j++) R(x, col, tx + Math.sin(t * 3 + i + j * 0.8) * 5, 6 + j * 14, 5, 12) }
  x.restore()
}
const JC = ['#ffb3e6', '#b3e6ff', '#d9b3ff']
function jellies(x, t, x0, y0, w, h, n = 3) { for (let i = 0; i < n; i++) jelly(x, t, x0 + w * (0.22 + i * 0.28), y0 + h * (0.3 + (i % 2) * 0.22), 0.9 + (i % 2) * 0.3, JC[i % 3], i * 2.1) }
function tissueBox(x, cx, by) { box(x, cx - 60, by - 60, 120, 60, '#9fd8f6', { b: 5, hi: '#c9ecfb' }); R(x, INK, cx - 26, by - 64, 52, 8) }

const EP = makeDate({
  id: 'nrde12', sign: 'pisces', date: 'scorpio', accent: '#b3e6ff', deep: '#2a6aa8', badge: '#b3a6ff',
  idea: 'The aquarium. At *night.*',
  hook(x, t, S) {
    tank(x, t, 120, 620, 840, 660)
    jelly(x, t, 260, 820, 1.1, JC[0], 0); jelly(x, t, 820, 860, 1.2, JC[1], 2.1); jelly(x, t, 560, 720, 0.8, JC[2], 4.2)
    shadow(x, 540, 1340, 240)
    S.hero(x, t, { x: 540, y: 1120, s: 300, mood: 'sparkle', look: [0, -1], hops: S.HOOK_HOPS, tears: 2 })
  },
  beats: [
    { caption: 'look at the *jellyfish.*', draw(x, t, S) {
      const { u, hero, date } = S
      tank(x, t, 80, 560, 920, 600)
      jellies(x, t, 80, 560, 920, 600, 3)
      shadow(x, 330, 1200, 170); shadow(x, 760, 1200, 170)
      hero(x, t, { x: 330, y: 1060, s: 200, mood: 'sparkle', look: [0, -1], hops: [S.t0 + 0.6, S.t0 + 1.8], tears: u < 1.5 ? 2 : 3 })
      date(x, t, { x: 760, y: 1060, s: 190, mood: 'squint', look: [-1, 0], hops: [S.t0 + 1.0] })
      bubble(x, t, 330, 830, S.t0 + 0.6, S.t0 + 1.7, 'they’re so peaceful…', { size: 32 })
      bubble(x, t, 760, 830, S.t0 + 1.8, S.t1, 'I’m fine. it’s fine.', { size: 32, tail: 0.2 })
    }, cues: [['bell', 0.1, 1318.51, 0.025, 1.4, -0.3], ['pop', 0.62, 880, 0.03, -0.3], ['pop', 1.82, 739.99, 0.03, 0.3]] },
    { caption: 'their date cries *too.*', draw(x, t, S) {
      const { u, hero, date } = S
      tank(x, t, 80, 560, 920, 600)
      jellies(x, t, 80, 560, 920, 600, 3)
      tissueBox(x, 540, 1200)
      // one tissue rises out of the box and stretches between them
      const k = pop01(t, S.t0 + 1.2, 0.35, 2)
      if (k > 0.01) { const y = lerp(1140, 1000, ease.outCubic(prog(u, 1.2, 1.6))); R(x, INK, 420, y - 6, 240, 60); R(x, '#ffffff', 426, y, 228, 48); R(x, '#e8eef8', 426, y + 30, 228, 18) }
      shadow(x, 320, 1200, 170); shadow(x, 760, 1200, 170)
      hero(x, t, { x: 320, y: 1060, s: 190, mood: 'sparkle', look: [1, -0.4], tears: 3, hops: [S.t0 + 1.3, S.t0 + 2.0] })
      date(x, t, { x: 760, y: 1060, s: 190, mood: u < 0.6 ? 'squint' : 'sparkle', look: [-1, -0.4], tears: u < 0.6 ? 0 : u < 1.2 ? 2 : 3, hops: [S.t0 + 0.6, S.t0 + 1.35, S.t0 + 2.05] })
      card(x, 540, 640, 330, 80, 'ONE TISSUE', { size: 40, k: pop01(t, S.t0 + 1.3, 0.3, 2.4), rot: -0.04 })
      hearts(x, t, S.t0 + 2.0, 540, 940, { n: 5 })
    }, cues: [['pop', 0.62, 659.25, 0.03, 0.3], ['whoosh', 1.2, 0.3, 0.02], ['pop', 1.32, 1174.66, 0.04, 0], ['pluck', 2.0, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '10/10', word: 'both cried',
  last: 'Find someone who *feels* it too.',
  finale(x, t, S) {
    const { hero, date, ok, FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 400, y: 880, s: 250, pop: ok, mood: 'sparkle', look: [1, 0], hops: FIN_HOPS, tears: 3 })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'sparkle', look: [-1, 0], tears: 3, hops: [9.42, 11.5] })
    // Pisces holds the 11/10 card itself
    const ck = pop01(t, 10.15, 0.3, 2.6) * ok
    if (ck > 0.01) card(x, 900, 1140, 170, 96, '11/10', { size: 50, ink: '#e8344e', k: ck, rot: 0.08 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, GOLD, PINK, starFrame, inSprite, tearsCells]
