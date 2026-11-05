// klde07: ZODIAC LIE DETECTOR, "Ready to Settle Down" (15 s vertical, star_talk post, house · G). Loops.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: ready to *settle down?*  → so ready. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: where’s tonight’s *date?*  → a new city. it’s romantic. → TRUTH.
//   11.70      last line: Settling down. | *Somewhere new.*

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#1a2236', '#24304a')
  // the door, a packed suitcase, a map with pins
  box(x, 640, 420, 320, 780, '#7a5038', { b: 10, hi: '#9a6a4a' }); R(x, GOLD, 690, 800, 26, 26)
  box(x, 120, 440, 420, 300, '#e9dcb8', { b: 8 })
  x.strokeStyle = '#9ab0d8'; x.lineWidth = 6; x.beginPath(); x.moveTo(150, 600); x.bezierCurveTo(250, 480, 360, 700, 510, 560); x.stroke()
  ;[[180, 520], [300, 640], [420, 520], [480, 690]].forEach(([a, b], i) => { if (S.u > 0.2 + i * 0.25) { R(x, INK, a - 10, b - 10, 20, 20); R(x, RED, a - 7, b - 7, 14, 14) } })
  box(x, 300, 980, 330, 220, '#e8344e', { b: 8, hi: '#ff6b7f' }); box(x, 420, 940, 90, 40, '#5a2632', { b: 6 })
  box(x, 360, 940, 110, 30, '#2a6a8a', { b: 4 }); label(x, 'PASSPORT', 415, 955, { size: 14, col: GOLD })
  S.hero(x, t, { x: 230, y: 1300, s: 230, mood: 'sparkle', look: [1, -0.5], hops: [S.f.at + 0.5, S.f.at + 1.1, S.f.at + 1.7] })
}

const EP = makeLD({
  id: 'klde07', sign: 'sagittarius', len: 15, ending: 'loop',
  music: { style: 'house', key: 'G', seed: 2307 },
  hook: "“I’m *ready* to | settle down.”",
  qs: [
    { t: 1.4, q: "ready to *settle down?*", a: "so ready.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *bags packed.*", draw: truth } },
    { t: 7.0, q: "where’s tonight’s *date?*", a: "a new city. it’s romantic.", v: 'truth', m: ['squint', 'happy'], a2: "(the date doesn’t know yet.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sob* take me with you", end: 11.65 },
  last: { t: 11.70, text: "Settling down. | *Somewhere new.*", size: 88 },
  prop(x, t, S) {if (!S.F || !S.chaos) return; const F = S.F; drawBits(x, ['MMMMMM', 'MBMMGM', 'MMBMMM', 'MMMMMM'], { M: '#e9dcb8', B: '#9ab0d8', G: RED }, F.ox + 170 + 30 * Math.sin(t * 20), F.oy - F.base - 120, 18, { rot: t * 4 })},
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
