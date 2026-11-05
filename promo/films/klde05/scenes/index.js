// klde05: ZODIAC LIE DETECTOR, "I Didn’t Plan What to Say" (15 s vertical, star_talk post, chiptune · B). Loops.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: planned tonight’s *call?*  → no, I’ll wing it. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: did you write *‘laugh casually’?*  → it’s a stage direction. → TRUTH.
//   11.70      last line: Spontaneous. | *Draft four.*

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#1a1a34', '#24244a')
  box(x, 250, 380, 600, 860, '#f4ecd8', { b: 10 })
  box(x, 450, 340, 200, 70, '#9a7a5a', { b: 6 })
  const L = ['CALL SCRIPT', '1. say hi (warmly)', '2. ask about their day', '3. (laugh casually)', '4. mention the weather', '5. don’t mention the weather', '6. goodbye (not too fast)']
  L.forEach((l, i) => { if (S.u > 0.15 + i * 0.22) label(x, l, i ? 285 : 550, 470 + i * 92, { size: i ? 30 : 42, maxW: 540, col: i === 3 ? RED : INK, align: i ? 'left' : 'center', font: i ? MONO : INTER, weight: 800 }) })
  if (S.u > 1.7) { const k = pop01(t, S.f.at + 1.7, 0.2, 3); x.save(); x.translate(720, 1150); x.rotate(-0.2); x.scale(k, k); x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-130, -45, 260, 90); label(x, 'DRAFT 4', 0, 0, { size: 46, col: RED, font: INTER, weight: 800 }); x.restore() }
  S.hero(x, t, { x: 170, y: 1400, s: 230, mood: 'squint', look: [1, -1] })
}

const EP = makeLD({
  id: 'klde05', sign: 'virgo', len: 15, ending: 'loop',
  music: { style: 'chiptune', key: 'B', seed: 2305 },
  hook: "“I didn’t *plan* | what to say.”",
  qs: [
    { t: 1.4, q: "planned tonight’s *call?*", a: "no, I’ll wing it.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *a script.*", draw: truth } },
    { t: 7.0, q: "did you write *‘laugh casually’?*", a: "it’s a stage direction.", v: 'truth', m: ['squint', 'happy'], a2: "(it says “warmly.”)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sob* so prepared", end: 11.65 },
  last: { t: 11.70, text: "Spontaneous. | *Draft four.*", size: 88 },
  
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
