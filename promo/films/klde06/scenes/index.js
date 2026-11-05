// klde06: ZODIAC LIE DETECTOR, "Anywhere’s Fine" (16 s vertical, star_talk post, jazzy · Bb). Hard cut on the last line.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: where do you want to *eat?*  → anywhere’s fine! → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: so… *noodles?*  → not noodles. → TRUTH.
//   14.30      last line: Anywhere’s fine. | *Except* everywhere.

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#2a1a30', '#3a2440')
  const names = ['NOODLES', 'TACOS', 'SUSHI', 'PIZZA', 'CURRY', 'SALAD', 'DUMPLINGS', 'BURGERS', 'PHO']
  names.forEach((n, i) => {
    const cx = 220 + (i % 3) * 320, cy = 480 + Math.floor(i / 3) * 260
    box(x, cx - 130, cy - 90, 260, 180, '#f4ecd8', { b: 6 })
    label(x, n, cx, cy - 40, { size: 30, col: INK, font: INTER, weight: 800, maxW: 230 })
    if (S.u > 0.3 + i * 0.18) label(x, i === 5 ? '✓?' : '✗', cx, cy + 30, { size: 64, col: i === 5 ? MINT : RED, font: INTER, weight: 800 })
  })
  S.hero(x, t, { x: 540, y: 1360, s: 260, mood: S.u > 1.8 ? 'squint' : 'neutral', look: [Math.sin(t * 3), -1] })
  label(x, 'PROS / CONS: 14 pages', 540, 1600, { size: 34, col: GOLD })
}

const EP = makeLD({
  id: 'klde06', sign: 'libra', len: 16, ending: 'cut',
  music: { style: 'jazzy', key: 'Bb', seed: 2306 },
  hook: "“Honestly, *anywhere’s* | fine for dinner.”",
  qs: [
    { t: 1.4, q: "where do you want to *eat?*", a: "anywhere’s fine!", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *the menu wall.*", draw: truth } },
    { t: 7.0, q: "so… *noodles?*", a: "not noodles.", v: 'truth', m: ['squint', 'happy'], a2: "(or anything near noodles.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sniff* I like noodles", end: 14.25 },
  last: { t: 14.30, text: "Anywhere’s fine. | *Except* everywhere.", size: 88 },
  
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
