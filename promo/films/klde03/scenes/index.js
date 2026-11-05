// klde03: ZODIAC LIE DETECTOR, "Not Waiting for the Text" (14 s vertical, star_talk post, synthwave · F#m). Loops.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: waiting for a *reply?*  → who? no. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: check it *now?*  → …one sec. → TRUTH.
//   10.70      last line: Not waiting. | *Just* refreshing.

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#120e26', '#1c1638')
  // a giant phone at full brightness, a thumb pulling to refresh
  const u = S.u
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 900, 50, 540, 900, 700); g.addColorStop(0, 'rgba(200,230,255,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 200, 1080, 1400); x.restore()
  box(x, 300, 420, 480, 900, '#2a2148', { b: 10 }); R(x, '#f2f6ff', 324, 470, 432, 800)
  label(x, 'messages', 540, 520, { size: 34, col: INK, font: INTER, weight: 800 })
  label(x, 'no new messages', 540, 760, { size: 30, col: '#6a6488' })
  const pull = 60 * Math.abs(Math.sin(u * 5))
  for (let i = 0; i < 8; i++) { const a = u * 8 + i * 0.785; R(x, i < 4 ? INK : '#9a94b8', 540 + Math.cos(a) * 34 - 5, 620 + pull * 0.4 + Math.sin(a) * 34 - 5, 10, 10) }
  // the thumb
  box(x, 600, 820 + pull, 130, 260, '#f2b38a', { b: 7, hi: '#ffd2b0' })
  // the buzz: a notification… it's the weather
  if (u > 1.4) {
    const k = pop01(t, S.f.at + 1.4, 0.3, 2)
    x.save(); x.translate(540, 980); x.scale(k, k); box(x, -200, -60, 400, 120, '#ffffff', { b: 6 }); label(x, 'WEATHER', 0, -26, { size: 22, col: '#6a6488' }); label(x, 'light snow tonight ❄', 0, 16, { size: 28, col: INK, font: INTER, weight: 800 }); x.restore()
  }
  S.hero(x, t, { x: 180, y: 1400, s: 240, mood: u > 1.5 ? 'squint' : 'wide', look: [1, -1] })
}

const EP = makeLD({
  id: 'klde03', sign: 'gemini', len: 14, ending: 'loop',
  music: { style: 'synthwave', key: 'F#m', seed: 2303 },
  hook: "“I’m *not* waiting | for their text.”",
  qs: [
    { t: 1.4, q: "waiting for a *reply?*", a: "who? no.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *refresh, refresh…*", draw: truth } },
    { t: 7.0, q: "check it *now?*", a: "…one sec.", v: 'truth', m: ['squint', 'happy'], a2: "(refresh.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.10, text: "*sniff* checking mine too", end: 10.65 },
  last: { t: 10.70, text: "Not waiting. | *Just* refreshing.", size: 88 },
  prop(x, t, S) {if (!S.F) return; const F = S.F; const px = F.ox + F.S * 0.42, py = F.oy - F.base + F.S * 0.05 + (S.chaos ? 20 * Math.sin(t * 40) : 0)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py, 5, px, py, 120); g.addColorStop(0, 'rgba(200,230,255,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(px - 120, py - 120, 240, 240); x.restore()
  box(x, px - 30, py - 50, 60, 100, '#2a2148', { b: 5 }); R(x, '#e8f0ff', px - 24, py - 42, 48, 84)},
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
