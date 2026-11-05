// klde09: ZODIAC LIE DETECTOR, "Their “ok” Means Ok" (16 s vertical, star_talk post, synthwave · Am). Loops.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: overthinking their *text?*  → nope. calm. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: what does *‘ok’* mean?  → …ok? → TRUTH.
//   12.70      last line: Sometimes ok | just means *ok.*

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#141a30', '#1e2644')
  box(x, 90, 400, 900, 760, '#b58a5a', { b: 10, hi: '#c99a68' })
  const notes = [['ok', 230, 520], ['OK', 760, 500], ['k.', 520, 700], ['ok!', 260, 900], ['okay', 800, 880], ['ok…?', 520, 1050]]
  const vis = notes.filter((n, i) => S.u > 0.15 + i * 0.2)
  x.strokeStyle = RED; x.lineWidth = 5
  for (let i = 1; i < vis.length; i++) { x.beginPath(); x.moveTo(vis[i - 1][1], vis[i - 1][2]); x.lineTo(vis[i][1], vis[i][2]); x.stroke() }
  for (const [n, a, b] of vis) { box(x, a - 90, b - 60, 180, 120, '#fff3a0', { b: 5 }); label(x, n, a, b, { size: 46, col: INK, font: INTER, weight: 800 }); R(x, RED, a - 8, b - 72, 16, 16) }
  S.hero(x, t, { x: 880, y: 1380, s: 230, mood: 'wide', look: [-1, -1] })
}

const EP = makeLD({
  id: 'klde09', sign: 'aquarius', len: 16, ending: 'loop',
  music: { style: 'synthwave', key: 'Am', seed: 2309 },
  hook: "“I’m *not* overthinking | their ‘ok.’”",
  qs: [
    { t: 1.4, q: "overthinking their *text?*", a: "nope. calm.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *the theory board.*", draw: truth } },
    { t: 7.0, q: "what does *‘ok’* mean?", a: "…ok?", v: 'truth', m: ['squint', 'happy'], a2: "(…ok.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sob* ok is ok!!", end: 12.65 },
  last: { t: 12.70, text: "Sometimes ok | just means *ok.*", size: 88 },
  prop(x, t, S) {if (!S.F || !S.chaos) return; for (let i = 0; i < 5; i++) { const p = ((t * 1.5 + i / 5) % 1); drawBits(x, ['YYYY', 'YKKY', 'YYYY'], { Y: '#fff3a0', K: INK }, S.F.ox - 200 + i * 90, S.F.oy - S.F.base - 100 - 300 * p, 12, { rot: t * 5 + i }) }},
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
